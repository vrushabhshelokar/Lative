# Coding_Standards.md

# Lative v1.0 Coding Standards

**Version:** 1.0 (MVP)

---

# Purpose

This document defines the coding standards, conventions, and engineering practices for the Lative codebase.

Every contributor should follow these standards to ensure the project remains:

- Consistent
- Readable
- Maintainable
- Scalable
- Type-safe

These standards apply to the entire repository.

---

# Core Principles

Every piece of code should prioritize:

1. Readability
2. Simplicity
3. Maintainability
4. Reliability
5. Type Safety
6. Reusability
7. Performance

Code is written once but read many times.

---

# General Rules

Always:

- Write clear code.
- Keep functions small.
- Prefer composition over inheritance.
- Keep business logic separate from UI.
- Write predictable code.
- Remove dead code.
- Prefer explicit behavior.

Never:

- Write unnecessary abstractions.
- Mix UI and storage logic.
- Use global mutable state.
- Ignore TypeScript errors.
- Commit commented-out code.

---

# TypeScript Rules

Use TypeScript strictly.

Never use:

```ts
any
```

Instead prefer:

```ts
unknown
```

or proper interfaces.

---

## Explicit Types

Prefer explicit interfaces.

Good

```ts
interface Resume {
    id: string;
    fileName: string;
}
```

Avoid

```ts
const resume = {};
```

---

## Null Safety

Always handle:

- undefined
- null
- optional values

Never assume values exist.

---

## Enums

Prefer union types over enums when practical.

Good

```ts
type Theme = "light" | "dark" | "system";
```

Avoid unnecessary enums.

---

# React Standards

Use only:

- Functional Components
- Hooks

Never use:

- Class Components

---

## Component Size

Ideal

```text
< 200 lines
```

Maximum

```text
300 lines
```

Split large components.

---

## Component Responsibility

Each component should have one responsibility.

Example

Good

```text
ResumeCard
```

Bad

```text
ResumePageEverything
```

---

## Props

Always define interfaces.

Example

```ts
interface ResumeCardProps {
    fileName: string;
}
```

---

## State

Keep state local whenever possible.

Lift state only when necessary.

---

# Hooks

Hooks should:

- Start with `use`
- Be reusable
- Encapsulate logic
- Avoid side effects during render

Example

```text
useResume()

useTheme()

useToast()
```

---

# Services

Business logic belongs in services.

Services should:

- Perform one task
- Return predictable results
- Avoid UI manipulation

Good

```text
uploadResume()

deleteResume()

replaceResume()
```

---

# Storage Layer

Storage functions should only:

- Read
- Write
- Update
- Delete

No validation.

No business rules.

No UI.

---

# Validation

Validation belongs in dedicated validators.

Example

```text
validateResume()

validateEmail()

validateLink()
```

Validators should return structured results.

Example

```ts
{
    valid: true
}
```

or

```ts
{
    valid: false,
    message: "Invalid PDF"
}
```

---

# Utility Functions

Utilities must be:

- Pure
- Deterministic
- Reusable

No side effects.

Good

```text
formatDate()

generateId()

formatFileSize()
```

---

# Constants

Avoid magic numbers.

Good

```ts
const MAX_RESUME_SIZE = 10 * 1024 * 1024;
```

Avoid

```ts
10485760
```

---

# Naming Conventions

## Variables

camelCase

```ts
resumeFile
```

---

## Functions

camelCase

Verb-based

```ts
uploadResume()

copyLink()

deleteCertificate()
```

---

## Components

PascalCase

```text
ResumeCard

ThemeToggle

UploadDialog
```

---

## Interfaces

PascalCase

```ts
interface Resume
```

---

## Types

PascalCase

```ts
type Theme
```

---

## Constants

UPPER_SNAKE_CASE

```ts
MAX_FILE_SIZE
```

---

## Files

camelCase

Good

```text
resumeCard.tsx
```

Avoid

```text
Resume_card.tsx
```

---

# Folder Ownership

Each folder has one responsibility.

| Folder | Responsibility |
|----------|----------------|
| components | UI |
| hooks | React logic |
| services | Business logic |
| storage | Database |
| validators | Validation |
| types | Models |
| utils | Helpers |

Never violate this separation.

---

# Import Rules

Prefer absolute imports.

Good

```ts
import Button from "@/shared/components/Button";
```

Avoid deep relative imports.

Bad

```ts
../../../Button
```

---

# Dependency Rules

Shared code may be imported by modules.

Modules should not depend directly on other modules.

Good

```text
Module

↓

Shared
```

Avoid

```text
Resume

↓

Cart
```

---

# Error Handling

Never ignore errors.

Always handle:

- Promise rejection
- Storage failure
- Parsing failure
- Network failure

Use meaningful error messages.

Avoid silent failures.

---

# Async Rules

Always use:

```ts
async/await
```

Avoid nested `.then()` chains.

Handle errors with:

```ts
try {
} catch {
}
```

---

# Comments

Comment only when necessary.

Explain:

- Why

Avoid explaining:

- What

Bad

```ts
// Increment i
i++;
```

Good

```ts
// PDF parsing requires sequential processing to preserve page order.
```

---

# Styling

Use:

- Tailwind CSS

Avoid inline styles unless unavoidable.

Prefer reusable utility classes.

---

# CSS Rules

Global styles belong only in:

```text
styles/
```

Component-specific styling should stay with the component.

Avoid duplicated styles.

---

# Animation

Keep animations subtle.

Recommended duration

```text
180–250ms
```

Never animate for decoration alone.

---

# Database Rules

Every database write should:

- Validate input first.
- Return success/failure.
- Never corrupt existing data.

Use transactions when modifying multiple related records.

---

# Resume Rules

Never parse the same PDF twice.

Always use stored parsed data.

Replacing a resume should overwrite the associated parsed data.

---

# AI Rules

Only send the minimum required context.

Never send:

- Entire database
- Certificates
- User settings

Keep prompts deterministic.

---

# Logging

Development

Allowed

```ts
console.log()
console.warn()
console.error()
```

Production

Remove:

- Debug logs
- Verbose logs

Never log:

- Resume text
- Gemini API Key
- User documents
- Parsed resume data

---

# Performance Rules

Avoid unnecessary:

- Re-renders
- Database reads
- Object creation
- Memoization (unless beneficial)

Optimize only when measurements justify it.

---

# Accessibility

Every interactive element should:

- Support keyboard navigation
- Show visible focus
- Have accessible labels
- Meet contrast requirements

---

# Testing Expectations

Every feature should be tested for:

- Happy path
- Invalid input
- Duplicate input
- Empty state
- Error handling
- Persistence
- Recovery

---

# File Length Guidelines

Recommended maximums:

| File Type | Recommended |
|-----------|------------:|
| Component | 200 lines |
| Hook | 150 lines |
| Service | 150 lines |
| Utility | 100 lines |
| Validator | 100 lines |

Large files should be split by responsibility.

---

# Function Guidelines

Functions should:

- Do one thing
- Return one responsibility
- Be easy to test

Avoid deeply nested logic.

Return early when possible.

---

# Git Commit Style

Recommended format:

```text
feat: add resume upload validation

fix: prevent duplicate cart entries

refactor: extract AI prompt builder

docs: update storage specification

test: add parser validation tests
```

---

# Pull Request Expectations

Every pull request should:

- Solve one problem
- Pass linting
- Pass type checking
- Pass tests (when available)
- Avoid unrelated changes
- Include documentation updates if behavior changes

---

# Refactoring Rules

Refactor only when it:

- Improves readability
- Reduces duplication
- Simplifies maintenance
- Preserves behavior

Avoid large refactors mixed with feature development.

---

# Security Rules

Validate all user input.

Validate imported backups.

Validate uploaded files.

Never trust browser input blindly.

Sanitize data before processing when appropriate.

---

# Browser API Usage

Wrap Chrome APIs inside dedicated utility or service layers.

Avoid calling Chrome APIs directly throughout the UI.

This makes testing and future browser compatibility easier.

---

# Documentation

Every public service or reusable utility should have clear documentation or self-explanatory naming.

Complex modules should include a short `README.md` describing:

- Purpose
- Public API
- Dependencies
- Notes

---

# Definition of Done

Code is considered complete only when:

- Type-safe
- Readable
- Linted
- Formatted
- Tested manually
- Error handled
- Documentation updated
- No unnecessary TODOs
- No debug logs
- No dead code

---

# Final Coding Principle

Write code as if someone unfamiliar with the project will maintain it in a year. Prefer clarity over cleverness, consistency over shortcuts, and simple, well-structured solutions over unnecessary complexity. Every line of code should make the project easier—not harder—to evolve.