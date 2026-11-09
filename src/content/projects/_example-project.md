---
title: Example Project
description: One-line summary shown in the project list and search results.
date: 2026-11-09
tags:
  - ros2
  - c++
  - embedded
period: Jan 2026 – Present    # optional; shown instead of the date
repo: https://github.com/Pndu30/your-repo    # optional; adds a "Source" link
media:    # optional; Drive files must be shared "Anyone with the link → Viewer"
  - type: video
    drive: https://drive.google.com/file/d/1AbCdEfGhIjKlMnOpQrStUvWxYz/view?usp=sharing
    caption: Optional caption
  - type: image
    drive: 1AbCdEfGhIjKlMnOpQrStUvWxYz    # bare file ID works too
draft: true    # stays hidden; copy this file, rename it, and set draft: false
---

## Overview

What it is, why you built it, and the one result worth bragging about.

## Hardware

Platform, sensors, actuators, compute. A photo goes a long way. Put it next to
this file (e.g. `src/content/projects/images/robot.jpg`) and reference it like:
`![Robot on the bench](./images/robot.jpg)`. Astro optimises it at build time,
and the build fails if the path is wrong, which is a feature.

## Software

Stack, architecture, the interesting problem you solved.

```bash frame="terminal"
ros2 launch my_robot bringup.launch.py
```

## Results

Numbers, a demo video link, what you'd do differently.

