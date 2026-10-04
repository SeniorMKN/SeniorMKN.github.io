---
title: "Linux: users, groups, permissions"
description: "Read ownership and permission bits as a simple answer to who can do what."
track: "Linux"
order: 3
level: "Foundation"
readingTime: "6 MIN READ"
published: 2026-10-04
---

On Linux, every process runs with an identity, and files have ownership and access rules. The first useful question is: **which user is this process, and what can that user access?**

## Identity on a Linux host

A user account has a numeric **user ID (UID)**. Groups have **group IDs (GIDs)**. Human-readable names make these IDs easier to use, but the kernel ultimately evaluates the numeric identity and group memberships.

The `root` account has UID 0 and broad administrative power. Ordinary users have narrower access. Services often run under dedicated accounts so that a service does not receive more privileges than it needs.

Try `id` in a Linux lab to see your UID, primary group, and supplementary groups. This is an observation step: it tells you which identity the system will consider when checking access.

## Reading file permissions

The classic permission model has three audiences: **owner**, **group**, and **others**. Each can have read (`r`), write (`w`), and execute (`x`) permissions.

For example, `-rw-r-----` means the owner can read and write; members of the file's group can read; everyone else has no permission. The first character describes the file type, and the remaining nine characters come in three groups of three.

Directories give these bits slightly different meaning. On a directory, execute permission allows traversal, read permission allows listing names, and write permission allows changes to directory entries when combined with suitable access.

## Ownership and effective access

Permission bits are a starting point, not the whole story. Access can also depend on access control lists (ACLs), mount options, and the identity under which a process runs. A process launched by a service account may see a different world from the user at your terminal.

Use `ls -l` to observe basic ownership and mode. Use `namei -l` to understand the permissions along a path. A file may look readable yet remain unreachable because a parent directory cannot be traversed.

## Why this matters in security

Many mistakes come from assigning broad access for convenience. A useful review asks: Who owns this file? Which group can read it? Which process needs it? Could a narrower account or permission still let the service work?

This is the principle of least privilege made concrete. Instead of memorizing a permission number, trace the **user → groups → path → file** relationship.

## Keep exploring

Identity becomes more useful when you follow it into a running program. [Linux: processes, services, and logs](/notes/linux-processes-services-logs/) explains how to observe what a host is doing.
