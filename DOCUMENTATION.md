# Project Documentation — Approval Request Portal

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI library |
| TypeScript | ~5.7 | Type safety |
| Vite | 6 | Build tool / Dev server |
| Tailwind CSS | 4 | Utility-first CSS |
| Lucide React | - | Icon library |

---

## Folder Structure

```
src/
├── main.tsx                          # Entry point
├── App.tsx                           # Root component (state owner)
├── index.css                         # Global styles + Tailwind import
│
├── types/
│   └── request.ts                    # All TypeScript interfaces
│
├── utils/
│   └── format.ts                     # Utility functions (date, initials, color)
│
├── services/
│   └── mockApi.ts                    # Mock API (approve/reject)
│
├── data/
│   └── frontend-homework-challenge-mock.json   # Mock data (initial state)
│
└── components/
    ├── layout/                       # Page-level layout
    │   ├── Navbar.tsx                # Top navigation bar
    │   └── PageHeader.tsx            # Title, badge, action icons, metadata
    │
    ├── request/                      # Request information
    │   ├── RequestDetails.tsx        # Company, type, title, linked requests
    │   ├── Attachments.tsx           # File attachment list
    │   └── ActionButtons.tsx         # Approve / Reject buttons
    │
    ├── approval/                     # Approval flow timeline
    │   ├── ApprovalFlow.tsx          # Container: heading + step list + result
    │   ├── ApprovalStep.tsx          # Single timeline step (icon + user + badges)
    │   └── ApprovalResult.tsx        # Final result node (Approved / Rejected)
    │
    └── ui/                           # Reusable UI primitives
        ├── Badge.tsx                 # Status badge (colored pill)
        ├── Avatar.tsx                # User initials circle
        └── Tag.tsx                   # Simple chip (linked requests)
```

---

## Data Flow Overview

```
                    ┌─────────────────────────────────┐
                    │         mock JSON file           │
                    │  (initial NEED_APPROVAL state)   │
                    └──────────────┬──────────────────┘
                                   │ import
                                   v
                    ┌─────────────────────────────────┐
                    │            App.tsx               │
                    │                                  │
                    │  useState<RequestData>(data)     │
                    │  useState<boolean>(loading)      │
                    │                                  │
                    │  handleApprove() ──> mockApi     │
                    │  handleReject()  ──> mockApi     │
                    └──┬───┬───┬───┬───┬───┬──────────┘
                       │   │   │   │   │   │
            props ─────┘   │   │   │   │   └───── props
                           │   │   │   │
          ┌────────────────┘   │   │   └──────────────┐
          v                    v   v                   v
     PageHeader        RequestDetails  Attachments  ApprovalFlow
     (data)            (title, details)  (static)   (approvalFlow,
                                                     requestStatus)
          │                                            │
          │                                            v
     ActionButtons                              ApprovalStep (x4)
     (permissions,                                     │
      status,                                          v
      onApprove,                                ApprovalResult
      onReject,                                 (status)
      loading)
```

**Key principle:** App.tsx owns ALL state. Child components receive data via props and communicate back via callback functions (`onApprove`, `onReject`). No child component manages its own business state.

---

## File-by-File Documentation

---

### `src/main.tsx`

**Purpose:** Application entry point. Mounts React to the DOM.

```
createRoot(document.getElementById('root')!) → <StrictMode> → <App />
```

- Imports `index.css` for Tailwind
- Renders `<App />` inside `<StrictMode>` for development checks

---

### `src/index.css`

**Purpose:** Global stylesheet.

- `@import "tailwindcss"` — enables Tailwind CSS 4
- Sets font family to `Inter` with system fallbacks

---

### `src/App.tsx` — Root Component

**Purpose:** Application root. Owns all state, orchestrates layout, handles user actions.

#### State

| State | Type | Initial Value | Purpose |
|---|---|---|---|
| `data` | `RequestData` | imported JSON | All request data |
| `loading` | `boolean` | `false` | Button loading indicator |

#### Functions

| Function | Trigger | What it does |
|---|---|---|
| `handleApprove()` | User clicks Approve | Sets `loading=true` → calls `approveRequest(data)` → updates `data` with result → sets `loading=false` |
| `handleReject()` | User clicks Reject | Sets `loading=true` → calls `rejectRequest(data)` → updates `data` with result → sets `loading=false` |

#### Layout Structure

```
<div>                           ← min-h-screen bg-gray-50
  <Navbar />                    ← fixed top nav
  <main>                        ← max-w-[1200px] centered
    <PageHeader data={data} />  ← title row
    <div grid 2-col>            ← responsive grid
      <left-col>
        <RequestDetails />      ← company, type, title, linked
        <Attachments />         ← file list
        <ActionButtons />       ← approve/reject (or null)
      </left-col>
      <right-col>
        <ApprovalFlow />        ← timeline
      </right-col>
    </div>
  </main>
</div>
```

---

### `src/types/request.ts` — Type Definitions

**Purpose:** Defines all TypeScript interfaces used across the app.

| Interface | Fields | Used By |
|---|---|---|
| `User` | `id`, `name`, `title?` | ApprovalStep (user info) |
| `Company` | `id`, `name` | RequestDetails |
| `RequestType` | `code`, `label` | RequestDetails |
| `LinkedRequest` | `id`, `type` | RequestDetails (Tag list) |
| `RequestStatus` | Union: `"NEED_APPROVAL"` \| `"APPROVED"` \| `"REJECTED"` \| `"UNDER_REVIEW"` \| `"SUBMITTED"` | Badge, ActionButtons, ApprovalStep |
| `ApprovalStep` | `id`, `order`, `user`, `companyTag`, `role`, `status`, `statusLabel`, `actedAt` | ApprovalStep component |
| `ApprovalFlow` | `currentStepId`, `steps[]` | ApprovalFlow component |
| `Permissions` | `canApprove`, `canReject`, `canDuplicate` | ActionButtons, PageHeader |
| `RequestData` | `request`, `details`, `approvalFlow`, `permissions` | App (top-level state shape) |

---

### `src/utils/format.ts` — Utility Functions

**Purpose:** Pure helper functions for formatting data.

| Function | Input | Output | Usage |
|---|---|---|---|
| `formatDate(dateString)` | `string \| null` | `"DD/MM/YYYY HH:MM:SS"` or `"-"` | PageHeader (created date), ApprovalStep (acted date) |
| `getInitials(name)` | `string` | `"AT"` (first letters, max 2) | Avatar component |
| `getStatusColor(status)` | `string` | Tailwind class string (border + text + bg) | Badge component (via statusStyles) |

**formatDate details:**
- Uses UTC methods (`getUTCDate`, `getUTCMonth`, etc.) to avoid timezone shifts
- Pads single digits with leading zeros
- Returns `"-"` for null/empty input

**getInitials details:**
- Splits name by spaces, takes first character of each word
- Converts to uppercase, limits to 2 characters
- Returns `"?"` for empty input

---

### `src/services/mockApi.ts` — Mock API Layer

**Purpose:** Simulates backend API calls with 1-second delay. Transforms data immutably.

#### Constants

| Constant | Value | Purpose |
|---|---|---|
| `MOCK_DELAY` | `1000` | 1 second delay to simulate network |

#### Functions

##### `delay(ms: number): Promise<void>`
- Internal helper
- Returns a Promise that resolves after `ms` milliseconds

##### `approveRequest(data: RequestData): Promise<RequestData>`
- Waits 1 second
- Returns NEW object (immutable) with:
  - `request.status` → `"APPROVED"`, `statusLabel` → `"Approved"`
  - All steps get `actedAt` filled (uses existing or current timestamp)
  - `currentStepId` → last step's ID
  - `permissions.canApprove` → `false`, `canReject` → `false`

##### `rejectRequest(data: RequestData): Promise<RequestData>`
- Waits 1 second
- Returns NEW object (immutable) with:
  - `request.status` → `"REJECTED"`, `statusLabel` → `"Rejected"`
  - Only the current step (matching `currentStepId`) gets updated: `status` → `"REJECTED"`, `actedAt` → now
  - `permissions.canApprove` → `false`, `canReject` → `false`

**Why immutable?** React state updates require new object references to trigger re-renders. Using spread operator (`...data`) creates shallow copies at each level.

---

### `src/components/layout/Navbar.tsx`

**Purpose:** Top navigation bar.

#### Structure

```
<nav>                                    ← h-16, border-bottom, white bg
  <left>  LayoutGrid icon + "Portal"    ← blue logo
  <center> "My requests" | "My approve" | "History"  ← nav links (hidden on mobile)
  <right> "AT" avatar circle            ← blue circle with initials
</nav>
```

#### Data

- `navLinks` array (hardcoded): 3 items with `label` and `active` flag
- Only "My requests" is `active: true` (bold)

#### No props — fully static component.

---

### `src/components/layout/PageHeader.tsx`

**Purpose:** Displays request title, status badge, action icons, and metadata.

#### Props

| Prop | Type | Source |
|---|---|---|
| `data` | `RequestData` | App.tsx |

#### Internal Logic

- `isApproved = request.status === 'APPROVED'` — controls Print button visibility
- `formattedDate = formatDate(request.createdAt)` — for "Created date" display

#### Layout (3 rows)

```
Row 1: ← Back (ArrowLeft icon + text)

Row 2: (flex, responsive)
  Left:  <h1>title</h1> + <Badge status />
  Right: Share | Print (only if approved) | Eye + viewCount | Duplicate (only if canDuplicate)

Row 3: (metadata)
  request.id | Created by: name | Created date: DD/MM/YYYY HH:MM:SS
```

#### Conditional Rendering

| Condition | Element |
|---|---|
| `status === 'APPROVED'` | Print button appears |
| `permissions.canDuplicate` | "Duplicate as copy" button appears |

---

### `src/components/request/RequestDetails.tsx`

**Purpose:** Displays company, request type, title, and linked requests in a 2x2 grid.

#### Props

| Prop | Type | Source |
|---|---|---|
| `title` | `string` | `data.request.title` |
| `details` | `RequestData['details']` | `data.details` |

#### Layout

```
"Request details" (heading)

Grid 2x2:
  [Company]           [Request type]
  [Title]             [Linked requests → Tag, Tag]
```

- Linked requests render as `<Tag>` components
- If no linked requests → shows `"-"`

---

### `src/components/request/Attachments.tsx`

**Purpose:** Displays list of file attachments with preview/download actions.

#### No props — uses hardcoded `mockAttachments` array.

```ts
mockAttachments = [
  { id: '1', filename: 'Example request-file.pdf' },
  { id: '2', filename: 'Example request-file.pdf' },
  { id: '3', filename: 'Example request-file.pdf' },
]
```

#### Layout

```
"Attachments" (heading)

For each file:
  [FileText icon (red)] filename        [Eye] [Download]
```

- Dividers between items (`divide-y`)
- Action buttons: Preview (Eye), Download (Download) — currently `console.log`

---

### `src/components/request/ActionButtons.tsx`

**Purpose:** Approve and Reject buttons with loading states.

#### Props

| Prop | Type | Source |
|---|---|---|
| `permissions` | `Permissions` | `data.permissions` |
| `status` | `RequestStatus` | `data.request.status` |
| `onApprove` | `() => void` | `handleApprove` from App |
| `onReject` | `() => void` | `handleReject` from App |
| `loading` | `boolean` | `loading` state from App |

#### Rendering Logic

1. **Returns `null`** if `status === 'APPROVED'` or `status === 'REJECTED'` (buttons disappear after action)
2. **Returns `null`** if `!canApprove && !canReject` (no permission)
3. Otherwise renders:
   - Reject button (red outline) — if `canReject`
   - Approve button (green-400 fill) — if `canApprove`

#### Loading State

- Both buttons get `disabled` when `loading === true`
- Icon switches from Check/X to spinning `Loader2`
- Opacity reduces to 50%, cursor changes to `not-allowed`

---

### `src/components/approval/ApprovalFlow.tsx`

**Purpose:** Container for the approval timeline. Renders all steps and optional result.

#### Props

| Prop | Type | Source |
|---|---|---|
| `approvalFlow` | `ApprovalFlowType` | `data.approvalFlow` |
| `requestStatus` | `RequestStatus` | `data.request.status` |

#### Logic

- `showResult = status === 'APPROVED' || status === 'REJECTED'`
- Maps each step to `<ApprovalStep>`
- `isLast` prop: `true` for last step ONLY when no result shown (controls connecting line)
- Conditionally renders `<ApprovalResult>` at the bottom

---

### `src/components/approval/ApprovalStep.tsx`

**Purpose:** Single timeline entry — icon, connecting line, user info, badges, date.

#### Props

| Prop | Type | Purpose |
|---|---|---|
| `step` | `ApprovalStepType` | Step data |
| `isLast` | `boolean` | Hide connecting line if true |
| `requestStatus` | `RequestStatus` | Override icons when APPROVED |

#### Key Logic

```ts
iconStatus = requestStatus === 'APPROVED' ? 'APPROVED' : step.status
```

When the request is APPROVED, ALL step icons become blue check marks (regardless of their individual status).

#### Sub-component: `StatusIcon({ status })`

| Status | Icon |
|---|---|
| `SUBMITTED` / `APPROVED` | Blue filled circle (`bg-blue-500`) + white check mark |
| `NEED_APPROVAL` | Blue filled circle (`bg-blue-500`) + white dot |
| `REJECTED` | Red XCircle |
| `UNDER_REVIEW` / default | Blue outline circle (`text-blue-300`) |

#### Layout

```
[Icon]        [Avatar] User name
  |                    User title
  |           [CompanyTag] [StatusBadge] [RoleBadge?]
  |           Date (if actedAt exists)
  |
(blue connecting line, hidden if isLast)
```

#### Badge Details

- **Company tag:** white bg, gray border, bold text (`font-semibold`)
- **Status badge:** `<Badge>` component (colored by status)
- **Role badge:** Only for REVIEWER and APPROVER roles, gray style (`bg-gray-100`)

---

### `src/components/approval/ApprovalResult.tsx`

**Purpose:** Final node at the bottom of the timeline showing the outcome.

#### Props

| Prop | Type |
|---|---|
| `status` | `RequestStatus` |

#### Rendering

| Status | Display |
|---|---|
| `APPROVED` | Green circle (`bg-green-500`) + white check icon + "Approved" text (green) |
| `REJECTED` | Red XCircle icon + "Rejected" text (red) |
| Other | Returns `null` |

---

### `src/components/ui/Badge.tsx`

**Purpose:** Colored status pill badge.

#### Props

| Prop | Type |
|---|---|
| `status` | `RequestStatus \| string` |
| `label` | `string` |

#### Color Map

| Status | Style |
|---|---|
| `NEED_APPROVAL` | Yellow border + text + bg |
| `APPROVED` | Green border + text + bg |
| `SUBMITTED` | Green border + text + bg |
| `UNDER_REVIEW` | Blue border + text + bg |
| `REJECTED` | Red border + text + bg |
| Default | Gray (fallback) |

---

### `src/components/ui/Avatar.tsx`

**Purpose:** Circular avatar showing user initials.

#### Props

| Prop | Type | Default |
|---|---|---|
| `name` | `string` | - |
| `size` | `'sm' \| 'md'` | `'md'` |

#### Sizes

| Size | Classes |
|---|---|
| `sm` | `w-8 h-8 text-xs` |
| `md` | `w-10 h-10 text-sm` |

- Background: `bg-blue-500`
- Calls `getInitials(name)` to display 1-2 letters

---

### `src/components/ui/Tag.tsx`

**Purpose:** Simple pill chip for linked requests.

#### Props

| Prop | Type |
|---|---|
| `label` | `string` |

- Style: gray border, gray-50 bg, small text
- Used in RequestDetails for linked request IDs

---

### `src/data/frontend-homework-challenge-mock.json`

**Purpose:** Initial mock data representing a request in `NEED_APPROVAL` state.

| Field | Value |
|---|---|
| `request.id` | `"CA-PO-26010002"` |
| `request.status` | `"NEED_APPROVAL"` |
| `request.createdBy` | Alex Taylor |
| Approval steps | 4 steps: SUBMITTED → NEED_APPROVAL → UNDER_REVIEW → UNDER_REVIEW |
| `currentStepId` | `"step_2"` (Jamie Morgan, Reviewer) |
| Permissions | canApprove: true, canReject: true, canDuplicate: true |

---

## User Action Flows

### Flow 1: User clicks "Approve"

```
1. ActionButtons: onClick → calls onApprove()
2. App.tsx: handleApprove()
   ├── setLoading(true)
   ├── await approveRequest(data)     ← 1s delay
   │   └── Returns new data:
   │       - request.status = "APPROVED"
   │       - All steps get actedAt timestamps
   │       - permissions.canApprove/canReject = false
   ├── setData(result)                ← triggers re-render
   └── setLoading(false)
3. Re-render effects:
   ├── PageHeader: Badge → green "Approved", Print button appears
   ├── ActionButtons: returns null (APPROVED status)
   ├── ApprovalStep: all icons → blue check (iconStatus override)
   ├── ApprovalStep: all dates → filled in
   └── ApprovalResult: renders green check + "Approved"
```

### Flow 2: User clicks "Reject"

```
1. ActionButtons: onClick → calls onReject()
2. App.tsx: handleReject()
   ├── setLoading(true)
   ├── await rejectRequest(data)      ← 1s delay
   │   └── Returns new data:
   │       - request.status = "REJECTED"
   │       - Current step (step_2) → REJECTED + actedAt
   │       - Other steps unchanged
   │       - permissions.canApprove/canReject = false
   ├── setData(result)                ← triggers re-render
   └── setLoading(false)
3. Re-render effects:
   ├── PageHeader: Badge → red "Rejected"
   ├── ActionButtons: returns null (REJECTED status)
   ├── ApprovalStep: step_2 icon → red XCircle
   └── ApprovalResult: renders red X + "Rejected"
```

### Flow 3: Loading state (during API call)

```
1. loading = true
2. ActionButtons:
   ├── Both buttons get disabled attribute
   ├── Icons swap to spinning Loader2
   └── Opacity drops to 50%
3. After 1 second: loading = false, data updates
```

---

## Responsive Design

| Breakpoint | Behavior |
|---|---|
| Mobile (<768px) | Single column layout, nav links hidden, stacked header |
| Desktop (md+) | Two-column grid, nav links visible, header items in row |

Key responsive classes:
- `grid-cols-1 md:grid-cols-2` — main content grid
- `flex-col md:flex-row` — PageHeader title + actions
- `hidden md:flex` — Navbar center links
