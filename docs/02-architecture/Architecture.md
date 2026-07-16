# Lative v1.0 Architecture

**Version:** 1.0 (MVP)

---

# 1. Architecture Overview

Lative follows a **modular, feature-based architecture** built on **Chrome Extension Manifest V3**.

The extension is designed around complete module isolation, allowing each feature to manage its own components, storage logic, business logic, and utilities without depending on other modules.

The architecture emphasizes:

- Scalability
- Maintainability
- Performance
- Local-first storage
- Minimal permissions
- Clear separation of responsibilities

---

# 2. High-Level Extension Architecture

```text
                 User
                   │
                   ▼
          Chrome Extension
                   │
      ┌────────────┼────────────┐
      │            │            │
      ▼            ▼            ▼
   Popup UI    Side Panel    Content Script
      │                           │
      │                           ▼
      │                  Current Webpage
      │
      ▼
 Application State
      │
      ▼
 Feature Modules
      │
      ▼
 IndexedDB (Dexie)
      │
      ▼
 AI Engine
      │
      ▼
 Gemini API
```

---

# 3. Extension Flow

## Popup Flow

```text
User

↓

Popup Opens

↓

Load Settings

↓

Load Module Data

↓

Render Selected Module

↓

User Action

↓

Module Logic

↓

IndexedDB Update

↓

UI Refresh
```

---

## Resume Upload Flow

```text
Upload PDF

↓

Validate

↓

File Size Check

↓

Duplicate Check

↓

Parse PDF (pdf.js)

↓

Extract Text

↓

Generate Structured Data

↓

Store Original PDF

↓

Store Parsed Resume

↓

Refresh Resume UI
```

---

## Resume Replace Flow

```text
Select Resume

↓

Replace

↓

Upload New PDF

↓

Validation

↓

Parse

↓

Overwrite Existing Record

↓

Refresh UI
```

---

## Certificate Upload Flow

```text
Upload

↓

Validate

↓

Store File

↓

Refresh UI
```

---

## AI Flow

```text
Select Resume

↓

Load Parsed Resume

↓

Enter Prompt

↓

(Optional)
Analyze Current Page

↓

Build AI Context

↓

Send Request

↓

Gemini API

↓

Receive Response

↓

Display Response
```

---

## AI Resume Switch Flow

```text
Select Different Resume

↓

Automatically Start New Chat

↓

Clear Conversation

↓

Load New Resume Context

↓

Ready
```

---

## Cart Manual Flow

```text
Paste URL

↓

Add

↓

Save

↓

Refresh Cart
```

---

## Floating Button Flow

```text
Toggle Enabled

↓

Background Script

↓

Inject Floating Button

↓

User Clicks Button

↓

Read

window.location.href

+

document.title

↓

Send Message

↓

Save To Cart

↓

Show Toast

↓

Refresh Cart
```

---

## Analyze Current Page Flow

```text
User Clicks

Analyze Current Page

↓

Content Script

↓

document.body.innerText

↓

Send Text

↓

Gemini API

↓

Response
```

---

## Backup Flow

```text
Export

↓

Read IndexedDB

↓

Generate Backup File

↓

Download
```

---

## Restore Flow

```text
Import Backup

↓

Validate

↓

Restore IndexedDB

↓

Refresh All Modules
```

---

# 4. Tech Stack

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS

---

## Extension

- Chrome Extension Manifest V3
- CRXJS Vite Plugin

---

## Storage

- IndexedDB
- Dexie.js

---

## PDF Processing

- pdf.js

---

## Animation

- Framer Motion

---

## Icons

- Lucide React

---

## AI

- Google Gemini API
- User-provided API Key

---

## Styling

- Tailwind CSS
- CSS Variables
- Responsive Layout

---

# 5. Folder Structure

```text
lative/

│
├── public/
│   ├── icons/
│   ├── images/
│   └── manifest.json
│
├── src/
│
│   ├── background/
│   │   ├── index.ts
│   │   ├── messageHandler.ts
│   │   └── cartHandler.ts
│   │
│   ├── content/
│   │   ├── index.ts
│   │   ├── floatingButton.ts
│   │   ├── pageAnalyzer.ts
│   │   └── styles.css
│   │
│   ├── popup/
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── routes.ts
│   │   └── PopupLayout.tsx
│   │
│   ├── sidepanel/
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── modules/
│   │
│   │   ├── links/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── storage/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   ├── mail/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── storage/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   ├── resume/
│   │   │   ├── components/
│   │   │   ├── parser/
│   │   │   ├── services/
│   │   │   ├── storage/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   ├── certificate/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── storage/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   ├── ai/
│   │   │   ├── chat/
│   │   │   ├── prompts/
│   │   │   ├── services/
│   │   │   ├── context/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   ├── cart/
│   │   │   ├── components/
│   │   │   ├── services/
│   │   │   ├── storage/
│   │   │   ├── hooks/
│   │   │   ├── types/
│   │   │   ├── utils/
│   │   │   └── index.ts
│   │   │
│   │   └── settings/
│   │       ├── components/
│   │       ├── services/
│   │       ├── storage/
│   │       ├── hooks/
│   │       ├── types/
│   │       ├── utils/
│   │       └── index.ts
│   │
│   ├── database/
│   │   ├── db.ts
│   │   ├── schema.ts
│   │   ├── migrations.ts
│   │   └── indexes.ts
│   │
│   ├── shared/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── constants/
│   │   ├── helpers/
│   │   ├── utils/
│   │   ├── types/
│   │   └── assets/
│   │
│   ├── providers/
│   │   ├── ThemeProvider.tsx
│   │   ├── SettingsProvider.tsx
│   │   └── AppProvider.tsx
│   │
│   ├── styles/
│   │   ├── globals.css
│   │   └── variables.css
│   │
│   └── types/
│       └── global.ts
│
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

# 6. Module Architecture

Every feature follows exactly the same structure.

```text
module/

components/

hooks/

services/

storage/

types/

utils/

index.ts
```

---

## Components

Contains UI components specific to the module.

Example

```text
ResumeCard

UploadButton

ResumeList
```

---

## Hooks

Contains React hooks.

Example

```text
useResume()

useResumeParser()
```

---

## Services

Contains business logic.

Example

```text
Upload Resume

Delete Resume

Replace Resume

Export Resume
```

---

## Storage

Contains all IndexedDB interactions.

No UI code.

No business logic.

---

## Types

Contains TypeScript interfaces and models.

---

## Utils

Pure helper functions.

Example

```text
File validation

Duplicate detection

Filename helpers
```

---

# 7. Database Architecture

```text
IndexedDB

LativeDB

├── resumes
├── parsedResumes
├── certificates
├── links
├── mails
├── cart
└── settings
```

Each module only accesses its own object store.

No module directly modifies another module's data.

---

# 8. Communication Architecture

```text
Popup

↓

Background

↓

Content Script

↓

Background

↓

Popup
```

Popup never communicates directly with Content Scripts.

All communication passes through the Background Service Worker.

---

# 9. AI Architecture

```text
User Prompt

↓

Selected Resume

↓

Parsed Resume

↓

(Optional)

Current Page Text

↓

Prompt Builder

↓

Gemini API

↓

Response
```

Conversation exists only during the current chat session.

Changing the selected resume automatically starts a new conversation.

No AI conversation history is persisted.

---

# 10. State Management

State is divided into:

## Local Component State

Used for:

- Forms
- Inputs
- Dialogs
- Temporary UI

---

## Module State

Managed within each feature.

Examples:

- Resume list
- Cart list
- Email list

---

## Persistent State

Stored in IndexedDB.

Examples:

- User data
- Settings
- Parsed resumes
- Certificates

---

# 11. Theme Architecture

```text
Settings

↓

Theme Provider

↓

CSS Variables

↓

Tailwind Classes

↓

UI
```

Supports:

- System
- Light
- Dark

---

# 12. Backup Architecture

```text
IndexedDB

↓

Read All Stores

↓

Serialize

↓

Backup File

↓

Download
```

Restore performs the reverse operation.

---

# 13. Security Architecture

- No authentication.
- No cloud database.
- All user data stored locally.
- Gemini API key stored locally.
- AI requests sent only when initiated by the user.
- Only the selected resume context and explicitly requested page content are sent to Gemini.

## Content Security Policy (CSP) for Gemini API

To perform AI requests directly from the extension contexts (such as the popup UI or background worker), the Manifest V3 Content Security Policy (CSP) must explicitly permit network communication with Google's Generative Language endpoints:

- **CSP Directive:** `connect-src 'self' https://generativelanguage.googleapis.com`
- **Context:** Required for the Google Generative AI SDK connection. Under Manifest V3, arbitrary external script execution is blocked, but outgoing fetch requests are permitted provided the target URL domain is whitelisted in the manifest's `content_security_policy` directives.

---

# 14. Scalability

The architecture is designed to support future modules without restructuring the project.

Future modules can be added by creating a new folder under:

```text
src/modules/
```

Each module remains self-contained and independent.

Potential future modules:

- Portfolio
- Notes
- Templates
- Application Tracker
- Interview Preparation
- Custom AI Prompts

No existing module should require modification when introducing a new feature module.

---

# 15. Architectural Principles

- Feature-first organization
- Modular design
- Single responsibility per module
- Local-first storage
- Separation of UI and business logic
- Typed codebase with TypeScript
- Reusable shared components
- Minimal browser permissions
- Cross-browser compatibility
- Maintainable and scalable structure