# Folder_Structure.md

# Lative v1.0 Folder Structure

**Version:** 1.0 (MVP)

---

# Purpose

This document defines the official folder and file organization for the Lative project.

The structure is designed to be:

- Modular
- Scalable
- Maintainable
- Feature-first
- Easy to navigate
- Easy to extend

Every new feature should fit naturally into this structure without requiring changes to existing modules.

---

# Design Philosophy

Lative follows a **Feature-First Architecture**.

Instead of organizing files by type (components, hooks, pages), the project is organized by **business modules**.

Each feature owns everything it needs:

- UI
- Logic
- Storage
- Types
- Hooks
- Utilities

This minimizes coupling and keeps related code together.

---

# Root Structure

```text
lative/

├── public/
├── src/
├── docs/
├── .github/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── manifest.json
├── eslint.config.js
├── prettier.config.js
├── README.md
└── LICENSE
```

---

# public/

Contains static assets copied directly into the extension bundle.

```text
public/

├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
│   └── icon512.png
│
├── images/
│
├── fonts/
│
├── tutorial/
│
└── manifest.json
```

Contents

- Extension icons
- Static images
- Fonts
- Tutorial assets
- Manifest

---

# src/

Contains the complete application source code.

```text
src/

├── app/
├── background/
├── content/
├── popup/
├── sidepanel/
├── database/
├── modules/
├── shared/
├── providers/
├── styles/
├── config/
├── lib/
├── types/
└── main.ts
```

---

# app/

Global application setup.

```text
app/

├── App.tsx
├── AppLayout.tsx
├── routes.ts
├── navigation.ts
└── bootstrap.ts
```

Responsible for

- Application shell
- Navigation
- Bootstrapping
- Global layout

---

# popup/

Popup entry point.

```text
popup/

├── main.tsx
├── Popup.tsx
├── PopupLayout.tsx
└── index.html
```

Contains only popup initialization.

Business logic belongs inside modules.

---

# sidepanel/

Optional future side panel.

```text
sidepanel/

├── main.tsx
├── SidePanel.tsx
└── index.html
```

Shares module logic with popup.

---

# background/

Background Service Worker.

```text
background/

├── index.ts
├── router.ts
├── handlers/
│
├── listeners/
│
└── utils/
```

---

## handlers/

Feature-specific message handlers.

```text
handlers/

├── cart.ts
├── settings.ts
├── tabs.ts
└── page.ts
```

---

## listeners/

Chrome event listeners.

```text
listeners/

├── runtime.ts
├── tabs.ts
├── install.ts
└── messages.ts
```

---

# content/

Content script.

```text
content/

├── index.ts
├── floatingButton.ts
├── pageReader.ts
├── toast.ts
└── styles.css
```

Responsible only for webpage interaction.

---

# database/

Complete IndexedDB implementation.

```text
database/

├── db.ts
├── schema.ts
├── migrations.ts
├── indexes.ts
└── seed.ts
```

No UI code.

---

# modules/

Every business feature lives here.

```text
modules/

├── links/
├── mail/
├── resume/
├── certificate/
├── ai/
├── cart/
└── settings/
```

Every module follows the exact same structure.

---

# Standard Module Structure

```text
module/

├── components/
├── hooks/
├── services/
├── storage/
├── types/
├── utils/
├── constants/
├── validators/
├── index.ts
└── README.md
```

Every module must follow this layout.

---

# components/

Contains UI only.

Example

```text
ResumeCard.tsx

UploadButton.tsx

ResumeList.tsx
```

No business logic.

---

# hooks/

React hooks.

Example

```text
useResume.ts

useUpload.ts

useResumeSelection.ts
```

---

# services/

Business logic.

Example

```text
uploadResume.ts

replaceResume.ts

deleteResume.ts

parseResume.ts
```

Services never render UI.

---

# storage/

Database operations.

Example

```text
resumeStore.ts

resumeQueries.ts
```

Only CRUD operations.

---

# types/

Module-specific TypeScript types.

Example

```text
Resume.ts

ParsedResume.ts
```

---

# utils/

Pure helper functions.

Example

```text
duplicateCheck.ts

formatFileSize.ts

extractExtension.ts
```

---

# constants/

Feature constants.

Example

```text
MAX_RESUME_SIZE

SUPPORTED_TYPES
```

---

# validators/

Validation logic.

Example

```text
validateResume.ts

validateEmail.ts

validateLink.ts
```

---

# README.md

Brief documentation for the module.

Includes

- Purpose
- Public API
- Dependencies
- Notes

---

# Module Examples

## links/

```text
links/

components/

hooks/

services/

storage/

types/

validators/

constants/

utils/
```

---

## mail/

```text
mail/

components/

hooks/

services/

storage/

types/

validators/

constants/

utils/
```

---

## resume/

```text
resume/

components/

hooks/

services/

storage/

parser/

validators/

constants/

types/

utils/
```

Resume contains one additional folder.

---

## parser/

Contains PDF processing.

```text
parser/

pdfParser.ts

textExtractor.ts

structuredData.ts
```

---

## certificate/

```text
certificate/

components/

hooks/

services/

storage/

validators/

constants/

types/

utils/
```

---

## ai/

```text
ai/

components/

chat/

context/

prompts/

services/

hooks/

types/

constants/

utils/
```

---

## chat/

Conversation UI.

---

## prompts/

Reusable prompt templates.

---

## context/

Context builders.

---

## cart/

```text
cart/

components/

hooks/

services/

storage/

validators/

constants/

types/

utils/
```

---

## settings/

```text
settings/

components/

hooks/

services/

storage/

types/

constants/

utils/
```

---

# shared/

Reusable code shared across modules.

```text
shared/

├── components/
├── hooks/
├── icons/
├── layouts/
├── constants/
├── helpers/
├── utils/
├── types/
└── assets/
```

Only generic functionality belongs here.

Never place feature-specific code.

---

# shared/components/

Reusable UI.

Examples

```text
Button

Input

Modal

Card

Toast

Dialog

Dropdown

Tabs

Loader

Skeleton
```

---

# shared/hooks/

Reusable hooks.

Examples

```text
useClipboard

useTheme

useToast

useDebounce
```

---

# shared/utils/

General helpers.

Examples

```text
formatDate

generateId

downloadBlob

copyToClipboard
```

---

# providers/

Application providers.

```text
providers/

AppProvider.tsx

ThemeProvider.tsx

SettingsProvider.tsx

ToastProvider.tsx
```

---

# styles/

Global styling.

```text
styles/

globals.css

variables.css

animations.css
```

---

# config/

Application configuration.

```text
config/

theme.ts

permissions.ts

constants.ts

environment.ts
```

---

# lib/

Third-party wrappers.

```text
lib/

dexie.ts

gemini.ts

pdf.ts

chrome.ts
```

Only wrapper functions.

No business logic.

---

# types/

Global types.

```text
types/

global.ts

database.ts

messages.ts
```

---

# docs/

Project documentation.

```text
docs/

PRD.md

Architecture.md

Rules.md

Storage.md

Messaging.md

Folder_Structure.md

Features.md

Coding_Standards.md

Decisions.md

Testing_Checklist.md

Edge_Cases.md

Design.md

Phases.md
```

---

# .github/

Repository automation.

```text
.github/

ISSUE_TEMPLATE/

PULL_REQUEST_TEMPLATE.md

workflows/
```

---

# Naming Conventions

## Files and React Components

Files are named based on their role and contents to maintain strict consistency across the codebase:

### React Components (PascalCase)
All React component files use **PascalCase** matching the component name.
- **Good Examples**: `ResumeCard.tsx`, `Button.tsx`, `ConfirmDialog.tsx`, `LinksList.tsx`
- **Avoid**: `resumeCard.tsx`, `resume-card.tsx`, `Resume_card.tsx`

### Hooks (useCamelCase.ts)
Custom React hook files use **camelCase** and must always start with the `use` prefix.
- **Good Examples**: `useResume.ts`, `useTheme.ts`, `useToast.ts`, `useMails.ts`
- **Avoid**: `ResumeHook.ts`, `use-resume.ts`

### Services, Validators, and Utilities (camelCase)
Helper scripts, business logic files, input validations, and pure utility functions use **camelCase**.
- **Good Examples**: `resumeService.ts`, `validateResume.ts`, `textExtractor.ts`, `formatDate.ts`
- **Avoid**: `ResumeService.ts`, `validate_resume.ts`

### Configuration Files
Root and directory configurations follow existing standards:
- **Good Examples**: `tailwind.config.ts`, `postcss.config.js`, `tsconfig.json`, `eslint.config.js`, `vite.config.ts`, `manifest.json`

---

## Constants

Constants are written in **UPPER_SNAKE_CASE**.
- **Good Examples**: `MAX_FILE_SIZE`, `SUPPORTED_FILE_TYPES`, `MAX_RESUME_SIZE`

---

# Import Rules

Use absolute imports.

Example

```ts
import Button from "@/shared/components/Button";
```

Avoid long relative paths.

```ts
../../../Button
```

---

# Ownership Rules

Every folder has a single responsibility.

| Folder | Responsibility |
|----------|----------------|
| modules | Business features |
| shared | Generic reusable code |
| database | IndexedDB |
| background | Browser communication |
| content | Webpage interaction |
| popup | Extension popup entry |
| sidepanel | Optional side panel |
| providers | Global providers |
| styles | Global styles |
| config | Configuration |
| lib | Third-party wrappers |
| docs | Documentation |

---

# Folder Rules

Every new feature must:

- Live inside `modules/`
- Be self-contained
- Follow the standard module structure
- Avoid modifying unrelated modules

No feature should introduce new top-level folders unless absolutely necessary.

---

# Final Folder Structure Principle

Lative is organized around **features, not file types**. Every module is self-contained, responsible for its own UI, business logic, storage, validation, and utilities. Shared code remains generic, browser-specific logic is isolated, and the overall structure is designed so that future modules can be added with minimal impact on the existing codebase.