# Lative v1.0 Implementation Roadmap

This document defines the chronological execution plan for building **Lative v1.0**. The roadmap is broken down into small, isolated implementation tasks (15–45 minutes each) ordered strictly from Phase 0 to Phase 17.

---

## Phase 0 — Project Foundation

Goal: Initialize the codebase, configure toolchains, and build the navigation shell.

### [x] P0-T1: Project Initialization
* **Objective**: Create folder structure and initialize `package.json` with primary scripts.
* **Files**: 
  - `[NEW] package.json`
  - `[NEW] README.md`
  - `[NEW] .gitignore`
* **Dependencies**: None
* **Definition of Done**: Folder structure matches `Folder_Structure.md` exactly, and `npm install` runs successfully.

### [x] P0-T2: TypeScript & Path Aliases Configuration
* **Objective**: Configure TypeScript compiler rules and absolute path mapping (`@/*`).
* **Files**: 
  - `[NEW] tsconfig.json`
  - `[NEW] vite.config.ts`
* **Dependencies**: P0-T1
* **Definition of Done**: `tsc --noEmit` runs successfully; compiler resolves `@/` to `src/`.

### [x] P0-T3: Tailwind CSS Setup & Theme Variables
* **Objective**: Install Tailwind CSS, set up configs, and declare CSS variable design tokens for Light/Dark modes.
* **Files**: 
  - `[NEW] tailwind.config.ts`
  - `[NEW] postcss.config.js`
  - `[NEW] src/styles/globals.css`
  - `[NEW] src/styles/variables.css`
* **Dependencies**: P0-T2
* **Definition of Done**: Custom theme variables are defined; Tailwind compilation succeeds.

### [x] P0-T4: Manifest V3 & CRXJS Configuration
* **Objective**: Define extension manifest, background service worker inputs, and popup configuration using CRXJS.
* **Files**: 
  - `[NEW] public/manifest.json`
  - `[MODIFY] vite.config.ts`
* **Dependencies**: P0-T3
* **Definition of Done**: `npm run dev` builds extension to `dist/` directory; manifest format matches Chromium MV3 rules.

### [x] P0-T5: ESLint & Prettier Setup
* **Objective**: Configure code linting rules, styling standards, and Prettier configurations.
* **Files**: 
  - `[NEW] eslint.config.js`
  - `[NEW] prettier.config.js`
* **Dependencies**: P0-T1
* **Definition of Done**: `npm run lint` successfully scans codebase without warnings.

### [x] P0-T6: ThemeProvider Configuration
* **Objective**: Create context provider to manage light, dark, and system themes using tailwind CSS utility class names.
* **Files**: 
  - `[NEW] src/providers/ThemeProvider.tsx`
  - `[NEW] src/shared/hooks/useTheme.ts`
* **Dependencies**: P0-T3
* **Definition of Done**: System theme is detected; manually selecting theme updates local state and body element class lists.

### [x] P0-T7: Popup Navigation Framework & Layout
* **Objective**: Create `PopupLayout` and build the horizontal top-segmented navigation switcher.
* **Files**: 
  - `[NEW] src/popup/index.html`
  - `[NEW] src/popup/main.tsx`
  - `[NEW] src/app/App.tsx`
  - `[NEW] src/app/AppLayout.tsx`
  - `[NEW] src/app/routes.ts`
* **Dependencies**: P0-T4, P0-T6
* **Definition of Done**: Extension compiles; opening popup displays horizontal navigation bar enabling segment switches.

---

## Phase 1 — Database Foundation

Goal: Set up Dexie.js storage framework and define entity store schema versioning.

### [x] P1-T1: Dexie.js Integration
* **Objective**: Initialize local DB instance `LativeDB` using Dexie library wrapper.
* **Files**: 
  - `[NEW] src/lib/dexie.ts`
  - `[NEW] src/database/db.ts`
* **Dependencies**: P0-T2
* **Definition of Done**: Dexie instance successfully initializes without runtime exceptions.

### [x] P1-T2: Storage Schema Definition & TS Models
* **Objective**: Declare schemas for target IndexedDB stores and export strict TS types.
* **Files**: 
  - `[NEW] src/database/schema.ts`
  - `[NEW] src/types/database.ts`
* **Dependencies**: P1-T1
* **Definition of Done**: TypeScript successfully compiles schemas for stores: `resumes`, `parsedResumes`, `certificates`, `links`, `mails`, `cart`, `settings`.

### [x] P1-T3: Schema Versioning & Migrations Setup
* **Objective**: Implement database migration system for version upgrades.
* **Files**: 
  - `[NEW] src/database/migrations.ts`
* **Dependencies**: P1-T2
* **Definition of Done**: DB instantiates schema version 1 correctly; placeholder upgrades compile without typescript errors.

---

## Phase 2 — Shared UI System

Goal: Develop reusable visual design tokens and atoms matching the design system.

### [x] P2-T1: Atoms: Button & Input
* **Objective**: Create customizable Button and TextInput components with proper focus, states, and sizes.
* **Files**: 
  - `[NEW] src/shared/components/Button.tsx`
  - `[NEW] src/shared/components/Input.tsx`
* **Dependencies**: P0-T3
* **Definition of Done**: Components render correctly, support system themes, and provide clear visible keyboard focus markers.

### [x] P2-T2: Cards: Card & FileCard
* **Objective**: Build primary card layouts and document layout templates (with copy/delete/open button spaces).
* **Files**: 
  - `[NEW] src/shared/components/Card.tsx`
  - `[NEW] src/shared/components/FileCard.tsx`
* **Dependencies**: P0-T3, P2-T1
* **Definition of Done**: Card structures adapt to responsive width requirements and scale correctly under Light/Dark rules.

### [x] P2-T3: Dialog: Modal & ModalDialog
* **Objective**: Implement modal layouts, alert layers, and overlay backdrops.
* **Files**: 
  - `[NEW] src/shared/components/Modal.tsx`
  - `[NEW] src/shared/components/ConfirmDialog.tsx`
* **Dependencies**: P2-T1
* **Definition of Done**: Dialog pops up above screen center, restricts tab key movement within overlay window, and closes on Escape key press.

### [x] P2-T4: Notification: Toast & ToastProvider
* **Objective**: Build toast banner alerts with auto-close timers for copy/save confirmations.
* **Files**: 
  - `[NEW] src/providers/ToastProvider.tsx`
  - `[NEW] src/shared/hooks/useToast.ts`
  - `[NEW] src/shared/components/Toast.tsx`
* **Dependencies**: P0-T7
* **Definition of Done**: Toast appears smoothly, stacks correctly, and auto-dismisses after 2000 milliseconds.

### [x] P2-T5: Skeletons & Empty States
* **Objective**: Design structural placeholder layouts and empty states.
* **Files**: 
  - `[NEW] src/shared/components/Skeleton.tsx`
  - `[NEW] src/shared/components/EmptyState.tsx`
* **Dependencies**: P0-T3
* **Definition of Done**: Placeholders contain shimmer animations, and EmptyState provides clear descriptions and actions.

---

## Phase 3 — Links Module

Goal: Build Link management capabilities.

### [x] P3-T1: Link Storage Actions
* **Objective**: Create links store CRUD queries.
* **Files**: 
  - `[NEW] src/modules/links/storage/linkStore.ts`
  - `[NEW] src/modules/links/types/index.ts`
* **Dependencies**: P1-T2
* **Definition of Done**: CRUD functions (get all, add, update, delete) pass strict type checks.

### [x] P3-T2: Link Input Validation
* **Objective**: Create validators for links input text fields.
* **Files**: 
  - `[NEW] src/modules/links/validators/validateLink.ts`
* **Dependencies**: P3-T1
* **Definition of Done**: Validator accurately validates protocol schemes, rejects spaces or empty inputs, and blocks duplicate URLs.

### [x] P3-T3: Link Services Hook
* **Objective**: Build hooks for component operations (add/edit/delete/query links).
* **Files**: 
  - `[NEW] src/modules/links/hooks/useLinks.ts`
  - `[NEW] src/modules/links/services/linkService.ts`
* **Dependencies**: P3-T2
* **Definition of Done**: Hook accurately manages local reactive state synchronized with IndexedDB.

### [x] P3-T4: Links UI Grid View
* **Objective**: Create Links view grid displaying stored links as card layouts.
* **Files**: 
  - `[NEW] src/modules/links/components/LinksList.tsx`
  - `[NEW] src/modules/links/components/LinkCard.tsx`
  - `[NEW] src/modules/links/index.ts`
* **Dependencies**: P2-T2, P2-T5, P3-T3
* **Definition of Done**: Layout handles empty views cleanly, displaying stored links in neat cards with direct action keys.

### [x] P3-T5: Link Entry Operations Form
* **Objective**: Create Add/Edit modal forms and wire up copy/delete operations.
* **Files**: 
  - `[NEW] src/modules/links/components/LinkFormModal.tsx`
* **Dependencies**: P2-T3, P2-T4, P3-T4
* **Definition of Done**: Form manages inputs correctly; clicking copy triggers toast confirmation, and delete requests confirm destructive actions before processing.

---

## Phase 4 — Mail Module

Goal: Build email address records manager.

### [x] P4-T1: Mail Database Actions
* **Objective**: Implement mails database CRUD services.
* **Files**: 
  - `[NEW] src/modules/mail/storage/mailStore.ts`
  - `[NEW] src/modules/mail/types/index.ts`
* **Dependencies**: P1-T2
* **Definition of Done**: Mail CRUD API compiles cleanly with typescript type guards.

### [x] P4-T2: Email Format Validation
* **Objective**: Create email address syntax validators.
* **Files**: 
  - `[NEW] src/modules/mail/validators/validateMail.ts`
* **Dependencies**: P4-T1
* **Definition of Done**: Validator trims spaces, accepts RFC-compliant formats, and prevents duplicate entries.

### [x] P4-T3: Email Query & State Hook
* **Objective**: Build hooks to manage mail record processes.
* **Files**: 
  - `[NEW] src/modules/mail/hooks/useMails.ts`
  - `[NEW] src/modules/mail/services/mailService.ts`
* **Dependencies**: P4-T2
* **Definition of Done**: Hook accurately coordinates state updates and database commits.

### [x] P4-T4: Mail UI View Layout
* **Objective**: Create UI grids to display email cards.
* **Files**: 
  - `[NEW] src/modules/mail/components/MailsList.tsx`
  - `[NEW] src/modules/mail/components/MailCard.tsx`
  - `[NEW] src/modules/mail/index.ts`
* **Dependencies**: P2-T2, P2-T5, P4-T3
* **Definition of Done**: Emails are rendered sequentially; empty arrays display placeholder layouts correctly.

### [x] P4-T5: Email Input Form Modals
* **Objective**: Integrate Add/Edit forms and wire up copy/delete hooks.
* **Files**: 
  - `[NEW] src/modules/mail/components/MailFormModal.tsx`
* **Dependencies**: P2-T3, P2-T4, P4-T4
* **Definition of Done**: Creating, copying, or deleting emails updates layout components dynamically.

---

## Phase 5 — Resume Module

Goal: Implement PDF validation, IndexedDB storage, and structural content parsing.

### [x] P5-T1: Resume Database Storage Setup
* **Objective**: Set up CRUD storage configurations for `resumes` and `parsedResumes` collections.
* **Files**: 
  - `[NEW] src/modules/resume/storage/resumeStore.ts`
  - `[NEW] src/modules/resume/types/index.ts`
* **Dependencies**: P1-T2
* **Definition of Done**: Storage services write original file Blobs and retrieve parsed resume structures.

### [x] P5-T2: PDF Library Integration
* **Objective**: Integrate `pdf.js` framework and load dependency worker threads.
* **Files**: 
  - `[NEW] src/lib/pdf.ts`
  - `[NEW] src/modules/resume/constants/index.ts`
* **Dependencies**: P0-T2
* **Definition of Done**: Library compiles cleanly; worker loads correctly without CORS or path resolution failures.

### [x] P5-T3: PDF Validation Service
* **Objective**: Validate upload assets (max file size 10MB, PDF type checks).
* **Files**: 
  - `[NEW] src/modules/resume/validators/validateResume.ts`
* **Dependencies**: P5-T2
* **Definition of Done**: Helper successfully validates files, detects duplicates, and checks headers for valid PDF syntax.

### [x] P5-T4: PDF Raw Text Extractor
* **Objective**: Parse input PDF files page-by-page to compile complete raw text strings.
* **Files**: 
  - `[NEW] src/modules/resume/parser/textExtractor.ts`
* **Dependencies**: P5-T2
* **Definition of Done**: Text parser handles password-protected files safely (rejects with clear errors) and handles files with empty characters correctly.

### [x] P5-T5: Structured Resume Data Generator
* **Objective**: Build local text parser to split resume strings into categories (Skills, Projects, Education, Experience, Achievements).
* **Files**: 
  - `[NEW] src/modules/resume/parser/structuredData.ts`
* **Dependencies**: P5-T4
* **Definition of Done**: Extraction returns complete structural objects from raw text.

### [x] P5-T6: Resume Upload Controls
* **Objective**: Create drag-and-drop file upload target interface.
* **Files**: 
  - `[NEW] src/modules/resume/components/UploadButton.tsx`
  - `[NEW] src/modules/resume/hooks/useUpload.ts`
* **Dependencies**: P2-T1, P5-T3
* **Definition of Done**: Interface captures drop events and processes valid local file inputs.

### [x] P5-T7: Resume Processing Coordinator
* **Objective**: Create service linking upload inputs, PDF parsing, schema extraction, and IndexedDB commits.
* **Files**: 
  - `[NEW] src/modules/resume/services/resumeService.ts`
  - `[NEW] src/modules/resume/hooks/useResume.ts`
* **Dependencies**: P5-T1, P5-T5, P5-T6
* **Definition of Done**: Processing uploads file, parses it exactly once, stores PDF and structural fields, and updates UI state.

### [x] P5-T8: Resume Gallery UI View
* **Objective**: Build resumes grid lists and list cards displaying filenames.
* **Files**: 
  - `[NEW] src/modules/resume/components/ResumeList.tsx`
  - `[NEW] src/modules/resume/components/ResumeCard.tsx`
  - `[NEW] src/modules/resume/index.ts`
* **Dependencies**: P2-T2, P2-T5, P5-T7
* **Definition of Done**: Display lists stored resume cards; filenames are truncated if they exceed layout boundaries.

### [x] P5-T9: Open, Replace, & Delete Handlers
* **Objective**: Create file actions (open Blob object URLs, replace inputs, delete schemas).
* **Files**: 
  - `[MODIFY] src/modules/resume/components/ResumeCard.tsx`
* **Dependencies**: P2-T3, P2-T4, P5-T8
* **Definition of Done**: Clicking delete removes documents from IndexedDB; opening displays PDF layout, and replacing updates stored data and structures.

### [x] P5-F1: Copy Filename Action
* **Objective**: Implement a copy filename button on the Resume Card.
* **Files**: 
  - `[MODIFY] src/modules/resume/components/ResumeCard.tsx`
* **Dependencies**: P5-T9
* **Definition of Done**: Action copies original filename to user clipboard and displays toast confirmation.

### [x] P5-F2: PDF Readability & Password Checks in Validator
* **Objective**: Move PDF.js dry-run loading validation logic to validateResumeFile.
* **Files**: 
  - `[MODIFY] src/modules/resume/validators/validateResume.ts`
  - `[MODIFY] src/modules/resume/parser/textExtractor.ts`
  - `[MODIFY] src/modules/resume/services/resumeService.ts`
* **Dependencies**: P5-F1
* **Definition of Done**: Unreadable, empty, and password-protected files are rejected at validation time; textExtractor focuses solely on text extraction.

---

## Phase 6 — Certificate Module

Goal: Implement certificate file storage (PNG, JPG, PDF) with no parsing logic.

### [x] P6-T1: Certificate Database Setup
* **Objective**: Implement storage CRUD methods for certificates collections.
* **Files**: 
  - `[NEW] src/modules/certificate/storage/certificateStore.ts`
  - `[NEW] src/modules/certificate/types/index.ts`
* **Dependencies**: P1-T2
* **Definition of Done**: Storage engine reads and writes original binary files.

### [x] P6-T2: Certificate Validation Logic
* **Objective**: Build file type (PNG, JPG, JPEG, WEBP, PDF) and size validators (max 15MB).
* **Files**: 
  - `[NEW] src/modules/certificate/validators/validateCertificate.ts`
  - `[NEW] src/modules/certificate/constants/index.ts`
* **Dependencies**: P6-T1
* **Definition of Done**: Validator accurately blocks unapproved types and rejects files exceeding 15MB.

### [x] P6-T3: Certificate Storage Services
* **Objective**: Create hook systems coordinating uploads and queries.
* **Files**: 
  - `[NEW] src/modules/certificate/services/certificateService.ts`
  - `[NEW] src/modules/certificate/hooks/useCertificate.ts`
* **Dependencies**: P6-T2
* **Definition of Done**: Hook coordinates state updates and database writes.

### [x] P6-T4: Certificate UI List Views
* **Objective**: Render cards grid display for stored certificates.
* **Files**: 
  - `[NEW] src/modules/certificate/components/CertificateList.tsx`
  - `[NEW] src/modules/certificate/components/CertificateCard.tsx`
  - `[NEW] src/modules/certificate/index.ts`
* **Dependencies**: P2-T2, P2-T5, P6-T3
* **Definition of Done**: Lists display items; empty arrays show placeholder layouts correctly.

### [x] P6-T5: Certificate Operations Trigger
* **Objective**: Implement upload triggers, open files, replace configurations, and clear items.
* **Files**: 
  - `[MODIFY] src/modules/certificate/components/CertificateCard.tsx`
* **Dependencies**: P2-T3, P2-T4, P6-T4
* **Definition of Done**: File opens in a new tab; deletes request confirmations, and replacement replaces target Blob fields.

---

## Phase 7 — Cart Module

Goal: Build career page bookmarks, content scripts, and floating save button inputs.

### [x] P7-T1: Cart Storage Methods
* **Objective**: Create cart table schemas and CRUD storage operations.
* **Files**: 
  - `[NEW] src/modules/cart/storage/cartStore.ts`
  - `[NEW] src/modules/cart/types/index.ts`
* **Dependencies**: P1-T2
* **Definition of Done**: Storage services manage manual and script-triggered bookmarks.

### [x] P7-T2: Manual Cart View UI
* **Objective**: Build list grids, manual Add/Edit modals, and delete buttons.
* **Files**: 
  - `[NEW] src/modules/cart/components/CartList.tsx`
  - `[NEW] src/modules/cart/components/CartCard.tsx`
  - `[NEW] src/modules/cart/components/CartFormModal.tsx`
  - `[NEW] src/modules/cart/index.ts`
* **Dependencies**: P2-T2, P2-T3, P2-T5, P7-T1
* **Definition of Done**: User can manually add URLs, copy values, open links, and clean entries.

### [x] P7-T3: Message Handlers Registration
* **Objective**: Build Background message router and register handlers for Content script updates.
* **Files**: 
  - `[NEW] src/background/index.ts`
  - `[NEW] src/background/router.ts`
  - `[NEW] src/background/handlers/cart.ts`
  - `[NEW] src/types/messages.ts`
* **Dependencies**: P0-T4, P7-T1
* **Definition of Done**: Background router loads and intercepts content script messages.

### [x] P7-T4: Content Script Injector
* **Objective**: Build Content script to inject floating save buttons into targeted page scopes.
* **Files**: 
  - `[NEW] src/content/index.ts`
  - `[NEW] src/content/floatingButton.ts`
  - `[NEW] src/content/styles.css`
* **Dependencies**: P0-T4
* **Definition of Done**: Loading active pages loads scripts and attaches elements to body elements.

### [x] P7-T5: Page Details Capture & Save
* **Objective**: Implement save action (capture `document.title` and `window.location.href`).
* **Files**: 
  - `[MODIFY] src/content/floatingButton.ts`
* **Dependencies**: P7-T3, P7-T4
* **Definition of Done**: Clicking button sends save requests to background router without displaying dialog popups.

### [x] P7-T6: Page Feedback Notification Toast
* **Objective**: Inject simple toast notification into target pages to display save results.
* **Files**: 
  - `[NEW] src/content/toast.ts`
* **Dependencies**: P7-T5
* **Definition of Done**: Toast displays message overlays (e.g. "Saved to Lative Cart") and dismisses itself after save operations.

---

## Phase 8 — Settings Module

Goal: Build local preferences storage and database backup services.

### [x] P8-T1: Local Settings Store
* **Objective**: Implement settings preferences layer using `chrome.storage.local`.
* **Files**: 
  - `[NEW] src/lib/chrome.ts`
  - `[NEW] src/modules/settings/storage/settingsStore.ts`
  - `[NEW] src/modules/settings/types/index.ts`
* **Dependencies**: P0-T4
* **Definition of Done**: Settings (theme, key, toggle) load on start and write updates to Chrome storage.

### [x] P8-T2: Local Preferences Controller Hook
* **Objective**: Build global settings context provider.
* **Files**: 
  - `[NEW] src/providers/SettingsProvider.tsx`
  - `[NEW] src/modules/settings/hooks/useSettings.ts`
* **Dependencies**: P8-T1
* **Definition of Done**: Hook coordinates local states and chrome local store variables.

### [x] P8-T3: Settings Panel Layout
* **Objective**: Create Settings view layout.
* **Files**: 
  - `[NEW] src/modules/settings/components/SettingsPage.tsx`
  - `[NEW] src/modules/settings/index.ts`
* **Dependencies**: P2-T1, P8-T2
* **Definition of Done**: Page lists configurations; system options switch options on select.

### [x] P8-T4: Gemini Key & Theme Configuration
* **Objective**: Create settings components for Gemini key inputs and theme selectors.
* **Files**: 
  - `[NEW] src/modules/settings/components/ApiKeyInput.tsx`
  - `[NEW] src/modules/settings/components/ThemeSelector.tsx`
* **Dependencies**: P8-T3
* **Definition of Done**: System theme updates immediately; API Key hides details using password masks.

### [x] P8-T5: Floating Save Button Toggle
* **Objective**: Build toggle switches to inject/remove floating buttons.
* **Files**: 
  - `[NEW] src/modules/settings/components/FloatingButtonToggle.tsx`
  - `[MODIFY] src/background/index.ts`
* **Dependencies**: P7-T4, P8-T3
* **Definition of Done**: Toggling settings inserts or clears elements from pages instantly without reloads.

### [x] P8-T6: Metadata Views & Database Clear
* **Objective**: Design About layouts, help references, and database wipe buttons.
* **Files**: 
  - `[NEW] src/modules/settings/components/ClearDataButton.tsx`
  - `[NEW] src/modules/settings/components/AboutSection.tsx`
* **Dependencies**: P2-T3, P8-T3
* **Definition of Done**: DB wipe clears IndexedDB collections and redirects viewers; About displays extension version.

---

## Phase 9 — AI Foundation

Goal: Build the AI infrastructure, Gemini client, and chat UI.

### [x] P9-T1: Gemini SDK Wrapper
* **Objective**: Install Gemini SDK and instantiate client with proxy settings.
* **Files**: 
  - `[NEW] src/lib/gemini.ts`
  - `[NEW] src/modules/ai/services/geminiService.ts`
* **Dependencies**: P0-T2
* **Definition of Done**: Client instantiates; placeholder query methods run without compilation warnings.

### [x] P9-T2: Key Validation Tool
* **Objective**: Build check methods calling low-overhead Gemini endpoints.
* **Files**: 
  - `[NEW] src/modules/ai/utils/validateApiKey.ts`
* **Dependencies**: P9-T1
* **Definition of Done**: Validation detects key states (returns success or prints friendly failures).

### [x] P9-T3: Resume Selector Component
* **Objective**: Build dropdown menus to select target resumes for AI sessions.
* **Files**: 
  - `[NEW] src/modules/ai/components/ResumeSelector.tsx`
  - `[NEW] src/modules/ai/hooks/useAiContext.ts`
* **Dependencies**: P5-T8, P8-T2
* **Definition of Done**: Dropdown reads stores; selected value persists to active settings contexts.

### [x] P9-T4: AI UI Layout Container
* **Objective**: Build chat container layouts.
* **Files**: 
  - `[NEW] src/modules/ai/components/AiPanel.tsx`
  - `[NEW] src/modules/ai/index.ts`
* **Dependencies**: P8-T2, P9-T3
* **Definition of Done**: Panel renders selector, prompt area, and displays instructions when API keys are missing.

### [x] P9-T5: Session Chat UI
* **Objective**: Create chat bubble elements, text inputs, and submit actions.
* **Files**: 
  - `[NEW] src/modules/ai/components/ChatContainer.tsx`
  - `[NEW] src/modules/ai/components/ChatMessage.tsx`
  - `[NEW] src/modules/ai/hooks/useChat.ts`
* **Dependencies**: P9-T4
* **Definition of Done**: User and AI text blocks display; layout supports scrolling; chat memory does not persist to disk.

### [x] P9-T6: Resume Switch Action resets session
* **Objective**: Build state monitors to clear active messages and reset contexts on resume switches.
* **Files**: 
  - `[MODIFY] src/modules/ai/components/AiPanel.tsx`
* **Dependencies**: P9-T5
* **Definition of Done**: Changing active resumes immediately clears chat message histories.

---

## Phase 10 — Resume Intelligence

Goal: Build resume contexts, prompt templates, and AI resume actions.

### [x] P10-T1: Context Prompts Configuration
* **Objective**: Declare prompts templates for summary generations and comparison operations.
* **Files**: 
  - `[NEW] src/modules/ai/prompts/templates.ts`
* **Dependencies**: P9-T1
* **Definition of Done**: Prompts return deterministic structure frameworks for summaries and lists.

### [x] P10-T2: Context Builder Pipeline
* **Objective**: Create context builders to compile prompt text, parsed resumes, and input questions.
* **Files**: 
  - `[NEW] src/modules/ai/context/contextBuilder.ts`
* **Dependencies**: P5-T1, P10-T1
* **Definition of Done**: Context builder merges structural values (skills, projects) into prompt instructions.

### [x] P10-T3: Resume Summarization Actions
* **Objective**: Connect quick action buttons for Profile Summary & Resume Summary.
* **Files**: 
  - `[NEW] src/modules/ai/components/QuickActions.tsx`
  - `[MODIFY] src/modules/ai/components/ChatContainer.tsx`
* **Dependencies**: P9-T5, P10-T2
* **Definition of Done**: Clicking summary chip sends parsed file contexts to Gemini API and stream-renders outputs.

### [x] P10-T4: Job Description Comparison
* **Objective**: Build textbox form overlays for job comparisons.
* **Files**: 
  - `[NEW] src/modules/ai/components/JdComparisonModal.tsx`
* **Dependencies**: P2-T3, P10-T3
* **Definition of Done**: Comparing parses inputs, evaluates differences, and returns matching strengths and missing skills.

### [x] P10-T5: Missing Skills Analysis
* **Objective**: Create quick actions to compare resumes and list required but absent skills.
* **Files**: 
  - `[MODIFY] src/modules/ai/components/QuickActions.tsx`
* **Dependencies**: P10-T4
* **Definition of Done**: AI outputs formatted checklists of missing skills.

### [x] P10-T6: Resume Selection Advisor
* **Objective**: Create algorithms to advise best resume candidates for job descriptions.
* **Files**: 
  - `[MODIFY] src/modules/ai/components/QuickActions.tsx`
* **Dependencies**: P10-T4
* **Definition of Done**: Query scans parsed databases, checks inputs, and returns recommendations.

---

## Phase 11 — Webpage Context Analysis

Goal: Extract active webpage texts and pass context details to AI questions.

### [x] P11-T1: Page Text Extractor Script
* **Objective**: Create content script service to extract visible page text.
* **Files**: 
  - `[NEW] src/content/pageReader.ts`
  - `[MODIFY] src/content/index.ts`
* **Dependencies**: P7-T4
* **Definition of Done**: Script extracts text strings from visible target selectors.

### [x] P11-T2: Background Analysis Router
* **Objective**: Implement background handler routing request inputs.
* **Files**: 
  - `[NEW] src/background/handlers/page.ts`
  - `[MODIFY] src/background/router.ts`
* **Dependencies**: P7-T3, P11-T1
* **Definition of Done**: Message routing intercepts commands and returns target DOM text.

### [x] P11-T3: Extraction Truncation Helpers
* **Objective**: Design context size calculators to trim page texts within model parameters.
* **Files**: 
  - `[NEW] src/modules/ai/utils/tokenTrimmer.ts`
* **Dependencies**: P11-T2
* **Definition of Done**: Trimmer limits characters before sending to API wrapper.

### [x] P11-T4: Page Analysis Action Button
* **Objective**: Wire up "Analyze Current Page" action.
* **Files**: 
  - `[MODIFY] src/modules/ai/components/QuickActions.tsx`
* **Dependencies**: P11-T3
* **Definition of Done**: Action extracts active pages, merges tokens with resume context, and queries API.

---

## Phase 12 — Backup & Restore

Goal: Construct JSON-based database configuration backup systems.

### [x] P12-T1: Database Serializer
* **Objective**: Build file serialization tools capturing database state.
* **Files**: 
  - `[NEW] src/modules/settings/services/backupService.ts`
  - `[NEW] src/modules/settings/types/backup.ts`
* **Dependencies**: P1-T2, P8-T1
* **Definition of Done**: Exporter returns structured JSON containing active records (excluding API keys).

### [x] P12-T2: Backup Exporter Action
* **Objective**: Implement download trigger generating database backup files.
* **Files**: 
  - `[NEW] src/modules/settings/components/ExportSection.tsx`
  - `[MODIFY] src/modules/settings/components/SettingsPage.tsx`
* **Dependencies**: P2-T1, P12-T1
* **Definition of Done**: Export downloads file matching `.lative` file parameters.

### [x] P12-T3: Restore Checksum Validation
* **Objective**: Design validation tools checking import configurations.
* **Files**: 
  - `[NEW] src/modules/settings/validators/validateBackup.ts`
* **Dependencies**: P12-T1
* **Definition of Done**: Validator detects structural errors, checks version keys, and rejects tampered files.

### [x] P12-T4: Backup Import Coordinator
* **Objective**: Implement import engine restoring collections and updating UI layouts.
* **Files**: 
  - `[NEW] src/modules/settings/components/ImportSection.tsx`
* **Dependencies**: P2-T3, P2-T4, P12-T3
* **Definition of Done**: Selected backups restore IndexedDB schemas safely and update layouts.

## Phase 13 — Theme & UX Polish

Goal: Refine themes, color design tokens, custom glass components, scrollbars, spacing, focus accessibility, loading states, and reveal animations.

### [x] P13-T1: UI Redesign Planning
* **Objective**: Define visual redesign criteria matching Cinema/Deep Space specifications.

### [x] P13-T2: Design Tokens & Global Theme
* **Objective**: Declare CSS custom variables in globals and config mapping definitions.

### [x] P13-T3: Shared UI Components Refactoring
* **Objective**: Refactor Button, Input, Skeleton, Modal, and Card base layouts.

### [x] P13-T4: Navigation Polish
* **Objective**: Re-dimension navigation panel headers and alignment states.

### [x] P13-T5: Popup Layout & Viewport Anchoring
* **Objective**: Wire up backing blurred light-pools and background gradients.

### [x] P13-T6: Custom Glass Cards
* **Objective**: Refactor LinkCard, MailCard, ResumeCard, and CertificateCard.

### [x] P13-T7: Forms & Input Ring Outlines
* **Objective**: Add ring offsets to form elements (JdComparisonModal, ResumeSelector).

### [x] P13-T8: ButtonCTAs & Inset Glow Actions
* **Objective**: Refactor button glow states (ApiKeyInput, ThemeSelector).

### [x] P13-T9: Lists Stacking & Hover Border Highlights
* **Objective**: Audit list heights, borders, and margins.

### [x] P13-T10: Onboarding Empty States Standards
* **Objective**: Redesign EmptyState icons and guiding buttons.

### [x] P13-T11: Loading Skeletons & Shimmer Timings
* **Objective**: Transition skeletons to linear horizontal gradients.

### [x] P13-T12: Bottom Translucent Overlay Toasts
* **Objective**: Re-style toasts to theme-aware overlay boxes.

### [x] P13-T13: Overlay Dialogs & Centered Modals
* **Objective**: Configure centered modal blurs and limits.

### [x] P13-T14: Motion, Expo-Out & Staggered Reveals
* **Objective**: Implement staggered animators and cubic-bezier timings.

### [x] P13-T15: Final UI Consistency & A11y Audit
* **Objective**: Run overall keyboard path audits and contrast verification.

### [x] UI Refinement Passes:
* **Objective**: Refine Toast theme colors and redesign injected floating action button.

---

## Phase 14 — Robust Error Handling

Goal: Implement error boundary layers and database connection failures checks.

### P14-T1: React Error Boundaries
* **Objective**: Set up target error boundaries across module blocks.
* **Files**: 
  - `[NEW] src/shared/components/ErrorBoundary.tsx`
  - `[MODIFY] src/popup/main.tsx`
* **Dependencies**: P0-T7
* **Definition of Done**: Local crashes do not crash the entire popup interface.

### P14-T2: Storage Access Checkers
* **Objective**: Create alert states to display when IndexedDB permissions fail.
* **Files**: 
  - `[MODIFY] src/database/db.ts`
* **Dependencies**: P1-T1, P14-T1
* **Definition of Done**: DB access failures display recovery prompts instead of freezing the UI.

### P14-T3: API Interceptor Modals
* **Objective**: Create handler methods mapping network, API validation, and key issues.
* **Files**: 
  - `[MODIFY] src/modules/ai/components/ChatContainer.tsx`
* **Dependencies**: P9-T5
* **Definition of Done**: Failures (rate limits, network down) display user-friendly error banners.

---

## Phase 15 — Performance Optimization

Goal: Implement resource optimization and code splitting.

### P15-T1: Vite Code Splitting configuration
* **Objective**: Configure chunk divisions to keep main popup payloads lightweight.
* **Files**: 
  - `[MODIFY] vite.config.ts`
* **Dependencies**: P0-T2
* **Definition of Done**: Split configuration limits initial main bundle sizes.

### P15-T2: PDF Worker Lazy Loading
* **Objective**: Configure dynamic loads of PDF workers during uploads.
* **Files**: 
  - `[MODIFY] src/lib/pdf.ts`
* **Dependencies**: P5-T2
* **Definition of Done**: Worker code loads only when users select Resume module tabs.

### P15-T3: Dexie Indexes Verification
* **Objective**: Verify and optimize DB query performance.
* **Files**: 
  - `[MODIFY] src/database/db.ts`
* **Dependencies**: P1-T2, P15-T2
* **Definition of Done**: Queries for links, emails, and bookmarks leverage schema index paths.

---

## Phase 16 — Browser Compatibility Verification

Goal: Ensure Chromium extension framework compliance.

### P16-T1: Manifest MV3 API Audit
* **Objective**: Confirm scripting rules and permission structures.
* **Files**: 
  - `[MODIFY] public/manifest.json`
* **Dependencies**: P0-T4
* **Definition of Done**: Manifest maps strictly to Chrome Web Store permission standards.

### P16-T2: Multi-Browser Manual verification
* **Objective**: Manual verification testing on Chromium browser versions (Brave, Edge, Arc).
* **Files**: None
* **Dependencies**: P16-T1
* **Definition of Done**: Popup interface, styling features, and content injection function consistently across platforms.

---

## Phase 17 — Production Readiness

Goal: Final code cleanup, console audit, and publication assets assembly.

### P17-T1: Logging & Verbosity Audit
* **Objective**: Disable development configurations and remove console logging statements.
* **Files**: 
  - `[MODIFY] vite.config.ts`
* **Dependencies**: P0-T2
* **Definition of Done**: Console logs are stripped from production builds.

### P17-T2: Permissions Verification
* **Objective**: Minimize permissions configuration inside MV3 manifest rules.
* **Files**: 
  - `[MODIFY] public/manifest.json`
* **Dependencies**: P16-T1
* **Definition of Done**: Unnecessary permissions are removed from production configuration targets.

### P17-T3: Release Assets & Bundling
* **Objective**: Run final production build script and package distribution artifacts.
* **Files**: 
  - `[MODIFY] package.json`
* **Dependencies**: P17-T2
* **Definition of Done**: Output generates distribution package `.zip` file ready for submission to the Chrome Web Store.
