# Lative

Lative is a privacy-first, local-first browser extension designed to simplify the job and internship application process by keeping all essential career assets in one place.

Instead of automating or auto-filling job applications, Lative acts as a personal career assistant, helping users organize and access their resumes, certificates, email addresses, and professional profile links, while offering resume-aware AI assistance powered by the user's own Google Gemini API Key.

## Key Features

- **Links Module**: Store and access professional profile links (LinkedIn, GitHub, Portfolio, etc.).
- **Mail Module**: Manage multiple email addresses used for applications.
- **Resume Module**: Store, preview, and parse resumes locally (PDFs).
- **Certificate Module**: Save and view professional credentials (PDFs and Images).
- **AI Assistant**: Resume-based Q&A, profile summarization, job description comparison, and active page analysis.
- **Cart Module**: Quickly save job search and career webpages.
- **Backup & Restore**: Export all data into a local backup file (Gemini API Key excluded for security).

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React
- **Extension**: Chrome Extension Manifest V3, CRXJS Vite Plugin
- **Storage**: IndexedDB (Dexie.js), chrome.storage.local
- **AI integration**: Google Gemini API via `@google/generative-ai`
- **PDF parsing**: pdf.js (`pdfjs-dist`)

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lative.git
   cd lative
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server with hot-reload:
   ```bash
   npm run dev
   ```

4. Load the extension in Chrome:
   - Open Chrome and navigate to `chrome://extensions/`.
   - Enable **Developer mode** (top-right toggle).
   - Click **Load unpacked** (top-left button).
   - Select the `dist/` directory generated in the project root.

## Architecture & Coding Principles

All code follows a **feature-first, modular design**:
- Code is divided into self-contained business modules under `src/modules/`.
- UI resides in `components/`, business logic in `services/`, database operations in `storage/`, validators in `validators/`, and helpers in `utils/`.
- The background service worker acts as a centralized message router (popup and content scripts never communicate directly).
- Local-first architecture: No external servers or cloud accounts.

## License

This project is licensed under the MIT License.
