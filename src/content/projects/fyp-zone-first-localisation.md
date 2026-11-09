---
title: Zone-First Container Localisation for Space Station Logistics
description: Final year project. A ROS2 system that tracks cargo containers on a space station by fusing passive RFID, UWB ranging and a depth camera, and checks every position against an inventory record.
date: 2026-06-01
period: Final Year Project · 2026
tags:
  - ros2
  - rfid
  - uwb
  - sensor-fusion
  - ekf
  - yoloe
  - jetson
  - digital-twin
media:
  - type: image
    src: /media/fyp/testbed.jpg
    caption: "Lab testbed: UWB ceiling and wall anchors, a tagged test container, and the camera, RFID reader and Jetson mounted on the robot mast"
  - type: image
    src: /media/fyp/dashboard.jpg
    caption: "Operator dashboard during a two-container run: zone, per-container state, position ± 1σ, and the live camera view"
  - type: image
    src: /media/fyp/anchor-layout.jpg
    caption: UWB anchor layout and camera view used for the static tests
---

## Overview

My Monash final year project, with **Shriabhay Shriharsha**, written up as the
paper *Zone-First Container Localisation for Robot-Assisted Logistics on
Commercial Space Station Environments*.

Stowage work consumes roughly a quarter of an ISS astronaut's working time, and
the RFID inventory flown so far only locates items to within metres: enough
to place an item in a module, not to pick it off a rack. We asked: **can
passive RFID zoning, refined by UWB and vision when needed, localise containers
accurately enough for a crew member or robot to retrieve them without
searching?**

## The method

Localisation runs in stages, each finer and more costly than the last, and
starts from a record of where every container *should* be:

1. **Zone (RFID).** A passive UHF reader on each hatch records which zone a
   container is in. The container needs no power for this.
2. **Position (UWB).** The container's UWB tag ranges to that zone's anchors.
   Per-anchor calibration removes antenna-delay bias, and an **extended Kalman
   filter** tracks position and velocity, updating on every range and
   rejecting outliers with an innovation gate.
3. **Refinement (camera).** When a container is in view of the robot's depth
   camera (Intel RealSense D455), **YOLOE** segments it, its depth gives a 3D
   position, and an OC-SORT-style tracker paired with the container
   (Hungarian matching) feeds that position into the EKF.
4. **Truth maintenance.** An **SQLite** record holds every container's
   expected position and contents (like a loading manifest). Each estimate is
   checked against it: agreement verifies it, and a contradiction is flagged
   as a mismatch.

Each container also carries a state that records **which sensors currently
support its estimate**: *detected* (zone only), *coarse* (UWB), *refined*
(UWB + camera) or *coasting*. That makes the reported position honest about
how far it can be trusted.

Everything runs under **ROS2** on a **Jetson Xavier NX**, with the camera and
reader carried on an XLeRobot mast.

## Results

- **RFID:** tags were detected within 0.3–0.7 s at carry speeds up to about
  3 m/s, but only within 0.2–0.3 m on the reader's built-in antenna, so real
  hatches need an external antenna.
- **UWB:** per-anchor calibration cut static error from **68.0 cm to
  15.4 cm** (14.7 cm with weighting). The remaining bias drifts and depends on
  position, so anchors should be no more than about 3 m apart along a zone.
- **Fusion:** refined estimates had **15.7–19.3 cm** error, against
  22.9–37.4 cm for UWB alone, with **99–100% within 30 cm**.
- **Multiple containers:** UWB tags kept two containers apart (13.7–19.1 cm
  at a surveyed point), but the camera tracker swapped identities where they
  crossed. In one run an ungated camera track pulled the estimate 3.6 m off,
  which shows camera association must be gated on the UWB identity.
- **Embedded:** median processing cycles took under 0.65 s on the Jetson.

## Stack

ROS2 · Python · UHF RFID (SparkFun M7E) · UWB (DW3000) · Intel RealSense D455 ·
YOLOE · EKF · SQLite · Jetson Xavier NX
