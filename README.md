[![CI](https://github.com/markwaldron7string/ap-workup-angular/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/markwaldron7string/ap-workup-angular/actions/workflows/ci.yml)

# AP Workup Tool

Insurance workup calculators for quickly checking driver experience and premium changes during underwriting or remarketing reviews.

**Live demo:** [ap-workup-angular.vercel.app](https://ap-workup-angular.vercel.app/)

## Calculators

### Years Licensed Calculator

Calculates years licensed using the driver's date of birth, workup date (quote date), and state-specific permit/license age rules.

Supports:

- Exact calculation states: Massachusetts, North Carolina, California
- New Jersey month-bracket output
- Range output for other states
- Optional age-first-licensed override
- Optional original DL issue date override for supported states

### Premium Workup Calculator

Calculates percentage change between old and new premium values.

Supports:

- Premium increase, decrease, and flat-change output
- Fixed fee exclusions
- Clear/reset behavior
- Light and dark theme toggle that persists: user's preference remains after user closes the app and returns. 

## Tech Stack

- Angular 21
- TypeScript
- pnpm
- Vitest
- jsdom
- GitHub Actions

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the local development server:

```bash
pnpm start
```

Then open:

```text
http://localhost:4200/
```

## Available Scripts

Run the app locally:

```bash
pnpm start
```

Build for production:

```bash
pnpm build
```

Run unit tests in watch mode:

```bash
pnpm test
```

Run unit tests once for CI:

```bash
pnpm test:ci
```

## Testing

Tests are written with Vitest through Angular's unit test builder.

Current coverage includes:

- Rendering both calculator headings
- Premium calculator readiness state
- Premium increase percentage calculation
- Premium clear/reset behavior

Spec files live beside the code they test. The main app spec is:

```text
src/app/app.spec.ts
```

## Continuous Integration

GitHub Actions runs on pushes and pull requests to `main`.

The CI workflow:

1. Installs dependencies with pnpm
2. Runs `pnpm test:ci`
3. Runs `pnpm build`

Workflow file:

```text
.github/workflows/ci.yml
```

## Original HTML Version

The original static HTML version is kept separately as:

```text
ap-workup-tool
```

This Angular project is intended to preserve the same user-facing tool while making the codebase easier to test, maintain, and expand.
