---
title: ROS 2 Upskilling Materials
description: A starter kit of annotated ROS 2 examples in C++ and Python, written to onboard new Monash Automation members.
date: 2025-08-30
period: Aug 2025
repo: https://github.com/Pndu30/ROS2_Materials
tags:
  - ros2
  - c++
  - python
  - teaching
---

## Overview

Upskilling material for new Monash Automation members: a small set of minimal,
heavily commented examples covering the core ROS 2 concepts, each written in both
**C++ (rclcpp)** and **Python (rclpy)**, so the two APIs can be compared side by side.

## What's covered

- **Nodes.** The smallest possible node, and how `init` → `spin` → `shutdown`
  fits together.
- **Timers and callbacks.** Periodic work with `create_timer` /
  `create_wall_timer`.
- **Publishers and subscribers.** Simple pub and sub nodes, then a combined
  node that subscribes to turtlesim's `Pose` and publishes `Twist` velocity
  commands back to the turtle: a closed loop you can watch on screen.
- **Services and clients.** Request/response with `AddTwoInts`, shown as
  both a free-function and a class-based implementation in C++, with async
  client calls.
- **Custom interfaces.** Example `.msg` and `.srv` definitions showing how to
  define your own message and service types.

Comments in the code explain what each API call does and why, so the files
work as reference material as well as runnable examples.

## Stack

ROS 2 · C++ (rclcpp) · Python (rclpy) · turtlesim
