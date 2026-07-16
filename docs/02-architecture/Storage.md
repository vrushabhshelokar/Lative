# Storage.md

# Lative v1.0 Storage Specification

**Version:** 1.0 (MVP)

---

# Purpose

This document defines the complete storage architecture for Lative.

It specifies:

- What is stored
- Where it is stored
- Why it is stored there
- Database schema
- Storage limits
- Migration strategy
- Backup/Restore strategy
- Data lifecycle

This document acts as the single source of truth for every storage-related implementation.

---

# Storage Philosophy

Lative follows a **Local-First Architecture**.

User data always belongs to the user.

No user-generated content is stored remotely.

The only external communication occurs when the user explicitly uses AI features with their own Gemini API Key.

---

# Storage Technologies

Lative uses three storage mechanisms.

| Storage | Purpose | Usage |
|----------|---------|-------|
| IndexedDB (Dexie) | Main application database | User data, files, parsed data |
| chrome.storage.local | Lightweight extension settings | Extension preferences |
| localStorage | Never used | Reserved / prohibited |

---

# IndexedDB

## Purpose

IndexedDB is the primary persistent database.

Everything important is stored here.

This includes:

- Files
- Links
- Emails
- Parsed resumes
- Cart
- Settings backup data

IndexedDB must always be treated as the source of truth.

---

# IndexedDB Database

Database Name

```text
LativeDB
```

Current Version

```text
1
```

Database Library

```text
Dexie.js
```

---

# Object Stores

```text
LativeDB

├── resumes
├── parsedResumes
├── certificates
├── links
├── mails
├── cart
└── settings
```

---

# Store: resumes

Purpose

Store original uploaded resume files.

Schema

```ts
{
    id: string,
    fileName: string,
    file: Blob,
    fileSize: number,
    uploadedAt: number,
    updatedAt: number
}
```

Primary Key

```text
id
```

Indexes

```text
fileName
uploadedAt
```

---

# Store: parsedResumes

Purpose

Store parsed resume content.

Schema

```ts
{
    resumeId: string,

    fullText: string,

    skills: string[],

    projects: string[],

    education: string[],

    experience: string[],

    achievements: string[],

    createdAt: number
}
```

Primary Key

```text
resumeId
```

---

# Store: certificates

Purpose

Store uploaded certificates.

Schema

```ts
{
    id: string,

    fileName: string,

    file: Blob,

    mimeType: string,

    uploadedAt: number,

    updatedAt: number
}
```

Primary Key

```text
id
```

Indexes

```text
fileName
```

---

# Store: links

Purpose

Store profile URLs.

Schema

```ts
{
    id: string,

    url: string,

    createdAt: number,

    updatedAt: number
}
```

Primary Key

```text
id
```

---

# Store: mails

Purpose

Store email addresses.

Schema

```ts
{
    id: string,

    email: string,

    createdAt: number,

    updatedAt: number
}
```

Primary Key

```text
id
```

---

# Store: cart

Purpose

Store bookmarked career pages.

Schema

```ts
{
    id: string,

    title: string,

    url: string,

    createdAt: number
}
```

Primary Key

```text
id
```

Indexes

```text
url
createdAt
```

---

# Store: settings

Purpose

Store persistent application settings that should be included in backups.

Schema

```ts
{
    key: string,

    value: unknown
}
```

Examples

```text
Theme

Floating Button

Tutorial Completed

Current Version
```

---

# Parsed Resume Strategy

Resume parsing occurs exactly once.

Flow

```text
Upload Resume

↓

Parse PDF

↓

Extract Text

↓

Generate Structured Data

↓

Store

↓

Never Parse Again
```

Every AI request uses parsed data.

The original PDF is never reparsed unless replaced.

---

# File Storage Strategy

Original uploaded files remain untouched.

Stored as:

```text
Blob
```

Supported

Resume

```text
PDF
```

Certificate

```text
PDF

PNG

JPG

JPEG

WEBP
```

---

# chrome.storage.local

Purpose

Store lightweight extension configuration.

Used because:

- Fast
- Small
- Easy access
- Extension-specific

---

# Data Stored

```text
Gemini API Key

Current Theme

Floating Button Enabled

Last Selected Navigation Tab

Last Selected Resume ID (optional)

Extension Version
```

These values are configuration, not user content.

---

# Why Not IndexedDB?

Settings are:

- Small
- Frequently accessed
- Required during extension startup

chrome.storage.local is optimized for this use case.

---

# localStorage

Status

```text
Not Used
```

Reason

localStorage:

- Synchronous
- Limited
- Less reliable for extensions
- Poor choice for application data

Rule

Never store production data in localStorage.

---

# Duplicate Detection

Resume

Duplicate if:

```text
Same Filename

AND

Same File Size
```

Certificate

Duplicate if:

```text
Same Filename

AND

Same File Size
```

Cart

Duplicate if:

```text
Same URL
```

Mail

Duplicate if:

```text
Same Email
```

Links

Duplicate if:

```text
Same URL
```

---

# Validation Rules

Resume

Must satisfy

- PDF
- Size limit
- Readable
- Not duplicate

Certificate

Must satisfy

- Supported format
- Size limit
- Not duplicate

Mail

Must be valid email.

Link

Must be valid URL.

Cart

Must be valid URL.

---

# Size Limits

Resume

```text
Maximum 10 MB
```

Certificate

```text
Maximum 15 MB
```

Reason

Keeps IndexedDB lightweight while supporting realistic files.

---

# Storage Limits

No artificial limit on:

- Links
- Emails
- Cart

Resume Count

Unlimited (subject to browser storage availability).

Certificate Count

Unlimited (subject to browser storage availability).

---

# Migration Strategy

Database Version

```text
1
```

Future versions use Dexie migrations.

Example

```text
Version 1

↓

Version 2

↓

Migration

↓

Completed
```

Migration Rules

- Never destroy user data.
- Migrate automatically.
- Keep backward compatibility whenever possible.
- Validate migration success.

---

# Export Strategy

Export includes

```text
Links

Emails

Resumes

Parsed Resumes

Certificates

Cart

Settings
```

# Export Strategy

Export includes

```text
Links

Emails

Resumes

Parsed Resumes

Certificates

Cart

Settings
```

Export excludes

```text
Gemini API Key
```

Export Format

Exported as a serialized JSON structure (saved with a `.lative` or `.json` extension) structured as:

```json
{
  "$schema": "lative-backup-schema-v1",
  "schemaVersion": 1,
  "appVersion": "1.0.0",
  "exportedAt": 1784185200000,
  "data": {
    "links": [],
    "mails": [],
    "resumes": [],
    "parsedResumes": [],
    "certificates": [],
    "cart": [],
    "settings": []
  }
}
```

---

# Import Strategy & Compatibility

Import Flow

```text
Select Backup

↓

Validate Schema Integrity

↓

Check Backup Schema Version

↓

Apply Backward-Compatibility Migrations (if schemaVersion < current)

↓

Write to Database Stores

↓

Refresh UI
```

## Backup Version Compatibility Requirements

1. **Required Headers:** Every backup file must declare a positive integer `"schemaVersion"` matching the IndexedDB version under which it was exported, a `"appVersion"` string representing the extension version, and a `"exportedAt"` numeric timestamp.
2. **Schema Matching & Migrations:**
   - **Compatible Version:** If the backup `"schemaVersion"` matches the current IndexedDB version, data is restored directly.
   - **Older Version (Backward Compatibility):** If the backup `"schemaVersion"` is less than the current database version, the importer runs migration routines to convert the old format to the current schema before writing.
   - **Newer Version (Forward Block):** If the backup `"schemaVersion"` is greater than the current database version, the restore is rejected with a user-friendly error asking the user to update the extension.
3. **Data Integrity Guarantee:** In case of validation or import failure, database transactions must roll back completely to preserve existing data.

---

# Delete Strategy

Delete Resume

Removes

```text
Resume

+

Parsed Resume
```

Delete Certificate

Removes

```text
Certificate
```

Clear All Data

Removes

```text
Resumes

Parsed Resumes

Certificates

Links

Emails

Cart

Settings
```

Does not affect

```text
Extension installation
```

---

# Data Lifecycle

Resume

```text
Upload

↓

Parse

↓

Store

↓

Use

↓

Replace

↓

Delete
```

Certificate

```text
Upload

↓

Store

↓

Open

↓

Replace

↓

Delete
```

Link

```text
Add

↓

Copy

↓

Edit

↓

Delete
```

Mail

```text
Add

↓

Copy

↓

Edit

↓

Delete
```

Cart

```text
Save

↓

Open

↓

Copy

↓

Delete
```

---

# Performance Rules

- Never parse the same resume twice.
- Load only required object stores.
- Avoid reading large Blobs unless necessary.
- Cache parsed resume data during active AI sessions.
- Use IndexedDB indexes for lookups where appropriate.
- Batch writes when importing backups.

---

# Security Rules

Never store:

- AI conversations
- User passwords
- Authentication tokens
- External credentials (other than the user's Gemini API key in `chrome.storage.local`)

Gemini API Key

- Stored only locally.
- Never exported.
- Never included in backups.
- Never logged.

---

# Error Recovery

If IndexedDB fails:

- Show meaningful error.
- Prevent data corruption.
- Keep existing data intact whenever possible.

If migration fails:

- Abort migration.
- Preserve previous database.
- Notify user.

If import fails:

- Reject import.
- Keep existing database untouched.

---

# Storage Ownership

| Data | Storage |
|--------|---------|
| Resumes | IndexedDB |
| Parsed Resumes | IndexedDB |
| Certificates | IndexedDB |
| Links | IndexedDB |
| Emails | IndexedDB |
| Cart | IndexedDB |
| App Settings (backup eligible) | IndexedDB |
| Gemini API Key | chrome.storage.local |
| Theme | chrome.storage.local |
| Floating Button Toggle | chrome.storage.local |
| Active Navigation Tab | chrome.storage.local |
| Last Selected Resume (optional) | chrome.storage.local |
| Extension Version | chrome.storage.local |
| AI Conversation History | Not Stored |
| localStorage | Never Used |

---

# Final Storage Principle

Lative treats the browser as the user's personal vault.

Every piece of user-generated data is stored locally, structured for long-term maintainability, and isolated by feature. IndexedDB serves as the authoritative data store for application content, while `chrome.storage.local` is reserved exclusively for lightweight extension configuration. No user content is synchronized to external services, and backups remain fully under the user's control.