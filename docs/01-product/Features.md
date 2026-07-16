# Features.md

# Lative v1.0 Features Specification

**Version:** 1.0 (MVP)

---

# Purpose

This document describes every feature included in **Lative v1.0**.

For each feature it defines:

- Purpose
- User Flow
- Functional Requirements
- Validation
- User Actions
- Expected Behavior
- Success Criteria

This document represents the functional specification for the MVP.

---

# Feature Overview

Lative consists of seven primary modules.

| Module | Purpose |
|---------|---------|
| Links | Store professional profile links |
| Mail | Store multiple email addresses |
| Resume | Store and manage resumes |
| Certificate | Store and manage certificates |
| AI | Resume-powered AI assistant |
| Cart | Save career webpages |
| Settings | Configure extension |

---

# 1. Links Module

## Purpose

Store frequently used professional profile links for quick access during job applications.

---

## Supported Links

Examples include:

- LinkedIn
- GitHub
- Portfolio
- HackerRank
- LeetCode
- Personal Website
- Other public profile URLs

---

## User Flow

```text
Open Links

↓

Enter URL

↓

Add

↓

Stored

↓

Displayed as Card
```

---

## Card Actions

- Copy Link
- Edit Link
- Delete Link

---

## Validation

Must:

- Be a valid URL
- Not be empty
- Not already exist

---

## Success Criteria

Users can manage multiple links quickly without leaving the extension.

---

# 2. Mail Module

## Purpose

Store multiple email addresses used for job applications.

---

## User Flow

```text
Open Mail

↓

Enter Email

↓

Add

↓

Stored

↓

Displayed as Card
```

---

## Card Actions

- Copy Email
- Edit Email
- Delete Email

---

## Validation

Must:

- Be valid email format
- Not be empty
- Not duplicate an existing email

---

## Success Criteria

Users can switch between different application email addresses effortlessly.

---

# 3. Resume Module

## Purpose

Store multiple resumes locally and prepare them for AI usage.

---

## Supported Format

- PDF only

---

## Upload Flow

```text
Upload

↓

Validate

↓

Duplicate Check

↓

Size Check

↓

Parse

↓

Extract Text

↓

Generate Structured Data

↓

Store PDF

↓

Store Parsed Resume

↓

Display Card
```

---

## Validation

Resume must:

- Be PDF
- Be readable
- Be under maximum size
- Not already exist

---

## Resume Card

Displays:

- Original Filename

Actions:

- Open
- Replace
- Copy Filename
- Delete

---

## Resume Parsing

Performed immediately after upload.

Extracted information includes:

- Full Text
- Skills
- Projects
- Education
- Experience
- Achievements

Parsed information remains hidden from the user.

---

## Replace Resume

Flow

```text
Replace

↓

Upload New PDF

↓

Validate

↓

Parse

↓

Overwrite

↓

Refresh Card
```

---

## Delete Resume

Removes:

- PDF
- Parsed Resume

---

## Success Criteria

Users can safely manage multiple resumes while AI always uses parsed data instead of repeatedly processing PDFs.

---

# 4. Certificate Module

## Purpose

Store certificates for quick access during applications.

---

## Supported Formats

- PDF
- PNG
- JPG
- JPEG
- WEBP

---

## User Flow

```text
Upload

↓

Validate

↓

Store

↓

Display Card
```

---

## Card Actions

- Open
- Replace
- Copy Filename
- Delete

---

## Validation

Must:

- Be supported format
- Not exceed size limit
- Not duplicate an existing certificate

---

## AI Integration

Certificates are **not** processed by AI.

No parsing occurs.

---

## Success Criteria

Certificates remain organized and easily accessible without increasing AI complexity.

---

# 5. AI Module

## Purpose

Provide intelligent resume-based assistance.

---

## Requirement

User must configure:

- Gemini API Key

Without a key:

```text
AI Unavailable
```

---

## Resume Selection

Before chatting:

```text
Choose Resume

↓

Start Chat
```

Changing the selected resume:

- Starts a new conversation automatically.
- Clears previous conversation context.

---

## Conversation

Conversation memory exists only for the current session.

No history is stored after closing or refreshing the extension.

---

## Supported Features

### Profile Summary

Summarize the selected resume.

---

### Resume Summary

Generate a concise overview of the selected resume.

---

### Why Should We Hire You?

Generate a personalized response using the selected resume.

---

### Compare Job Description

Compare pasted job description against the selected resume.

Output includes:

- Matching strengths
- Missing skills

---

### Best Resume

When multiple resumes exist, recommend the most suitable resume for the provided job description.

---

### Missing Skills

Identify skills required by the job description but absent from the selected resume.

---

### Analyze Current Page

User explicitly requests analysis.

The extension reads the visible webpage text and includes it as context for the AI response.

---

### General Chat

Answer questions related to the selected resume.

---

## Quick Actions

The AI interface should expose quick actions such as:

- Profile Summary
- Resume Summary
- Compare JD
- Missing Skills
- Best Resume
- Analyze Current Page

---

## Success Criteria

The AI behaves like a resume-aware assistant while respecting privacy and user control.

---

# 6. Cart Module

## Purpose

Quickly save career-related webpages.

---

## Manual Flow

```text
Paste URL

↓

Add

↓

Stored

↓

Displayed as Card
```

---

## Card Actions

- Open
- Copy URL
- Edit
- Delete

---

## Floating Button

Enabled from Settings.

Flow

```text
Enable Toggle

↓

Floating Button Appears

↓

User Clicks

↓

Current URL

+

Page Title

↓

Save

↓

Toast

↓

Refresh Cart
```

---

## Duplicate Detection

Duplicate URLs are rejected.

---

## Stored Information

Each cart item contains:

- Title
- URL
- Timestamp

---

## Success Criteria

Users can bookmark job pages instantly without interrupting their browsing workflow.

---

# 7. Settings Module

## Purpose

Manage extension configuration and maintenance.

---

## Features

### Gemini API Key

Configure or update the user's Gemini API key.

---

### Theme

Options:

- System
- Light
- Dark

---

### Floating Button

Enable or disable the floating save button.

---

### Export Data

Export all supported user data.

---

### Import Data

Restore previously exported data.

---

### Clear All Data

Delete all locally stored data after user confirmation.

---

### Video Tutorial

Open usage guide.

---

### Privacy

Display local-first privacy statement.

---

### Feedback

Open embedded Tally feedback form.

---

### Report Issue

Allow users to report bugs or problems.

---

### About

Display:

- Extension name
- Version
- Basic product information

---

## Success Criteria

Users can configure and maintain the extension without leaving it.

---

# Backup Feature

## Export

Includes:

- Links
- Emails
- Resumes
- Parsed Resumes
- Certificates
- Cart
- Settings

Excludes:

- Gemini API Key

---

## Import

Restores:

- Links
- Emails
- Resumes
- Parsed Resumes
- Certificates
- Cart
- Settings

Validation occurs before restoration.

---

# Theme Feature

Supports:

- System Theme
- Light Theme
- Dark Theme

Theme updates should apply immediately across the extension.

---

# Privacy Feature

The extension communicates clearly that:

- User data remains local.
- No account is required.
- Data is only sent externally when the user explicitly invokes AI with their own Gemini API key.

---

# Global User Actions

Across the extension, common actions include:

- Add
- Upload
- Open
- Replace
- Copy
- Edit
- Delete
- Export
- Import
- Analyze
- Send
- Toggle

These actions should behave consistently in every module.

---

# Feature Interactions

| Feature | Depends On |
|----------|------------|
| Links | IndexedDB |
| Mail | IndexedDB |
| Resume | IndexedDB + pdf.js |
| Certificate | IndexedDB |
| AI | Resume + Parsed Resume + Gemini API |
| Cart | IndexedDB + Content Script |
| Settings | IndexedDB + chrome.storage.local |
| Backup | IndexedDB |
| Theme | chrome.storage.local |

---

# Features Explicitly Excluded

The following features are intentionally out of scope for Version 1:

- Automatic form filling
- Automatic application submission
- Resume version history
- Certificate parsing
- OCR support
- Local LLMs
- Cloud synchronization
- User authentication
- Persistent AI chat history
- Resume rewriting
- ATS scoring
- Cover letter generation
- Application tracking
- Dragging files directly from IndexedDB

---

# MVP Definition

Lative v1.0 is considered feature complete when:

- Every module functions independently.
- All data persists locally.
- Resume parsing works correctly.
- AI answers using the selected parsed resume.
- Current webpage analysis functions on demand.
- Floating Cart button captures webpages successfully.
- Backup and restore work reliably.
- Settings manage extension configuration correctly.
- The extension is stable enough for public release on the Chrome Web Store.

---

# Final Feature Principle

Every feature in Lative should reduce friction during job applications while preserving user privacy, maintaining local ownership of data, and ensuring that users remain in complete control of every action performed by the extension.