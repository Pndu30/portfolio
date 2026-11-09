---
title: Go1 Safe Navigation
description: A LiDAR-built local map on a Unitree Go1 robot dog, so people can teleoperate it without it bumping into things. Groundwork for autonomous path planning later.
date: 2026-11-08
period: Ongoing
tags:
  - lidar
  - unitree-go1
  - mapping
  - teleoperation
---

## Overview

This project gives a **Unitree Go1** robot dog awareness of its surroundings, so anyone can drive it safely without it walking into
obstacles.

*Work in progress:* this page will grow as the project does.

## Approach

- **Sensing.** A **Unitree L2 LiDAR** will be mounted on the Go1 to scan its
  surroundings.
- **Local map.** The scans build a local map around the robot, showing what is
  near it and where.
- **Safe teleoperation.** The operator still drives the robot, but the map lets
  the system stop it from moving into obstacles.

## Where it's heading

The same local map is the foundation for **autonomous path planning**: once
the robot knows where it can and can't go, the next step is letting it pick
its own route.

## Stack

Unitree Go1 · Unitree L2 LiDAR
