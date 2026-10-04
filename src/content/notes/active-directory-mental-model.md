---
title: "Active Directory: a mental model"
description: "The domain, the directory, and the objects that turn an organization into an identity system."
track: "Active Directory"
order: 1
level: "Foundation"
readingTime: "6 MIN READ"
published: 2026-10-04
---

Active Directory (AD) is easier to learn when you stop seeing it as a list of accounts. It is a **shared identity and policy system** for a Windows network. It answers questions such as: Who is this user? Which computer is this? Which resources may they use? Which rules apply here?

## The core picture

Imagine an organization with many users, computers, and services. Managing every account separately on every machine would quickly become unworkable. AD gives administrators a central directory and a way to coordinate authentication and policy across those machines.

Three ideas help anchor the model:

1. **The directory stores objects.** Users, computers, groups, and other resources are represented as objects with attributes.
2. **A domain is an administrative boundary.** It groups those objects under a shared directory and authentication infrastructure.
3. **Domain controllers serve the domain.** They host the directory and participate in authentication and policy distribution.

This is a conceptual map. Real environments can contain multiple domains, forests, trusts, and other services.

## Objects and relationships

A **user object** represents an identity. A **computer object** represents a joined machine. A **group** collects identities so permissions can be assigned to the group rather than repeated for every member.

Consider a shared folder available to a team. The folder has an access rule for a group; users become members of that group. The important relationship is **user → group → resource**. When membership changes, effective access can change without editing the folder's rule.

Organizational units (OUs) provide structure for administration and policy targeting. They are useful containers, but they are not the same thing as security groups. An OU can help decide *where a policy applies*; a group can help decide *who receives access*.

## Authentication is not authorization

These terms are close, but they answer different questions.

| Question | Concept | Example |
| --- | --- | --- |
| Who are you? | Authentication | Proving an identity to the domain |
| What may you do? | Authorization | Checking access to a file share |

A successful sign-in does not grant access to every resource. The resource still evaluates permissions and the identity's group memberships or other claims.

## Why this matters in security

Security reviews often become confusing when a name, machine, group, and permission are treated as isolated facts. AD is a **graph of relationships**. Understanding the graph lets you ask better questions: Which identities can reach a resource? Which groups grant that access? Where does a policy originate? Which domain controller would know about a change?

Start by drawing a small domain with three users, two groups, two computers, and one resource. Trace the path from a user to a resource. If you can explain each edge, the directory becomes much less mysterious.

## Keep exploring

Next, learn how an identity is presented to a service. [Kerberos: tickets and trust](/notes/kerberos-tickets-and-trust/) introduces the ticket flow that helps make domain authentication scalable.
