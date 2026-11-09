---
title: x72 Processor in Verilog
description: A 16-bit, non-Turing-complete processor designed from scratch in Verilog for Monash ECE2072 (Digital Systems), simulated in ModelSim and synthesised for an FPGA.
date: 2024-10-11
period: Sep 2024 – Oct 2024
tags:
  - verilog
  - digital-design
  - fpga
  - quartus
  - modelsim
---

## Overview

A team project for the Monash unit **ECE2072: Digital Systems**: designing and
implementing a small processor, the **x72**, in Verilog, from the individual
building blocks up to a complete CPU targeting a DE10-Lite FPGA board. It is
deliberately **non-Turing complete**: there are no branch instructions and no
data memory, so programs run straight through. That keeps the scope on the
datapath and control logic.

## Architecture

- **Datapath.** Eight 16-bit general-purpose registers (R0–R7), plus an
  accumulator-style **A** register feeding the ALU and a **G** register
  holding its result, all connected by a shared 16-bit **bus** driven by a
  multiplexer.
- **Instructions.** Each instruction is 9 bits: a 3-bit opcode and two 3-bit
  register fields (`rx`, `ry`). Immediates are sign-extended from 9 to
  16 bits before going onto the bus.
- **Control unit.** A 4-tick FSM steps each instruction through fetch → load
  operand → execute → write back, with combinational logic driving the
  register-enable and mux-select signals for each tick. The current tick is
  shown on one of the board's seven-segment displays for debugging.

## Instruction set

| Instruction | Operation |
| --- | --- |
| `movi rx, #imm` | rx ← imm |
| `add rx, ry` | rx ← rx + ry |
| `addi rx, #imm` | rx ← rx + imm |
| `sub rx, ry` | rx ← rx − ry |

The **extension** stage added three more:

| Instruction | Operation |
| --- | --- |
| `mul rx, ry` | rx ← rx × ry |
| `ssi rx, #imm` | Signed shift by an immediate: left for positive amounts, right for negative |
| `disp rx` | Show rx in decimal on the board's seven-segment displays |

## Verification

Every component (ALU, registers, multiplexer, sign extender, tick FSM) has
its own testbench, and the full processor is tested end to end in
**ModelSim**, including edge cases like shifts that overflow 16 bits. The
design was synthesised and analysed in **Intel Quartus Prime**.

## Stack

Verilog HDL · ModelSim · Intel Quartus Prime · DE10-Lite FPGA
