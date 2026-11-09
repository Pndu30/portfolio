---
title: Monash Automation Lab Digital Twin
description: A ROS2 digital twin of the Monash Automation lab, fusing ceiling-mounted camera and LiDAR detections into a live Gazebo mirror of the room.
date: 2026-11-09
period: Ongoing
tags:
  - ros2
  - lidar
  - rgb-d
  - yoloe
  - gazebo
  - digital-twin
media:
  - type: video
    drive: https://drive.google.com/file/d/1WPfQcPVMwXrB_cvgI_JXuJk3UFKL5DzH/view?usp=sharing
    caption: Tracking and generation of map. Video courtesy of Monash Automation
  - type: video
    drive: https://drive.google.com/file/d/1LryTJmg3qxPA8oUykaT-gblvtSp5SEul/view?usp=sharing
    caption: Path planning of the simulated robot. Video courtesy of Monash Automation
---

## Overview

An ongoing Monash Automation project to build a digital twin of the lab: a
virtual copy of the room that stays in sync with what's physically in it. The
end goal is to use the twin to **visualise the lab** and to **control and
path-plan for the lab's robots** from one place. The current focus is the
perception side: knowing what is in the room and where.

## How it works

A ceiling-mounted **Intel RealSense D455** depth camera and a **Livox MID-360**
LiDAR watch the lab. Their streams feed a ROS2 (Jazzy) pipeline that ends with
a Gazebo scene mirroring the room:

1. **Detect.** An open-vocabulary **YOLOE** segmentation model finds objects in
   the colour image (chairs, desks, people by default). Because it's
   open-vocabulary, new classes are a prompt change, not a retrain.
2. **Locate in 3D.** Each detection is projected into 3D using the aligned
   depth image and published as an object in the room's `base_link` frame.
3. **Refine with LiDAR.** The point cloud is filtered to strip walls and floor,
   then clustered around each camera detection to tighten its position and
   size. DBSCAN, HDBSCAN and OPTICS are swappable, because object clusters
   vary in density from frame to frame.
4. **Track.** A DeepSORT tracker, using appearance re-identification rather
   than just position matching, gives each object a persistent ID across
   frames.
5. **Mirror.** A Gazebo node spawns and removes meshes to match the live object
   list, so the twin reflects the room as it changes.

The lab state can also be queried over ROS2 services: camera health, every
current detection as JSON, or a single named object.

<!--## Engineering notes

- **Multi-host.** Sensors aren't on the processing machine. The RealSense
  runs on a Jetson and everything talks over DDS, so QoS settings matter:
  a single RELIABLE subscriber on an image stream can stall the camera
  publisher for every consumer.
- **One frame convention.** Everything follows REP-103 (x forward, y left,
  z up) with the transform tree defined in a URDF, and clocks across hosts are
  synced with chrony so cross-machine transform lookups stay valid.
- **Scales by parameter.** Adding a second camera or LiDAR is a launch argument,
  not a code change.
- **CI.** Pushes and pull requests to `main` are built, tested and linted against
  ROS2 Jazzy in GitHub Actions.-->

## What's next

Building on the perception layer: robot control and path planning from inside
the twin, and a high-level ROS2 control architecture for the lab's bipedal
robot.

## Stack

ROS2 Jazzy · Python · YOLOE (Ultralytics) · DeepSORT · Intel RealSense D455 ·
Livox MID-360 · Gazebo · Docker
