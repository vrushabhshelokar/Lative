# Messaging.md

# Lative v1.0 Messaging Specification

**Version:** 1.0 (MVP)

---

# Purpose

This document defines how every part of the extension communicates.

Lative uses Chrome Extension messaging to keep every execution context independent while allowing them to exchange information safely.

This document defines:

- Communication architecture
- Message flow
- Message types
- Ownership
- Allowed communication paths
- Error handling
- Best practices

---

# Messaging Philosophy

Lative follows a **Hub-and-Spoke Architecture**.

The **Background Service Worker** acts as the communication hub.

Every other context communicates through it.

No module should communicate directly with another execution context when a background message can be used.

---

# Extension Contexts

Lative contains four execution contexts.

```text
Popup

Background Service Worker

Content Script

Webpage
```

Only the first three belong to the extension.

---

# Communication Architecture

```text
                 Popup
                    │
                    │
                    ▼
      Background Service Worker
          ▲                 │
          │                 ▼
          │          Content Script
          │                 │
          └─────────────────┘
```

The background service worker is responsible for routing messages.

---

# Responsibilities

## Popup

Responsible for:

- UI
- User interaction
- Triggering actions
- Displaying results

Popup should never directly manipulate webpages.

---

## Background

Responsible for:

- Message routing
- Extension state
- Content script communication
- Browser APIs
- Tab management
- Floating button lifecycle

Background should contain no UI.

---

## Content Script

Responsible for:

- Reading webpage content
- Injecting floating button
- Capturing current page information
- Displaying page toast notifications

Content script should never access IndexedDB directly.

---

# Allowed Communication

## Popup → Background

Allowed

Examples

- Save resume
- Save link
- Save email
- Save cart item
- Open file
- Export
- Import
- Analyze page
- Toggle floating button

---

## Background → Popup

Allowed

Examples

- Success response
- Error response
- Updated data
- Status updates

---

## Background → Content Script

Allowed

Examples

- Inject floating button
- Remove floating button
- Analyze page
- Show toast
- Read webpage

---

## Content Script → Background

Allowed

Examples

- Floating button clicked
- Current URL
- Current title
- Page content
- Status response

---

# Not Allowed

Popup

❌ Direct communication with webpage

Popup

❌ Direct DOM manipulation

Content Script

❌ Direct IndexedDB access

Content Script

❌ AI requests

Content Script

❌ Resume parsing

Modules

❌ Cross-module messaging

---

# Standard Message Flow

```text
Popup

↓

Background

↓

Action

↓

Response

↓

Popup
```

---

# Analyze Current Page Flow

```text
Popup

↓

Background

↓

Content Script

↓

document.body.innerText

↓

Background

↓

Popup

↓

Gemini API

↓

Response
```

---

# Floating Button Flow

```text
Settings

↓

Enable Toggle

↓

Background

↓

Inject Button

↓

Content Script

↓

Button Clicked

↓

Current URL

↓

Background

↓

Save Cart

↓

Popup Refresh

↓

Toast
```

---

# Resume Upload Flow

```text
Popup

↓

Validate

↓

Store

↓

Parse

↓

Save Parsed Data

↓

Success
```

This flow does not require messaging because it occurs entirely inside the popup context.

---

# AI Flow

```text
Popup

↓

Load Resume

↓

(Optional)

Request Page Content

↓

Background

↓

Content Script

↓

Return Page Text

↓

Popup

↓

Gemini

↓

Display Response
```

---

# Export Flow

```text
Popup

↓

Read IndexedDB

↓

Generate Backup

↓

Download
```

No messaging required.

---

# Import Flow

```text
Popup

↓

Read Backup

↓

Restore IndexedDB

↓

Refresh Modules
```

No messaging required.

---

# Message Types

Messages should use a consistent structure.

```ts
{
    type: string,
    payload: unknown
}
```

Every message must include:

- type
- payload

---

# Recommended Message Names

## Cart

```text
CART_ADD_CURRENT_PAGE

CART_REFRESH

CART_OPEN

CART_DELETE
```

---

## Floating Button

```text
FLOATING_ENABLE

FLOATING_DISABLE

FLOATING_SHOW

FLOATING_HIDE
```

---

## Analyze Page

```text
PAGE_ANALYZE

PAGE_CONTENT

PAGE_ERROR
```

---

## Settings

```text
SETTINGS_UPDATE

SETTINGS_REFRESH
```

---

## General

```text
PING

READY

SUCCESS

ERROR
```

---

# Response Format

Every response should follow:

```ts
{
    success: boolean,

    data?: unknown,

    error?: string
}
```

Example

```ts
{
    success: true,
    data: {...}
}
```

Example

```ts
{
    success: false,
    error: "Unable to inject content script."
}
```

---

# Error Handling

Every message sender must expect failure.

Examples

- Tab closed
- Content script unavailable
- Background restarted
- Invalid tab
- Permission denied

Never assume success.

---

# Timeout Rules

Messages waiting for a response should timeout gracefully.

If timeout occurs:

- Inform user.
- Allow retry.
- Do not freeze UI.

---

# Messaging Ownership

Popup owns:

- User interaction

Background owns:

- Browser communication

Content Script owns:

- Webpage interaction

This ownership should never overlap.

---

# Content Script Rules

Content scripts may:

- Read visible webpage content
- Read URL
- Read title
- Inject floating button
- Display toast

Content scripts may not:

- Access AI
- Access IndexedDB
- Parse resumes
- Store data permanently

---

# Background Rules

Background may:

- Route messages
- Manage tabs
- Inject/remove content scripts
- Coordinate popup and content script

Background should not:

- Render UI
- Store business logic unrelated to browser APIs

---

# Popup Rules

Popup may:

- Access IndexedDB
- Parse resumes
- Call Gemini API
- Render UI

Popup should not:

- Directly access webpage DOM
- Inject UI into webpages

---

# Messaging Reliability

Messages should be:

- Small
- Fast
- Serializable

Avoid sending:

- Large Blobs
- PDFs
- Images

Instead, send identifiers and let the receiving context fetch required data when appropriate.

---

# Message Validation

Every received message should validate:

- Message type
- Payload shape
- Required fields

Unknown messages should be ignored safely.

---

# Security Rules

Never transmit:

- Resume PDF blobs
- Certificate blobs
- Gemini API Key
- Entire IndexedDB contents

Only send the minimum data required.

---

# Logging

Development

Allowed:

- Message type
- Sender
- Receiver
- Duration

Avoid logging payloads containing user content.

Production

Disable verbose message logging.

---

# Future Expansion

New message types should:

- Follow existing naming conventions.
- Remain feature-specific.
- Avoid generic "doEverything" handlers.

Examples

Good

```text
CART_ADD_CURRENT_PAGE

PAGE_ANALYZE

FLOATING_ENABLE
```

Avoid

```text
UPDATE

ACTION

PROCESS
```

---

# MV3 Service Worker Lifecycle & Reconnection

Manifest V3 extensions replace background pages with ephemeral **Service Workers**. These workers automatically spin down and terminate when idle to save browser resources. Lative must handle this lifecycle gracefully:

## Termination & Heartbeat Behavior

1. **Idle Expiration:** The browser terminates the background service worker after approximately 30 seconds of inactivity.
2. **Heartbeats:** The extension background worker does not require artificially kept-alive heartbeats unless performing active multi-step actions. It must remain stateless, loading its temporary configurations from `chrome.storage.local` on startup.

## Reconnection Protocols

1. **Popup Re-initialization:** Every time the popup UI opens, it checks connection status. Outgoing messages to background workers automatically wake up the service worker if it was asleep.
2. **Content Script Reconnection:**
   - When the background worker restarts, existing injected content scripts may lose their ports or message channels (throwing errors like `Extension context invalidated`).
   - Content scripts must catch connection exceptions, gracefully clean up any dangling DOM elements (such as the Cart floating button), and wait for a user refresh or reinjection request.
   - The popup must handle communication retries if a worker wake-up causes minor delays.

---

# Final Messaging Principle

Lative follows a centralized communication model where the **Background Service Worker** coordinates interactions between the popup and content scripts. UI remains isolated from webpage logic, browser APIs remain isolated from business logic, and every message is explicit, validated, and feature-specific. This keeps the extension predictable, secure, and easy to maintain as new modules are added.