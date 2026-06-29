---
name: layout-label-input-alignment
description: Preferred approach for aligning form labels with their inputs in this project
metadata:
  type: feedback
---

Use `flex items-center justify-end` on label divs and `flex items-center` on input divs so both sides vertically center within their rows. Avoid `pt-*` for vertical alignment — it doesn't adapt to input height.

For uniform input sizing, set a consistent Tailwind width class (e.g. `w-72`) on each `mat-form-field` and use `rows="1"` on textareas to match single-line inputs like date pickers.

**Why:** User confirmed this approach looked exactly right after trying it on form-completion.component.html.

**How to apply:** Any time a two-column label/input layout is built with Angular Material form fields.
