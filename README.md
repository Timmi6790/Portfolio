# Portfolio

[![Codecov](https://codecov.io/gh/timschoenle/Portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/timschoenle/Portfolio)
[![CI](https://github.com/timschoenle/Portfolio/actions/workflows/ci.yaml/badge.svg)](https://github.com/timschoenle/Portfolio/actions)

This repository is my personal portfolio website, designed to showcase my projects, skills, and experience through an automated pipeline.

## 🚀 Features

- **Next.js 16 App Router**: Utilizes the latest features of Next.js with Server Components and Suspense.
- **Modern UI Stack**: Styled with **Tailwind CSS v4** and **shadcn/ui** (Radix UI) for a premium, accessible, and responsive design.
- **Internationalization (i18n)**: Complete multi-language support (English & German) powered by `next-intl`, including localized routing and metadata.
- **Dynamic Resume Generation**: Automated PDF resume generation using `@react-pdf/renderer` and project data.
- **Type-Safe**: 100% TypeScript codebase with strict type checking.
- **Accessibility First**: Designed with a11y in mind and tested with Axe-core.
- **Comprehensive Testing**:
  - **Unit**: Powered by **Vitest** for fast and reliable unit testing.
  - **E2E**: Full end-to-end testing coverage with **Playwright**.
- **DevOps Ready**:
  - **Docker**: Production-ready containerization.
  - **CI/CD**: GitHub Actions pipeline for testing, linting, and bundle analysis.
  - **Code Quality**: Enforced via ESLint, Prettier, and Husky git hooks.

## 📂 Project Structure

```text
├── messages/             # i18n translation files
├── public/               # Static assets & generated resumes
├── scripts/              # Build and utility scripts
├── src/
│   ├── app/              # Next.js App Router pages
│   ├── components/       # UI components & features
│   ├── i18n/             # Internationalization config
│   ├── lib/              # Utilities & helpers
│   └── types/            # TypeScript definitions
├── tests/                # E2E & integration tests
└── ...
```

## 🏁 Getting Started

### Prerequisites

- **Bun**: v1.1 or higher

### Installation

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/timschoenle/Portfolio.git
    cd Portfolio
    ```

2.  **Install dependencies:**

    ```bash
    bun install
    ```

3.  **Setup Environment Variables:**
    Duplicate `.env.local.example` (if available) or create `.env.local` and add the following:

    ```env
    GITHUB_TOKEN=your_github_token_here # Required for fetching latest repo data
    NEXT_PUBLIC_CLOUDFLARE_WEB_ANALYTICS_TOKEN=your_token_here # Optional: Production analytics (public)
    ```

### Development

Start the development server:

```bash
bun dev
# Open http://localhost:3000
```

### Production Build

Build the application for production:

```bash
bun run build
bun start
```

## 📜 Scripts

| Script             | Description                                                         |
| ------------------ | ------------------------------------------------------------------- |
| `bun dev`          | Starts the development server.                                      |
| `bun run build`    | Builds the application for production (includes resume generation). |
| `bun start`        | Starts the production server.                                       |
| `bun lint`         | Runs ESLint to catch code quality issues.                           |
| `bun format`       | Formats code using Prettier.                                        |
| `bun test`         | Runs unit tests with Vitest.                                        |
| `bun e2e`          | Runs end-to-end tests with Playwright.                              |
| `bun docker:run`   | Runs the application in a local Docker container.                   |
| `bun build:resume` | Generates the PDF resumes from data.                                |
| `bun analyze`      | Runs bundle analysis to visualize size and dependencies.            |

## 🐳 Docker

You can containerize the application for consistent deployment.

**Build and Run:**

```bash
bun docker:build
bun docker:run
# Access at http://localhost:3000
```
