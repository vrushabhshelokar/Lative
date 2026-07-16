# Testing_Checklist.md

# Lative v1.0 Testing Checklist

**Version:** 1.0 (MVP)

---

# Purpose

This document defines the complete manual testing checklist for Lative.

Every feature must pass these tests before it is considered production-ready.

The objective is to verify:

- Correct functionality
- Data integrity
- User experience
- Error handling
- Performance
- Browser compatibility
- Persistence

---

# Testing Principles

Every feature should be tested for:

- Normal usage
- Invalid input
- Duplicate input
- Empty state
- Boundary conditions
- Recovery after failure
- Data persistence
- UI consistency

No feature is considered complete until all applicable tests pass.

---

# Global Application Tests

## Extension Installation

- Extension installs successfully.
- Extension loads without errors.
- Popup opens correctly.
- Icons display correctly.
- No console errors on startup.

---

## Navigation

- All navigation items are visible.
- Navigation order is correct.
- Switching modules is instant.
- Selected module persists during popup session.
- No broken navigation.

---

## Theme

- System theme works.
- Light theme works.
- Dark theme works.
- Theme changes immediately.
- Theme persists after browser restart.

---

# Links Module

## Add

- Add valid URL.
- Add HTTPS URL.
- Add HTTP URL.
- Add multiple links.

---

## Validation

- Reject empty input.
- Reject invalid URL.
- Reject duplicate URL.

---

## Actions

- Copy link.
- Edit link.
- Delete link.

---

## Persistence

- Links remain after browser restart.
- Links remain after popup closes.

---

# Mail Module

## Add

- Add valid email.
- Add multiple emails.

---

## Validation

- Reject invalid email.
- Reject empty email.
- Reject duplicate email.

---

## Actions

- Copy email.
- Edit email.
- Delete email.

---

## Persistence

- Emails remain after restart.

---

# Resume Module

## Upload

- Upload valid PDF.
- Upload multiple PDFs.
- Upload different resume names.

---

## Validation

- Reject non-PDF.
- Reject oversized PDF.
- Reject duplicate resume.
- Reject corrupted PDF.
- Reject password-protected PDF.

---

## Parsing

- Resume parses successfully.
- Parsed data stored.
- Parsing occurs only once.
- No repeated parsing during AI usage.

---

## Actions

- Open resume.
- Replace resume.
- Delete resume.
- Copy filename.

---

## Replace

- Old PDF replaced.
- Parsed data updated.
- Card refreshed.

---

## Delete

- Resume removed.
- Parsed data removed.
- Card disappears.

---

## Persistence

- Resumes remain after restart.
- Parsed data remains after restart.

---

# Certificate Module

## Upload

- Upload PDF.
- Upload PNG.
- Upload JPG.
- Upload JPEG.
- Upload WEBP.

---

## Validation

- Reject unsupported format.
- Reject oversized file.
- Reject duplicate certificate.

---

## Actions

- Open.
- Replace.
- Delete.
- Copy filename.

---

## Persistence

- Certificates remain after restart.

---

# AI Module

## API Key

- Save valid Gemini API key.
- Reject invalid API key.
- Remove API key.
- Update API key.

---

## Availability

- AI unavailable without API key.
- AI available with API key.

---

## Resume Selection

- Select resume.
- Change selected resume.
- New chat starts automatically.
- Previous conversation cleared.

---

## General Chat

- Ask resume questions.
- Receive response.
- Continue conversation.
- Context maintained during session.

---

## Quick Actions

- Profile Summary.
- Resume Summary.
- Compare JD.
- Missing Skills.
- Best Resume.
- Analyze Current Page.

Each quick action should produce a valid response.

---

## Compare JD

- Paste valid job description.
- Compare with resume.
- Display matching strengths.
- Display missing skills.

---

## Best Resume

- Multiple resumes available.
- AI recommends appropriate resume.

---

## Analyze Current Page

- Read current webpage.
- Send page text.
- Receive AI response.

---

## Error Handling

- Missing API key.
- Invalid API key.
- Network failure.
- API timeout.
- Rate limit.
- Gemini unavailable.

---

# Cart Module

## Manual Add

- Add valid URL.
- Add multiple URLs.

---

## Validation

- Reject invalid URL.
- Reject duplicate URL.

---

## Actions

- Open URL.
- Copy URL.
- Edit URL.
- Delete URL.

---

## Floating Button

- Enable toggle.
- Floating button appears.
- Disable toggle.
- Floating button disappears.
- No page reload required.

---

## Floating Save

- Save current page.
- Capture URL.
- Capture title.
- Show toast.
- Duplicate detection works.

---

## Persistence

- Cart remains after restart.

---

# Settings Module

## Theme

- Change theme.
- Persist theme.

---

## Floating Button

- Toggle ON.
- Toggle OFF.
- State persists.

---

## API Key

- Save.
- Update.
- Remove.

---

## Export

- Export succeeds.
- Backup downloads.
- Backup contains expected data.

---

## Import

- Import valid backup.
- Reject invalid backup.
- Restore data correctly.

---

## Clear Data

- Confirmation dialog appears.
- Cancel works.
- Confirm clears data.
- UI refreshes.

---

## Tutorial

- Tutorial opens.

---

## Feedback

- Feedback form opens.

---

## Report Issue

- Report page opens.

---

## About

- Information displays correctly.

---

# Backup Testing

## Export

Verify backup contains:

- Links
- Emails
- Resumes
- Parsed resumes
- Certificates
- Cart
- Settings

Verify backup excludes:

- Gemini API Key

---

## Import

Restore backup.

Verify every module is restored correctly.

---

# Storage Testing

## IndexedDB

Verify:

- Stores created.
- Reads succeed.
- Updates succeed.
- Deletes succeed.

---

## Persistence

Restart browser.

Verify:

- Links
- Emails
- Resumes
- Certificates
- Cart
- Settings

still exist.

---

# Messaging Testing

Verify:

- Popup ↔ Background
- Background ↔ Content Script
- Floating Button messages
- Page analysis messages

No message failures.

---

# Browser Testing

Verify on:

- Chrome
- Edge
- Brave
- Opera
- Arc

---

# Popup Testing

Verify:

- Opens correctly.
- Closes correctly.
- No layout shifts.
- No overflow issues.
- No clipped content.

---

# UI Testing

Verify:

- Buttons aligned.
- Cards aligned.
- Typography consistent.
- Icons consistent.
- Empty states display.
- Loading states display.
- Toasts display.
- Dialogs display.

---

# Accessibility Testing

Verify:

- Keyboard navigation.
- Focus visibility.
- Tab order.
- Readable contrast.
- Click targets.

---

# Performance Testing

Verify:

- Popup opens quickly.
- Navigation is smooth.
- Resume upload responsive.
- AI UI remains responsive.
- Theme switching instant.
- No unnecessary loading.

---

# Memory Testing

Verify:

- No duplicate parsing.
- No repeated database reads.
- No memory leaks during long AI sessions.

---

# Error Recovery Testing

Verify recovery after:

- Browser restart.
- Popup close.
- Storage failure.
- AI failure.
- Invalid import.
- Invalid upload.

The extension should recover gracefully without corrupting data.

---

# Security Testing

Verify:

- Gemini API key never exported.
- Certificates never sent to AI.
- Only selected resume context sent to AI.
- No sensitive information logged.

---

# Cross-Module Testing

Verify modules do not interfere with each other.

Examples:

- Upload resume does not affect cart.
- Theme change affects all modules.
- Clearing data removes all module data.
- Import restores all modules correctly.

---

# Regression Testing

Before every release verify:

- Existing features still work.
- New changes did not break previous functionality.
- Database migrations succeed.
- UI consistency maintained.

---

# Chrome Web Store Readiness

Before publishing verify:

- No console errors.
- No debug logs.
- Permissions minimized.
- Icons complete.
- Manifest valid.
- Privacy statement accurate.
- Performance acceptable.
- Extension behaves consistently after fresh installation.

---

# MVP Acceptance Checklist

Lative v1.0 is ready for release only if:

- All modules function correctly.
- All validation rules pass.
- Data persists across browser restarts.
- Resume parsing is stable.
- AI works with valid Gemini API key.
- Floating Cart button works reliably.
- Backup and restore succeed.
- Theme settings persist.
- No critical bugs remain.
- No data corruption occurs.
- Cross-browser testing passes.
- Chrome Web Store requirements are satisfied.

---

# Final Testing Principle

Every feature should be tested from the perspective of a real job seeker using the extension during an actual application process. The extension should behave predictably, preserve user data under all circumstances, recover gracefully from failures, and never compromise the user's privacy or control.