---
title: "Linux: processes, services, and logs"
description: "A practical mental model for what is running, who runs it, and where its evidence appears."
track: "Linux"
order: 4
level: "Foundation"
readingTime: "7 MIN READ"
published: 2026-10-04
---

A Linux host is not just a collection of files. It is a collection of **running processes**: programs with identities, arguments, open files, and relationships to other processes. Understanding those relationships is essential for troubleshooting and security work.

## Processes have context

Every process has a process ID (PID) and typically a parent process. It also runs under a user identity. These facts help answer three questions: What started it? Who owns it? What can it reach?

Commands such as `ps` can show a snapshot of processes; `top` can show changing activity. In a lab, compare the process name with its owner and command line. A familiar name alone does not tell you whether its behavior is expected.

## Services make processes persistent

Many Linux distributions use **systemd** to manage services. A service unit describes how a program starts, stops, and restarts. It can also specify the account under which that program runs and the dependencies it needs.

`systemctl status <service>` shows a service's current state and recent context. The goal is not to memorize every systemd setting. It is to connect **unit → process → user → network or file access**.

## Logs are evidence with limits

Logs record selected events, not every event. On systemd-based systems, `journalctl` can query the system journal. Applications may also write their own files under `/var/log` or elsewhere.

A useful observation sequence is:

1. Identify a process or service of interest.
2. Check the account under which it runs.
3. Examine its service configuration and recent logs.
4. Compare timestamps and events with what you expected the service to do.

Logs can be missing, incomplete, rotated, or misleading if you lack context. Treat them as evidence to correlate with process state, configuration, and network observations.

## Ports are another clue

A listening port often points to a service, but a port number does not prove which program or configuration is behind it. On your own lab machine, `ss -lntp` can help connect listening TCP sockets to processes. The exact visibility may depend on your permissions.

The useful relationship is **port → process → service unit → identity → logs**. Following that chain gives you a more reliable picture of a host than any one command on its own.

## Keep exploring

If process ownership or access rules are unclear, return to [Linux: users, groups, permissions](/notes/linux-users-groups-permissions/). The identity model explains much of what a running service can and cannot do.
