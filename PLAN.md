# Frontend Homework Challenge — Implementation Plan

## Overview

สร้าง **Purchase Request Detail Page** เป็น Web App ด้วย **React + TypeScript (Vite)**
แสดงรายละเอียดคำขอจัดซื้อ พร้อม Approval Flow timeline โดยอ้างอิง Mock JSON data และ Figma design

### App มี 2 Page States ที่ต้อง Implement:

| Page | Status | พฤติกรรม | Header Actions |
|------|--------|----------|----------------|
| **Page 1** | `NEED_APPROVAL` | Interactive — มีปุ่ม Approve & Reject | Share, View count, Duplicate |
| **Page 2** | `APPROVED` | Read-only — ดูข้อมูลอย่างเดียว ไม่มี action buttons | Share, **Print**, View count, Duplicate |

> จะใช้ **Tab/Toggle** หรือ **Mock navigation** เพื่อให้สลับดูได้ทั้ง 2 states

---

## 1. Tech Stack

| Category         | Choice                     | เหตุผล                                              |
| ---------------- | -------------------------- | --------------------------------------------------- |
| Framework        | React 18 + TypeScript      | ตามที่สมัครไว้                                       |
| Build Tool       | Vite                       | เร็ว, config น้อย                                    |
| Styling          | Tailwind CSS               | เขียน UI ได้เร็ว, ตรง design ง่าย, ไม่ต้อง CSS file เยอะ |
| Icons            | Lucide React               | Lightweight, มี icon ครบ (share, eye, download, etc.) |
| Date Formatting  | `date-fns`                 | Lightweight, tree-shakeable, format วันที่ตาม design  |
| Animated UI      | React Bits (`reactbits.dev`) | Animated components (text, backgrounds, UI effects) เพิ่มความน่าสนใจให้ UI |
| State Management | React useState (local)     | App เล็ก ไม่ต้อง global state                        |
| Testing          | Vitest + React Testing Lib | มาคู่กับ Vite, ทดสอบ component ได้ง่าย               |

> **ไม่ใช้**: Redux, React Query
> **อาจใช้**: React Router (สำหรับสลับระหว่าง 2 pages — Page 1: Need Approval, Page 2: Approved)

### React Bits (reactbits.dev)
- **วิธีติดตั้ง**: ไม่ใช่ npm package ทั้งก้อน — copy component ทีละตัวผ่าน CLI
- **CLI**: `npx shadcn@latest add @react-bits/<ComponentName>-TS-TW` (สำหรับ TypeScript + Tailwind)
- **รองรับ 4 variants**: JS-CSS, JS-TW, TS-CSS, TS-TW → เราใช้ **TS-TW**
- **Dependencies ที่อาจต้องใช้** (ขึ้นอยู่กับ component ที่เลือก): `gsap`, `framer-motion`, `three` (สำหรับ 3D components)
- **ใช้ที่ไหนได้บ้าง**:
  - Text animations (เช่น BlurText, SplitText) → ใช้กับ Title ใน PageHeader
  - Background effects (เช่น Aurora, Particles) → ใช้เป็น page background
  - UI animations → ใช้กับ cards, buttons, transitions
- **Docs**: https://reactbits.dev/get-started/installation

---

## 2. Project Structure

```
src/
├── assets/                     # Static assets (logo, etc.)
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Top navigation bar
│   │   └── PageHeader.tsx      # Back button + Title + Status + Actions
│   ├── request/
│   │   ├── RequestDetails.tsx  # Company, Type, Title, Linked requests card
│   │   ├── Attachments.tsx     # Attachment list card
│   │   └── ActionButtons.tsx   # Reject / Approve buttons
│   ├── approval/
│   │   ├── ApprovalFlow.tsx    # Approval flow container
│   │   ├── ApprovalStep.tsx    # Single step in timeline
│   │   └── ApprovalResult.tsx  # Final "Approved" / "Rejected" indicator
│   └── ui/
│       ├── Badge.tsx           # Status badge (Need approval, Approved, etc.)
│       ├── Tag.tsx             # Linked request tag (CA-PO-xxxxx)
│       └── Avatar.tsx          # User avatar circle (initials)
├── data/
│   ├── mock-need-approval.json # Mock data — Page 1 (NEED_APPROVAL, interactive)
│   └── mock-approved.json      # Mock data — Page 2 (APPROVED, read-only)
├── types/
│   └── request.ts             # TypeScript interfaces/types
├── utils/
│   └── format.ts              # Date formatting, status helpers
├── App.tsx                     # Main app component
├── main.tsx                    # Entry point
└── index.css                   # Tailwind base + custom styles
```

---

## 3. TypeScript Types (จาก JSON Structure)

```typescript
// types/request.ts

interface User {
  id: string;
  name: string;
  title?: string;
}

interface Company {
  id: string;
  name: string;
}

interface RequestType {
  code: string;
  label: string;
}

interface LinkedRequest {
  id: string;
  type: string;
}

type RequestStatus = "NEED_APPROVAL" | "APPROVED" | "REJECTED" | "UNDER_REVIEW" | "SUBMITTED";

interface ApprovalStep {
  id: string;
  order: number;
  user: User;
  companyTag: string;
  role: "SUBMITTER" | "REVIEWER" | "APPROVER";
  status: RequestStatus;
  statusLabel: string;
  actedAt: string | null;
}

interface ApprovalFlow {
  currentStepId: string;
  steps: ApprovalStep[];
}

interface RequestData {
  request: {
    id: string;
    title: string;
    status: RequestStatus;
    statusLabel: string;
    createdBy: User;
    createdAt: string;
    viewCount: number;
  };
  details: {
    company: Company;
    requestType: RequestType;
    linkedRequests: LinkedRequest[];
  };
  approvalFlow: ApprovalFlow;
  permissions: {
    canApprove: boolean;
    canReject: boolean;
    canDuplicate: boolean;
  };
}
```

---

## 4. Component Breakdown & Design Mapping

### 4.1 Navbar

```
┌─────────────────────────────────────────────────────────────┐
│ [Logo] Portal     My requests   My approve   History   [AT] │
└─────────────────────────────────────────────────────────────┘
```

- Logo + "Portal" text (ซ้าย)
- Nav links: My requests, My approve, History (กลาง)
- User avatar วงกลม แสดง initials "AT" (ขวา)
- มี border-bottom สีเทาอ่อน

### 4.2 PageHeader

```
← Back
Office supplies Purchase request  [Need approval]    [Share] [👁 3] [Duplicate as copy]
CA-PO-26010002  Created by: Alex Taylor  Created date: 01/02/2026 09:00:00
```

- Back button (blue, clickable)
- Title (bold, large) + Status Badge
- Action icons area + "Duplicate as copy" button
- Meta line: Request ID, Creator, Created date

**Action icons ต่างกันตาม state:**

| State           | Icons ที่แสดง                              |
| --------------- | ------------------------------------------ |
| NEED_APPROVAL   | Share, Eye (view count), Duplicate as copy |
| APPROVED        | Share, **Print**, Eye (view count), Duplicate as copy |

### 4.3 Request Details Card

- Layout: 2x2 grid
  - Company | Request Type
  - Title | Linked requests (แสดงเป็น Tag chips)
- Linked requests: ถ้าไม่มี แสดง "-"

### 4.4 Attachments Card

- List of files พร้อม PDF icon
- แต่ละ row: [PDF icon] filename [Preview icon] [Download icon]
- Static/mock data (ไม่ต้อง implement จริง)

### 4.5 Action Buttons (Reject / Approve)

- **Page 1 (NEED_APPROVAL)**: แสดง Reject + Approve buttons
  - Reject: outlined, สีแดง, มี X icon
  - Approve: filled, สีน้ำเงินเข้ม, มี checkmark icon, text สีขาว
  - แสดงเฉพาะเมื่อ `permissions.canApprove` / `permissions.canReject` = `true`
- **Page 2 (APPROVED)**: **ไม่แสดง** buttons เลย (read-only page)

### 4.6 Approval Flow Timeline

- Vertical timeline ด้วย connecting lines
- แต่ละ step แสดง:
  - **Icon**: ✅ green check (completed) / 🔵 blue dot (current) / ⚪ gray circle (pending)
  - User name (bold) + Title
  - Company tag (chip/badge)
  - Status badge + Role badge (ถ้าเป็น REVIEWER/APPROVER)
- **Page 1 (NEED_APPROVAL)**: step ที่ผ่านแล้ว = green check, step ปัจจุบัน = blue dot, step รอ = gray circle
- **Page 2 (APPROVED)**: **ทุก step เป็น green check หมด** + แสดง "Approved" ที่ท้ายสุดพร้อม green check icon

### สรุป Status → Icon Mapping

| Step Status    | Icon              | Badge Color       |
| -------------- | ----------------- | ----------------- |
| SUBMITTED      | ✅ Green check    | Green outline     |
| NEED_APPROVAL  | 🔵 Blue filled   | Orange/Yellow     |
| UNDER_REVIEW   | ⚪ Gray circle   | Gray              |
| APPROVED       | ✅ Green check    | Green             |
| REJECTED       | ❌ Red cross     | Red               |

---

## 5. Implementation Steps

### Phase 1: Project Setup
1. `npm create vite@latest` → React + TypeScript
2. Install dependencies: `tailwindcss`, `lucide-react`, `date-fns`
3. Setup Tailwind config
4. วาง mock.json ใน `src/data/`
5. สร้าง TypeScript types

### Phase 2: Layout & Navbar
6. สร้าง `Navbar` component
7. สร้าง overall page layout (max-width container, padding)

### Phase 3: Page Header
8. สร้าง `PageHeader` — Back, Title, Status badge, Actions, Meta info
9. สร้าง `Badge` component (reusable, รับ variant prop)

### Phase 4: Request Details (Left Column)
10. สร้าง `RequestDetails` card — 2x2 grid layout
11. สร้าง `Tag` component สำหรับ linked requests
12. สร้าง `Attachments` card — file list with icons

### Phase 5: Approval Flow (Right Column)
13. สร้าง `ApprovalFlow` container
14. สร้าง `ApprovalStep` — timeline step with icon, user info, badges
15. สร้าง `ApprovalResult` — final status indicator (Approved/Rejected)
16. Implement timeline connecting lines (CSS border-left)

### Phase 6: Action Buttons
17. สร้าง `ActionButtons` — Reject/Approve, conditional rendering based on permissions

### Phase 7: Responsive & Polish
18. ทำ Responsive layout (mobile: stack columns)
19. Hover states, transitions
20. ตรวจสอบ design ตรงกับ Figma

### Phase 8: Testing
21. Unit tests สำหรับ utility functions (date format, status mapping)
22. Component tests สำหรับ conditional rendering (buttons show/hide, badge variants)
23. Test edge cases (no linked requests, null actedAt, etc.)

---

## 6. Key Design Decisions & Assumptions

### Layout
- **Two-column layout**: Left (Request details + Attachments + Actions), Right (Approval Flow)
- Container max-width ~1200px, centered
- On mobile (<768px): stack to single column, Approval Flow ไปอยู่ล่าง

### Data
- ใช้ **2 ชุด** static mock JSON (Need Approval + Approved) สลับแสดงได้
- Mock data Page 2 (Approved):
  - `request.status` = `"APPROVED"`, `statusLabel` = `"Approved"`
  - `request.title` = `"Printer delivery confirmation"`
  - `request.id` = `"CA-PO-26010003"`
  - `details.linkedRequests` = `[]` (ว่าง → แสดง "-")
  - `approvalFlow.steps` → ทุก step มี status เป็น completed
  - `permissions` → `canApprove: false`, `canReject: false`
- ไม่ต้อง implement real approve/reject logic — แค่ `console.log` หรือ alert เมื่อกด
- Duplicate as copy → `console.log` action
- ใช้ **simple tab/toggle** ที่มุมบนซ้ายหรือ URL param เพื่อสลับระหว่าง 2 mock datasets

### Styling
- สี status badges:
  - Need approval → `border-yellow-500 text-yellow-600 bg-yellow-50`
  - Approved → `border-green-500 text-green-600 bg-green-50`
  - Under review → `border-gray-400 text-gray-500 bg-gray-50`
  - Submit → `border-green-500 text-green-600 bg-green-50`
- Font: ใช้ system font stack (Inter ถ้าอยากเหมือน design)

### Edge Cases ที่ต้อง Handle
- Linked requests ว่าง → แสดง "-"
- `actedAt` เป็น `null` → ไม่แสดงวันที่
- Permissions เป็น `false` → ซ่อน buttons
- Long user names / titles → truncate with ellipsis
- Status ที่ไม่รู้จัก → fallback เป็น gray badge

---

## 7. Estimated File Count

| Category    | Files | LOC (est.) |
| ----------- | ----- | ---------- |
| Components  | ~12   | ~500       |
| Types       | 1     | ~60        |
| Utils       | 1     | ~30        |
| Tests       | 3-4   | ~200       |
| Config      | 3     | ~50        |
| **Total**   | ~20   | ~840       |

---

## 8. Deliverables

1. Source code ทั้งหมดบน Git repository
2. `README.md` อธิบาย:
   - วิธี run project (`npm install` → `npm run dev`)
   - Tech stack ที่เลือกและเหตุผล
   - Assumptions ที่ตั้งไว้
   - สิ่งที่จะปรับปรุงถ้ามีเวลาเพิ่ม
3. Code ที่อ่านง่าย, มี type safety, handle edge cases

---

## 9. สิ่งที่จะ **ไม่** Implement (Out of Scope)

- Real API calls / backend
- Authentication / login
- Routing (multi-page)
- File upload / download จริง
- Real-time updates
- Drag and drop
- i18n / multi-language
