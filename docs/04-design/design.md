# Lative v1.0 Design System

**Version:** 1.0 (MVP)

---

# Design Philosophy

Lative should feel like a **premium productivity application**, not a traditional browser extension.

The interface should communicate:

- Simplicity
- Trust
- Speed
- Privacy
- Professionalism

Every screen should feel clean, intentional, and distraction-free.

The design philosophy is:

> **Less Interface. More Work.**

---

# Design Principles

## 1. Minimal

Only display information that is immediately useful.

Avoid unnecessary icons, labels, decorations, and visual noise.

---

## 2. Premium

The interface should resemble products like:

- Raycast
- Arc Browser
- Linear
- Notion
- Vercel Dashboard
- Apple Settings
- Cursor IDE

Not flashy.

Elegant.

---

## 3. Functional

Every visual element must have a purpose.

Nothing should exist purely for decoration.

---

## 4. Consistent

Every module must follow identical interaction patterns.

Users should never have to relearn the interface.

---

## 5. Fast

The UI should always feel responsive.

Animations should enhance—not delay—the experience.

---

# Overall Layout

Popup Layout

```
┌─────────────────────────────┐
│        Header               │
├─────────────────────────────┤
│ Navigation                  │
├─────────────────────────────┤
│                             │
│ Module Content              │
│                             │
├─────────────────────────────┤
│ Footer (optional)           │
└─────────────────────────────┘
```

---

# Popup Size

Width:

```
400px
```

Preferred Height:

```
600px
```

Maximum Height:

```
700px
```

Scrollable content only.

The overall popup should never scroll unless required.

---

# Navigation

Order

```
Links

Mail

Resume

Certificate

AI

Cart

Settings
```

Navigation Style

- Compact
- Rounded
- Segmented
- Soft background
- Active indicator

No side navigation.

Horizontal top navigation only.

---

# Header

Contains:

- Lative Logo
- Version (optional)
- Theme Toggle (optional)

Simple.

No large branding.

---

# Typography

## Font Family

Primary

```
Inter
```

Fallback

```
system-ui
```

---

## Font Scale

### Page Title

24px

Weight

700

---

### Section Title

18px

Weight

600

---

### Card Title

16px

Weight

600

---

### Normal Text

14px

Weight

400

---

### Secondary Text

13px

Weight

400

---

### Caption

12px

Weight

400

---

### Button Text

14px

Weight

500

---

# Line Heights

Headings

```
1.2
```

Body

```
1.5
```

Small Text

```
1.4
```

---

# Spacing System

Use an 8px spacing system.

Available spacing

```
4

8

12

16

20

24

32

40

48
```

Never use arbitrary spacing values.

---

# Border Radius

Small

```
8px
```

Medium

```
12px
```

Large

```
16px
```

Cards

```
18px
```

Popup Container

```
20px
```

---

# Shadows

Use extremely soft shadows.

Cards

```
Very Light
```

Dialogs

```
Medium
```

Dropdown

```
Medium
```

Avoid heavy shadows.

---

# Color Philosophy

Neutral-first.

Avoid overly saturated colors.

Accent colors only for interaction.

---

## Light Theme

Background

```
#FFFFFF
```

Secondary Background

```
#F7F7F8
```

Card

```
#FFFFFF
```

Border

```
#E5E7EB
```

Primary Text

```
#111827
```

Secondary Text

```
#6B7280
```

---

## Dark Theme

Background

```
#0F1115
```

Secondary Background

```
#171A21
```

Card

```
#1E222B
```

Border

```
#2D3442
```

Primary Text

```
#F9FAFB
```

Secondary Text

```
#A1A1AA
```

---

# Accent Color

Single premium Violet accent used consistently across themes for interactive states.

* **Light & Dark Accent Color:**
  * **Default (Solid):** HSL `239 84.3% 66.7%` / Hex `#6366F1` (Tailwind indigo-500 equivalent)
  * **Hover State:** HSL `243 75.4% 58.6%` / Hex `#4F46E5` (Tailwind indigo-600 equivalent)

Used for:

- Active tabs
- Buttons
- Links
- Focus
- Toggle
- Progress

Avoid multiple accent colors.

---

# Buttons

Primary

Filled

Rounded

Medium height

---

Secondary

Outlined

---

Ghost

Transparent

---

Danger

Only for destructive actions.

---

Button Heights

Small

36px

Medium

40px

Large

48px

---

# Inputs

Rounded

Consistent height

40px

Placeholder

Muted

Focus

Accent border

No heavy outlines.

---

# Cards

Every module uses cards.

Cards contain:

Title

Actions

Optional metadata

Equal padding

Equal spacing

---

# Resume Card

```
┌─────────────────────────────┐
│ 📄 Java_Resume.pdf          │
│                             │
│ Open Replace Copy Delete    │
└─────────────────────────────┘
```

No unnecessary information.

---

# Certificate Card

Identical layout.

Maintain consistency.

---

# Link Card

```
LinkedIn

Copy

Edit

Delete
```

---

# Mail Card

```
example@gmail.com

Copy

Edit

Delete
```

---

# Cart Card

```
Microsoft Careers

Open

Copy

Delete
```

Simple.

---

# AI Layout

Top

Resume Selector

↓

Quick Actions

↓

Conversation

↓

Prompt Box

↓

Send Button

---

# AI Chat

User

Right aligned

Assistant

Left aligned

Rounded message bubbles

Comfortable spacing

---

Quick Actions

Examples

- Profile Summary
- Compare JD
- Missing Skills
- Best Resume
- Analyze Current Page

Displayed as small chips.

---

# Empty States

Every module should have an elegant empty state.

Example

Resume

```
No resumes added.

Upload your first resume.
```

AI

```
Add your Gemini API Key to start chatting.
```

Cart

```
No saved websites.
```

Never leave blank screens.

---

# Loading States

Use skeleton loaders.

Avoid spinners whenever possible.

---

# Toasts

Position

Bottom

Small

Auto dismiss

Examples

```
Resume uploaded.

Website saved.

Copied.

Deleted.
```

Duration

```
2 seconds
```

---

# Dialogs

Rounded

Centered

Minimal

Confirmation dialogs only when necessary.

---

# Delete Confirmation

Should include

Title

Description

Cancel

Delete

Delete button should always be highlighted as destructive.

---

# Scrollbars

Thin

Minimal

Match theme.

---

# Animations

Duration

```
180–250ms
```

Use

- Fade
- Scale
- Slide

Avoid:

- Bounce
- Elastic
- Flashy transitions

Animations should feel invisible.

---

# Icons

Use only

Lucide Icons

Maintain one icon style.

Avoid mixing icon libraries.

---

# Accessibility

Maintain:

- Keyboard navigation
- Focus states
- Color contrast
- Large click targets
- Readable typography

---

# Theme Behavior

Support

- System
- Light
- Dark

Theme switching should happen instantly.

---

# Responsive Behavior

Primary target

Popup

Secondary target

Side Panel

The layout should adapt naturally without redesign.

---

# Visual Consistency Rules

Every module must follow the same hierarchy:

1. Module Title
2. Primary Action
3. Content Cards
4. Empty State (if applicable)

No module should introduce its own layout pattern.

---

# Interaction Rules

Primary actions should always be obvious.

Destructive actions should require confirmation only when data loss is permanent.

Hover states should be subtle.

Focus states should be clearly visible.

Disabled controls should remain readable.

---

# Microinteractions

Include subtle feedback for:

- Button presses
- Successful uploads
- Copy actions
- Save actions
- Toggle changes
- Theme changes
- AI responses
- File replacements

Feedback should be immediate and lightweight.

---

# Design Language

The entire extension should communicate:

- Professional
- Calm
- Trustworthy
- Modern
- Minimal
- Efficient
- Private

The user should never feel overwhelmed.

Every screen should feel intentional.

---

# Final Design Goal

When someone opens Lative for the first time, the interface should feel immediately familiar, polished, and effortless to use—like a modern desktop productivity tool rather than a typical browser extension. Every interaction should reinforce speed, clarity, and confidence while keeping the focus on helping users complete job applications with minimal friction.