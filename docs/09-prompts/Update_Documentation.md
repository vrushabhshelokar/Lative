# Update_Documentation.md

# Lative Development Prompt — Update Documentation

## Role

You are a senior software engineer responsible for keeping **Lative's documentation** accurate, complete, and synchronized with the codebase.

Documentation is a first-class part of the project.

Every document inside `/docs` is considered part of the production system.

Documentation must always reflect the actual implementation.

---

# Primary Objective

Update only the documentation affected by the requested changes.

Never modify documentation unnecessarily.

Preserve existing structure, formatting, and writing style.

---

# Step 1 — Read Existing Documentation

Before editing anything, review the relevant documentation inside:

```text
/docs
```

Treat `/docs` as the project's **single source of truth**.

Review every document that may be affected, including:

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

Also review any additional documentation inside `/docs`.

Never edit documentation in isolation.

Always understand the surrounding context first.

---

# Step 2 — Understand the Change

Determine:

- What changed?
- Why did it change?
- Which features are affected?
- Does it change user behavior?
- Does it change architecture?
- Does it change storage?
- Does it change messaging?
- Does it change project decisions?
- Does it introduce new limitations?
- Does it fix a bug?
- Does it complete a project phase?

Only update documents that are actually affected.

---

# Step 3 — Identify Documentation to Update

Determine which documents require modification.

Possible documents include:

## Product

- Product_Requirements_Document.md

---

## Architecture

- Architecture.md

---

## Rules

- Rules.md

---

## Design

- Design.md

---

## Development

- Phases.md

---

## Storage

- Storage.md

---

## Messaging

- Messaging.md

---

## Folder Structure

- Folder_Structure.md

---

## Features

- Features.md

---

## Coding Standards

- Coding_Standards.md

---

## Decisions

- Decisions.md

---

## Testing

- Testing_Checklist.md

---

## Edge Cases

- Edge_Cases.md

---

## Release

- Release_Checklist.md

---

## Project Tracking

- Memory.md
- Completed.md
- Changelog.md
- Known_Bugs.md

---

## Future Documents

Include any additional documentation inside `/docs` that is affected.

---

# Step 4 — Preserve Documentation Integrity

When editing:

- Preserve existing organization.
- Preserve formatting.
- Preserve writing style.
- Preserve terminology.
- Preserve section hierarchy.

Avoid unnecessary rewrites.

Update only what has changed.

---

# Step 5 — Keep Documents Consistent

After making updates:

Verify all related documents remain consistent.

Examples:

If a feature changes:

Update:

- Product Requirements
- Features
- Testing
- Edge Cases

If storage changes:

Update:

- Storage
- Architecture
- Decisions

If messaging changes:

Update:

- Messaging
- Architecture

If project scope changes:

Update:

- Product Requirements
- Features
- Decisions
- Release Checklist

Never allow conflicting documentation.

---

# Step 6 — Memory.md

If implementation progress changes:

Update:

- Current development status
- Active module
- Current architecture state
- Important implementation notes
- Remaining work

Keep Memory.md concise and current.

---

# Step 7 — Completed.md

Record completed work.

Include:

- Completed feature
- Completion date (if used by the project)
- Brief summary
- Important implementation notes

Only record completed work.

---

# Step 8 — Changelog.md

Record user-visible changes.

Typical entries include:

- New features
- Improvements
- Bug fixes
- Performance improvements
- Refactoring with visible impact

Do not include internal implementation details unless relevant.

Follow the existing changelog format.

---

# Step 9 — Known_Bugs.md

If bugs are:

Resolved

Remove or mark them appropriately.

New

Add:

- Description
- Severity
- Status
- Workaround (if available)

Keep Known_Bugs.md current.

---

# Step 10 — Decision Review

Determine whether implementation introduces a new permanent project decision.

If yes:

Update:

```text
Decisions.md
```

Record:

- Decision
- Reason
- Impact

Do not overwrite historical decisions.

Append new ones.

---

# Step 11 — Architecture Review

If implementation changes:

- Module ownership
- Folder structure
- Storage flow
- Messaging flow
- Execution flow
- Dependencies

Update:

```text
Architecture.md
```

Only modify affected sections.

---

# Step 12 — Feature Review

If user-facing functionality changes:

Update:

```text
Features.md
```

Ensure:

- Flows remain accurate.
- Validation rules remain accurate.
- Supported behaviors are complete.

---

# Step 13 — Testing Review

If behavior changes:

Update:

- Testing_Checklist.md
- Edge_Cases.md
- Release_Checklist.md

Ensure testing reflects current functionality.

---

# Step 14 — Consistency Check

After all edits, verify:

- No contradictions between documents.
- No outdated information.
- No duplicated information.
- No missing references.
- Terminology is consistent.

Documentation should describe one coherent system.

---

# Step 15 — Documentation Summary

Provide:

## Documents Reviewed

List all reviewed documents.

---

## Documents Updated

List modified documents.

---

## Documents Unchanged

List reviewed documents that required no changes.

---

## Summary of Updates

Brief explanation of what changed.

---

## New Decisions

List any newly recorded decisions.

If none:

```text
None.
```

---

## New Known Bugs

List any newly documented bugs.

If none:

```text
None.
```

---

## Resolved Known Bugs

List resolved bugs.

If none:

```text
None.
```

---

# Step 16 — Final Validation

Verify documentation now accurately reflects:

- Current implementation
- Product behavior
- Architecture
- Storage
- Messaging
- Rules
- Testing strategy
- Project status

There should be no contradictions.

---

# Final Checklist

Before considering documentation complete, verify:

- Relevant documentation reviewed
- Affected documents identified
- Only necessary documents modified
- Formatting preserved
- Style preserved
- Terminology consistent
- Cross-document consistency verified
- Memory.md reviewed
- Completed.md reviewed
- Changelog.md reviewed
- Known_Bugs.md reviewed
- Decisions.md updated if required
- Architecture updated if required
- Features updated if required
- Testing documents updated if required
- Documentation summary provided

Documentation is considered complete only when every affected document accurately reflects the current state of the project and remains consistent with the rest of the `/docs` directory.