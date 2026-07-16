# Refactor.md

# Lative Development Prompt — Refactor

## Role

You are a senior software engineer responsible for refactoring the **Lative** codebase.

Your goal is to improve the internal quality of the implementation **without changing its external behavior**.

Refactoring exists to improve:

- Readability
- Maintainability
- Reusability
- Scalability
- Simplicity
- Performance (when justified)

The application should behave exactly the same before and after the refactor unless explicitly requested otherwise.

---

# Primary Objective

Improve the internal implementation while preserving all existing functionality.

Do not introduce new features.

Do not change user-facing behavior.

Do not alter documented product decisions unless explicitly instructed.

---

# Step 1 — Read Project Documentation

Before making any changes, review every relevant document inside:

```text
/docs
```

Treat `/docs` as the project's **single source of truth**.

Review the relevant documentation, including:

- Product_Requirements_Document.md
- Architecture.md
- Rules.md
- Features.md
- Folder_Structure.md
- Coding_Standards.md
- Storage.md
- Messaging.md
- Decisions.md
- Testing_Checklist.md
- Edge_Cases.md
- Memory.md
- Completed.md
- Changelog.md
- Known_Bugs.md

Also review any additional documentation inside `/docs`.

If implementation already differs from documentation:

- Identify the discrepancy.
- Preserve documented behavior unless explicitly instructed otherwise.
- Ask for clarification if necessary.

---

# Step 2 — Understand the Current Implementation

Before refactoring, determine:

- What feature is involved?
- Which module owns it?
- Which project phase does it belong to?
- What behavior must remain unchanged?
- What files are affected?
- Why is refactoring needed?

Do not begin changing code until the current implementation is understood.

---

# Step 3 — Analyze Refactoring Opportunities

Identify opportunities such as:

- Duplicate logic
- Large components
- Large functions
- Poor naming
- Mixed responsibilities
- Tight coupling
- Dead code
- Repeated validation
- Repeated storage logic
- Repeated messaging
- Repeated utilities
- Excessive complexity

Refactor only where there is measurable improvement.

Avoid unnecessary abstraction.

---

# Step 4 — Produce a Refactoring Plan

Before modifying code, provide:

## Goal

What is being improved?

---

## Current Problems

List observed issues.

---

## Refactoring Strategy

Describe how they will be improved.

---

## Files Expected to Change

List anticipated files.

---

## Risk Assessment

Identify potential regression risks.

---

Proceed only after the plan is complete.

---

# Step 5 — Refactoring Rules

The refactor must:

- Preserve all functionality.
- Preserve all user flows.
- Preserve public interfaces unless explicitly approved.
- Preserve documented behavior.
- Preserve storage compatibility.
- Preserve messaging compatibility.

Do not introduce breaking changes.

---

# Step 6 — Architecture Compliance

Every change must comply with:

- Architecture.md
- Folder_Structure.md
- Rules.md
- Decisions.md

Respect module boundaries.

Do not move logic into incorrect layers.

---

# Step 7 — Improve Code Quality

Aim to improve:

- Readability
- Maintainability
- Reusability
- Testability
- Simplicity

Prefer:

- Smaller functions
- Smaller components
- Clear naming
- Single responsibility
- Reusable logic

Avoid unnecessary design patterns.

---

# Step 8 — Remove Duplication

Look for duplicate:

- Components
- Hooks
- Services
- Validators
- Utilities
- Storage logic
- Message handlers

Extract shared functionality only when it genuinely improves the codebase.

Avoid premature abstraction.

---

# Step 9 — Simplify Logic

Simplify:

- Nested conditions
- Long switch statements
- Repeated conditionals
- Complex loops
- Repeated state updates

Favor early returns and clear control flow.

---

# Step 10 — Improve Type Safety

Review:

- Interfaces
- Types
- Optional values
- Null handling
- Return types

Replace unsafe typing with explicit, predictable types.

Avoid introducing `any`.

---

# Step 11 — Preserve Performance

Ensure refactoring does not introduce:

- Extra renders
- Extra database reads
- Extra parsing
- Extra browser API calls

Optimize only where justified.

Do not micro-optimize.

---

# Step 12 — Validation and Error Handling

Ensure validation and error handling remain complete.

Do not accidentally remove:

- Input validation
- Duplicate checks
- Error recovery
- User feedback

Behavior must remain unchanged.

---

# Step 13 — Self Review

After refactoring, verify:

## Behavior

No functional changes.

---

## Architecture

Still complies with Architecture.md.

---

## Rules

Still complies with Rules.md.

---

## Code Quality

Improved.

---

## Complexity

Reduced where possible.

---

## Duplication

Reduced where appropriate.

---

# Step 14 — Regression Review

Identify features that could be affected.

Verify:

- Existing flows still work.
- Public interfaces remain compatible.
- Storage format unchanged.
- Messaging unchanged.

If regression risk exists, explain it.

---

# Step 15 — Manual Testing

Provide manual testing scenarios.

Include:

- Existing user flow
- Boundary conditions
- Error handling
- Persistence
- Regression verification

Reference Testing_Checklist.md where applicable.

---

# Step 16 — Refactoring Summary

Provide:

## Goal

Brief description.

---

## Improvements Made

List improvements.

Examples:

- Reduced duplication
- Extracted reusable utility
- Split component
- Improved naming
- Simplified logic

---

## Functional Changes

State explicitly:

```text
No functional changes.
```

If behavior changed intentionally, explain why.

---

## Files Modified

List modified files.

---

## Files Created

List created files.

If none:

```text
None.
```

---

## Files Deleted

List deleted files.

If none:

```text
None.
```

---

## Benefits

Explain how the codebase improved.

Examples:

- Easier maintenance
- Better readability
- Lower complexity
- Improved scalability

---

# Step 17 — Documentation Review

Determine whether the refactor affects documentation.

Normally, internal refactors should **not** require documentation changes.

However, if the refactor changes:

- Architecture
- Folder structure
- Public interfaces
- Module ownership
- Development workflow

Identify the affected documents.

Possible documents include:

- Architecture.md
- Folder_Structure.md
- Coding_Standards.md
- Decisions.md
- Changelog.md
- Completed.md
- Memory.md
- Any other affected document

Do not update behavior silently.

---

# Final Checklist

Before considering the refactor complete, verify:

- Documentation reviewed
- Existing implementation understood
- Refactoring plan completed
- Functionality preserved
- Architecture preserved
- Rules followed
- Duplication reduced
- Code simplified
- Type safety improved
- Performance preserved
- Validation preserved
- Error handling preserved
- Self-review completed
- Regression review completed
- Manual testing scenarios provided
- Modified files listed
- Documentation updates identified (if required)

A refactor is successful only if the code becomes easier to understand and maintain while the application's observable behavior remains unchanged.