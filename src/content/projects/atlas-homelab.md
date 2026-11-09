---
title: Atlas Homelab
description: My homelab, built as a hobby and to learn DevOps. Currently one mini PC with an OPNsense VM, with a staged plan to grow it into a full platform.
date: 2026-11-09
period: Ongoing · work in progress
tags:
  - homelab
  - devops
  - proxmox
  - opnsense
  - kubernetes
  - infrastructure-as-code
---

## Overview

Atlas is my homelab: something I'm building as a hobby and to learn DevOps
properly, by running real infrastructure instead of following tutorials.

*Work in progress:* this page tracks where it's up to.

## Hardware

**atlas1**: a Dell OptiPlex 7090 Micro with a 10th-gen Intel Core i7,
32 GB of RAM and about 930 GB of storage.

## Current state

No services yet. Right now atlas1 runs a single **OPNsense** VM, the firewall
and router that everything else will sit behind.

## Design principles

The plan behind Atlas has been through three architecture audits, and a few
rules shape everything in it:

- **Everything as code.** Infrastructure is defined in OpenTofu and Ansible and
  deployed from git, so any machine can be rebuilt rather than repaired.
- **Criticality tiers.** Production, homelab services, learning environments
  and experiments are kept apart, and a higher tier never depends on a lower
  one. An experiment crashing can't take down anything people rely on.
- **The internet gateway doesn't depend on the hypervisor.** The router
  eventually moves to its own box, so rebooting a server never takes the
  network down.
- **Backups only count once restored.** Every backup target has a written
  recovery procedure and a drill.

## Roadmap

The plan grows in stages, each one tied to what it should teach:

1. **Everything as code (now).** Import the existing setup into OpenTofu and
   Ansible; a three-node k3s cluster with Cilium for learning etcd quorum and
   eBPF networking; monitoring, alerting and off-site backups.
2. **Dedicated router.** OPNsense moves off the VM onto a fanless mini PC with
   a managed switch, carrying VLANs on real ports.
3. **Memory and backups.** More RAM, Proxmox Backup Server and single sign-on
   with Authentik.
4. **Platform engineering.** Two more nodes for a three-node Proxmox cluster;
   Kubernetes rebuilt with kubeadm and deployed through Argo CD (GitOps);
   distributed storage with Longhorn; short-lived secrets with OpenBao; image
   scanning and signing in CI.
5. **Lab node, GPU and robotics.** A GPU worker for ML pipelines, ROS 2
   simulation as a CI stage, and a small Raspberry Pi edge fleet.
6. **Network and source of truth.** Full VLAN segmentation, self-hosted NetBird
   for remote access, and NetBox as the source of truth for addresses and
   devices.
7. **NAS and recovery.** A ZFS NAS, immutable off-site backups, and a written,
   drilled recovery runbook.
8. **Smart home.** Home Assistant on a dedicated production node with automatic
   failover.
9. **Security operations.** Cameras on an isolated network, plus Wazuh, Falco,
   canary decoys and supply-chain security in CI.
10. **AI server.** Locally hosted LLM agents that can only act through a policy
    gateway with approvals and an audit log.
11. **Fabrication and robotics.** 3D printers, a mobile robot and a robot arm,
    tied into the lab's network and simulation.
12. **FPGA lab.** A hardware order-book pipeline on a DE10-Nano, run on paper
    data.

## Stack (current and planned)

Proxmox · OPNsense · OpenTofu · Ansible · Kubernetes (k3s → kubeadm) · Cilium ·
Argo CD · Prometheus & Grafana
