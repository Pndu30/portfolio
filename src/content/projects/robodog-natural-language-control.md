---
title: Robodog Natural-Language Control
description: A ROS 2 interface that turns plain-English instructions into motion commands for a Unitree Go1 quadruped.
date: 2025-11-01
period: May 2025 – Nov 2025
tags:
  - ros2
  - c++
  - unitree-go1
  - gpt-api
repo: https://github.com/Pndu30/Robodog_GPT_Control
# media:
#   - type: video
#     drive: https://drive.google.com/file/d/<file-id>/view?usp=sharing
#     caption: Go1 responding to spoken commands
#   - type: image
#     drive: https://drive.google.com/file/d/<file-id>/view?usp=sharing
#     caption: The Go1 in the Monash Automation lab
---

## Overview

Built at Monash Automation, this project lets an operator command a Unitree Go1
quadruped in natural language instead of through a joystick or hand-written
motion scripts. An instruction like "walk forward a bit, then turn left" goes in;
a sequence of motion commands the robot can execute comes out.

## How it works

The system is a ROS 2 interface sitting between a language model and the robot:

- **Language → intent.** Natural-language input is sent to the GPT API, which
  interprets it into structured motion intents.
- **Intent → motion.** A ROS 2 layer maps those intents onto motion commands
  for the Go1 through the Unitree Go1 SDK.
- **Execution.** The resulting commands are sent to the Go1 for execution.

## Stack

ROS 2 · C++ · Unitree Go1 SDK · GPT API
