---
title: FollowMe — Person-Following Robot
description: A ROS 2 navigation system that lets a mobile robot track and follow a person through dynamic environments, built at NICE CART.
date: 2026-02-01
period: Nov 2025 – Feb 2026
tags:
  - ros2
  - nav2
  - human-tracking
  - motion-planning
media:
  - type: video
    drive: https://drive.google.com/file/d/1x5DWKDDbVJtGBhNPoNga_HmoT-sT-aj-/view?usp=sharing
  - type: video
    drive: https://drive.google.com/file/d/19OJp9Z98K-Xo6g-QaXPzLA5auLMT89-E/view?usp=sharing
  - type: video
    drive: https://drive.google.com/file/d/1wVvIj4nfGCSeUJssoc83MH9oI9BH26_T/view?usp=sharing
---

## Overview

FollowMe is a person-following navigation system I designed and developed as a
Robotics Software Engineer Intern at the NICE Centre for Agricultural Robotics
and Technology (NICE CART) in Wuxi, China. The robot locks onto a person and
follows them in real time.

## How it works

The system integrates perception, tracking and motion planning on a ROS 2 /
Nav2 stack:

- **Human tracking → navigation.** Human tracking outputs are integrated into
  the navigation stack, with motion prediction so the robot can anticipate where
  the person is heading.
- **Occlusion handling.** When the person is temporarily hidden, the system
  re-acquires them once they reappear instead of losing the target.
- **Planning.** Several global and local planners were tested within Nav2,
  including **Smac2D** and the **Timed Elastic Band (TEB)** controller, each
  integrated and tuned to evaluate how well it could follow a moving target
  safely and smoothly in dynamic environments.

## Field work

Alongside FollowMe, I contributed to migrating the robot's navigation from ROS 1
`move_base` to ROS 2 Nav2, and assisted with on-robot field testing in
real-world environments.

## Stack

ROS 2 · Nav2
