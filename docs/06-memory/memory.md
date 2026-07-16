# Lative Project Memory

This document serves as the long-term context store for Lative. It maintains the current state of development, architectural constraints, and strategic decisions.

---

## 1. Product Vision

Lative is a privacy-first, local-first browser extension designed to centralize and simplify the management of career assets (resumes, certificates, professional profile links, email addresses, and bookmarked career pages). It features an on-demand, resume-aware AI chat assistant powered by Google Gemini (using the user's own API key). 

**Key Principle**: Users remain in complete control of their data. The extension intentionally avoids automatic form filling and cloud databases. All user-generated content resides entirely in the user's local browser vault.

---

## 2. Architecture Summary

Lative follows a modular, feature-first architecture built on Chrome Extension Manifest V3:
- **Module Isolation**: Each capability (Links, Mail, Resume, etc.) resides in its own module directory under `src/modules/` and encapsulates its own UI components, business logic, storage actions, validators, hooks, and types.
- **Communication Flow (Hub-and-Spoke)**: The background service worker serves as the communication hub. The popup UI never interacts directly with content scripts or web page DOMs; all messages route through the background script. Content scripts never access IndexedDB directly.
- **Storage Layer**: Primary data (documents, blobs, links) is stored in IndexedDB via Dexie.js. Lightweight configurations (themes, API keys, active tabs) are stored in `chrome.storage.local`.
- **AI Execution**: AI context and requests are handled in the Popup context. Chat history is transient and exists only during the active session.

---

## 3. Technology Stack

- **Core**: React, TypeScript, Vite, Chrome Extension MV3, CRXJS (Vite plugin).
- **Styling**: Tailwind CSS, CSS Variables.
- **Storage**: IndexedDB (Dexie.js), `chrome.storage.local`.
- **Libraries**: `pdfjs-dist` (for PDF text extraction), Framer Motion (animations), Lucide React (icons).
- **AI Service**: Google Gemini API (via user-supplied API key).

---

## 4. Current Development Status

The project is developed incrementally in phases. Refer to [implementation_roadmap.md](file:///d:/workspace/lative/docs/05-planning/implementation_roadmap.md) for the complete list of tasks and [Completed.md](file:///d:/workspace/lative/docs/06-memory/Completed.md) for the detailed summaries of completed tasks.

- **Completed Phases**:
  - **Phase 0 — Project Foundation**: Toolchain, styling system, MV3 setup, shell layout.
  - **Phase 1 — Database Foundation**: Dexie.js initialization, schemas, and migrations.
  - **Phase 2 — Shared UI System**: Reusable buttons, inputs, card primitives, dialogs, empty states, and toast notifications.
  - **Phase 3 — Links Module**: Storage, validators, hooks, and UI list/forms for profile links.
  - **Phase 4 — Mail Module**: Storage, RFC validation, live hooks, and UI card listings for email addresses.
  - **Phase 5 — Resume Module**: Blob storage, PDF.js parsing, section categorization heuristics, drag-and-drop uploads, copy-filename actions, and password-lock validator checks.
- **Current Phase**: Phase 6 — Certificate Module
- **Current Task**: [P6-T1: Certificate Database Setup](file:///d:/workspace/lative/docs/05-planning/Current_Task.md) (Pending)

---

## 5. Important Architectural Decisions

For a full list of decisions, refer to [Decisions.md](file:///d:/workspace/lative/docs/06-memory/Decisions.md). Key constraints include:
- **No Cloud Backend**: No accounts, authentication, or remote databases.
- **Popup-Centric Gemini API Requests**: Outgoing AI requests are kept in the Popup context rather than background service worker contexts to reduce messaging complexity.
- **Local PDF Parsing**: Resumes are parsed exactly once during upload; the raw text and heuristic structured data are saved locally. No repeated PDF parsing.
- **Versioned Backups**: All backup exports exclude the Gemini API key and include metadata fields (`schemaVersion`, `appVersion`, `exportedAt`) for backward/forward compatibility checks.
- **PascalCase Components**: All React components are stored in PascalCase-named files (e.g. `Button.tsx`), while non-component helper files use camelCase.