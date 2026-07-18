# Lative Known Bugs & Constraints Log

This document lists the currently identified runtime bugs, environmental constraints, and development workarounds for Lative.

---

## 1. Development Environment Constraints

### Vite Watcher Build Loop
*   **Issue**: Vite's watch mode can enter an infinite watch loop under specific compilation setups (such as during intensive package resolutions), causing the CPU to spike and the dev environment to freeze.
*   **Workaround**: During development turns, avoid running production bundle builders (`npm run build`, `pnpm build`, etc.). Verify structural correctness and typing using **`npx tsc --noEmit`** and syntax rules using **`npm run lint`**.
*   **Status**: Ongoing development constraint.

---

## 2. Extension Runtime Constraints

### Injected Content Floating Button on Restricted Pages
*   **Issue**: Google Chrome security policies explicitly prohibit extensions from executing content script injections on system directories (`chrome://*`, `chrome-extension://*`) and the Chrome Web Store.
*   **Workaround**: The background script message router catches injection failures and rejects them gracefully. The Popup interface handles these failures silently without crashing or freezing.
*   **Status**: Inherent Manifest V3 platform restriction.
