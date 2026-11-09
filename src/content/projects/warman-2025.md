---
title: Warman Design & Build Competition 2025
description: An autonomous Arduino robot that collects three balls and carries them across a pivoting seesaw. I worked mainly on the electrical system and the Arduino code.
date: 2025-05-20
period: Mar 2025 – May 2025
tags:
  - arduino
  - embedded
  - electronics
  - solidworks
  - autonomous
media:
  - type: image
    src: /media/warman/robot-side.jpg
    caption: The final robot, with the rubber-band collector raised over the drive base
  - type: image
    src: /media/warman/robot-front.jpg
    caption: Collector box on its wooden arms; mecanum wheels with added rubber tread
  - type: video
    drive: https://drive.google.com/file/d/1LqAgmg4a-VajDZBBiTzx_bgmixQgSKAK/view?usp=sharing
    caption: The video of our robot working
---

## Overview

Team 38's entry in the **2025 Weir-Warman Design & Build Competition**, a
competition for engineering students across Australia and New Zealand, established by Engineers Australia. The
task, *Project SEESAW*, was to build a robot no bigger than a 400 mm cube that,
from a single start action, **autonomously** collects a tennis ball, a
racquetball and a table-tennis ball from random spots in a 3×3 grid, crosses a
pivoting seesaw, drops the balls in a deposit zone and parks in the end zone,
all within 120 seconds.

I was one of five team members and worked mainly on the **electrical system
and the Arduino code**.

## The robot

- **Body.** Carries the Arduino, the LiPo battery, four motor-driven mecanum
  wheels and the arm motors.
- **Collector.** A lightweight laser-cut wooden box strung with rubber bands.
  It drops over the balls and scoops all three at once, with no sensors needed
  to find them. Servo-driven flaps release the balls at the deposit zone.

## Electrical & software

The Arduino runs the whole mission as an autonomous sequence: drive to the
balls, lower the collector, lift it, turn 90° onto the seesaw, cross it, turn
90° toward the deposit zone, open the flaps and finish in the end zone.

The hardest electrical problem was **lifting the collector**. A single arm
motor couldn't lift the box evenly, and we believed the Arduino didn't have
enough spare outputs to drive a second one. The fix was to wire the two arm
motors **in parallel**, soldering their supply and ground together so both run
in sync from one output. Combined with cutting weight out of the box, that
lifted it reliably without needing another pin.

## Result

In **heat 2** the robot completed the full course in **59 s** for a score of
**210.5**, with full marks for disturbance, movement, landing, deposit and
end zone. It was one of the first teams to complete the mission. 

## Stack

Arduino (C++) · DC motors & servos ·  SOLIDWORKS · 3D Printing
