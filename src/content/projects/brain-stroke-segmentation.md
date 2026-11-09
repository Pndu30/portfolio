---
title: Brain Stroke Segmentation with MSEG-HarDNet
description: A medical image segmentation model for brain stroke lesions, built on MSEG-HarDNet.
date: 2025-02-15
period: Nov 2024 – Feb 2025
tags:
  - python
  - pytorch
  - medical-imaging
  - segmentation
# repo: https://github.com/Pndu30/<repo-name>
# media:
#   - type: image
#     drive: https://drive.google.com/file/d/<file-id>/view?usp=sharing
#     caption: Predicted lesion mask vs. ground truth
---

## Overview

Developed with Monash Analysis of Images in Medicine (Monash AIM), this project
segments stroke lesions in brain scans: for every pixel, the model decides
whether it belongs to a lesion, producing a mask clinicians could use to see
where the stroke is and how large it is.

## Approach

The model is based on **MSEG-HarDNet**, a segmentation network built on HarDNet
(Harmonic DenseNet), a derivative of DenseNet designed to cut memory traffic
while keeping DenseNet's feature reuse. The aim was to improve stroke
segmentation accuracy over a standard **UNet** baseline, which was implemented
and benchmarked alongside it.

## Stack

Python · PyTorch
