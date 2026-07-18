# Lative Project Memory

This document serves as the long-term context store for Lative. It maintains the current state of development, architectural constraints, and strategic decisions. It acts as the primary handoff document for any AI assistant joining the project.

---

## 1. Project Overview & Product Philosophy

Lative is a privacy-first, local-first browser extension designed to centralize and simplify the management of career assets (resumes, certificates, professional profile links, email addresses, and bookmarked career pages). It features an on-demand, resume-aware AI chat assistant powered by Google Gemini (using the user's own API key).

*   **Privacy-First & Local-First**: Users remain in complete control of their data. All user-generated content resides entirely inside the user's local IndexedDB browser vault.
*   **No Authentication & No Backend Dependencies**: The extension operates entirely client-side without registration databases or external accounts. Relies on the user's personal Google Gemini API key to query model features.
*   **No Auto-Actions**: Intentionally avoids autofill, background parsing, or form submissions, giving users explicit control of copy-to-clipboard interactions.

---

## 2. Current Version & Stage

*   **Current Version**: `1.0.0-alpha.3`
*   **Development Stage**: Phase 14 — Robust Error Handling
*   **Active Phase**: Phase 14 — Robust Error Handling
*   **Active Task**: [P14-T1: React Error Boundaries](file:///d:/workspace/lative/docs/05-planning/Current_Task.md) (Ready for Implementation)

---

## 3. Implementation Status

Lative is being built incrementally. The status of all development phases is tracked below:

### Completed Phases (Phase 0 – Phase 13A)
*   **Phase 0 — Project Foundation**: Toolchain, folders, MV3 config, popup navigation layout, theme switching hooks.
*   **Phase 1 — Database Foundation**: IndexedDB schema, Dexie.js setup, table configurations, migrations.
*   **Phase 2 — Shared UI System**: Custom buttons, inputs, card primitives, modal layers, skeleton shimmers, and toast notifications.
*   **Phase 3 — Links Module**: Storage service, link card view grids, validation checks.
*   **Phase 4 — Mail Module**: Storage service, RFC-compliant email validators, copy-to-clipboard actions.
*   **Phase 5 — Resume Module**: PDF file upload, text extractor (PDF.js), category line-heuristics parsing, custom tag titles, copy original filename.
*   **Phase 6 — Certificate Module**: PDF/Image uploads, metadata updates (Title, Org, Dates, Credential ID, Verification URL), Copy Credential ID button.
*   **Phase 7 — Cart Module**: Bookmarking list, content-injected floating button, active tab page capture.
*   **Phase 8 — Settings Module (Base)**: Theme selector switcher, floating toggle, clear local data operations.
*   **Phase 9 — AI Foundation**: Unified `@google/genai` SDK integration, validated key models discovery, transient session chat.
*   **Phase 10 — Resume Intelligence**: Profile summaries, JD comparison checklists, missing skills audits, and suitability advice.
*   **Phase 11 — Analyze Page**: Active tab DOM text extraction content scripts, 8k character token trimmer, "Analyze Page" quick action.
*   **Phase 12 — Backup & Restore**: `.lative` JSON serialization format, Base64 converter, schema validators, database bulk restore coordinators.
*   **Phase 13A — Visual Redesign & UX Polish**: 
    *   `[x]` **P13-T1**: UI Redesign Planning
    *   `[x]` **P13-T2**: Design Tokens & Global Theme (Variables and config setups)
    *   `[x]` **P13-T3**: Shared UI Components Refactoring (Buttons, Inputs, Skeletons, Modals, Cards base layout)
    *   `[x]` **P13-T4**: Navigation Polish (Tab switcher dimensions, static coordinates)
    *   `[x]` **P13-T5**: Popup Layout & Viewport Anchoring (Floating light-pool blobs, backdrop blurs)
    *   `[x]` **P13-T6**: Custom Glass Cards (Refactored Links, Mail, Resume, Certificates, and Cart card lists)
    *   `[x]` **P13-T7**: Forms & Input Ring Outlines (Wired focus outline offsets on textareas and selectors)
    *   `[x]` **P13-T8**: ButtonCTAs & Inset Glow Actions (Wired secondary glass button themes, ApiKey inputs, ThemeSelector card)
    *   `[x]` **P13-T9**: Lists Stacking & Hover Border Highlights (Audited lists padding elements matching 8px grid)
    *   `[x]` **P13-T10**: Onboarding Empty States Standards (Centered illustrations, desaturated icons, primary guided CTA button triggers)
    *   `[x]` **P13-T11**: Loading Skeletons & Shimmer Timings (Refactored shimmers to smooth horizontal position gradients)
    *   `[x]` **P13-T12**: Bottom Translucent Overlay Toasts (Frosted theme-aware toast overlays `bg-card/95 dark:bg-[#0a0a0c]/90` with desaturated alert intent boundaries)
    *   `[x]` **P13-T13**: Overlay Dialogs & Centered Modals (340px centered dialog boxes with viewport blurs)
    *   `[x]` **P13-T14**: Motion, Expo-Out & Staggered Reveals (Custom cubic-bezier Expo-Out curves and staggered fade-in animations on tab changes)
    *   `[x]` **P13-T15**: Final UI Consistency & A11y Audit (Keyboard focus ring offsets and popup viewport audits)
    *   `[x]` **UI Refinement Pass 01**: Unified light/dark theme visual compatibility for the Toast notifications.
    *   `[x]` **UI Refinement Pass 02**: Premium content-script floating cart button redesigned as a dark glass widget (`rgba(10,10,12,0.85)` + `blur(12px)`) with inset highlights, tactile scaling, and soft translation animations.

### Pending Work
*   `[ ]` **Phase 14 — Robust Error Handling**: Error boundaries, database fallback alerts, API error intercepts. (Active/Next Phase)
*   `[ ]` **Phase 15 — Performance Optimization**: Code splitting, PDF worker lazy loading, DB query optimization.
*   `[ ]` **Phase 16 — Browser Compatibility**: Manifest MV3 API audits, multi-browser validation.
*   `[ ]` **Phase 17 — Production Readiness**: Logger stripping, minimized permissions, packaging.

---

## 4. Architecture Snapshot

```
src/
├── app/                  # Application Shell (App, AppLayout, Routes)
├── background/           # Background Service Worker Message Router
├── content/              # Page Text Extractor & Floating Button Injection
├── database/             # Dexie.js Database & Version Migrations
├── lib/                  # Chrome Storage & Third-Party Wrappers
├── shared/               # Reusable Atoms (Button, Input, Skeleton, Modal, Card, Toast, EmptyState)
├── types/                # Global Type Definitions (database.ts)
└── modules/              # Independent Feature Modules
    ├── ai/               # AI Context Builder, Prompt templates, Providers, Chat UI
    ├── cart/             # Job Bookmarks Manager
    ├── certificate/      # Credential Metadata Uplink
    ├── links/            # Profile Link Swapper
    ├── mail/             # Email Address Copies
    ├── resume/           # Resume Parser, CategorizerHeuristics, Uploads
    └── settings/         # Configuration panel, Backup Services
```

*   **Storage Isolation**: IndexedDB manages primary user records (resumes, certs, links, mail, cart). `chrome.storage.local` coordinates light configuration preferences (floating button toggle, active theme, API key) for fast startup.
*   **Messaging Hub-and-Spoke**: The background script relays actions (e.g. active page text extraction, settings changes) between the Popup context and injected Content scripts. Content scripts never access IndexedDB directly.
*   **AI Provider Abstraction**: Abstracted behind `ProviderFactory` and `AIProvider` boundaries. `GeminiProvider` wraps the official SDK, manages validation optimizations, handles Retry-After limits, and isolates HTTP 429 rate limit exceptions.

---

## 5. UI Snapshot & Design Language

Lative uses the **Technical Dark Mode ("Cinema / Deep Space")** visual language defined in [UI_Vision.md](file:///d:/workspace/lative/docs/04-design/UI_Vision.md):

*   **Color Palette**: Near-black base colors (`#050506`, `#020203`), desaturated border details (`rgba(255,255,255,0.06)`), and a single saturated indigo active color (`#5E6AD2`).
*   **Atmosphere**: Ambient, floating blurred light-pool circles float behind elements. Header, navigation, and input boxes use translucent backdrops with glass backing blurs.
*   **Surfaces**: Cards feature a top edge top-glow inset line (`shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)]`), 16px corner rounding, and desaturated grey text.
*   **Viewport Constraints**: Strict **380px width** and **600px height** limit boundaries. Horizontal scrollbars are completely banned.
*   **Iconography**: Lucide icons configured with exactly `w-3.5 h-3.5` (card buttons), `w-4 h-4` (navigation), or `w-4.5 h-4.5` (headings) and stroke width of `1.5` or `2`.
*   **Tactile Animations**: Fluid page changes use custom `expo-out` bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`) with staggered fade-ins.

---

## 6. Development Rules & Governance

*   **Do Not Run `npm run build` In Development Loop**: The project has a known dependency compilation issue where build tools can enter infinite loops during file-watch updates. **Only run static code checks** (`npx tsc --noEmit` and `npm run lint`) to verify syntax and typing.
*   **Reuse Shared Components**: Do not build ad-hoc inputs, buttons, skeletons, cards, or dialog modals inside feature modules. Update [src/shared/components/](file:///d:/workspace/lative/src/shared/components) to generalize shapes instead.
*   **Keyboard outlines**: Every button or clickable text field must render a clear outer focus offset ring (`focus:ring-offset-1 focus:ring-offset-background`) when tab-focused.
*   **No Hex Codes in JSX**: Colors must utilize CSS variables (`var(--...)`) or tailwind color aliases mapped in `tailwind.config.ts`.
*   **No nesting routes**: Keep the panel flat and use modals to intercept custom forms (e.g. metadata overlays) to preserve popup scroll state.

---

## 7. Known Constraints & Workarounds

*   **Restricted Sites**: Chrome security policies block content scripts from injecting the floating Cart button on standard system sites (`chrome://*`, `chrome-extension://*`) and the official Chrome Web Store. Outgoing browser relays handle these failures gracefully without freezing UI viewports.
*   **Memory Release**: Object URLs created when reading resume/certificate PDFs are auto-revoked after exactly **60 seconds** using timeouts to prevent popup browser memory leaks.

---

## 8. Immediate Next Step

*   **Task**: **P14-T1: React Error Boundaries**
*   **Objective**: Create a reusable `ErrorBoundary.tsx` component and mount it at the root of the Popup application shell in `src/popup/main.tsx` to trap component crashes.
*   **Files**:
    *   `[NEW] src/shared/components/ErrorBoundary.tsx`
    *   `[MODIFY] src/popup/main.tsx`

---

## 9. AI Handoff Summary

The project is currently pausing at **Phase 14 (Robust Error Handling), Task 01 (React Error Boundaries)**.

To pick up development:
1.  Read [Known_Bugs.md](file:///d:/workspace/lative/docs/06-memory/Known_Bugs.md) to understand current development constraints.
2.  Open [Current_Task.md](file:///d:/workspace/lative/docs/05-planning/Current_Task.md) to view target file boundaries.
3.  Implement `ErrorBoundary.tsx` using a standard React class component configuration to catch render-time errors.
4.  Do **NOT** run production builds during intermediate steps; verify changes using static code diagnostics (`npx tsc --noEmit` and `npm run lint`).