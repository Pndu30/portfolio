---
title: Face Expression Detector with ResEmoteNet
description: Facial expression recognition, combining Haar Cascade face detection with a ResEmoteNet classifier.
date: 2025-02-28
period: Jan 2025 – Feb 2025
tags:
  - python
  - pytorch
  - opencv
  - computer-vision
repo: https://github.com/Pndu30/Face-Expression-Detector
media:
  - type: image
    src: /media/face-expression/neutral-1.jpg
    caption: Neutral, confidence 0.99
  - type: image
    src: /media/face-expression/neutral-2.jpg
    caption: Neutral, confidence 1.00
  - type: image
    src: /media/face-expression/angry-1.jpg
    caption: Angry, confidence 0.96
  - type: image
    src: /media/face-expression/angry-2.jpg
    caption: Angry, confidence 0.76
  - type: image
    src: /media/face-expression/happy.jpg
    caption: Happy, confidence 0.80
  - type: image
    src: /media/face-expression/surprise.jpg
    caption: Surprise, confidence 0.94
---

## Overview

A program that finds faces in an image or video feed and classifies the
expression on each one, for emotion recognition.

## How it works

It runs as a two-stage pipeline:

1. **Face detection.** OpenCV's Haar Cascade classifier locates faces in each
   frame and crops them out.
2. **Expression classification.** Each face crop is passed to ResEmoteNet, a
   CNN for facial emotion recognition, implemented in PyTorch, which predicts the
   expression class.

Splitting detection from classification keeps each stage simple: the cheap
detector does the searching, and the network only ever sees a tightly cropped face.

## Stack

Python · PyTorch · OpenCV
