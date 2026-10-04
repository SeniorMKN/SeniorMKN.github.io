---
title: "Kerberos: tickets and trust"
description: "A beginner-friendly view of the ticket flow that lets domain identities reach services."
track: "Active Directory"
order: 2
level: "Foundation"
readingTime: "7 MIN READ"
published: 2026-10-04
---

Kerberos is an authentication protocol commonly used in Active Directory domains. Its central idea is simple: a client can present a **time-limited ticket** to a service instead of sending a password to that service on every request.

## The actors

There are three actors to keep in view:

- **Client:** the user or machine requesting access.
- **Key Distribution Center (KDC):** the trusted ticket service, provided by domain controllers in AD.
- **Service:** the resource the client wants to use, such as a file service.

The KDC is itself commonly described through two roles: an **Authentication Service (AS)** and a **Ticket-Granting Service (TGS)**. Those names describe stages of the flow, not two unrelated systems.

## A simplified ticket journey

1. The client authenticates to the KDC and receives a **ticket-granting ticket (TGT)**.
2. When the client needs a particular service, it uses the TGT to request a **service ticket** from the TGS.
3. The client presents the service ticket to the service.
4. The service validates the ticket and can make its own authorization decision.

The TGT is a way to ask for later tickets. It is not a universal permission slip. A service ticket is intended for a particular service, and authentication still does not automatically imply access.

## Why tickets have scope

Tickets have lifetimes and are tied to identities and services. That scope helps limit how long a ticket is useful and where it can be presented. Time synchronization matters because Kerberos uses timestamps as part of its protection against replay.

In AD, a service is identified by a **service principal name (SPN)**. The SPN links a service instance to the account under which it runs, giving the KDC a way to issue a ticket for the intended destination.

## The security lens

For a defender or an authorized tester, the important questions are about **trust boundaries**:

- Which identity requested a ticket?
- Which service was the ticket meant for?
- Which account runs that service?
- Is the behavior expected for that identity and host?

Those questions turn ticket activity into a system story instead of a pile of protocol names. They also show why account hygiene, service account design, monitoring, and time configuration matter.

## A useful mental check

If someone says “Kerberos gave me access,” separate the steps. Kerberos helped establish an identity to a service. The service then determined what that identity could do. Keep **authentication** and **authorization** distinct.

## Keep exploring

Review [Active Directory: a mental model](/notes/active-directory-mental-model/) if the relationships between users, groups, services, and domain controllers still feel abstract.
