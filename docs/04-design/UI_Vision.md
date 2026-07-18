# Lative UI Vision — Permanent Visual Design & UX Specification

This document defines the permanent visual language, user experience philosophy, and design rules for the Lative project. Every future user interface change, feature addition, or layout refactoring must adhere to these guidelines to preserve the premium feel, readability, and consistency of the product.

---

## 1. Product Personality

Lative is designed to look and behave like a high-end desktop productivity suite (e.g. Linear, Raycast, Vercel, Arc Browser) condensed into a browser extension popup. Its personality is defined by these core traits:

*   **Premium**: Obsessively crafted details—1px borders, subtle ambient lighting, three-layer shadows. It feels expensive and deliberate.
*   **Calm**: Monochromatic base canvases punctuated by soft pools of light. It reduces cognitive load rather than demanding attention.
*   **Fast**: Instant hover states, zero lag in active tabs, and responsive button micro-scaling. Interactions feel immediate.
*   **Intelligent**: Context-aware prompts and metadata layouts. The UI shows the user exactly what they need, exactly when they need it.
*   **Trustworthy**: Secure, local-first storage. The visual design reinforces safety with clean, stable boundaries and clear status indicators.
*   **Minimal**: Content is the decoration. No arbitrary graphics, no generic illustrations, and no excessive brand colors.

---

## 2. Design Philosophy

The overarching philosophy of Lative is **usability before decoration**. The aesthetic value must emerge naturally from structural clarity:

*   **Functional Hierarchy**: The relative visual weight of elements must match their importance. Headers command the eye, lists group content, and primary actions emit soft light.
*   **Clarity Over Decoration**: Every gradient, shadow, transition, and border must improve usability (e.g. indicating focus, separation of zones, or state changes). If a visual element does not aid comprehension, delete it.
*   **Obsessive Precision**: Layout spacing, borders, alignment, and typography must conform to a strict layout grid. Alignment mismatches or layout jitter ruin the premium feel.

---

## 3. Visual Language

The visual language of Lative replicates a dark desktop application running in a high-fidelity ambient lighting environment.

*   **Hierarchy**: Built on vertical stacking levels. Deeper canvas levels are dark; active elements rise towards the viewer with lighter background tones, borders, and shadows.
*   **Spacing**: Built strictly on a **8px grid spacing system** (4px, 8px, 12px, 16px, 24px, 32px). Never use arbitrary margins or padding.
*   **Elevation**: Stacking layers denote utility:
    *   *Canvas base*: Ground floor. Dark, structural background.
    *   *Cards & Containers*: Elevated surface. Slight translucent fill with border highlights.
    *   *Dialogs & Modals*: Peak elevation. Sits above a dimmed glass backdrop.
*   **Borders**: Microscopic 1px boundaries (`6%` to `10%` white opacity) define shapes. Never use thick, high-contrast borders.
*   **Surfaces**: Semi-translucent glass surfaces (`rgba(255,255,255,0.05)`) with backing blur, letting ambient gradient light flow through.
*   **Shadows**: Multi-layered to simulate depth:
    *   *Border highlight*: 1px white inset edge.
    *   *Diffuse shadow*: Soft, dark ambient blur extending outwards.
    *   *Accent shadow*: Soft primary color glow on primary elements.
*   **Lighting**: Large, heavily blurred colored shapes float slowly across the background canvas, simulating soft pools of light.
*   **Transparency**: Used to maintain context. Modals and select overlays let background layouts show through blurred backing glass.

---

## 4. Color Philosophy

Lative uses a **restricted, high-contrast dark palette** that uses color for intent, not styling.

*   **Deep Base**: A dark base (`#050506`, never pure `#000000`) acts as the primary canvas. It provides a soft, low-strain backdrop.
*   **Monochromatic Gray Scale**: Gray fills (`#8A8F98` for body text, `#EDEDEF` for headings) handle content styling.
*   **Single Accent Focus**: Saturated indigo (`#5E6AD2`) acts as the active accent. It is reserved for:
    *   Primary action highlights
    *   Active navigation tab indicators
    *   Focus borders and rings
    *   Loading status indicators
*   **Intent Colors**: Alert shades are used sparingly:
    *   *Success*: Warm, desaturated emerald for completed tasks or copies.
    *   *Danger/Destructive*: Muted dark red for deletes and wipes.

---

## 5. Typography

Typography is the core of Lative's interface. Font stacks, sizes, and tracking are configured for absolute readability in compact popups:

*   **Font Family**: Primary stack is `"Inter", "Geist Sans", system-ui, sans-serif` for clean tracking. Labels and tag elements can use desaturated monospace fonts.
*   **Heading Hierarchy**:
    *   *H1/Active Views*: `text-sm font-semibold text-text-primary tracking-wide`
    *   *H2/Cards & Subsections*: `text-xs font-semibold text-text-primary`
*   **Body Hierarchy**:
    *   *Standard Content*: `text-xs font-normal text-text-secondary leading-relaxed`
*   **Labels & Metadata**: `text-[10px] font-medium text-text-secondary tracking-normal`
*   **Text Gradients**: High-emphasis hero headers or highlights use subtle vertical fading:
    *   `bg-gradient-to-b from-white via-white/95 to-white/70 bg-clip-text text-transparent`

---

## 6. Layout & Viewport Architecture Constraints

Lative is built strictly for browser extension popup environments with the following constraints:

*   **Fixed Dimension Caps**: The popup has a strict **width limit of 380px** and a **max-height of 600px**. UI layouts must never require horizontal scrollbars.
*   **Scrollbar Hygiene**: Use custom thin scrollbars styled reactively to light and dark theme contexts.
*   **Responsive Width Design**: Elements must use percentage or flex widths (never hardcoded pixel values > 300px) to prevent layout overflows.
*   **Vertical Flow Priority**: Stack columns vertically. Side-by-side structures are only permitted for small items like badge pills, tags, or dual confirmation buttons.
*   **Compact Density**: Standard margins at the viewport edge are exactly **16px (`p-4`)**. Outer card paddings are exactly **12px (`p-3`)** or **14px (`p-3.5`)**.
*   **Layout Wrapping**: Long file names, credential IDs, and webpage titles must use `truncate` or `line-clamp-1` styling to fit cleanly inside cards.

---

## 7. Navigation Philosophy

*   **No Multi-Level Nesting**: Avoid deep drill-down navigation paths. The popup uses flat navigation (e.g. tabbed switcher panel).
*   **Persistent Tab Bar**: A clean tab switcher sits at the top or bottom of the viewport. Switching tabs resets view states without shifting the parent coordinates.
*   **Modal Interception**: Detail actions (such as credential updates or custom tag settings) are handled inside overlay modals rather than jumping to new views.

---

## 8. Component Philosophy

Components must feel like physical assets with weight, lighting, and tactile response.

*   **Buttons**:
    *   *Primary Accent*: Solid accent color (`bg-[#5E6AD2]`), text-white, subtle top-edge highlight, soft accent drop shadow.
    *   *Secondary Glass*: Semi-translucent glass (`bg-white/[0.05]`), desaturated text, inset border.
    *   *Active State*: Instant scale down to `0.98` on click to feel click-responsive.
*   **Cards**: Soft vertical gradient glass fills (`from-white/[0.08] to-white/[0.02]`), micro-borders, and 16px corner roundedness.
*   **Inputs**: Solid dark fields, inset borders, and a desaturated helper label. Focus triggers a sharp, colored outline ring (`border-[#5E6AD2]`) with a 3px soft outer ring offset.
*   **Dialogs / Modals**: Dimmed backing overlay with backdrop blur. The modal card is elevated, containing a clear title header and two buttons (Confirm/Cancel).
*   **Lists**: Individual item cards stack vertically. Hovering over a list item lights up its border slightly.
*   **Badges**: Rounded tags with low-opacity borders matching their text colors.
*   **Empty States**: Consistent empty states containing a central icon, concise header description, and a single, obvious Call-to-Action button to kick off onboarding flows.
*   **Loading States**: Smooth, desaturated skeleton loaders that shimmer horizontally. Avoid spinning indicators or jumping icon indicators that break focus.

---

## 9. Toast, Notifications, & Feedback

*   **Overlay Toast**: Display non-intrusive status confirmations (e.g., "Copied filename!") at the bottom-center of the popup.
*   **Translucent Layout**: Toast cards use a dark translucent glass backdrop (`backdrop-blur-md bg-[#0a0a0c]/90 border border-border/60`) and auto-dismiss after exactly **2 seconds**.
*   **Minimal Message Strings**: Restrict toast messages to a maximum of 4 words. Avoid multi-line toasts.

---

## 10. Status Feedback: Success & Error Philosophy

*   **Success Feedback**: Indicated by desaturated emerald tones (`text-success` / `border-success/30`) on icons or checkmarks.
*   **Error States**: Keep errors local. Render inline helper text in muted red (`text-danger`) below inputs rather than throwing modal panels.
*   **Quota & Limits (429/Quota limits)**: Show explicit descriptions explaining steps for recovery (e.g. rate limit wait times or checking account usage limits).

---

## 11. Iconography Guidelines

*   **Uniform Font library**: Use the Lucide React library exclusively.
*   **Consistent Strokes**: All icons must use a stroke width of exactly **1.5** or **2** depending on context. Never mix stroke weights in the same view.
*   **Standard Size System**:
    *   *View Title Headers*: 18px (`w-4.5 h-4.5`)
    *   *Card Items & Inline Actions*: 14px (`w-3.5 h-3.5`)
    *   *Tab switcher items*: 16px (`w-4 h-4`)
*   **Explicit Mapping Rules**:
    *   *Delete*: `Trash2`
    *   *Copy*: `Copy`
    *   *Edit / Custom tags*: `Tag` or `Edit`
    *   *Resumes*: `FileText`
    *   *Certificates*: `Award` or `FileCheck`

---

## 12. Motion Philosophy

Motion should feel like physics, not animation. It must support usability by guiding the eye.

*   **Expo-Out Timing**: All interactive movements use expo-out curves:
    *   *Timing*: `200ms` for hover/click transitions; `300ms` for panel animations.
    *   *Easing curve*: `[0.16, 1, 0.3, 1]` (exponential decelerating ease).
*   **Hover Effects**: Small transforms:
    *   Buttons scale down to `0.98` on click to feel responsive.
    *   Cards shift up `2px` or brighten their borders slightly on cursor hover.
*   **Tab Transitions**: List entries reveal with staggered fades (`0.05s` delay step) to prevent loading visual snaps.
*   **Avoid**: Flashy rotation loops, bounce effects, and heavy sliding panels that cause layout shift.

---

## 13. Accessibility (A11y)

*   **Contrast**: Text color ratios must satisfy WCAG AA minimum guidelines (`4.5:1` for normal text, `3:1` for headers and labels).
*   **Focus Ring Navigation**: Every interactive button, input, toggle, or link must render a sharp focus outline ring when navigated via keyboard.
*   **Tab Paths**: Tabbing must follow a logical top-down layout order. Avoid traps or broken cycles.
*   **ARIA Roles**: Dynamic states, toggle switches, and dialog triggers must use appropriate `aria-expanded`, `aria-hidden`, and `aria-label` properties.

---

## 14. Design Consistency Rules & Governance

*   **No One-Off Styles**: Use tailwind theme configurations or central tokens. Never add custom hex codes in local inline JSX components.
*   **Reusable Component Mandatory Rule**: Before writing a new input, button, select toggle, or dialogue box, verify if a shared component already exists inside `src/shared/components/`.
*   **Adding New Design Tokens**: Theme configurations must be declared globally inside `src/styles/variables.css`.
*   **Design Debt Avoidance**: Any modifications made to shared components to fit a specific card structure must be generalized to avoid breaking existing instances.

---

## 15. Things to Avoid

*   **Visual Clutter**: Too many labels, borders, or glowing elements. Space is a tool.
*   **Oversized Shadows**: Large, fuzzy black shadows look dirty. Use layered micro-shadows.
*   **Inconsistent Spacing**: Mixing 10px, 15px, and 20px padding. Stick to the 8px grid values.
*   **Unnecessary Gradients**: Multi-colored rainbows or text fills on small labels. Keep labels solid.
*   **Decorative Animations**: Non-interactive spins, floating dots, or loading indicators that distract from text reading.
*   **Responsive Web Layouts**: Grid systems designed for widescreen monitors (like col-span grids > 2 rows, hamburger dropdown bars, side navigation drawers) are banned in Lative popup interfaces.

---

## 16. UI Review Checklist

Before implementing a UI design change, verify:
- [ ] **Contrast Check**: Do all text fields have at least 4.5:1 contrast against their card containers?
- [ ] **Spacing Verification**: Do padding, margin, and gap values conform strictly to 8px intervals?
- [ ] **Keyboard Navigable**: Can all interactive elements be focused and activated via keyboard Tab and Enter/Space keys?
- [ ] **Popup Constraints**: Does the layout fit perfectly in 380px width without triggering horizontal scrollbars?
- [ ] **Focus States**: Do interactive items have custom, high-contrast outlines on focus?
- [ ] **Iconography Sync**: Do all icon shapes use Lucide configurations with stroke widths set to 1.5 or 2?
- [ ] **Color Discipline**: Is color reserved for CTAs and status states?

---

## 17. AI Design Rules (Implementation Guidelines)

Whenever modifying or creating a user interface, AI agents must follow these rules:

1.  **Reuse Shared Components First**: Do not construct ad-hoc inputs, buttons, skeletons, or confirm dialogs. Import from `@/shared/components`.
2.  **Maintain Light/Dark Theme Utilities**: Use tailwind colors or context states. Never hardcode text styles to light tones without testing how they look in dark mode.
3.  **Strict Layout Wrapping**: Wrap filenames, email addresses, and titles with truncate classes (`truncate` or `line-clamp-1`) to prevent boundary overflows in the 380px popup.
4.  **No Direct CSS Files**: Keep CSS modifications confined to `globals.css` and `variables.css`. Style custom components using Tailwind utility classes or custom theme configuration tokens.
5.  **Preserve State Transition Indicators**: When triggering database writes or network queries, disable buttons, swap button labels with loading indicators, and show skeleton overlays immediately.
