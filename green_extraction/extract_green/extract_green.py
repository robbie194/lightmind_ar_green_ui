#!/usr/bin/env python3
"""Batch extract green HUD/UI candidates from reference images."""

from __future__ import annotations

import argparse
import json
import sys
from collections import Counter
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, List, Optional, Tuple

import cv2
import numpy as np


DEFAULT_INPUT_DIR = "/home/robbie/tyf_file/startup/lightMind/code_ui_ar/leqi_ui"
DEFAULT_OUTPUT_DIR = "green_extract_output"
SUPPORTED_EXTS = {".jpg", ".jpeg", ".png", ".webp"}


@dataclass
class Candidate:
    contour: np.ndarray
    bbox: Tuple[int, int, int, int]
    contour_area: float
    bbox_area: int
    mask_area: int


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Batch extract green UI candidates as transparent PNG files."
    )
    parser.add_argument("--input-dir", default=DEFAULT_INPUT_DIR, help="Input image directory.")
    parser.add_argument("--output-dir", default=DEFAULT_OUTPUT_DIR, help="Output root directory.")
    parser.add_argument("--config", default=str(Path(__file__).with_name("config.json")))
    parser.add_argument("--limit", type=int, default=None, help="Process only first N images.")
    parser.add_argument("--recursive", dest="recursive", action="store_true")
    parser.add_argument("--no-recursive", dest="recursive", action="store_false")
    parser.set_defaults(recursive=None)
    parser.add_argument("--save-masks", dest="save_masks", action="store_true")
    parser.add_argument("--no-save-masks", dest="save_masks", action="store_false")
    parser.set_defaults(save_masks=None)
    parser.add_argument(
        "--save-debug-overlays", dest="save_debug_overlays", action="store_true"
    )
    parser.add_argument(
        "--no-save-debug-overlays", dest="save_debug_overlays", action="store_false"
    )
    parser.set_defaults(save_debug_overlays=None)
    return parser.parse_args()


def load_config(config_path: Path) -> Dict:
    with config_path.open("r", encoding="utf-8") as f:
        return json.load(f)


def apply_runtime_overrides(config: Dict, args: argparse.Namespace) -> Dict:
    runtime = dict(config)
    runtime["recursive"] = runtime.get("recursive", True) if args.recursive is None else args.recursive
    runtime["save_masks"] = (
        runtime.get("save_masks", True) if args.save_masks is None else args.save_masks
    )
    runtime["save_debug_overlays"] = (
        runtime.get("save_debug_overlays", True)
        if args.save_debug_overlays is None
        else args.save_debug_overlays
    )
    runtime["limit"] = args.limit if args.limit is not None else runtime.get("limit")
    return runtime


def scan_images(input_dir: Path, recursive: bool, limit: Optional[int]) -> List[Path]:
    paths = input_dir.rglob("*") if recursive else input_dir.glob("*")
    images = sorted(path for path in paths if path.suffix.lower() in SUPPORTED_EXTS)
    if limit is not None and limit > 0:
        images = images[:limit]
    return images


def cv2_read_image(path: Path) -> Optional[np.ndarray]:
    raw = np.fromfile(str(path), dtype=np.uint8)
    if raw.size == 0:
        return None
    image = cv2.imdecode(raw, cv2.IMREAD_COLOR)
    return image


def cv2_write_image(path: Path, image: np.ndarray) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    ext = path.suffix if path.suffix else ".png"
    ok, encoded = cv2.imencode(ext, image)
    if not ok:
        raise RuntimeError(f"Failed to encode image for {path}")
    encoded.tofile(str(path))


def make_green_mask(image_bgr: np.ndarray, cfg: Dict) -> np.ndarray:
    """Detect green-like HUD pixels in HSV space with optional dual-range support."""
    hsv = cv2.cvtColor(image_bgr, cv2.COLOR_BGR2HSV)

    h_min = int(cfg["h_min"])
    h_max = int(cfg["h_max"])
    s_min = int(cfg["s_min"])
    v_min = int(cfg["v_min"])
    v_max = int(cfg.get("v_max", 255))
    core = cv2.inRange(hsv, (h_min, s_min, v_min), (h_max, 255, v_max))

    weak_cfg = cfg.get("weak_green")
    if weak_cfg and weak_cfg.get("enabled", False):
        weak = cv2.inRange(
            hsv,
            (int(weak_cfg["h_min"]), int(weak_cfg["s_min"]), int(weak_cfg["v_min"])),
            (int(weak_cfg["h_max"]), 255, int(weak_cfg.get("v_max", 255))),
        )
        mask = cv2.bitwise_or(core, weak)
    else:
        mask = core
    return mask


def clean_mask(mask: np.ndarray, cfg: Dict) -> np.ndarray:
    open_kernel = int(cfg.get("open_kernel", 3))
    close_kernel = int(cfg.get("close_kernel", 5))
    dilate_iter = int(cfg.get("dilate_iter", 0))
    erode_iter = int(cfg.get("erode_iter", 0))

    cleaned = mask.copy()
    if open_kernel > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (open_kernel, open_kernel))
        cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_OPEN, kernel)
    if close_kernel > 0:
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (close_kernel, close_kernel))
        cleaned = cv2.morphologyEx(cleaned, cv2.MORPH_CLOSE, kernel)
    if dilate_iter > 0:
        cleaned = cv2.dilate(cleaned, None, iterations=dilate_iter)
    if erode_iter > 0:
        cleaned = cv2.erode(cleaned, None, iterations=erode_iter)
    return cleaned


def remove_small_components(mask: np.ndarray, min_area: int, max_area: Optional[int]) -> np.ndarray:
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(mask, connectivity=8)
    filtered = np.zeros_like(mask)
    for comp_idx in range(1, num_labels):
        area = int(stats[comp_idx, cv2.CC_STAT_AREA])
        if area < min_area:
            continue
        if max_area is not None and area > max_area:
            continue
        filtered[labels == comp_idx] = 255
    return filtered


def collect_candidates(
    mask: np.ndarray,
    filter_cfg: Dict,
    image_shape: Tuple[int, int, int],
    filtered_counter: Counter,
) -> List[Candidate]:
    h, w = image_shape[:2]
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    candidates: List[Candidate] = []

    min_area = int(filter_cfg["min_area"])
    max_area = filter_cfg.get("max_area")
    max_aspect_ratio = float(filter_cfg.get("max_aspect_ratio", 1000))
    min_width = int(filter_cfg["min_width"])
    min_height = int(filter_cfg["min_height"])
    max_bbox_ratio = float(filter_cfg.get("max_bbox_ratio", 1.0))

    for contour in contours:
        contour_area = float(cv2.contourArea(contour))
        if contour_area < min_area:
            filtered_counter["too_small_area"] += 1
            continue
        if max_area is not None and contour_area > float(max_area):
            filtered_counter["too_large_area"] += 1
            continue

        x, y, bw, bh = cv2.boundingRect(contour)
        if bw < min_width or bh < min_height:
            filtered_counter["too_small_size"] += 1
            continue

        aspect_ratio = max(bw / max(1, bh), bh / max(1, bw))
        if aspect_ratio > max_aspect_ratio:
            filtered_counter["too_extreme_aspect"] += 1
            continue

        bbox_area = int(bw * bh)
        if bbox_area / float(w * h) > max_bbox_ratio:
            filtered_counter["bbox_too_large_vs_image"] += 1
            continue

        mask_area = int(np.count_nonzero(mask[y : y + bh, x : x + bw]))
        candidates.append(
            Candidate(
                contour=contour,
                bbox=(x, y, bw, bh),
                contour_area=contour_area,
                bbox_area=bbox_area,
                mask_area=mask_area,
            )
        )

    return candidates


def build_alpha_crop(
    image_bgr: np.ndarray,
    contour: np.ndarray,
    bbox: Tuple[int, int, int, int],
    padding: int,
) -> Tuple[np.ndarray, Tuple[int, int, int, int]]:
    """Create a BGRA crop where alpha comes from contour mask (transparent background)."""
    img_h, img_w = image_bgr.shape[:2]
    x, y, bw, bh = bbox

    x0 = max(0, x - padding)
    y0 = max(0, y - padding)
    x1 = min(img_w, x + bw + padding)
    y1 = min(img_h, y + bh + padding)

    local_contour = contour.copy()
    local_contour[:, 0, 0] -= x0
    local_contour[:, 0, 1] -= y0

    crop_bgr = image_bgr[y0:y1, x0:x1].copy()
    alpha = np.zeros((crop_bgr.shape[0], crop_bgr.shape[1]), dtype=np.uint8)
    cv2.drawContours(alpha, [local_contour], contourIdx=-1, color=255, thickness=cv2.FILLED)

    bgra = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    return bgra, (x0, y0, x1 - x0, y1 - y0)


def draw_debug_overlay(
    image_bgr: np.ndarray, candidates: List[Candidate], source_name: str
) -> np.ndarray:
    overlay = image_bgr.copy()
    for idx, candidate in enumerate(candidates, start=1):
        x, y, bw, bh = candidate.bbox
        cv2.rectangle(overlay, (x, y), (x + bw, y + bh), (0, 255, 0), 2)
        cv2.putText(
            overlay,
            f"{idx}",
            (x, max(20, y - 6)),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.6,
            (0, 255, 0),
            2,
            cv2.LINE_AA,
        )
    cv2.putText(
        overlay,
        f"{source_name} | candidates={len(candidates)}",
        (20, 30),
        cv2.FONT_HERSHEY_SIMPLEX,
        0.8,
        (0, 255, 0),
        2,
        cv2.LINE_AA,
    )
    return overlay


def main() -> int:
    args = parse_args()
    config_path = Path(args.config)
    if not config_path.exists():
        print(f"Config not found: {config_path}", file=sys.stderr)
        return 2

    base_cfg = load_config(config_path)
    runtime_cfg = apply_runtime_overrides(base_cfg, args)

    input_dir = Path(args.input_dir).expanduser().resolve()
    output_dir = Path(args.output_dir).expanduser().resolve()

    masks_dir = output_dir / "masks"
    crops_dir = output_dir / "crops_png"
    overlays_dir = output_dir / "debug_overlays"
    metadata_dir = output_dir / "metadata"
    metadata_dir.mkdir(parents=True, exist_ok=True)
    crops_dir.mkdir(parents=True, exist_ok=True)
    if runtime_cfg["save_masks"]:
        masks_dir.mkdir(parents=True, exist_ok=True)
    if runtime_cfg["save_debug_overlays"]:
        overlays_dir.mkdir(parents=True, exist_ok=True)

    image_paths = scan_images(input_dir, bool(runtime_cfg["recursive"]), runtime_cfg.get("limit"))

    candidates_meta = []
    filtered_reasons: Counter = Counter()
    errors = []
    total_candidates = 0
    processed_ok = 0

    for img_idx, img_path in enumerate(image_paths, start=1):
        image = cv2_read_image(img_path)
        if image is None:
            errors.append({"file": str(img_path), "error": "cv2_read_failed"})
            continue

        try:
            mask = make_green_mask(image, runtime_cfg["color_threshold"])
            cleaned = clean_mask(mask, runtime_cfg["morphology"])
            filtered_mask = remove_small_components(
                cleaned,
                min_area=int(runtime_cfg["filter"]["component_min_area"]),
                max_area=runtime_cfg["filter"].get("component_max_area"),
            )

            candidates = collect_candidates(filtered_mask, runtime_cfg["filter"], image.shape, filtered_reasons)
            candidates = sorted(candidates, key=lambda c: c.mask_area, reverse=True)

            source_rel = str(img_path.relative_to(input_dir)) if img_path.is_relative_to(input_dir) else img_path.name
            source_stem = img_path.stem
            source_token = source_rel.replace("/", "__").replace("\\", "__").replace(" ", "_")

            if runtime_cfg["save_masks"]:
                cv2_write_image(masks_dir / f"{source_token}.png", filtered_mask)

            if runtime_cfg["save_debug_overlays"]:
                debug_image = draw_debug_overlay(image, candidates, source_token)
                cv2_write_image(overlays_dir / f"{source_token}.jpg", debug_image)

            for cand_idx, cand in enumerate(candidates, start=1):
                out_name = f"{source_stem}__cand_{cand_idx:03d}.png"
                output_png = crops_dir / out_name

                crop_bgra, padded_bbox = build_alpha_crop(
                    image_bgr=image,
                    contour=cand.contour,
                    bbox=cand.bbox,
                    padding=int(runtime_cfg["filter"]["padding"]),
                )

                if crop_bgra.shape[0] <= 1 or crop_bgra.shape[1] <= 1:
                    filtered_reasons["invalid_crop_size"] += 1
                    continue

                cv2_write_image(output_png, crop_bgra)
                total_candidates += 1

                x, y, bw, bh = cand.bbox
                px, py, pw, ph = padded_bbox
                score = float(
                    min(1.0, cand.mask_area / max(1.0, cand.bbox_area))
                    * min(1.0, cand.mask_area / max(1.0, float(runtime_cfg["filter"]["min_area"]) * 4.0))
                )

                candidates_meta.append(
                    {
                        "id": f"{source_stem}__{cand_idx:03d}",
                        "source_file": source_rel,
                        "output_png": str(output_png.relative_to(output_dir)),
                        "bbox": {"x": int(x), "y": int(y), "w": int(bw), "h": int(bh)},
                        "padded_bbox": {"x": int(px), "y": int(py), "w": int(pw), "h": int(ph)},
                        "area_px": int(cand.bbox_area),
                        "mask_area_px": int(cand.mask_area),
                        "aspect_ratio": round(float(bw / max(1, bh)), 4),
                        "score": round(score, 4),
                    }
                )

            processed_ok += 1
            print(
                f"[{img_idx}/{len(image_paths)}] {img_path.name}: candidates={len(candidates)}",
                flush=True,
            )
        except Exception as exc:  # noqa: BLE001
            errors.append({"file": str(img_path), "error": str(exc)})

    candidates_path = metadata_dir / "candidates.json"
    summary_path = metadata_dir / "summary.json"

    with candidates_path.open("w", encoding="utf-8") as f:
        json.dump(candidates_meta, f, ensure_ascii=False, indent=2)

    summary = {
        "input_dir": str(input_dir),
        "output_dir": str(output_dir),
        "total_images": len(image_paths),
        "processed_images": processed_ok,
        "total_candidates": total_candidates,
        "filtered_by_reason": dict(filtered_reasons),
        "error_count": len(errors),
        "errors": errors,
        "config_used": runtime_cfg,
    }
    with summary_path.open("w", encoding="utf-8") as f:
        json.dump(summary, f, ensure_ascii=False, indent=2)

    print(f"Done. candidates={total_candidates}, errors={len(errors)}")
    print(f"Metadata: {candidates_path}")
    print(f"Summary : {summary_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
