# Product Requirements Document (PRD)

# Lative v1.0

**Version:** 1.0 (MVP)  
**Product Type:** Chrome Browser Extension (Cross-browser compatible with Chromium-based browsers)  
**Status:** Product Scope Finalized

---

# 1. Product Overview

Lative is a privacy-first browser extension designed to simplify the job and internship application process by keeping all essential career assets in one place.

Instead of automating applications, Lative helps users organize and access their professional information quickly while ensuring they remain in complete control of what is shared.

Unlike traditional autofill extensions, Lative intentionally avoids automatic form filling. Users manually decide what information to use and where to use it.

All user data remains stored locally on the user's device without requiring an account or cloud synchronization.

---

# 2. Vision

Create a lightweight personal career assistant that enables users to manage resumes, certificates, professional links, email addresses, bookmarked job pages, and AI-powered resume assistance from a single browser extension while maintaining complete privacy.

---

# 3. Problem Statement

Applying for jobs often requires repeatedly searching for:

- LinkedIn profile
- GitHub profile
- Portfolio
- Multiple email addresses
- Different resumes
- Certificates
- Previously visited career pages
- Personalized answers to application questions

These assets are usually scattered across folders, browsers, and cloud drives, causing repetitive work and slowing down applications.

Lative centralizes these resources into a single local extension.

---

# 4. Goals

- Reduce repetitive work during job applications.
- Keep all career assets organized in one place.
- Eliminate dependency on cloud accounts.
- Protect user privacy through local storage.
- Provide AI assistance using the user's own resume.
- Keep users in control by avoiding automatic form filling.
- Offer a fast, lightweight, and intuitive experience.

---

# 5. Target Users

## Primary Users

- College students
- Internship applicants
- Fresh graduates
- Job seekers
- Career switchers

## Secondary Users

- Freelancers
- Professionals managing multiple resumes
- Developers applying through multiple hiring portals

---

# 6. Product Principles

- Privacy First
- Local Storage Only
- No Login Required
- No Cloud Database
- User-Controlled Actions
- Minimal Permissions
- Fast and Lightweight
- Cross-browser Compatible

---

# 7. Core Features

## 7.1 Links Module

### Purpose

Store frequently used professional profile links.

### Examples

- LinkedIn
- GitHub
- Portfolio
- HackerRank
- LeetCode
- Personal Website

### Features

- Add new link
- Edit link
- Copy link
- Delete link
- Store multiple links

---

## 7.2 Mail Module

### Purpose

Store multiple email addresses used during applications.

### Features

- Add email
- Edit email
- Copy email
- Delete email
- Store multiple email addresses

---

## 7.3 Resume Module

### Purpose

Store multiple resumes locally for different job domains.

### Supported Format

- PDF only

### Features

- Upload resume
- Validate uploaded file
- Detect duplicate resumes
- Reject unsupported files
- Reject unreadable or corrupted PDFs
- Replace existing resume
- Open stored resume
- Copy original filename
- Delete resume

### Resume Processing

After upload, the extension automatically:

- Parses the PDF
- Extracts resume text
- Generates structured resume information
- Saves both the original PDF and parsed information locally

### Structured Resume Information

- Skills
- Projects
- Education
- Experience
- Achievements

---

## 7.4 Certificate Module

### Purpose

Store professional certificates for quick access during applications.

### Supported Formats

- PDF
- Images

### Features

- Upload certificate
- Replace certificate
- Open certificate
- Copy filename
- Delete certificate

Certificates are stored only for management and access.

No AI processing is performed on certificates.

---

## 7.5 AI Module

### Purpose

Provide AI assistance using the selected resume.

### Requirement

Users must provide their own Gemini API Key.

Without an API key, AI features remain unavailable.

### Resume Selection

Users manually select which resume the AI should use.

Changing the selected resume automatically starts a new conversation.

### AI Conversation

Conversation context exists only during the active chat session.

Starting a new chat clears previous conversation context while keeping the selected resume available.

### AI Capabilities

- Profile Summary
- Why Should We Hire You?
- Compare Job Description with Resume
- Missing Skills Detection
- Best Resume Recommendation
- Analyze Current Webpage
- General Resume-Based Questions

### Job Description Input

Users manually paste the job description into the AI chat.

### Analyze Current Page

When requested by the user, the extension analyzes the currently opened webpage and uses its content as additional context for AI responses.

---

## 7.6 Cart Module

### Purpose

Quickly save job or career webpages while browsing.

### Manual Features

- Add URL manually
- Edit URL
- Copy URL
- Open URL
- Delete URL

### Floating Save Button

Users can enable a floating button through Settings.

When enabled:

- A floating button appears on webpages.
- Clicking the button immediately captures:
  - Current webpage URL
  - Current webpage title
- The page is instantly saved into the Cart.
- A success notification confirms the save.

Duplicate URLs are detected and prevented.

---

## 7.7 Settings Module

### Features

- Gemini API Key Management
- Theme Selection
- Floating Button Toggle
- Export Data
- Import Data
- Clear All Data
- Video Tutorial
- Privacy Information
- Feedback Form
- Report Issue
- About

---

# 8. Backup & Restore

Users can export all locally stored extension data into a backup file.

The backup includes:

- Links
- Emails
- Resumes
- Parsed Resume Information
- Certificates
- Cart
- Settings

The Gemini API Key is intentionally excluded.

Users can restore all exported data through the import feature.

---

# 9. Theme Support

Available themes:

- Follow System
- Dark
- Light

---

# 10. Privacy

Lative follows a privacy-first approach.

User data remains stored locally on the device.

No account is required.

No cloud database is used.

The only information sent externally is the data explicitly required for AI requests when the user provides their own Gemini API Key.

---

# 11. User Feedback

Users can submit feedback through an embedded Tally form.

Users can also report issues directly from the extension.

---

# 12. Success Criteria

The product should enable users to:

- Organize all application-related resources in one place.
- Quickly access resumes, certificates, links, and emails.
- Save job pages while browsing.
- Receive resume-based AI assistance.
- Keep complete ownership of their data.
- Apply for jobs faster without relying on autofill.

---

# 13. Non-Goals (Out of Scope)

The following features are intentionally excluded from Version 1:

- Automatic form filling
- Automatic application submission
- Resume version history
- Certificate AI parsing
- OCR support for scanned PDFs
- Local LLM support
- Cloud synchronization
- User authentication
- Persistent AI chat history
- ATS score generation
- Cover letter generation
- Resume rewriting
- Application status tracking
- Dragging files directly from extension storage

---

# 14. Product Identity

**Lative** is a privacy-first browser extension that securely stores every career asset—including professional links, email addresses, resumes, certificates, bookmarked job pages, and AI-powered resume assistance—entirely on the user's device, helping users apply for jobs and internships more efficiently without compromising privacy or control.