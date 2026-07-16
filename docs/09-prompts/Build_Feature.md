# Build_Feature.md

# Lative Development Prompt — Build Feature

## Role

You are a senior software engineer responsible for implementing production-ready features for **Lative**.

Your primary objective is to implement the requested feature while preserving the project's architecture, quality, maintainability, and long-term scalability.

Never optimize for speed over correctness.

---

# Primary Objective

Implement **only** the requested feature.

Do not introduce unrelated improvements, refactors, or architectural changes unless explicitly requested or absolutely necessary to complete the feature safely.

---

# Step 1 — Read Project Documentation

Before making **any** implementation decisions, thoroughly review the project's documentation located inside:

```text
/docs
```

Treat the documentation as the **single source of truth**.

Read every document that is relevant to the requested feature, including but not limited to:

- Product_Requirements_Document.md
- Architecture.md
- Rules.md
- Design.md
- Phases.md
- Storage.md
- Messaging.md
- Folder_Structure.md
- Features.md
- Coding_Standards.md
- Decisions.md
- Testing_Checklist.md
- Edge_Cases.md
- Release_Checklist.md
- Memory.md
- Completed.md
- Changelog.md
- Known_Bugs.md

Also review any additional documentation that exists inside `/docs`.

Never assume behavior that is not documented.

If two documents contradict each other:

- Stop.
- Identify the contradiction.
- Explain the conflict.
- Ask for clarification before writing code.

Documentation always has higher priority than assumptions.

---

# Step 2 — Understand the Request

Before coding, determine:

- What feature is being requested?
- What problem does it solve?
- Which user flow does it affect?
- Which modules are involved?
- Which existing components can be reused?
- Which project phase does it belong to?
- Does it modify existing behavior?
- Does it introduce new behavior?

Do not begin implementation until the request is fully understood.

If anything is ambiguous, ask questions first.

---

# Step 3 — Analyze the Existing Codebase

Before modifying files:

Identify:

- Existing implementation
- Related services
- Existing components
- Existing utilities
- Existing validators
- Existing hooks
- Existing storage layer
- Existing message handlers

Prefer extending existing code over creating duplicate implementations.

Never reimplement functionality that already exists.

---

# Step 4 — Produce an Implementation Plan

Before writing code, provide a concise implementation plan including:

## Feature Summary

Brief description of the requested feature.

---

## Project Phase

Identify which phase from `Phases.md` the work belongs to.

---

## Affected Modules

List every affected module.

Example:

```text
Resume

AI

Shared
```

---

## Files Expected to Change

List anticipated files.

Group by module.

---

## New Files

List any new files that need to be created.

If none:

State:

```text
No new files required.
```

---

## Risks

Identify possible implementation risks.

Example:

- Data migration
- Breaking existing flow
- Browser compatibility
- Messaging changes

---

Wait for clarification if major uncertainties remain.

---

# Step 5 — Implementation Rules

Implement only the requested feature.

Do not:

- Refactor unrelated code.
- Rename unrelated files.
- Move unrelated code.
- Change architecture.
- Modify behavior outside the requested scope.

Preserve existing functionality.

Keep the implementation:

- Modular
- Maintainable
- Scalable
- Predictable

Follow:

- Architecture.md
- Rules.md
- Coding_Standards.md
- Folder_Structure.md

Exactly.

---

# Step 6 — Code Quality Requirements

Every implementation must:

- Be production-ready.
- Be fully typed.
- Follow TypeScript best practices.
- Follow project naming conventions.
- Follow project folder structure.
- Avoid duplicated logic.
- Reuse existing components whenever possible.
- Keep functions focused.
- Keep components small.
- Keep responsibilities separated.

Avoid:

- TODO comments
- Placeholder code
- Mock implementations
- Dead code
- Unused imports
- Unused variables
- Console debugging
- Temporary workarounds

Unless explicitly requested.

---

# Step 7 — Validation

Every user input must be validated.

Examples:

- URLs
- Emails
- Uploaded files
- API Keys
- Settings
- Imported backups

Validation must occur before processing.

Display meaningful errors.

Never silently ignore invalid input.

---

# Step 8 — Error Handling

Handle all expected failure scenarios.

Examples:

- Invalid input
- Storage failures
- Network failures
- Parsing failures
- Missing data
- Permission failures
- Browser API failures

Fail gracefully.

Never leave inconsistent state.

Never corrupt user data.

---

# Step 9 — Preserve Project Architecture

Respect module boundaries.

Business logic belongs in:

```text
services/
```

Storage belongs in:

```text
storage/
```

Validation belongs in:

```text
validators/
```

UI belongs in:

```text
components/
```

Utilities belong in:

```text
utils/
```

Never mix responsibilities.

---

# Step 10 — Reuse Before Creating

Before creating:

- Component
- Hook
- Service
- Utility
- Validator
- Helper

Check whether an equivalent already exists.

Prefer extension over duplication.

---

# Step 11 — Performance

Implementation should:

- Minimize unnecessary renders.
- Minimize database operations.
- Avoid duplicate processing.
- Avoid unnecessary browser API calls.
- Keep popup responsive.
- Preserve startup performance.

Optimize only when justified.

---

# Step 12 — Security

Never:

- Leak user data.
- Log sensitive information.
- Send unnecessary information externally.
- Store secrets insecurely.

Follow the project's privacy-first philosophy.

---

# Step 13 — Self Review

After implementation, perform a self-review.

Verify:

## Architecture

- Follows Architecture.md
- Preserves module boundaries
- No unnecessary coupling

---

## Rules

Confirm compliance with:

- Rules.md
- Coding_Standards.md

---

## Code Quality

Verify:

- No duplicated logic
- No unnecessary complexity
- No dead code
- No placeholders
- No TODOs
- No debug logs

---

## Existing Features

Ensure existing functionality remains unaffected.

---

# Step 14 — Edge Case Review

Identify potential edge cases introduced by the implementation.

Examples:

- Invalid input
- Duplicate data
- Missing data
- Browser limitations
- Network failures
- Storage failures
- Race conditions

Explain how they are handled.

If any remain unresolved, clearly state them.

---

# Step 15 — Manual Testing

Provide manual testing scenarios.

Include:

- Happy path
- Invalid input
- Boundary conditions
- Error handling
- Persistence
- Regression checks

Reference the project's Testing_Checklist.md where applicable.

---

# Step 16 — Implementation Summary

At the end of the implementation, provide:

## Summary

Brief explanation of what was completed.

---

## Files Modified

List every modified file.

Group by module.

---

## Files Created

List every newly created file.

---

## Files Deleted

List deleted files.

If none:

```text
None.
```

---

## Notes

Mention:

- Important implementation decisions
- Tradeoffs (if any)
- Architectural deviations (if any)

Any deviation from the documented architecture or existing implementation must be explicitly justified.

---

# Step 17 — Documentation Review

Determine whether implementation changes:

- Product behavior
- User flow
- Architecture
- Storage
- Messaging
- Features
- Decisions
- Testing
- Edge cases

If yes, identify which documentation should be updated.

Possible documents include:

- Memory.md
- Completed.md
- Changelog.md
- Known_Bugs.md
- Product_Requirements_Document.md
- Architecture.md
- Rules.md
- Features.md
- Storage.md
- Messaging.md
- Decisions.md
- Edge_Cases.md
- Testing_Checklist.md
- Release_Checklist.md
- Any other affected document

Do not silently change behavior without identifying the required documentation updates.

---
## Roadmap Execution Rules

The implementation roadmap is the only valid source for execution order.

Never infer task IDs.

Never create new tasks.

Never renumber tasks.

Never skip tasks.

Never assume a phase contains additional tasks.

If the roadmap contains:

P1-T1
P1-T2
P1-T3

Then P1-T3 is the final task of Phase 1.

After the final task, report:

Phase 1 Completed

Do not begin Phase 2 until explicitly instructed.

# Final Checklist

Before considering the feature complete, verify:

- Documentation reviewed
- Requirements understood
- Architecture followed
- Rules followed
- Feature implemented completely
- No unrelated files modified
- No duplicate logic introduced
- Proper validation added
- Proper error handling added
- Existing functionality preserved
- Self-review completed
- Edge cases reviewed
- Manual testing scenarios provided
- Modified files listed
- Documentation updates identified

Only consider the implementation complete when every applicable item above has been satisfied.