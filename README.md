# Purchase Request Detail Page

Frontend homework challenge — หน้าแสดงรายละเอียดใบขอซื้อ (Purchase Request) พร้อม Approval Flow Timeline

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

| Technology | Purpose |
|---|---|
| **React 19** + **TypeScript** | UI framework with type safety |
| **Vite 7** | Build tool — fast HMR and optimized production builds |
| **Tailwind CSS 4** | Utility-first CSS framework (`@tailwindcss/vite` plugin) |
| **Lucide React** | Lightweight SVG icon library |
| **date-fns** | Date formatting utility (lightweight, tree-shakeable) |

## Features

- **Approval Flow Timeline** — Visual timeline with status icons, connecting lines, and user info
- **Conditional Action Buttons** — Approve/Reject buttons shown based on permissions and status
- **Responsive Layout** — Two-column grid on desktop, single column on mobile

## Project Structure

```
src/
├── components/
│   ├── approval/           # ApprovalFlow, ApprovalStep, ApprovalResult
│   ├── layout/             # Navbar, PageHeader
│   ├── request/            # RequestDetails, Attachments, ActionButtons
│   └── ui/                 # Badge, Tag, Avatar
├── data/                   # Mock JSON data (need-approval, approved)
├── types/                  # TypeScript interfaces
├── utils/                  # formatDate, getInitials, getStatusColor
```

## Assumptions

- Static mock data (no API calls) — data is loaded from JSON files
- Action buttons log to console only (no actual API integration)
- Attachment files are mock/placeholder data

## Future Improvements

- Connect to real API endpoints for data fetching
- Add actual approve/reject functionality with confirmation dialogs
- Add file upload and download for attachments
- Add routing (React Router) for multi-page navigation
- Add more animation effects (card fade-in, page transitions)
- Add `prefers-reduced-motion` support for accessibility
- Add E2E tests with Playwright or Cypress
