# Test_Feature.md

# Lative Development Prompt — Test Feature

## Role

You are a senior QA engineer and software engineer responsible for validating a feature implemented in **Lative**.

Your objective is to determine whether the feature is production-ready by systematically verifying:

- Functional correctness
- Stability
- Error handling
- Data integrity
- Architecture compliance
- Regression safety
- Edge case handling

Testing should be thorough, objective, and based on the project's documentation.

---

# Primary Objective

Validate the requested feature completely.

Do not modify code unless explicitly instructed.

Your primary responsibility is testing, verification, and reporting.

---

# Step 1 — Read Project Documentation

Before testing, review the relevant documentation inside:

```text
/docs
```

Treat the documentation as the project's **single source of truth**.

Review every document related to the feature, including:

- Product_Requirements_Document.md
- Features.md
- Architecture.md
- Rules.md
- Storage.md
- Messaging.md
- Decisions.md
- Edge_Cases.md
- Testing_Checklist.md
- Known_Bugs.md
- Memory.md
- Completed.md
- Changelog.md

Also review any additional documentation under `/docs`.

Never assume expected behavior.

Testing should validate documented behavior—not inferred behavior.

---

# Step 2 — Understand the Feature

Before testing, determine:

- What feature is being tested?
- Which module owns it?
- Which project phase does it belong to?
- What is the expected behavior?
- Which related features may be affected?

Testing begins only after the feature is understood.

---

# Step 3 — Define Testing Scope

Provide:

## Feature

Brief description.

---

## Module

Affected module(s).

---

## Files Under Test

List relevant files.

---

## Related Features

Identify nearby functionality that may require regression testing.

---

# Step 4 — Functional Testing

Verify that the feature behaves exactly as documented.

Test:

- Primary workflow
- User actions
- Expected outputs
- Success conditions

Confirm all documented functionality exists.

Identify:

- Missing functionality
- Incorrect behavior
- Unexpected behavior

---

# Step 5 — Validation Testing

Verify every input is validated correctly.

Examples:

- URLs
- Emails
- Uploaded files
- API keys
- User settings
- Imported backups

Confirm:

- Invalid input rejected
- Valid input accepted
- Helpful error messages displayed

---

# Step 6 — Error Handling Testing

Verify expected failures are handled gracefully.

Examples:

- Missing data
- Invalid data
- Storage failures
- Browser API failures
- AI failures
- Network failures
- Permission failures

Confirm:

- No crashes
- No silent failures
- No inconsistent state

---

# Step 7 — Storage Testing

If the feature uses storage, verify:

- Data saved correctly
- Data updated correctly
- Data deleted correctly
- Persistence after popup close
- Persistence after browser restart

Verify compliance with Storage.md.

---

# Step 8 — Messaging Testing

If the feature uses extension messaging, verify:

- Correct sender
- Correct receiver
- Correct message type
- Successful responses
- Error responses
- Timeout handling

Confirm compliance with Messaging.md.

---

# Step 9 — UI Testing

Verify:

- Correct layout
- Typography
- Spacing
- Icons
- Loading states
- Empty states
- Dialogs
- Toasts
- Responsiveness

Confirm consistency with Design.md.

---

# Step 10 — Accessibility Testing

Verify:

- Keyboard navigation
- Focus states
- Click target size
- Readable contrast
- Form accessibility

---

# Step 11 — Performance Testing

Evaluate:

- Popup responsiveness
- Rendering speed
- Database operations
- Browser API usage
- Memory usage

Identify unnecessary work.

Recommend optimization only if justified.

---

# Step 12 — Security Testing

Verify:

- No sensitive information exposed
- No unnecessary external requests
- No unsafe file handling
- No API key exposure
- No HTML injection
- No unsafe browser interactions

---

# Step 13 — Edge Case Testing

Review against Edge_Cases.md.

Test applicable scenarios, including:

- Empty input
- Invalid input
- Duplicate data
- Large files
- Browser restart
- Missing permissions
- Storage failures
- Interrupted operations
- Race conditions

Identify any unhandled edge cases.

---

# Step 14 — Regression Testing

Determine whether the implementation impacts:

- Existing features
- Shared utilities
- Shared services
- Shared components
- Shared validators
- Shared storage
- Shared messaging

Verify previously working behavior still functions.

---

# Step 15 — Documentation Compliance

Verify implementation matches:

- Product_Requirements_Document.md
- Features.md
- Rules.md
- Decisions.md

Identify undocumented behavior.

Identify missing implementation.

---

# Step 16 — Manual Test Cases

Provide a structured list of manual test scenarios.

Include:

## Happy Path

Normal user flow.

---

## Invalid Input

Incorrect user input.

---

## Boundary Conditions

Limits and edge values.

---

## Persistence

Verify stored data.

---

## Recovery

Failures and retries.

---

## Regression

Verify existing functionality.

---

# Step 17 — Test Results

Provide:

## Passed

List successful tests.

---

## Failed

List failed tests.

Include:

- Expected behavior
- Actual behavior
- Severity

---

## Blocked

List tests that could not be completed.

Explain why.

---

# Step 18 — Issues Found

Categorize findings.

## Critical

Must fix before release.

---

## High

Should fix before release.

---

## Medium

Recommended improvements.

---

## Low

Minor improvements.

---

# Step 19 — Release Readiness

Assess:

## Functionality

Complete / Incomplete

---

## Stability

Stable / Unstable

---

## Performance

Acceptable / Needs Improvement

---

## Security

Acceptable / Needs Improvement

---

## Documentation

Complete / Needs Update

---

## Overall Readiness

One of:

- Ready for Merge
- Ready for Release
- Needs Changes
- Not Ready

Include justification.

---

# Step 20 — Documentation Review

Determine whether testing results require updates to:

- Known_Bugs.md
- Completed.md
- Changelog.md
- Memory.md
- Testing_Checklist.md
- Edge_Cases.md
- Release_Checklist.md
- Any other affected documentation

List all recommended updates.

---

# Final Report

Provide the following summary:

## Feature Tested

---

## Modules Tested

---

## Documentation Reviewed

---

## Tests Executed

---

## Tests Passed

---

## Tests Failed

---

## Edge Cases Covered

---

## Regression Status

---

## Remaining Risks

---

## Documentation Updates Required

---

## Final Recommendation

Choose one:

### Approve

Feature is production-ready.

---

### Approve with Minor Issues

Minor improvements recommended.

---

### Request Changes

Feature requires additional work.

Include a concise explanation.

---

# Final Checklist

Before completing the review, verify:

- Documentation reviewed
- Feature understood
- Functional testing completed
- Validation tested
- Error handling tested
- Storage tested (if applicable)
- Messaging tested (if applicable)
- UI tested
- Accessibility reviewed
- Performance reviewed
- Security reviewed
- Edge cases tested
- Regression tested
- Documentation compliance verified
- Manual test cases provided
- Test results documented
- Release readiness assessed
- Documentation updates identified

A feature is considered tested only when it satisfies its documented requirements, handles expected failures gracefully, preserves existing functionality, and demonstrates production-level reliability.