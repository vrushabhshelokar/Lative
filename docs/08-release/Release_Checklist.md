# Release_Checklist.md

# Lative v1.0 Release Checklist

**Version:** 1.0 (MVP)

---

# Purpose

This document defines the final checklist that must be completed before every public release of Lative.

Its purpose is to ensure that every release is:

- Stable
- Secure
- Tested
- Performant
- Consistent
- Ready for the Chrome Web Store

No release should be published unless every applicable item is completed.

---

# Release Status

| Item | Status |
|-------|--------|
| Development Complete | ☐ |
| Feature Freeze | ☐ |
| Testing Complete | ☐ |
| Documentation Updated | ☐ |
| Production Build Verified | ☐ |
| Chrome Web Store Ready | ☐ |

---

# 1. Feature Completion

Verify all planned MVP features are implemented.

## Links

- ☐ Add
- ☐ Edit
- ☐ Copy
- ☐ Delete

---

## Mail

- ☐ Add
- ☐ Edit
- ☐ Copy
- ☐ Delete

---

## Resume

- ☐ Upload
- ☐ Validation
- ☐ Duplicate detection
- ☐ PDF parsing
- ☐ Parsed data generation
- ☐ Open
- ☐ Replace
- ☐ Copy filename
- ☐ Delete

---

## Certificate

- ☐ Upload
- ☐ Replace
- ☐ Open
- ☐ Copy filename
- ☐ Delete

---

## AI

- ☐ Gemini API integration
- ☐ Resume selector
- ☐ New chat
- ☐ Resume summary
- ☐ Profile summary
- ☐ Compare JD
- ☐ Missing skills
- ☐ Best resume
- ☐ Analyze Current Page
- ☐ General chat

---

## Cart

- ☐ Manual add
- ☐ Edit
- ☐ Copy URL
- ☐ Open
- ☐ Delete
- ☐ Floating button
- ☐ Duplicate detection
- ☐ Toast notification

---

## Settings

- ☐ Gemini API Key
- ☐ Theme
- ☐ Floating button toggle
- ☐ Export
- ☐ Import
- ☐ Clear data
- ☐ Privacy
- ☐ Tutorial
- ☐ Feedback
- ☐ Report Issue
- ☐ About

---

# 2. Storage Verification

Verify:

- ☐ IndexedDB initializes correctly
- ☐ All object stores exist
- ☐ CRUD operations work
- ☐ Database migrations work
- ☐ Data persists after browser restart

---

## Verify Stores

- ☐ resumes
- ☐ parsedResumes
- ☐ certificates
- ☐ links
- ☐ mails
- ☐ cart
- ☐ settings

---

# 3. Resume Verification

- ☐ Valid PDF uploads
- ☐ Invalid PDFs rejected
- ☐ Corrupted PDFs rejected
- ☐ Password-protected PDFs rejected
- ☐ Duplicate detection works
- ☐ Replace works
- ☐ Delete removes parsed data
- ☐ Open works
- ☐ Copy filename works

---

# 4. Certificate Verification

- ☐ PDF upload
- ☐ Image upload
- ☐ Duplicate detection
- ☐ Replace
- ☐ Delete
- ☐ Open

---

# 5. AI Verification

- ☐ API key validation
- ☐ Missing API key handled
- ☐ Invalid API key handled
- ☐ Resume context works
- ☐ Resume switching resets chat
- ☐ Analyze Current Page works
- ☐ Compare JD works
- ☐ Missing Skills works
- ☐ Best Resume works
- ☐ Errors handled gracefully

---

# 6. Cart Verification

- ☐ Manual add
- ☐ Manual edit
- ☐ Manual delete
- ☐ Open URL
- ☐ Copy URL
- ☐ Floating button injection
- ☐ Floating button removal
- ☐ Current page capture
- ☐ Duplicate prevention
- ☐ Toast notification

---

# 7. Backup Verification

Export

- ☐ Links
- ☐ Emails
- ☐ Resumes
- ☐ Parsed resumes
- ☐ Certificates
- ☐ Cart
- ☐ Settings

Import

- ☐ Valid backup restores
- ☐ Invalid backup rejected
- ☐ Existing data preserved on failure

Verify

- ☐ Gemini API key not exported

---

# 8. Theme Verification

- ☐ System theme
- ☐ Light theme
- ☐ Dark theme
- ☐ Theme persistence
- ☐ Instant switching

---

# 9. UI Verification

- ☐ Typography consistent
- ☐ Card spacing consistent
- ☐ Icons consistent
- ☐ Buttons consistent
- ☐ Empty states complete
- ☐ Loading states complete
- ☐ Dialogs consistent
- ☐ Toasts consistent

---

# 10. Accessibility Verification

- ☐ Keyboard navigation
- ☐ Focus indicators
- ☐ Color contrast
- ☐ Click target sizes
- ☐ Readable typography

---

# 11. Performance Verification

- ☐ Fast popup startup
- ☐ Fast navigation
- ☐ Resume parsing only once
- ☐ No unnecessary renders
- ☐ Smooth scrolling
- ☐ Responsive UI during AI requests

---

# 12. Browser Compatibility

Test on:

- ☐ Google Chrome
- ☐ Microsoft Edge
- ☐ Brave
- ☐ Opera
- ☐ Arc

Verify:

- ☐ Popup
- ☐ Content script
- ☐ Background service worker
- ☐ Floating button
- ☐ IndexedDB
- ☐ AI
- ☐ Export/Import

---

# 13. Error Handling

Verify:

- ☐ Invalid uploads
- ☐ Storage failures
- ☐ API failures
- ☐ Network failures
- ☐ Import failures
- ☐ Duplicate entries
- ☐ Invalid URLs
- ☐ Invalid emails

No uncaught exceptions.

---

# 14. Security Verification

- ☐ Gemini API key stored locally
- ☐ API key never exported
- ☐ Certificates never sent to AI
- ☐ Only selected resume sent to AI
- ☐ No sensitive logs
- ☐ No executable user content

---

# 15. Permissions Review

Verify only required permissions exist.

- ☐ storage
- ☐ tabs
- ☐ activeTab
- ☐ scripting

No unnecessary permissions requested.

---

# 16. Console Verification

Developer Console

- ☐ No uncaught exceptions
- ☐ No warnings
- ☐ No failed network requests
- ☐ No missing assets

Production

- ☐ Debug logs removed
- ☐ Verbose logging removed

---

# 17. Code Quality

- ☐ TypeScript passes
- ☐ ESLint passes
- ☐ Prettier formatting applied
- ☐ No dead code
- ☐ No unused imports
- ☐ No TODOs blocking release

---

# 18. Documentation Review

Verify documentation matches implementation.

- ☐ PRD
- ☐ Architecture
- ☐ Storage
- ☐ Messaging
- ☐ Features
- ☐ Decisions
- ☐ Rules
- ☐ Testing Checklist
- ☐ Edge Cases
- ☐ Folder Structure
- ☐ Design
- ☐ Phases

---

# 19. Manifest Review

Verify:

- ☐ Manifest Version 3
- ☐ Correct permissions
- ☐ Icons configured
- ☐ Background configured
- ☐ Popup configured
- ☐ Content scripts configured
- ☐ Version updated

---

# 20. Build Verification

- ☐ Clean production build
- ☐ Build succeeds without errors
- ☐ Extension loads correctly
- ☐ No missing assets
- ☐ Bundle size acceptable

---

# 21. Chrome Web Store Assets

Prepare:

- ☐ Extension icon (all required sizes)
- ☐ Screenshots
- ☐ Promotional image (if applicable)
- ☐ Store description
- ☐ Short description
- ☐ Category
- ☐ Privacy policy
- ☐ Support URL
- ☐ Feedback URL

---

# 22. Privacy Review

Verify product statements are accurate.

- ☐ No login
- ☐ No cloud database
- ☐ Local-first storage
- ☐ User-controlled AI
- ☐ Data only leaves device when AI is explicitly used

---

# 23. Regression Review

Verify recent changes did not break:

- ☐ Links
- ☐ Mail
- ☐ Resume
- ☐ Certificate
- ☐ AI
- ☐ Cart
- ☐ Settings

---

# 24. Final Manual Walkthrough

Simulate a complete user journey.

### Scenario

- ☐ Install extension
- ☐ Add links
- ☐ Add emails
- ☐ Upload resumes
- ☐ Upload certificates
- ☐ Configure Gemini API key
- ☐ Ask AI questions
- ☐ Analyze a job page
- ☐ Save a career page using the floating button
- ☐ Export data
- ☐ Clear all data
- ☐ Import backup
- ☐ Verify restored data
- ☐ Restart browser
- ☐ Verify persistence

---

# 25. Versioning

Before release:

- ☐ Update extension version
- ☐ Update changelog
- ☐ Update release notes
- ☐ Tag release in version control

---

# Release Decision

The release is approved only when:

- ☐ All checklist items are completed
- ☐ No critical or high-severity bugs remain
- ☐ No known data-loss issues exist
- ☐ Performance is acceptable
- ☐ Documentation reflects the shipped behavior
- ☐ Chrome Web Store package is validated

---

# Post-Release

After publishing:

- ☐ Verify Chrome Web Store listing
- ☐ Install from the published listing
- ☐ Confirm update process works
- ☐ Monitor user feedback
- ☐ Monitor reported issues
- ☐ Record known issues for the next release

---

# Final Release Principle

A release should prioritize stability over feature count. If there is uncertainty about a feature's reliability, it should be postponed rather than shipped. Every public release of Lative should strengthen user trust by being predictable, secure, and polished.