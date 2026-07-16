# Lative v1.0 Development Phases

**Version:** 1.0 (MVP)

---

# Development Philosophy

Lative should be developed incrementally.

Each phase must produce a fully working and testable version before moving to the next phase.

**Rules**

- Never skip phases.
- Never build multiple major modules simultaneously.
- Complete, test, and stabilize one phase before starting the next.
- Refactor only when necessary.
- Keep every phase deployable.

---

# Phase 0 — Project Foundation

## Goal

Create the project foundation and development environment.

## Objectives

- Initialize project
- Configure React
- Configure TypeScript
- Configure Vite
- Configure Tailwind CSS
- Configure Manifest V3
- Configure CRXJS
- Configure ESLint
- Configure Prettier
- Create folder structure
- Configure path aliases
- Configure environment variables
- Create global providers
- Create shared components
- Configure theme system
- Configure routing/navigation
- Configure icon library
- Configure animation library

## Deliverables

- Working extension
- Popup opens
- Empty navigation
- Build system working
- Hot reload working

---

# Phase 1 — Database Foundation

## Goal

Build the complete local storage system.

## Objectives

- Configure Dexie
- Create IndexedDB
- Create object stores
- Create migrations
- Create storage services
- Create reusable CRUD utilities
- Test persistence
- Test database upgrades

## Deliverables

- Stable database
- All object stores created
- CRUD operations tested

---

# Phase 2 — Shared UI System

## Goal

Build reusable UI components.

## Objectives

Create reusable:

- Buttons
- Inputs
- Cards
- Dialogs
- Toasts
- Dropdowns
- Tabs
- Modals
- File Cards
- Loading States
- Empty States
- Error Components
- Confirmation Dialogs

## Deliverables

Reusable UI library used across every module.

---

# Phase 3 — Links Module

## Goal

Complete Links feature.

## Features

- Add Link
- Edit Link
- Copy Link
- Delete Link

## Deliverables

Fully functional Links module.

---

# Phase 4 — Mail Module

## Goal

Complete Mail feature.

## Features

- Add Email
- Edit Email
- Copy Email
- Delete Email

## Deliverables

Fully functional Mail module.

---

# Phase 5 — Resume Module

## Goal

Complete Resume management.

## Features

- Upload PDF
- Validate file
- Duplicate detection
- File size validation
- Store PDF
- Replace Resume
- Delete Resume
- Open Resume
- Copy Filename

## PDF Processing

- Parse PDF
- Extract text
- Generate structured data
- Store parsed resume

## Deliverables

Complete Resume module.

---

# Phase 6 — Certificate Module

## Goal

Complete Certificate management.

## Features

- Upload
- Replace
- Delete
- Open
- Copy Filename

Supported:

- PDF
- Images

No parsing.

## Deliverables

Complete Certificate module.

---

# Phase 7 — Cart Module

## Goal

Complete Cart feature.

## Features

Manual

- Add URL
- Edit URL
- Delete URL
- Copy URL
- Open URL

Floating Button

- Toggle
- Inject button
- Capture current page
- Save URL
- Duplicate detection
- Toast notification

## Deliverables

Complete Cart system.

---

# Phase 8 — Settings Module

## Goal

Build application settings.

## Features

- Gemini API Key
- Theme
- Floating Button Toggle
- Export
- Import
- Clear Data
- Privacy
- Tutorial
- Feedback
- Report Issue
- About

## Deliverables

Fully functional Settings.

---

# Phase 9 — AI Foundation

## Goal

Build AI infrastructure.

## Features

- Gemini integration
- API validation
- Resume selector
- Prompt builder
- Session chat
- New Chat
- Error handling

## Deliverables

Working AI chat.

---

# Phase 10 — Resume Intelligence

## Goal

Complete AI resume features.

## Features

- Profile Summary
- Resume Summary
- Compare JD
- Missing Skills
- Best Resume
- General Resume Questions

## Deliverables

Resume-aware AI.

---

# Phase 11 — Analyze Current Page

## Goal

Allow AI to understand webpages.

## Features

- Content Script
- Page extraction
- Analyze Current Page
- Send webpage context to AI

## Deliverables

Working webpage analysis.

---

# Phase 12 — Backup & Restore

## Goal

Data portability.

## Features

Export

- Database
- Files
- Settings

Import

- Validation
- Restore

## Deliverables

Complete backup system.

---

# Phase 13 — Theme & UX Polish

## Goal

Improve overall user experience.

## Features

- Theme switching
- Animations
- Better spacing
- Responsive layout
- Accessibility improvements
- Keyboard navigation
- Better empty states
- Better loading states

## Deliverables

Premium user experience.

---

# Phase 14 — Error Handling

## Goal

Improve reliability.

## Objectives

Handle every failure.

Examples

- Invalid PDF
- Invalid Image
- Duplicate Upload
- Storage Failure
- API Failure
- Missing API Key
- Network Error
- Import Failure
- Export Failure

## Deliverables

Reliable extension.

---

# Phase 15 — Performance Optimization

## Goal

Optimize performance.

## Objectives

- Lazy loading
- Code splitting
- Bundle optimization
- Reduce renders
- Cache parsed resumes
- Database optimization
- Memory optimization

## Deliverables

Fast extension.

---

# Phase 16 — Cross Browser Testing

## Goal

Verify browser compatibility.

## Browsers

- Chrome
- Edge
- Brave
- Opera
- Arc

## Objectives

- Popup testing
- Storage testing
- Content Script testing
- Floating Button testing
- AI testing

## Deliverables

Cross-browser compatibility.

---

# Phase 17 — Production Readiness

## Goal

Prepare for public release.

## Objectives

- Remove debug logs
- Final cleanup
- Versioning
- Manifest review
- Permission review
- Security review
- Performance review
- Final testing

## Deliverables

Production-ready extension.

---

# Phase Completion Checklist

Every phase must satisfy the following before progressing:

- Feature complete
- No critical bugs
- UI complete
- Responsive
- Type-safe
- Lint passes
- Build succeeds
- Manual testing complete
- Data persistence verified
- Documentation updated

No phase should begin until the previous phase satisfies all checklist items.

---

# MVP Completion

The MVP is considered complete after:

- All planned modules are implemented.
- AI functions correctly with user-provided Gemini API.
- All data persists locally.
- Backup and restore work.
- Floating Cart button works.
- Cross-browser compatibility is verified.
- The extension is stable enough for Chrome Web Store submission.

Only after the MVP is released should new features or Version 2 planning begin.