# Decisions.md

# Lative v1.0 Architecture & Product Decisions

**Version:** 1.0 (MVP)

---

# Purpose

This document records the important product, architecture, UX, and technical decisions made during the planning of Lative.

It serves as the project's **Decision Log**.

Future changes should reference this document before altering established behavior.

---

# Product Decisions

---

## Decision 001

### Product Identity

**Decision**

Lative is a **privacy-first local career assistant**, not an autofill extension.

**Reason**

Users should remain in complete control of what information they submit during job applications.

---

## Decision 002

### No User Authentication

**Decision**

No login system.

No user accounts.

**Reason**

Reduce complexity.

Maintain privacy.

Remove backend dependency.

---

## Decision 003

### Local-First Product

**Decision**

All user data remains stored locally.

**Reason**

Privacy.

Offline support.

No cloud infrastructure.

---

## Decision 004

### No Cloud Database

**Decision**

No Firebase.

No Supabase.

No external storage.

**Reason**

Privacy-first philosophy.

---

# Storage Decisions

---

## Decision 005

### Primary Database

**Decision**

Use IndexedDB with Dexie.js.

**Reason**

Large file support.

Structured storage.

Browser-native.

---

## Decision 006

### Settings Storage

**Decision**

Use `chrome.storage.local` for lightweight extension configuration.

**Reason**

Fast startup.

Small data.

Extension-native.

---

## Decision 007

### localStorage

**Decision**

Never use localStorage for application data.

**Reason**

Synchronous.

Limited.

Less suitable than IndexedDB.

---

# Resume Decisions

---

## Decision 008

### Supported Format

**Decision**

Resume supports PDF only.

**Reason**

Consistent parsing.

Reliable AI context.

---

## Decision 009

### Resume Parsing

**Decision**

Resume is parsed immediately after upload.

**Reason**

Avoid repeated parsing.

Improve AI performance.

---

## Decision 010

### Parsed Resume Storage

**Decision**

Store:

- Original PDF
- Parsed text
- Structured information

**Reason**

Fast AI responses.

---

## Decision 011

### Resume Renaming

**Decision**

Users cannot rename resumes.

Original filename is preserved.

**Reason**

Reduce unnecessary metadata.

Keep behavior predictable.

---

## Decision 012

### Resume Replacement

**Decision**

Replacing a resume overwrites:

- PDF
- Parsed data

**Reason**

Keep resume and parsed content synchronized.

---

## Decision 013

### Resume Selection

**Decision**

Users manually select which resume AI should use.

**Reason**

Users often maintain resumes for different domains.

---

# Certificate Decisions

---

## Decision 014

### Certificate Formats

Supported

- PDF
- PNG
- JPG
- JPEG
- WEBP

---

## Decision 015

### Certificate Parsing

**Decision**

Certificates are never parsed.

**Reason**

Reduce complexity.

Keep AI focused on resumes.

---

## Decision 016

### AI Certificate Access

**Decision**

AI never receives certificate content.

**Reason**

Out of MVP scope.

---

# AI Decisions

---

## Decision 017

### AI Provider

**Decision**

Google Gemini.

User supplies personal API Key.

**Reason**

No backend required.

User controls API usage.

---

## Decision 018

### AI Requirement

Without Gemini API Key:

AI remains unavailable.

No fallback model.

---

## Decision 019

### AI Context

Conversation memory exists only for the current session.

No persistence.

---

## Decision 020

### Resume Change

Changing the selected resume:

Automatically starts a new chat.

**Reason**

Avoid mixed resume context.

---

## Decision 021

### AI Features

Supported

- Profile Summary
- Resume Summary
- Compare JD
- Missing Skills
- Best Resume
- Analyze Current Page
- Resume Q&A

---

## Decision 022

### AI Exclusions

Not included

- Resume rewriting
- ATS score
- Cover letter generation
- Certificate analysis
- Persistent memory

---

## Decision 023

### Analyze Current Page

Runs only when explicitly requested.

Never automatically.

---

# Cart Decisions

---

## Decision 024

### Floating Button

Enabled only through Settings.

---

## Decision 025

### Floating Button Behavior

Click

↓

Immediately saves

- URL
- Title

No confirmation.

---

## Decision 026

### Duplicate URLs

Duplicate URLs are rejected.

---

# Settings Decisions

---

## Decision 027

Settings include

- Gemini API Key
- Theme
- Floating Button
- Export
- Import
- Privacy
- Feedback
- Report Issue
- Tutorial
- About
- Clear Data

---

## Decision 028

### Theme

Supported

- System
- Light
- Dark

---

# Backup Decisions

---

## Decision 029

Backup includes

- Links
- Emails
- Resumes
- Parsed Resumes
- Certificates
- Cart
- Settings

---

## Decision 030

Gemini API Key is excluded from backups.

**Reason**

Security.

---

# Architecture Decisions

---

## Decision 031

Feature-first folder structure.

Each module owns:

- Components
- Hooks
- Services
- Storage
- Types
- Validators
- Constants
- Utilities

---

## Decision 032

Modules remain independent.

No cross-module dependencies.

---

## Decision 033

Business logic belongs in Services.

---

## Decision 034

Database logic belongs in Storage.

---

## Decision 035

Validation belongs in Validators.

---

## Decision 036

UI belongs in Components.

---

## Decision 037

Shared code belongs only in Shared.

---

# Messaging Decisions

---

## Decision 038

Background Service Worker acts as communication hub.

---

## Decision 039

Popup never directly communicates with webpage DOM.

---

## Decision 040

Content Script never accesses IndexedDB directly.

---

## Decision 041

Popup performs AI requests.

Content Script never calls Gemini.

---

# UI Decisions

---

## Decision 042

Popup is the primary interface.

Side Panel remains optional.

---

## Decision 043

Navigation order

- Links
- Mail
- Resume
- Certificate
- AI
- Cart
- Settings

---

## Decision 044

Every module follows identical card layouts.

---

## Decision 045

Use premium minimal design.

---

## Decision 046

Dark mode supported.

---

# Technology Decisions

---

## Decision 047

Framework

React

---

## Decision 048

Language

TypeScript

---

## Decision 049

Build Tool

Vite

---

## Decision 050

Styling

Tailwind CSS

---

## Decision 051

Storage

IndexedDB

Dexie.js

---

## Decision 052

PDF Parsing

pdf.js

---

## Decision 053

Animation

Framer Motion

---

## Decision 054

Icons

Lucide React

---

## Decision 055

Extension Standard

Manifest V3

---

# Security Decisions

---

## Decision 056

Everything stored locally.

---

## Decision 057

Only AI requests leave the browser.

---

## Decision 058

Certificates never leave the browser.

---

## Decision 059

Only selected resume context is sent to Gemini.

---

## Decision 060

Gemini API Key remains stored locally.

---

# Performance Decisions

---

## Decision 061

Never parse the same resume twice.

---

## Decision 062

Load only required data.

---

## Decision 063

Avoid unnecessary re-renders.

---

## Decision 064

Use IndexedDB as source of truth.

---

# Browser Decisions

---

## Decision 065

Support Chromium browsers.

Examples

- Chrome
- Edge
- Brave
- Opera
- Arc

---

# Explicit Non-Goals

---

## Decision 066

No autofill.

---

## Decision 067

No automatic form submission.

---

## Decision 068

No OCR.

---

## Decision 069

No cloud synchronization.

---

## Decision 070

No user accounts.

---

## Decision 071

No application tracker.

---

## Decision 072

No drag-and-drop file upload directly from IndexedDB.

---

## Decision 073

No persistent AI memory.

---

## Decision 074

No local LLMs.

---

## Decision 075

No resume version history.

---

# Future Expansion Decisions

---

## Decision 076

Future features must be added as independent modules.

---

## Decision 077

Existing modules should require minimal modification when adding new modules.

---

## Decision 078

Architecture should remain feature-first.

---

# Guiding Decisions

---

## Decision 079

User privacy always takes precedence over convenience.

---

## Decision 080

Users always remain in control.

No automatic actions affecting external websites.

---

## Decision 081

Prefer simpler implementations when they provide equivalent user value.

Avoid unnecessary complexity.

---

## Decision 082

Build for long-term maintainability rather than short-term speed.

---

## Decision 083

Every new feature must align with the core principles:

- Privacy-first
- Local-first
- User-controlled
- Modular
- Lightweight
- Reliable

If a proposed feature conflicts with these principles, it should be reconsidered or deferred to a future version.

---

## Decision 084

### Versioned Backups

**Decision**

Every exported backup file must include:

- `schemaVersion` (positive integer representing IndexedDB database migration index)
- `appVersion` (version string of the extension)
- `exportedAt` (timestamp of creation)

**Reason**

Ensures database structure integrity upon restoration. Importers can identify older backup formats to run backward-compatibility migrations or reject newer unsupported schemas cleanly, preventing data corruption.

---

## Decision 085

### Popup-Centric Gemini API Requests

**Decision**

Google Gemini API requests remain inside the Popup UI context rather than moving to the Background Service Worker.

**Reason**

AI prompts and interactions are strictly user-initiated, and the Popup UI already manages the conversation state, selected resume configuration, and chat interface. Relocating calls to the background service worker would add message-passing complexity without technical necessity.

**Note**

This architecture choice may be revisited in future versions if streaming responses, background processing, or multiple AI entry points are introduced.

---

# Final Decision Statement

These decisions establish the foundation of Lative v1.0. They define the product's identity, technical direction, architectural boundaries, and user experience. Any future changes should be evaluated against this decision log to ensure the extension remains consistent with its original goals of privacy, simplicity, user control, and long-term maintainability.