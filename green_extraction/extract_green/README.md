# Stage 1 - Batch Green UI Extraction

This tool batch-extracts green HUD/icon candidates from reference images and exports transparent PNG assets.

## Default input directory

`/home/robbie/tyf_file/startup/lightMind/code_ui_ar/leqi_ui`

You can override it with `--input-dir`.

## Environment

Recommended Python interpreter:

`/home/robbie/miniconda3/envs/lightmind/bin/python`

Dependencies:

```bash
/home/robbie/miniconda3/envs/lightmind/bin/python -m pip install opencv-python numpy
```

## Run

From repo root:

```bash
/home/robbie/miniconda3/envs/lightmind/bin/python extract_green/extract_green.py
```

Common overrides:

```bash
/home/robbie/miniconda3/envs/lightmind/bin/python extract_green/extract_green.py \
  --input-dir /home/robbie/tyf_file/startup/lightMind/code_ui_ar/leqi_ui \
  --output-dir green_extract_output \
  --config extract_green/config.json \
  --limit 20 \
  --recursive \
  --save-masks \
  --save-debug-overlays
```

## Output structure

```text
green_extract_output/
  masks/                 # per-source merged green mask
  crops_png/             # transparent PNG candidates
  debug_overlays/        # original image + candidate boxes
  metadata/
    candidates.json      # per-candidate metadata
    summary.json         # global run stats and error list
```

## Parameter tuning

All defaults are in `extract_green/config.json`.

- `color_threshold`:
- `h_min`, `h_max`, `s_min`, `v_min`, `v_max`
- `weak_green.*`: optional weaker green band to keep glow edges
- `morphology`:
- `open_kernel`: remove isolated noise
- `close_kernel`: reconnect broken strokes
- `dilate_iter`, `erode_iter`: shape expansion/shrink
- `filter`:
- `component_min_area`: drop tiny connected components before contour split
- `min_area`, `max_area`: contour area filter
- `min_width`, `min_height`: bbox size floor
- `max_aspect_ratio`: remove extreme skinny noise
- `max_bbox_ratio`: reject candidates too close to full-frame region
- `padding`: extra pixels around bbox for glow preservation

## Notes and known limits

- This is automated candidate extraction. Some false positives/false negatives are expected.
- If candidates are too fragmented, increase `close_kernel` or `dilate_iter`.
- If backgrounds leak into alpha, tighten `h/s/v` thresholds and raise `component_min_area`.
- File read failures are reported in `summary.json` under `errors`.
