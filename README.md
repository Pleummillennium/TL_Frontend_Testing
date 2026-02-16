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
| **React Router 7** | Client-side routing (`BrowserRouter`, `NavLink`) |
| **Lucide React** | Lightweight SVG icon library |

## Features

- **Step-by-step Approval Flow** — Approve advances one step at a time (JM → CJ → TB → Approved), navbar avatar updates to reflect the current approver
- **Mock API with fetch pattern** — `mockFetch()` simulates server-side logic via `Response` object, ready to swap for real `fetch()` calls
- **Approval Flow Timeline** — Visual timeline with status icons, connecting lines, and user info
- **Conditional Action Buttons** — Approve/Reject buttons shown based on permissions and current step
- **Responsive Layout** — Two-column grid on desktop, single column on mobile

## Project Structure

```
src/
├── App.tsx                         # Root component — BrowserRouter + Routes
├── main.tsx                        # Entry point — renders App into DOM
│
├── pages/
│   ├── MyRequestsPage.tsx          # Placeholder list page — links to detail
│   ├── RequestDetailPage.tsx       # Request detail — owns state, handlers, page layout
│   └── NotFoundPage.tsx            # 404 page
│
├── components/
│   ├── approval/
│   │   ├── ApprovalFlow.tsx        # Renders the full approval timeline
│   │   ├── ApprovalStep.tsx        # Single step — icon, user info, badges, date
│   │   └── ApprovalResult.tsx      # Final result banner (Approved/Rejected)
│   ├── layout/
│   │   ├── Navbar.tsx              # Top nav — logo, links, dynamic user avatar
│   │   └── PageHeader.tsx          # Request title, status badge, action icons
│   ├── request/
│   │   ├── RequestDetails.tsx      # Company, request type, linked requests
│   │   ├── Attachments.tsx         # File attachment list (mock data)
│   │   └── ActionButtons.tsx       # Approve/Reject buttons with loading state
│   └── ui/
│       ├── Badge.tsx               # Status badge — color based on status
│       ├── Avatar.tsx              # User initials circle
│       └── Tag.tsx                 # Labeled tag (company, role)
│
├── services/
│   └── mockApi.ts                  # Mock fetch — simulates server approve/reject logic
├── data/
│   └── frontend-homework-challenge-mock.json  # Initial mock data (NEED_APPROVAL state)
├── types/
│   └── request.ts                  # TypeScript interfaces (RequestData, ApprovalStep, etc.)
└── utils/
    └── format.ts                   # Pure helpers — formatDate, getInitials, getStatusColor
```

## Assumptions

- Mock API layer (`src/services/mockApi.ts`) simulates backend responses with 1s delay
- Approve flow is step-by-step: each click advances to the next approver until final approval
- Reject terminates at the current step immediately
- Attachment files are mock/placeholder data

## Future Improvements

- Swap `mockFetch()` for real `fetch()` — only `mockApi.ts` needs to change
- Add confirmation dialogs before approve/reject
- Add file upload and download for attachments
- ~~Add routing (React Router) for multi-page navigation~~ Done
- Add animation effects (card fade-in, page transitions)
- Add E2E tests with Playwright or Cypress
