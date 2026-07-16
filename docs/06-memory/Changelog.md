# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
