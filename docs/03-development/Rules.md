# Lative v1.0 Rules

**Version:** 1.0 (MVP)

---

# 1. Purpose

This document defines the non-negotiable rules, constraints, and implementation standards for Lative.

Every feature, component, and future enhancement must follow these rules to maintain consistency, privacy, performance, and long-term maintainability.

---

# 2. Core Product Principles

Lative must always remain:

- Privacy-first
- Local-first
- User-controlled
- Lightweight
- Fast
- Minimal
- Modular
- Maintainable
- Cross-browser compatible

Every implementation decision must align with these principles.

---

# 3. Core Boundaries

## Must Always

- Store user data locally.
- Keep users in complete control.
- Require explicit user actions.
- Maintain fast performance.
- Keep permissions minimal.
- Work without requiring an account.
- Keep modules independent.

---

## Must Never

- Automatically submit forms.
- Automatically fill forms.
- Upload user data without permission.
- Depend on cloud storage.
- Require authentication.
- Store sensitive information remotely.
- Couple modules together.

---

# 4. Local Storage Rules

All user-generated data must remain inside the extension.

Allowed:

- IndexedDB

Not Allowed:

- Cloud Database
- Firebase
- Supabase
- MongoDB Atlas
- External Storage APIs

The only exception is AI requests initiated by the user.

---

# 5. IndexedDB Rules

IndexedDB is the primary storage layer.

Every feature owns its own object store.

Modules must never directly manipulate another module's storage.

Database schema changes must be versioned through migrations.

---

# 6. Module Independence

Every module must be completely independent.

Each module owns:

- Components
- Storage
- Services
- Hooks
- Utilities
- Types

Modules communicate only through well-defined interfaces.

Cross-module dependencies should be minimized.

---

# 7. User Control Rules

Users must explicitly initiate every important action.

Examples:

Allowed:

- Upload Resume
- Delete Resume
- Analyze Current Page
- Send AI Prompt
- Save Current Website
- Export Data

Not Allowed:

- Auto Upload
- Auto Fill
- Auto Submit
- Auto Analyze
- Auto Save Without User Action

---

# 8. Privacy Rules

Everything remains local unless the user explicitly requests AI assistance.

Only then may the extension send:

- Selected resume context
- User prompt
- Optional webpage content (if requested)

Nothing else should leave the device.

Certificates must never be sent to AI.

---

# 9. Resume Rules

Only PDF files are accepted.

Every upload must pass:

- File type validation
- File size validation
- Duplicate validation
- PDF parsing validation

Invalid files must never be stored.

Resume filenames remain unchanged.

Users cannot rename resumes.

Parsed resume data remains hidden.

Users only interact with the original PDF.

---

# 10. Certificate Rules

Certificates support:

- PDF
- Images

Certificates are storage only.

Certificates must never:

- Be parsed
- Be analyzed by AI
- Influence AI responses

---

# 11. AI Rules

AI is optional.

Without a Gemini API Key:

- AI remains unavailable.

No fallback AI should exist.

---

## AI Context Rules

Conversation memory exists only during the current chat.

Changing the selected resume automatically:

- Starts a new chat
- Clears previous conversation
- Loads the new resume context

Conversation history must never persist across browser sessions.

---

## AI Data Rules

AI receives only:

- Selected resume
- Parsed resume data
- User prompt
- Optional webpage text (Analyze Current Page)

AI must never receive:

- Certificates
- Other resumes
- Entire database
- User settings
- Backup data

---

## AI Capabilities

Allowed:

- Resume summary
- Profile summary
- Compare JD
- Missing skills
- Best resume
- General resume questions
- Analyze current webpage

Not Allowed:

- Resume rewriting
- ATS scoring
- Cover letter generation
- Certificate analysis
- Automatic job applications

---

# 12. Analyze Current Page Rules

Analyze Current Page only runs when:

- User explicitly clicks the button.

Never automatically analyze webpages.

Only extract visible page text.

Do not collect hidden information.

---

# 13. Cart Rules

Cart stores:

- URL
- Page Title
- Timestamp

Duplicate URLs are not allowed.

Floating Button behavior:

Enabled:

- Show button
- Save current page instantly

Disabled:

- Remove floating button completely

No confirmation dialogs.

No popup.

Only show a success toast.

---

# 14. Backup Rules

Export includes:

- Links
- Emails
- Resumes
- Parsed Resumes
- Certificates
- Cart
- Settings

Export excludes:

- Gemini API Key

Import must validate backup integrity before restoring.

Import must check the JSON's `schemaVersion`, `appVersion`, and `exportedAt` fields:
- Direct restore if `schemaVersion` is equal to current DB version.
- Execute backward-compatibility migrations if `schemaVersion` is older.
- Terminate and reject import if `schemaVersion` is newer than current extension support.

---

# 15. Theme Rules

Supported themes:

- System
- Dark
- Light

Theme changes should apply immediately.

---

# 16. Permissions Rules

Request only permissions required for implemented features.

Avoid unnecessary permissions.

Never request permissions for future features.

---

# 17. Browser Compatibility Rules

Support:

- Chrome
- Microsoft Edge
- Brave
- Opera
- Arc
- Other Chromium browsers

Avoid browser-specific implementations whenever possible.

---

# 18. Error Handling Rules

Every operation must fail gracefully.

Never crash the extension.

Every error should display a meaningful message.

Never expose raw errors to users.

---

## Upload Errors

Possible failures:

- Invalid file
- Unsupported type
- File too large
- Duplicate
- Corrupted PDF

Each failure requires a clear explanation.

---

## AI Errors

Possible failures:

- Missing API Key
- Invalid API Key
- Network Error
- Rate Limit
- Gemini Error

Display friendly messages.

Never expose API responses directly.

---

## Storage Errors

Possible failures:

- IndexedDB unavailable
- Database migration failure
- Write failure
- Read failure

Recover whenever possible.

---

# 19. Performance Rules

Avoid unnecessary renders.

Avoid unnecessary database reads.

Reuse parsed resume data.

Never parse the same resume repeatedly.

Load only required data.

Keep popup startup fast.

---

# 20. UI Rules

Maintain consistency across every module.

Every card should follow the same interaction pattern.

Buttons should have consistent behavior.

Animations should be subtle.

Avoid unnecessary visual complexity.

---

# 21. Accessibility Rules

Support:

- Keyboard navigation
- Visible focus states
- Readable typography
- Sufficient color contrast

Interactive elements must remain accessible.

---

# 22. Code Quality Rules

Every module should follow:

- Single Responsibility Principle
- Small reusable functions
- Strong typing
- Clear naming
- No duplicated logic

Avoid large files.

Avoid deeply nested components.

---

# 23. Naming Rules

Use descriptive names.

Good:

- ResumeCard
- UploadResume
- AnalyzeCurrentPage

Avoid vague names.

Bad:

- Temp
- Data1
- TestComponent

---

# 24. Component Rules

Components should only handle UI.

Business logic belongs in services.

Database logic belongs in storage.

Utilities remain pure.

Avoid mixing responsibilities.

---

# 25. Service Rules

Services:

- Handle business logic
- Never render UI
- Never manipulate DOM directly

Services may access storage.

---

# 26. Storage Rules

Storage layer:

- Only performs CRUD operations
- Contains no UI logic
- Contains no business logic

---

# 27. Utility Rules

Utilities must:

- Be pure functions
- Have no side effects
- Be reusable

---

# 28. Future Expansion Rules

New features must be added as new modules.

Existing modules should require minimal or no modification.

Avoid feature coupling.

---

# 29. Security Rules

Never execute arbitrary user code.

Validate all uploaded files.

Validate imported backups.

Avoid exposing sensitive information.

Keep the Gemini API Key local.

---

# 30. Logging Rules

Development:

Detailed logging is allowed.

Production:

Remove unnecessary logs.

Avoid logging user data.

Never log:

- Resume content
- Certificates
- API Keys
- Parsed resume data

---

# 31. Technical Constraints

Must Use:

- React
- TypeScript
- Vite
- Manifest V3
- IndexedDB
- Dexie.js
- pdf.js

Must Not Use:

- LocalStorage for application data
- Cloud databases
- OCR libraries
- Local LLMs
- Automatic form filling libraries

---

# 32. Out of Scope Rules

The following are intentionally excluded from Version 1:

- Autofill
- Auto-submit
- Resume version history
- Cloud sync
- User accounts
- Certificate AI
- OCR
- ATS scoring
- Resume rewriting
- Cover letter generation
- Persistent AI memory
- Application tracking
- File drag from IndexedDB

No implementation should accidentally introduce these capabilities.

---

# 33. Final Development Rule

Whenever a development decision presents multiple possible implementations, always choose the option that best satisfies the following priority order:

1. User Privacy
2. Simplicity
3. Reliability
4. Performance
5. Maintainability
6. Scalability
7. Developer Convenience

No feature should compromise the product's privacy-first philosophy or introduce unnecessary complexity merely for convenience or novelty.