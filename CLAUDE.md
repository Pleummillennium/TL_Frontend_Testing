# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Purchase Request Detail Page — a React frontend homework challenge. Displays purchase request details with an approval flow timeline. Two page states: `NEED_APPROVAL` (interactive, with Approve/Reject buttons) and `APPROVED` (read-only). Uses static mock JSON data, no backend.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (utility-first)
- **Icons**: Lucide React
- **Date Formatting**: date-fns
- **State Management**: Local React useState only (no Redux/Zustand)
- **Testing**: Vitest + React Testing Library

## Commands

```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
npx vitest           # Run all tests
npx vitest run       # Run tests once (no watch)
npx vitest <file>    # Run a single test file
```

## Architecture

### Component Organization (feature-based)

- `src/components/layout/` — Navbar, PageHeader
- `src/components/request/` — RequestDetails, Attachments, ActionButtons
- `src/components/approval/` — ApprovalFlow, ApprovalStep, ApprovalResult (vertical timeline)
- `src/components/ui/` — Reusable primitives: Badge, Tag, Avatar

### Data Layer

- `src/data/mock-need-approval.json` — Page 1 mock data (NEED_APPROVAL state)
- `src/data/mock-approved.json` — Page 2 mock data (APPROVED state)
- Simple tab/toggle switches between the two datasets
- No real API calls; Approve/Reject buttons only `console.log`

### Types

- `src/types/request.ts` — All TypeScript interfaces (`RequestData`, `ApprovalStep`, `User`, `Company`, etc.)
- Key type: `RequestStatus = "NEED_APPROVAL" | "APPROVED" | "REJECTED" | "UNDER_REVIEW" | "SUBMITTED"`

### Layout

- Two-column desktop layout: left (request details + attachments + action buttons), right (approval flow timeline)
- Responsive: stacks to single column below 768px

## Key Behavioral Differences Between States

| Feature | NEED_APPROVAL | APPROVED |
|---------|--------------|----------|
| Action buttons | Reject + Approve (conditional on permissions) | Hidden |
| Header actions | Share, Eye, Duplicate | Share, **Print**, Eye, Duplicate |
| Timeline steps | Mixed icons (green/blue/gray) | All green checks |
| Approval result | Not shown | "Approved" indicator at bottom |

## Edge Cases to Handle

- Empty `linkedRequests` array → display "-"
- `actedAt: null` → don't render date
- `permissions.canApprove/canReject: false` → hide buttons
- Unknown status → fallback gray badge
- Long names/titles → truncate with ellipsis
