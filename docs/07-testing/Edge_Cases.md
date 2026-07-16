# Edge_Cases.md

# Lative v1.0 Edge Cases

**Version:** 1.0 (MVP)

---

# Purpose

This document defines uncommon, boundary, and failure scenarios that Lative must handle gracefully.

The goal is to ensure the extension remains:

- Stable
- Predictable
- Secure
- User-friendly

Unexpected situations should never result in:

- Data corruption
- Application crashes
- Lost user data
- Undefined behavior

---

# General Principles

For every edge case:

- Never crash.
- Never corrupt existing data.
- Preserve user information whenever possible.
- Show clear, actionable error messages.
- Keep the extension usable.

---

# Application Startup

## First Installation

Scenario

User installs Lative for the first time.

Expected Behavior

- Create database.
- Create object stores.
- Load default settings.
- Display empty states.
- No errors.

---

## Database Missing

Scenario

IndexedDB has not been created.

Expected Behavior

- Create database automatically.
- Continue normally.

---

## Database Upgrade

Scenario

Extension version changes.

Expected Behavior

- Run migration.
- Preserve existing data.
- Update schema safely.

---

## Database Corruption

Scenario

IndexedDB becomes unreadable.

Expected Behavior

- Inform user.
- Prevent further writes.
- Avoid data corruption.
- Allow recovery if possible.

---

# Links Module

## Empty URL

Expected

Reject.

---

## Invalid URL

Expected

Reject with explanation.

---

## Duplicate URL

Expected

Show duplicate warning.

Do not save.

---

## Very Long URL

Expected

Store correctly.

Truncate only in UI.

---

## Unsupported Protocol

Examples

```text
javascript:

data:

file:
```

Expected

Reject.

---

# Mail Module

## Empty Email

Reject.

---

## Invalid Email

Reject.

---

## Duplicate Email

Reject.

---

## Leading / Trailing Spaces

Automatically trim before validation.

---

# Resume Module

## Non-PDF Upload

Expected

Reject immediately.

---

## Empty PDF

Reject.

---

## Corrupted PDF

Reject.

---

## Password-Protected PDF

Reject.

---

## Extremely Large PDF

Reject if above configured limit.

---

## Duplicate Resume

Same filename and file size.

Expected

Reject.

---

## PDF Contains No Readable Text

Expected

Reject upload.

Explain that a text-based PDF is required.

---

## PDF Parsing Failure

Expected

Reject upload.

Do not store partial data.

---

## Replace Resume With Invalid File

Expected

Keep existing resume.

Reject replacement.

---

## Delete Last Resume

Expected

Remove resume.

AI should require selecting a resume again before use.

---

## Open Missing Resume

Scenario

Stored metadata exists but Blob is unavailable.

Expected

Show error.

Do not crash.

---

# Certificate Module

## Unsupported File Type

Reject.

---

## Duplicate Certificate

Reject.

---

## Replace With Invalid File

Reject replacement.

Keep existing certificate.

---

## Corrupted Image

Reject.

---

## Corrupted PDF Certificate

Reject.

---

# AI Module

## No API Key

Expected

AI unavailable.

Prompt user to configure API key.

---

## Invalid API Key

Expected

Display friendly error.

Allow updating key.

---

## Expired API Key

Expected

Show API authentication error.

---

## Internet Disconnected

Expected

Display network error.

Keep conversation intact.

---

## Gemini Unavailable

Expected

Display service unavailable message.

Allow retry.

---

## Rate Limit Exceeded

Expected

Display rate limit message.

Do not lose current prompt.

---

## Empty Prompt

Reject.

---

## Extremely Long Prompt

Warn user if prompt exceeds practical limits.

---

## No Resume Selected

Prevent sending prompt.

Ask user to select a resume.

---

## Resume Deleted During Conversation

Expected

Terminate conversation.

Require selecting another resume.

---

## Resume Changed During Conversation

Expected

Automatically start a new chat.

---

## Analyze Current Page Without Permission

Expected

Show meaningful error.

---

## Analyze Current Page On Empty Page

Expected

Inform user no useful content was found.

---

## Analyze Current Page On Very Large Page

Expected

Limit extracted content before sending to AI.

---

## AI Response Too Long

Expected

Display safely.

Allow scrolling.

---

# Cart Module

## Invalid URL

Reject.

---

## Duplicate URL

Reject.

---

## Floating Button Already Injected

Expected

Do not inject another button.

---

## Toggle Enabled Multiple Times

Expected

Single floating button remains.

---

## Toggle Disabled

Expected

Button removed.

---

## User Clicks Floating Button Repeatedly

Expected

Prevent duplicate entries.

Show duplicate notification.

---

## Unsupported Webpage

Scenario

Extension cannot inject content script.

Expected

Show friendly message.

Do not crash.

---

## Browser Internal Pages

Examples

```text
chrome://

edge://

brave://
```

Expected

Do not inject floating button.

Gracefully ignore.

---

# Settings Module

## Empty API Key

Reject.

---

## Invalid Theme Value

Fallback to:

System theme.

---

## Corrupted Settings

Restore defaults.

---

## Clear Data Cancelled

No data removed.

---

## Clear Data Confirmed

Delete all supported data.

Refresh UI.

---

# Backup

## Empty Backup

Reject.

---

## Corrupted Backup

Reject.

---

## Unsupported Backup Version

Display incompatibility message.

---

## Backup Missing Required Stores

Reject import.

---

## Partial Backup

Reject import.

Avoid partial restoration.

---

## Import Interrupted

Expected

Rollback if possible.

Keep existing data intact.

---

# Storage

## IndexedDB Full

Expected

Show storage error.

Stop write.

Keep existing data.

---

## IndexedDB Unavailable

Expected

Disable storage-dependent features.

Inform user.

---

## Write Failure

Expected

Abort operation.

Keep previous data.

---

## Read Failure

Expected

Show error.

Do not crash.

---

# Messaging

## Background Restarted

Expected

Reconnect automatically.

Retry if appropriate.

---

## Content Script Missing

Expected

Inject again if possible.

---

## Message Timeout

Expected

Display timeout message.

Allow retry.

---

## Unknown Message

Ignore safely.

---

# Browser

## Popup Closed During Operation

Expected

Stop UI updates safely.

Persist completed operations.

---

## Browser Restart

Expected

Restore all stored data.

---

## Browser Crash

Expected

Previously committed data remains available after restart.

---

## Multiple Browser Windows

Expected

Data remains consistent.

No corruption.

---

# UI

## Empty State

Every module should display meaningful empty states.

---

## Extremely Long Filename

Display truncated filename.

Keep full filename internally.

---

## Long URLs

Wrap or truncate cleanly.

---

## Rapid Button Clicking

Prevent duplicate operations.

Disable action while processing when appropriate.

---

## Double Upload

Prevent duplicate upload operations.

---

## Slow Operations

Show loading state.

Keep UI responsive.

---

# Performance

## Large Number of Links

Expected

UI remains responsive.

---

## Large Number of Emails

Expected

No noticeable slowdown.

---

## Many Resumes

Expected

Resume selector remains usable.

---

## Many Certificates

Expected

Scrolling remains smooth.

---

## Large Cart

Expected

No significant UI degradation.

---

# Security

## Malicious Filename

Example

```text
<script>.pdf
```

Expected

Treat as plain text.

Never execute.

---

## Malicious URL

Expected

Validate before storing.

Reject unsupported schemes.

---

## HTML Injection

Expected

Escape user-generated content before rendering.

---

## Backup Tampering

Expected

Validate structure before import.

Reject invalid files.

---

## Gemini API Key Exposure

Expected

Never:

- Export
- Log
- Display unnecessarily

---

# Accessibility

## Keyboard Only Navigation

Expected

Entire extension remains usable.

---

## Screen Zoom

Expected

Layout remains usable.

---

## High Contrast Themes

Expected

Readable interface.

---

# Future Compatibility

## New Database Version

Expected

Migration without data loss.

---

## New Module Added

Existing modules continue functioning.

---

## Deprecated Browser API

Expected

Fail gracefully where possible.

---

# Recovery Principles

Whenever an operation fails:

1. Preserve existing data.
2. Inform the user.
3. Explain the problem.
4. Offer a recovery path if possible.
5. Never leave the extension in an inconsistent state.

---

# Final Edge Case Principle

Lative should be resilient under both normal and abnormal conditions. Invalid input, interrupted operations, browser limitations, storage failures, network issues, or unexpected user behavior should never compromise data integrity or stability. When something cannot be completed, the extension should fail safely, preserve the user's data, and provide clear guidance on the next step.