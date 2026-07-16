# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0-alpha.2] - 2026-07-16
### Added
- Certificate module types defining the database structures and creation input types (`src/modules/certificate/types/index.ts`).
- Certificate module storage logic (`src/modules/certificate/storage/certificateStore.ts`) implementing database CRUD operations (`getAll`, `getById`, `add`, `replace`, `delete`) using Dexie.js.
- Certificate validation logic (`src/modules/certificate/validators/validateCertificate.ts`) verifying file size (max 15MB), format types (PDF, PNG, JPG, JPEG, WEBP), duplicate uploads, and corrupted image/PDF check routines.
- Certificate constants configuration (`src/modules/certificate/constants/index.ts`) declaring size thresholds and allowed MIME type parameters.
- Certificate business coordinator service (`src/modules/certificate/services/certificateService.ts`) executing validation checks before processing storage mutation requests.
- Certificate state hook (`src/modules/certificate/hooks/useCertificate.ts`) enabling reactive subscription to changes on IndexedDB stores.
- Certificate module UI components: card renderer (`CertificateCard.tsx`), reactive list loader (`CertificateList.tsx`), and coordination view container (`CertificateView.tsx`).
- Certificate index barrel exports file (`index.ts`).
- Cart module types mapping the database schema structures and input models (`src/modules/cart/types/index.ts`).
- Cart module storage logic (`src/modules/cart/storage/cartStore.ts`) implementing Dexie.js CRUD operations sorted by creation timestamp descending.
- Cart validation rules (`src/modules/cart/validators/validateCart.ts`) checking title character bounds, protocol matches, spaces, and duplicate listings.
- Cart business query service (`src/modules/cart/services/cartService.ts`) coordinating database actions.
- Cart module custom hook (`src/modules/cart/hooks/useCart.ts`) providing reactive state arrays and modification handlers.
- Cart module UI display components: card renderer (`CartCard.tsx`), form modal (`CartFormModal.tsx`), list grid layout (`CartList.tsx`), and coordination view wrapper (`CartView.tsx`).
- Cart index exports barrel configuration (`index.ts`).
- Background Chrome message handler for the Cart module (`src/background/handlers/cartHandler.ts`) processing `CART_ADD_CURRENT_PAGE` and `CART_DELETE` transactions.
- Content script initialization entry point (`src/content/index.ts`) listening to background chrome events.
- Injected Floating Button component (`src/content/components/FloatingButton.ts`) capturing title and URL metadata and executing background message transmissions.
- Injected Toast overlay component (`src/content/components/Toast.ts`) displaying success and error status feedback alerts.
- Settings module types mapping user settings preferences and themes (`src/modules/settings/types/index.ts`).
- Settings storage actions layer (`src/modules/settings/storage/settingsStore.ts`) wrapping chrome.storage.local key-value queries.
- Global context provider (`src/modules/settings/providers/SettingsProvider.tsx`) capturing settings modifications, synchronizing root theme classes, and broadcasting tab messaging toggles.
- Custom state hook (`src/modules/settings/hooks/useSettings.ts`) referencing preferences options.
- Main Settings container layout component (`src/modules/settings/components/SettingsPage.tsx`) displaying config sections and managing reactive selection triggers.
- API key input field layout subcomponent (`src/modules/settings/components/ApiKeyInput.tsx`) handling input visibility switches and update updates.
- Theme selector grid layout subcomponent (`src/modules/settings/components/ThemeSelector.tsx`) handling immediate theme modifications.
- Floating button toggle control subcomponent (`src/modules/settings/components/FloatingButtonToggle.tsx`) connecting UI check triggers with settings hook modifiers.
- Database clearing panel component (`src/modules/settings/components/ClearDataButton.tsx`) running transactions to wipe IndexedDB tables.
- Information section component (`src/modules/settings/components/AboutSection.tsx`) rendering tutorials and metadata fields.
- Central model configuration constant (`src/shared/constants/ai.ts`) configuring DEFAULT_MODEL defaults.
- Shared Gemini client service (`src/shared/services/geminiClient.ts`) wrapping Google Gen AI SDK class with proxy parameters.
- Modular AI query wrapper service (`src/modules/ai/services/geminiService.ts`) mapping generation calls and key checks.
- Gemini API Key validation utility (`src/modules/ai/utils/validateApiKey.ts`) validating credentials via low-overhead prompts.
- Custom AI State Provider context and hook (`src/modules/ai/hooks/useAiContext.tsx`) managing selection state variables.
- Chat message bubble display element (`src/modules/ai/components/ChatMessage.tsx`) supporting plain text whitespace rendering.
- Scrollable chat message list layout container (`src/modules/ai/components/ChatContainer.tsx`) managing scroll-anchors and loading animations.
- Custom query hook (`src/modules/ai/hooks/useChat.ts`) executing Gemini requests and managing error statuses.
- Resume selector dropdown menu element (`src/modules/ai/components/ResumeSelector.tsx`) binding configuration options.
- AI Panel wrapper component (`src/modules/ai/components/AiPanel.tsx`) coordinating select dropdown inputs, chat sections, and text prompt fields.
- AI module barrel index mapping exports (`src/modules/ai/index.ts`).
- Settings barrel index exports wrapper (`index.ts`).

### Changed
- Synchronized and updated naming conventions rules in `Folder_Structure.md` to reflect PascalCase for React component files, camelCase for helper scripts, and `use*.ts` hook files.
- Synchronized project memory in `Memory.md` by pruning duplicated roadmap items and maintaining long-term product context.
- Mounted `AiProvider` wrapper at root `src/popup/main.tsx` popup entry point.
- Mounted `AiPanel` container inside the main routing switcher (`src/app/App.tsx`) and replaced active tab placeholder elements.
- Configured AI state provider (`src/modules/ai/hooks/useAiContext.tsx`) to manage in-memory message and active session loading states, resetting variables immediately on resume selection modifications.
- Configured AI Panel container (`src/modules/ai/components/AiPanel.tsx`) to render scrollable lists and call query submissions hook.
- Configured API key input component (`src/modules/settings/components/ApiKeyInput.tsx`) to validate Gemini API Keys asynchronously during saves, catching validation exceptions to display descriptive feedback toasts.
- Refactored Gemini API Key validation utility (`src/modules/ai/utils/validateApiKey.ts`) to throw category-specific exceptions (network connectivity, quota limits, auth failures) instead of returning generic booleans.
- Simplified wrapper definitions inside (`src/modules/ai/services/geminiService.ts`) to consume extracted validation tools.
- Configured background service worker entry point `src/background/index.ts` to listen to runtime events and route Cart message tasks, and registered storage change watchers to transmit visibility messages reactively to content scripts on target web pages.
- Modified manifest file `public/manifest.json` specifying document_idle script loading rules and declaring host permissions for `https://generativelanguage.googleapis.com/*` to unblock Gemini API requests.
- Migrated Gemini API dependency from the legacy `@google/generative-ai` package to the new official unified `@google/genai` SDK package.
- Refactored the settings module to define and store a structured `AIConfig` settings payload (containing provider, apiKey, selectedModel, availableModels, sdkVersion, and validatedAt parameters) in `chrome.storage.local`.
- Introduced a provider-agnostic abstraction interface `AIProvider`, with a concrete `GeminiProvider` implementation isolating all Google-specific SDK operations (key validation, dynamic model discovery, text query generation, and model health diagnostics).
- Introduced a central `ModelManager` service responsible for selecting preferred models according to prioritization rules and executing self-healing fallback operations.
- Introduced `AIContextBuilder` and `PromptBuilder` services to gather input parameters (such as resume sections) and format them into plain-text query instructions, preventing hallucinations.
- Created `ProviderFactory` to resolve and instantiate providers dynamically.
- Refactored `ApiKeyInput` and `useChat` to utilize the new abstracted AI service boundaries.
- Pruned deprecated legacy client/service files.
- Modified content script index entry `src/content/index.ts` to manage loading toggles, listen to storage updates reactively, map message triggers, and dynamically display Toast status feedback.
- Mounted `CertificateView` and `CartView` inside the active tab route switcher inside `src/app/App.tsx` and removed their respective unimplemented layout placeholders.

## [1.0.0-alpha.1] - 2026-07-15
### Added
- Complete MV3 Chrome Extension folder structure matching design boundaries.
- `.gitignore` for standard system metadata, dependency folders, and configuration logs.
- `package.json` declaring React 18, Vite 5, Dexie.js, Tailwind, and CRXJS dependencies.
- `README.md` introducing Lative features, dependencies, and setup steps.
- TypeScript compiler configurations (`tsconfig.json`) enabling strict checks and absolute path aliases.
- Vite build options (`vite.config.ts`) resolving `@/*` paths targeting ES module environments.
- Tailwind configs (`tailwind.config.ts`, `postcss.config.js`) supporting CSS theme design variables.
- CSS style rules (`globals.css`, `variables.css`) configuring Light and Dark mode variables using HSL spacing systems.
- Extension manifest (`manifest.json`) declaring Manifest V3 options and setting permissions for storage, scripting, activeTab, and tabs.
- Integrated `@crxjs/vite-plugin` inside build process configurations (`vite.config.ts`).
- Created base compilation entry scripts for popup UI (`popup/index.html`, `main.tsx`), background workers (`background/index.ts`), and page content injections (`content/index.ts`).
- Generated placeholder graphics (`public/icons/`) to satisfy build validation checks.
- Code style formatting configurations (`prettier.config.js`) setting standard tab spaces, semicolons, and quote characters.
- ESLint flat configuration (`eslint.config.js`) validating syntax, unused variables, and browser-extension API imports.
- Theme management provider (`ThemeProvider.tsx`) and hook (`useTheme.ts`) facilitating system/light/dark styling.
- Safe Chrome storage API adapter (`chrome.ts`) supporting local mocks outside extension context.
- Popup navigation shell components (`AppLayout.tsx`, `App.tsx`, `routes.ts`) including Lucide React icons integration and state persistence.
- Main Dexie database configuration (`db.ts`) and third-party library imports wrapper (`dexie.ts`).
- Storage table schemas (`schema.ts`) and database TypeScript interfaces (`types/database.ts`).
- Database migrations config system (`migrations.ts`) handling versioning initialization setup.
- Reusable Design System UI atoms: Button (`Button.tsx`) and Input (`Input.tsx`) components.
- Design system card molecules: Card (`Card.tsx`) and Document action container (`FileCard.tsx`).
- Reusable Modal overlay wrapper (`Modal.tsx`) and action confirmation Dialog layer (`ConfirmDialog.tsx`).
- Reusable Toast alerts notification wrapper (`Toast.tsx`), context (`ToastProvider.tsx`), and hooks (`useToast.ts`).
- Shimmer placeholders loader (`Skeleton.tsx`) and empty module states layout (`EmptyState.tsx`).
- Links module storage configurations (`linkStore.ts`) and TypeScript interfaces definitions (`types/index.ts`).
- Links inputs structural validator script (`validateLink.ts`).
- Links mutations service (`linkService.ts`) and React state hooks (`useLinks.ts`).
- Links modules UI components: card visual layout (`LinkCard.tsx`) and reactive list coordinator (`LinksList.tsx`).
- Links modules forms and container: additions modal (`LinkFormModal.tsx`), coordination view layout (`LinksView.tsx`), and main popup dashboard integration (`App.tsx`).
- Mail module storage configurations (`mailStore.ts`) and TypeScript interfaces definitions (`types/index.ts`).
- Mail inputs format and duplicates validator script (`validateMail.ts`).
- Mail mutations service (`mailService.ts`) and React state hooks (`useMails.ts`).
- Mail modules UI components: card visual layout (`MailCard.tsx`) and reactive list coordinator (`MailsList.tsx`).
- Mail modules forms and container: additions modal (`MailFormModal.tsx`), coordination view layout (`MailsView.tsx`), and main popup dashboard integration (`App.tsx`).
- Resume module storage configurations (`resumeStore.ts`) and TypeScript interfaces definitions (`types/index.ts`).
- PDF.js parser framework integration (`pdf.ts`), asset imports typings (`vite-env.d.ts`), and limits constants (`constants/index.ts`).
- Resume uploads size, types, duplicates, and binary header validation script (`validateResume.ts`).
- PDF text content extractor engine script (`parser/textExtractor.ts`).
- Resume heuristic structured parser sorting lines into resume sections (`parser/structuredData.ts`).
- Resume modules drag-and-drop upload hook (`hooks/useUpload.ts`) and dashed button target component (`components/UploadButton.tsx`).
- Resume mutations service (`resumeService.ts`) and React state hooks (`hooks/useResume.ts`).
- Resume modules UI components: card visual layout (`ResumeCard.tsx`) and reactive list coordinator (`ResumeList.tsx`).
- Resume Dashboard coordinator layout (`ResumeView.tsx`) and main popup dashboard integration (`App.tsx`).
- Resume card action button to copy the original filename to clipboard (`ResumeCard.tsx`).
- PDF readability, page count checks, and password-lock validations inside resume upload validator (`validators/validateResume.ts`).

### Changed
- Documented versioned backups architecture guidelines requiring `schemaVersion`, `appVersion`, and `exportedAt` properties for backup exports and imports compatibility.
- Documented Popup-Centric Gemini API Request architecture decisions in ADR records, retaining AI processing context in the Popup rather than background service worker.
