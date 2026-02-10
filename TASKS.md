# Tasks — Purchase Request Detail Page

---

## Phase 1: Project Setup

### 1.1 Init Vite Project
- [x] รัน `npm create vite@latest . -- --template react-ts`
- [x] ลบไฟล์ boilerplate ที่ไม่ใช้ (`App.css`, `assets/react.svg`, default content ใน `App.tsx`)
- [x] ทดสอบ `npm run dev` รันขึ้นมาได้ไม่ error

### 1.2 Install Production Dependencies
- [x] `npm install lucide-react` — icon library
- [x] `npm install date-fns` — date formatting

### 1.2.1 Setup React Bits (reactbits.dev)
> React Bits ไม่ได้ install เป็น npm package — copy component ทีละตัวผ่าน CLI
> ใช้ variant **TS-TW** (TypeScript + Tailwind)
> Docs: https://reactbits.dev/get-started/installation
- [x] เลือก components ที่จะใช้จาก reactbits.dev (ดู list ที่เว็บ)
- [x] **Text Animations** — เลือกสำหรับใช้กับ Title / Heading:
  - [x] ลอง `BlurText` → ใช้กับ title ใน PageHeader (text โผล่แบบ blur-in)
  - [ ] ลอง `SplitText` → ใช้กับ heading text animations (ต้องใช้ GSAP — เพิ่มทีหลังถ้าต้องการ)
  - [x] ลอง `GradientText` → ใช้กับ "Portal" text ใน Navbar
  - [x] ติดตั้งด้วย: copy source code จาก GitHub (variant TS-TW)
- [ ] **Background Effects** — เลือกสำหรับ page background (เพิ่มทีหลัง):
  - [ ] ลอง `Aurora` → animated gradient background
  - [ ] ลอง `Particles` → particle effect background
  - [ ] ลอง `Hyperspeed` → animated lines background
  - [ ] เลือก 1 ตัวที่เหมาะกับ design ของ app
- [ ] **UI Animations** — เลือกสำหรับ interactive elements (เพิ่มทีหลัง):
  - [ ] ลอง animated buttons / hover effects
  - [ ] ลอง card animations / transitions
- [x] Install dependencies ที่ React Bits component ต้องการ:
  - [x] `npm install motion` — สำหรับ BlurText + GradientText
  - [ ] `npm install gsap` — ถ้าใช้ SplitText (ยังไม่ต้อง)
  - [ ] `npm install three @react-three/fiber` — ถ้าใช้ 3D components (ยังไม่ต้อง)
- [x] สร้างโฟลเดอร์ `src/components/reactbits/` สำหรับเก็บ components ที่ copy มา
- [ ] ทดสอบ render React Bits component ได้ใน App.tsx ไม่ error

### 1.3 Install & Setup Tailwind CSS
- [x] `npm install -D tailwindcss @tailwindcss/vite`
- [x] เพิ่ม Tailwind plugin ใน `vite.config.ts` (`@tailwindcss/vite`)
- [x] แก้ `src/index.css` → ใส่ `@import "tailwindcss";`
- [x] ลบ default CSS ทั้งหมดที่ Vite generate มา
- [ ] ทดสอบ Tailwind ใช้งานได้ (ใส่ class เช่น `text-red-500` แล้วเห็นสีเปลี่ยน)

### 1.4 Install Testing Dependencies
- [x] `npm install -D vitest` — test runner
- [x] `npm install -D jsdom` — DOM environment สำหรับ test
- [x] `npm install -D @testing-library/react` — React testing utilities
- [x] `npm install -D @testing-library/jest-dom` — custom matchers (toBeInTheDocument, etc.)
- [x] `npm install -D @testing-library/user-event` — simulate user interactions

### 1.5 สร้าง Directory Structure
- [x] สร้าง `src/components/layout/`
- [x] สร้าง `src/components/request/`
- [x] สร้าง `src/components/approval/`
- [x] สร้าง `src/components/ui/`
- [x] สร้าง `src/data/`
- [x] สร้าง `src/types/`
- [x] สร้าง `src/utils/`
- [x] สร้าง `src/assets/`

### 1.6 สร้าง TypeScript Types
- [x] สร้างไฟล์ `src/types/request.ts`
- [x] กำหนด `interface User` — id, name, title?
- [x] กำหนด `interface Company` — id, name
- [x] กำหนด `interface RequestType` — code, label
- [x] กำหนด `interface LinkedRequest` — id, type
- [x] กำหนด `type RequestStatus` — union: `"NEED_APPROVAL" | "APPROVED" | "REJECTED" | "UNDER_REVIEW" | "SUBMITTED"`
- [x] กำหนด `interface ApprovalStep` — id, order, user, companyTag, role, status, statusLabel, actedAt
- [x] กำหนด `interface ApprovalFlow` — currentStepId, steps[]
- [x] กำหนด `interface Permissions` — canApprove, canReject, canDuplicate
- [x] กำหนด `interface RequestData` — request, details, approvalFlow, permissions
- [x] Export ทุก type/interface

### 1.7 สร้าง Mock Data
- [x] สร้าง `src/data/mock-need-approval.json`
  - [x] `request.status` = `"NEED_APPROVAL"`, `statusLabel` = `"Need approval"`
  - [x] `request.id` = `"CA-PO-26010002"`
  - [x] `request.title` = `"Office supplies Purchase request"`
  - [x] `request.createdBy` = `{ name: "Alex Taylor" }`
  - [x] `request.viewCount` = `3`
  - [x] `details.linkedRequests` = มีอย่างน้อย 1 รายการ
  - [x] `approvalFlow.steps` = mixed statuses (SUBMITTED, NEED_APPROVAL, UNDER_REVIEW)
  - [x] `permissions` = `{ canApprove: true, canReject: true, canDuplicate: true }`
- [x] สร้าง `src/data/mock-approved.json`
  - [x] `request.status` = `"APPROVED"`, `statusLabel` = `"Approved"`
  - [x] `request.id` = `"CA-PO-26010003"`
  - [x] `request.title` = `"Printer delivery confirmation"`
  - [x] `details.linkedRequests` = `[]` (ว่าง)
  - [x] `approvalFlow.steps` = ทุก step เป็น APPROVED/SUBMITTED (completed ทั้งหมด)
  - [x] `permissions` = `{ canApprove: false, canReject: false, canDuplicate: true }`
- [x] ตรวจสอบว่า JSON ตรงกับ TypeScript interfaces

### 1.8 Verify Setup
- [x] `npm run dev` → dev server รันได้ ไม่มี error
- [x] `npm run build` → build ผ่าน
- [x] import mock JSON ใน App.tsx ได้ ไม่ error
- [ ] import types ใช้งานได้

---

## Phase 2: Layout & Navbar

### 2.1 สร้าง Navbar Component
- [x] สร้างไฟล์ `src/components/layout/Navbar.tsx`
- [x] ฝั่งซ้าย: Logo icon + text "Portal" (bold)
- [x] ฝั่งกลาง: Nav links — "My requests", "My approve", "History"
- [x] Highlight active link (เช่น "My requests" เป็น bold/สีเข้ม)
- [x] ฝั่งขวา: Avatar วงกลม แสดง initials "AT" (พื้นหลังสี, text สีขาว)
- [x] ใส่ `border-bottom` สีเทาอ่อน (`border-b border-gray-200`)
- [x] Layout ใช้ `flex justify-between items-center`
- [x] กำหนด height คงที่ (เช่น `h-16`)

### 2.2 Setup Page Layout ใน App.tsx
- [x] import Navbar → render ด้านบนสุด
- [x] สร้าง main container: `max-w-[1200px] mx-auto px-4 py-6`
- [x] เตรียม state toggle สำหรับสลับ mock data (`useState`)
- [x] import mock data ทั้ง 2 ชุด
- [x] ส่ง data เป็น props ลงไปให้ child components (เตรียมไว้)

---

## Phase 3: Page Header + Badge

### 3.1 สร้าง Badge Component
- [x] สร้างไฟล์ `src/components/ui/Badge.tsx`
- [x] รับ props: `variant` (หรือ `status`), `label` (text ที่แสดง)
- [x] สี NEED_APPROVAL → `border-yellow-500 text-yellow-600 bg-yellow-50`
- [x] สี APPROVED → `border-green-500 text-green-600 bg-green-50`
- [x] สี UNDER_REVIEW → `border-gray-400 text-gray-500 bg-gray-50`
- [x] สี SUBMITTED → `border-green-500 text-green-600 bg-green-50`
- [x] สี REJECTED → `border-red-500 text-red-600 bg-red-50`
- [x] Fallback สำหรับ unknown status → gray
- [x] Style: `rounded-full px-3 py-1 text-sm font-medium border`

### 3.2 สร้าง PageHeader Component
- [x] สร้างไฟล์ `src/components/layout/PageHeader.tsx`
- [x] รับ props: `RequestData` (หรือ destructured fields ที่จำเป็น)
- [x] **Row 1**: "← Back" link (สีน้ำเงิน, `ArrowLeft` icon จาก lucide)
- [x] **Row 2 ซ้าย**: Title text (bold, large font) + Badge component (status)
- [x] **Row 2 ขวา**: Action icons area
  - [x] Share icon (`Share2` จาก lucide) — แสดงทุก state
  - [x] Print icon (`Printer` จาก lucide) — แสดงเฉพาะ APPROVED
  - [x] Eye icon (`Eye` จาก lucide) + view count number — แสดงทุก state
  - [x] "Duplicate as copy" button (`Copy` icon + text) — แสดงเฉพาะ `permissions.canDuplicate`
- [x] **Row 3 (Meta)**: Request ID (`request.id`) | "Created by: {name}" | "Created date: {formatted date}"
- [x] Format date ด้วย `date-fns` → `dd/MM/yyyy HH:mm:ss`
- [x] Action icons: `onClick` → `console.log` (mock action)

---

## Phase 4: Request Details — Left Column

### 4.1 สร้าง Tag Component
- [x] สร้างไฟล์ `src/components/ui/Tag.tsx`
- [x] รับ props: `label` (text เช่น "CA-PO-26010001")
- [x] Style: chip/pill shape, border, rounded, small text
- [x] สี: neutral (gray border, light bg)

### 4.2 สร้าง RequestDetails Component
- [x] สร้างไฟล์ `src/components/request/RequestDetails.tsx`
- [x] รับ props: `details` object จาก `RequestData`
- [x] Card wrapper: `bg-white rounded-lg border p-6`
- [x] **Grid layout 2x2** (`grid grid-cols-2 gap-4`)
  - [x] Cell 1: Label "Company" + value `details.company.name`
  - [x] Cell 2: Label "Request type" + value `details.requestType.label`
  - [x] Cell 3: Label "Title" + value `request.title`
  - [x] Cell 4: Label "Linked request" + Tag chips หรือ "-" ถ้าว่าง
- [x] แต่ละ cell: label เป็น text สีเทาเล็ก, value เป็น text สีดำปกติ
- [x] Linked requests: map `linkedRequests[]` → render `<Tag>` แต่ละตัว
- [x] ถ้า `linkedRequests.length === 0` → แสดง "-"

### 4.3 สร้าง Attachments Component
- [x] สร้างไฟล์ `src/components/request/Attachments.tsx`
- [x] Card wrapper: `bg-white rounded-lg border p-6`
- [x] Header: "Attachment" (bold)
- [x] Mock attachment data (hardcode ใน component หรือเพิ่มใน JSON)
- [x] แต่ละ file row:
  - [x] PDF icon ฝั่งซ้าย (`FileText` จาก lucide, สีแดง)
  - [x] Filename text (ตรงกลาง)
  - [x] Preview icon button (`Eye` จาก lucide)
  - [x] Download icon button (`Download` จาก lucide)
- [x] Divider line ระหว่างแต่ละ row
- [x] ทุก action button → `console.log` only

### 4.4 ประกอบ Left Column
- [x] ใน App.tsx (หรือ page component): จัด left column layout
- [x] เรียง: RequestDetails → Attachments → (ActionButtons จะใส่ Phase 6)
- [x] ใช้ `flex flex-col gap-6`

---

## Phase 5: Approval Flow — Right Column

### 5.1 สร้าง Avatar Component
- [x] สร้างไฟล์ `src/components/ui/Avatar.tsx`
- [x] รับ props: `name` (string) — ใช้ generate initials
- [x] Logic สร้าง initials: แยก first name + last name → เอาตัวแรกของแต่ละคำ (เช่น "Alex Taylor" → "AT")
- [x] Style: วงกลม (`rounded-full`), ขนาดคงที่ (เช่น `w-10 h-10`)
- [x] พื้นหลังสี (เช่น `bg-blue-500`), text สีขาว, `font-semibold`
- [x] จัดกลาง text (`flex items-center justify-center`)

### 5.2 สร้าง ApprovalStep Component
- [x] สร้างไฟล์ `src/components/approval/ApprovalStep.tsx`
- [x] รับ props: `step` (ApprovalStep type), `isLast` (boolean)
- [x] **Timeline icon** (ฝั่งซ้าย):
  - [x] SUBMITTED → green check circle (`CheckCircle2` สีเขียว)
  - [x] NEED_APPROVAL → blue filled dot (วงกลมสีน้ำเงิน)
  - [x] UNDER_REVIEW → gray outlined circle (วงกลมสีเทา)
  - [x] APPROVED → green check circle
  - [x] REJECTED → red X circle (`XCircle` สีแดง)
  - [x] Fallback → gray circle
- [x] **Connecting line**: เส้นแนวตั้งต่อจาก icon ลงไป step ถัดไป
  - [x] ใช้ `border-left` หรือ `div` ที่มี `w-px bg-gray-300`
  - [x] step สุดท้าย (`isLast`) → ไม่แสดง line
- [x] **Content area** (ฝั่งขวาของ icon):
  - [x] User name (bold) + title (ถ้ามี, สีเทา)
  - [x] Company tag chip (เช่น badge เล็กๆ แสดง `companyTag`)
  - [x] Status badge (ใช้ `<Badge>` component)
  - [x] Role badge — แสดงเฉพาะถ้า role เป็น REVIEWER หรือ APPROVER
  - [x] วันที่ acted (`actedAt`) — format ด้วย date-fns, ถ้า `null` → ไม่แสดง

### 5.3 สร้าง ApprovalResult Component
- [x] สร้างไฟล์ `src/components/approval/ApprovalResult.tsx`
- [x] รับ props: `status` (RequestStatus)
- [x] แสดงเฉพาะเมื่อ status เป็น APPROVED หรือ REJECTED
- [x] APPROVED → green check icon + text "Approved" สีเขียว
- [x] REJECTED → red X icon + text "Rejected" สีแดง
- [x] Style: ขนาดใหญ่กว่า step ปกติ, เด่นชัด

### 5.4 สร้าง ApprovalFlow Container
- [x] สร้างไฟล์ `src/components/approval/ApprovalFlow.tsx`
- [x] รับ props: `approvalFlow` (ApprovalFlow type), `requestStatus` (RequestStatus)
- [x] Card wrapper: `bg-white rounded-lg border p-6`
- [x] Header: "Approval flow" (bold)
- [x] Map `approvalFlow.steps` → render `<ApprovalStep>` แต่ละตัว
- [x] ส่ง `isLast` prop ให้ step สุดท้าย
- [x] ถ้า `requestStatus === "APPROVED"` → render `<ApprovalResult>` ต่อท้าย
- [x] Timeline layout: ใช้ `relative` positioning สำหรับ connecting lines

### 5.5 ประกอบ Right Column
- [x] ใน App.tsx: จัด right column layout
- [x] ใส่ `<ApprovalFlow>` component
- [x] จัด two-column layout รวมกับ left column: `grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6` (หรือ ratio ที่เหมาะสม)

---

## Phase 6: Action Buttons

### 6.1 สร้าง ActionButtons Component
- [x] สร้างไฟล์ `src/components/request/ActionButtons.tsx`
- [x] รับ props: `permissions` (Permissions type), `status` (RequestStatus)

### 6.2 Reject Button
- [x] Style: outlined, สีแดง (`border-red-500 text-red-500 bg-white`)
- [x] Icon: X (`X` จาก lucide) ฝั่งซ้ายของ text
- [x] Text: "Reject"
- [x] Hover: `hover:bg-red-50`
- [x] แสดงเฉพาะเมื่อ `permissions.canReject === true`
- [x] `onClick` → `console.log("Reject clicked")`

### 6.3 Approve Button
- [x] Style: filled, สีน้ำเงินเข้ม (`bg-blue-800 text-white`)
- [x] Icon: Check (`Check` จาก lucide) ฝั่งซ้ายของ text
- [x] Text: "Approve"
- [x] Hover: `hover:bg-blue-900`
- [x] แสดงเฉพาะเมื่อ `permissions.canApprove === true`
- [x] `onClick` → `console.log("Approve clicked")`

### 6.4 Conditional Rendering
- [x] ถ้า `status === "APPROVED"` → ไม่ render component เลย (return null)
- [x] ถ้า `canApprove === false && canReject === false` → ไม่ render
- [x] Layout: `flex gap-3 justify-end` (buttons ชิดขวา)

### 6.5 ประกอบเข้า Left Column
- [x] ใส่ `<ActionButtons>` ใต้ `<Attachments>` ใน left column
- [x] ส่ง props: permissions, status

---

## Phase 7: Responsive & Polish

### 7.1 State Toggle (สลับ NEED_APPROVAL ↔ APPROVED)
- [ ] สร้าง toggle/tab UI ด้านบนของ page (หรือใน Navbar)
- [ ] Tab 1: "Need Approval" — โหลด `mock-need-approval.json`
- [ ] Tab 2: "Approved" — โหลด `mock-approved.json`
- [ ] Highlight tab ที่ active
- [ ] `useState` เก็บ current state, สลับ data ตาม state
- [ ] ทดสอบ: กดสลับแล้ว UI เปลี่ยนถูกต้อง (buttons หาย, badge เปลี่ยนสี, timeline เปลี่ยน)

### 7.2 Utility Functions
- [ ] สร้างไฟล์ `src/utils/format.ts`
- [ ] `formatDate(dateString)` → ใช้ date-fns format เป็น `dd/MM/yyyy HH:mm:ss`
- [ ] `getInitials(name)` → แยกชื่อ → return initials (เช่น "AT")
- [ ] `getStatusColor(status)` → return Tailwind class string ตาม status
- [ ] Export ทุก function

### 7.3 Responsive Layout
- [ ] Two-column → single column เมื่อ `< md` (768px)
- [ ] Mobile: left column อยู่บน, Approval Flow อยู่ล่าง
- [ ] Navbar: ซ่อน nav links บน mobile (หรือ collapse)
- [ ] PageHeader: action icons อาจ wrap ลงบรรทัดใหม่
- [ ] RequestDetails grid: 2x2 → 1 column บน mobile (`grid-cols-1 md:grid-cols-2`)
- [ ] ทดสอบบน viewport 375px, 768px, 1024px, 1440px

### 7.4 Apply React Bits Components
- [ ] **Text Animation** — แทนที่ title text ใน PageHeader ด้วย React Bits component (เช่น BlurText)
  - [ ] import component จาก `src/components/reactbits/`
  - [ ] wrap title text ด้วย animated component
  - [ ] ปรับ props: duration, delay ให้เหมาะสม (ไม่ช้าเกินไป)
  - [ ] ทดสอบ: text animate เมื่อ page load / เมื่อสลับ state
- [ ] **Navbar Text** — ใส่ GradientText (ถ้าติดตั้ง) กับ "Portal" text
  - [ ] ปรับ gradient colors ให้เข้ากับ theme
- [ ] **Background Effect** — ใส่ animated background (ถ้าเลือกติดตั้ง)
  - [ ] วาง background component ไว้ด้านหลัง content (`position: fixed, z-index: -1`)
  - [ ] ปรับ opacity / blur ไม่ให้รบกวนการอ่าน content
  - [ ] ทดสอบ performance: ไม่ทำให้ page lag
- [ ] **Card Animations** — ใส่ fade-in / slide-in ให้ cards (ถ้ามี component เหมาะสม)
- [ ] ตรวจสอบ: React Bits components ไม่ conflict กับ Tailwind styles ที่มีอยู่
- [ ] ตรวจสอบ: animations ไม่ทำให้ accessibility แย่ลง (respect prefers-reduced-motion)

### 7.5 Hover States & Transitions
- [ ] Buttons: hover effect (เปลี่ยนสี bg)
- [ ] Icon buttons: `hover:bg-gray-100 rounded-lg p-2 transition-colors`
- [ ] Nav links: `hover:text-blue-600`
- [ ] Back button: `hover:underline`
- [ ] Cards: optional subtle hover shadow

### 7.6 Edge Cases
- [ ] Linked requests ว่าง (`[]`) → แสดง "-" ✓ (ตรวจกับ mock-approved.json)
- [ ] `actedAt: null` → ไม่แสดงวันที่ใน ApprovalStep ✓
- [ ] `permissions.canApprove: false` → ซ่อน Approve button ✓
- [ ] Long user name → `truncate` class (ellipsis) ✓
- [ ] Unknown status → gray badge fallback ✓

### 7.7 Final Polish
- [ ] Font: ใส่ Inter font (Google Fonts) หรือใช้ system font stack
- [ ] ตรวจ spacing, padding ให้สม่ำเสมอ
- [ ] ตรวจสี text/bg ให้มี contrast เพียงพอ
- [ ] ลบ console.log ที่ไม่จำเป็น (เก็บไว้เฉพาะ action buttons)
- [ ] ตรวจ TypeScript: ไม่มี `any`, ไม่มี error

---

## Phase 8: Testing

### 8.1 Setup Vitest
- [ ] เพิ่ม test config ใน `vite.config.ts` (vitest section)
- [ ] กำหนด `environment: "jsdom"`
- [ ] สร้าง test setup file (`src/test/setup.ts`) → import `@testing-library/jest-dom`
- [ ] เพิ่ม script ใน `package.json`: `"test": "vitest"`
- [ ] ทดสอบรัน `npx vitest run` ได้ (แม้ยังไม่มี test)

### 8.2 Unit Tests — Utility Functions
- [ ] สร้าง `src/utils/__tests__/format.test.ts`
- [ ] Test `formatDate()`:
  - [ ] input valid date string → return formatted string ถูกต้อง
  - [ ] input null/undefined → return fallback (เช่น "-")
- [ ] Test `getInitials()`:
  - [ ] "Alex Taylor" → "AT"
  - [ ] "John" → "J" (ชื่อเดียว)
  - [ ] "" (empty) → fallback
- [ ] Test `getStatusColor()`:
  - [ ] "NEED_APPROVAL" → return yellow classes
  - [ ] "APPROVED" → return green classes
  - [ ] "unknown_status" → return gray fallback

### 8.3 Component Tests — Badge
- [ ] สร้าง `src/components/ui/__tests__/Badge.test.tsx`
- [ ] render Badge กับ variant "NEED_APPROVAL" → มี text "Need approval"
- [ ] render Badge กับ variant "APPROVED" → มี text "Approved"
- [ ] render Badge กับ unknown variant → ใช้ gray style (ไม่ crash)

### 8.4 Component Tests — ActionButtons
- [ ] สร้าง `src/components/request/__tests__/ActionButtons.test.tsx`
- [ ] `canApprove: true, canReject: true` → render ทั้ง 2 buttons
- [ ] `canApprove: false` → ไม่มี Approve button
- [ ] `canReject: false` → ไม่มี Reject button
- [ ] `canApprove: false, canReject: false` → ไม่ render อะไรเลย
- [ ] `status: "APPROVED"` → ไม่ render buttons เลย
- [ ] click Approve → `console.log` ถูกเรียก
- [ ] click Reject → `console.log` ถูกเรียก

### 8.5 Component Tests — ApprovalStep
- [ ] สร้าง `src/components/approval/__tests__/ApprovalStep.test.tsx`
- [ ] step status "SUBMITTED" → render green check icon
- [ ] step status "NEED_APPROVAL" → render blue dot icon
- [ ] step status "UNDER_REVIEW" → render gray circle icon
- [ ] step status "APPROVED" → render green check icon
- [ ] step status "REJECTED" → render red X icon
- [ ] `actedAt: null` → ไม่แสดงวันที่
- [ ] `actedAt: "2026-01-02T09:00:00"` → แสดงวันที่ formatted
- [ ] `isLast: true` → ไม่แสดง connecting line

### 8.6 Component Tests — RequestDetails
- [ ] สร้าง `src/components/request/__tests__/RequestDetails.test.tsx`
- [ ] render กับ linkedRequests มี items → แสดง Tag chips
- [ ] render กับ linkedRequests ว่าง `[]` → แสดง "-"
- [ ] แสดง company name ถูกต้อง
- [ ] แสดง request type label ถูกต้อง

### 8.7 Integration Test — Page State Toggle
- [ ] สร้าง `src/__tests__/App.test.tsx`
- [ ] Default render → แสดง NEED_APPROVAL state
- [ ] กด toggle → เปลี่ยนเป็น APPROVED state
- [ ] NEED_APPROVAL → มี Approve/Reject buttons
- [ ] APPROVED → ไม่มี Approve/Reject buttons
- [ ] APPROVED → มี "Approved" result ใน timeline

---

## Phase 9: Deliverables & Cleanup

### 9.1 อัพเดท README.md
- [ ] วิธี run: `npm install` → `npm run dev`
- [ ] วิธี test: `npm test`
- [ ] วิธี build: `npm run build`
- [ ] Tech stack ที่เลือก + เหตุผลสั้นๆ
- [ ] Assumptions ที่ตั้งไว้
- [ ] สิ่งที่จะปรับปรุงถ้ามีเวลาเพิ่ม

### 9.2 Final Checks
- [ ] `npm run build` → ไม่มี error, ไม่มี warning
- [ ] `npx vitest run` → tests ผ่านทั้งหมด
- [ ] ไม่มี `console.log` ที่ไม่จำเป็น (เก็บเฉพาะ mock actions)
- [ ] ไม่มี TypeScript errors (`any`, unused imports)
- [ ] Git: commit ทั้งหมด, push
