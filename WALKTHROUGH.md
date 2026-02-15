# Presentation Walkthrough — Approval Request Viewer

> สคริปต์สำหรับพรีเซ็นต์งานให้ Team Lead ตั้งแต่เปิดจนจบ พร้อมคำถาม-คำตอบที่อาจเจอ

---

## Part 1: เปิดตัว (1-2 นาที)

### พูด:

"สวัสดีครับ วันนี้จะมาพรีเซ็นต์งาน Frontend Challenge — Approval Request Viewer ครับ

โจทย์คือสร้างหน้า Approval Request สำหรับ Internal Platform โดยทำจาก Figma design ที่ให้มา ใช้ mock data แทน backend จริง

**สิ่งที่โจทย์ประเมิน 3 อย่าง:**
1. Code quality and readability
2. Component structure and reusability
3. State and data handling

**Tech stack ที่เลือกใช้:** React 19 + TypeScript + Vite + Tailwind CSS 4 + Lucide React"

### ทำไมเลือก stack นี้:

- **React 19** — เวอร์ชันล่าสุด แสดงว่าตาม ecosystem ทัน
- **TypeScript** — type safety ตั้งแต่ data layer ยันถึง component props
- **Vite** — dev server เร็ว, HMR แทบ instant
- **Tailwind CSS 4** — utility-first ไม่ต้องเขียน CSS file แยก, co-locate style กับ component
- **Lucide React** — icon library ที่ tree-shakeable ไม่ bloat bundle

---

## Part 2: โชว์หน้าจอ — Demo สด (3-4 นาที)

### Step 1: เปิด dev server

```bash
npm run dev
```

### Step 2: โชว์สถานะ NEED_APPROVAL

**พูด:**

"นี่คือหน้าแรกที่ user เห็น — request อยู่ในสถานะ Need Approval

จะเห็นว่ามี:
- **Navbar** ด้านบน — logo, nav links, user avatar
- **Page Header** — ชื่อ request, badge สถานะ, action icons (Share, View count, Duplicate)
- **Left column** — Request details, Attachments, ปุ่ม Reject/Approve
- **Right column** — Approval Flow timeline 4 steps

สังเกตว่าปุ่ม Approve เป็นสีเขียว, Reject เป็น outline แดง ตรงตาม Figma ครับ"

### Step 3: กด Approve (Demo state transition)

**พูด:**

"ทีนี้จะโชว์ state management — กด Approve ครับ

สังเกต:
1. ปุ่มเปลี่ยนเป็น loading spinner (disabled ทั้งคู่ กัน double click)
2. รอ 1 วินาที จำลอง API call
3. หน้าเปลี่ยน:
   - Badge เปลี่ยนเป็น **Approved** สีเขียว
   - ปุ่ม Approve/Reject **หายไป** เพราะ action เสร็จแล้ว
   - Timeline ทุก step เป็น **blue check mark**
   - ล่างสุดโผล่ **Approved result** สีเขียว
   - ปุ่ม **Print** โผล่ใน header (เพราะเอกสาร approved แล้ว print ได้)

ทั้งหมดนี้เกิดจาก state เดียว — พอ `request.status` เปลี่ยนเป็น APPROVED ทุก component re-render ตาม"

### Step 4: Refresh แล้วกด Reject

**พูด:**

"Refresh กลับมาสถานะเดิม แล้วกด Reject ดูบ้าง

ความต่าง:
- Badge เปลี่ยนเป็น **Rejected** สีแดง
- Timeline: แค่ step ปัจจุบัน (step 2) เปลี่ยนเป็น **red X** — step ที่ยังไม่ถึงยังเป็นเดิม
- ล่างสุดโผล่ **Rejected result** สีแดง
- ปุ่ม Approve/Reject หายไปเหมือนกัน

Reject กับ Approve ใช้ logic ต่างกัน — Approve update ทุก step, Reject update แค่ current step"

### Step 5: โชว์ Responsive (ถ้ามีเวลา)

**พูด:**

"ย่อ browser ดูครับ — เป็น single column บน mobile, nav links ซ่อน, layout ปรับตาม breakpoint โดยใช้ Tailwind responsive classes"

---

## Part 3: โชว์ Code Structure (3-5 นาที)

### เปิด VS Code แสดง folder structure

**พูด:**

"มาดู code structure กันครับ"

```
src/
├── types/          → TypeScript interfaces ทั้งหมด (single source of truth)
├── utils/          → Pure functions (formatDate, getInitials, getStatusColor)
├── services/       → Mock API layer (approveRequest, rejectRequest)
├── data/           → Mock JSON จากโจทย์
└── components/
    ├── layout/     → Navbar, PageHeader (page-level structure)
    ├── request/    → RequestDetails, Attachments, ActionButtons (business logic)
    ├── approval/   → ApprovalFlow, ApprovalStep, ApprovalResult (timeline)
    └── ui/         → Badge, Avatar, Tag (reusable primitives)
```

### จุดที่ควรเน้น:

**1. Type Safety (เปิด `types/request.ts`)**

"ผมนิยาม type ทุกตัวไว้ในไฟล์เดียว — `RequestData` เป็น top-level type ที่ App.tsx ใช้เป็น state ทุก component รับ type ผ่าน props ไม่มี `any` เลย"

**2. Single State Owner (เปิด `App.tsx`)**

"State ทั้งหมดอยู่ที่ App.tsx — `data` กับ `loading` แค่ 2 ตัว ไม่มี prop drilling ลึกเกินไป แต่ละ component รับแค่ data ที่ตัวเองต้องใช้"

**3. Immutable State Updates (เปิด `mockApi.ts`)**

"Mock API ใช้ spread operator สร้าง object ใหม่ทุกครั้ง ไม่ mutate data เดิม — React จึง detect การเปลี่ยนแปลงได้ถูกต้อง ทุก level ที่เปลี่ยนต้อง spread ใหม่"

**4. Conditional Rendering (เปิด `ActionButtons.tsx`)**

"ปุ่มเช็ค 2 เงื่อนไข — ถ้า status เป็น APPROVED/REJECTED return null เลย ปุ่มหายไป ไม่ใช่แค่ซ่อน แต่ไม่ render เลย loading state ก็ disable ทั้ง 2 ปุ่มพร้อมกัน กัน double click"

**5. Component Reusability (เปิด `Badge.tsx`)**

"Badge ใช้ได้ทุกที่ — PageHeader ก็ใช้, ApprovalStep ก็ใช้ แค่ส่ง status กับ label มา สีก็เปลี่ยนเอง"

---

## Part 4: Design Decisions — ทำไมถึงทำแบบนี้ (2-3 นาที)

**พูด:**

"มีหลาย design decision ที่อยากอธิบายครับ"

### Decision 1: ทำไมใช้ Mock API แทน static data

"โจทย์บอกว่า backend จะมาทีหลัง แต่ Figma comment บอกว่า user สามารถ approve/reject ได้ ผมเลยสร้าง service layer ขึ้นมา — วันที่ backend พร้อม แค่เปลี่ยน `mockApi.ts` เป็น `fetch()` จริง โครงสร้างอื่นไม่ต้องแก้เลย"

### Decision 2: ทำไมไม่ใช้ State Management Library (Redux, Zustand)

"App นี้มี state แค่ 2 ตัว (`data`, `loading`) ใช้ `useState` เพียงพอ ไม่มี complex state logic ที่ต้องใช้ reducer ถ้าวันหลัง app ใหญ่ขึ้น ค่อย refactor เป็น `useReducer` หรือ Zustand ได้ ไม่ over-engineer ตั้งแต่แรก"

### Decision 3: ทำไม folder structure แบ่งตาม feature

"แบ่ง components เป็น `layout/`, `request/`, `approval/`, `ui/` แทนที่จะ flat ทุกอย่างในโฟลเดอร์เดียว เพราะ:
- หา file ง่าย — อยากแก้ timeline ก็ไปที่ `approval/`
- scale ได้ — ถ้ามี feature ใหม่ก็สร้าง folder ใหม่
- แยก reusable (`ui/`) ออกจาก business-specific (`request/`, `approval/`)"

### Decision 4: ทำไม Approve กับ Reject logic ต่างกัน

"Approve = ทุก step ผ่านหมด เลย fill actedAt ทุก step + currentStepId ไปที่ step สุดท้าย
Reject = แค่ step ปัจจุบัน reject ไม่ส่งผลกับ step อื่น
ออกแบบตามความเป็นจริงของ approval flow ในองค์กร"

---

## Part 5: ปิดท้าย (1 นาที)

**พูด:**

"สรุปครับ — งานนี้ผมเน้น:
1. **Code quality** — TypeScript strict, ไม่มี `any`, pure functions แยกชัด
2. **Component structure** — แบ่งตาม feature, reusable UI primitives, single responsibility
3. **State management** — single source of truth ที่ App.tsx, immutable updates, mock API ที่พร้อมเปลี่ยนเป็นของจริง

ทั้ง 3 ข้อนี้ตรงกับที่โจทย์ต้องการประเมินครับ ยินดีตอบคำถามครับ"

---

---

# Q&A — คำถามที่ Team Lead อาจถาม

---

## หมวด 1: Architecture & Design Decisions

---

### Q1: "ทำไมเลือก React 19 ไม่ใช่ React 18?"

**ตอบ:**

"React 19 stable แล้วครับ ใน project ใหม่ผมจะเลือกเวอร์ชันล่าสุดเสมอ เพราะ:
- ได้ performance improvements (React Compiler readiness)
- ref as prop ได้เลย ไม่ต้อง forwardRef
- `use()` hook ใหม่สำหรับ async data

แต่ใน project นี้ผมยังไม่ได้ใช้ feature เฉพาะของ 19 เพราะ scope ไม่ได้ต้องการ ถ้าต้อง support legacy browser หรือ library ที่ยังไม่ support 19 ก็กลับไป 18 ได้ครับ"

---

### Q2: "ทำไมไม่ใช้ Redux หรือ Zustand?"

**ตอบ:**

"เพราะ state ของ app นี้มีแค่ 2 ตัว — `data` กับ `loading` อยู่ที่ component เดียว ไม่มี shared state ข้าม route ไม่มี complex async logic ถ้าใช้ Redux จะ over-engineer — เพิ่ม boilerplate (store, actions, reducers) โดยไม่ได้ประโยชน์

**เมื่อไหร่ควรใช้:**
- มี state ที่ share ข้าม 5+ components หรือข้าม route
- มี complex async flows (optimistic update, retry, cache)
- มี multiple people ทำงานพร้อมกัน ต้องการ predictable state

ผมจะเลือก tool ตาม problem ไม่ใช่ตาม trend ครับ"

---

### Q3: "ถ้า backend พร้อมแล้ว ต้องแก้อะไรบ้าง?"

**ตอบ:**

"แก้แค่ไฟล์เดียวครับ — `mockApi.ts`

เปลี่ยนจาก:
```ts
await delay(1000)
return { ...data, request: { ...data.request, status: 'APPROVED' } }
```

เป็น:
```ts
const res = await fetch('/api/requests/approve', { method: 'POST', body: ... })
return await res.json()
```

App.tsx, components ทุกตัวไม่ต้องแก้เลย เพราะ interface `RequestData` ยังเหมือนเดิม — นี่คือข้อดีของการแยก service layer ออกมาครับ

ถ้าจะเพิ่ม error handling ก็เพิ่ม try-catch ใน handler ได้ทันที โครงสร้างรองรับอยู่แล้ว"

---

### Q4: "ทำไม state อยู่ที่ App.tsx หมด ไม่กระจายลง child?"

**ตอบ:**

"เพราะ data ทั้งหมดมาจาก source เดียวกัน (`RequestData`) และหลาย component ใช้ส่วนต่างๆ ของ data ก้อนเดียวกัน

ถ้ากระจาย state ลง child:
- ActionButtons ต้อง manage status เอง แต่ PageHeader ก็ต้องรู้ status เหมือนกัน → duplicate state
- ปัญหา state sync — กด approve แล้ว badge ไม่อัพเดท เพราะคนละ state

**Single source of truth** ที่ App.tsx ทำให้ data flow ไปทางเดียว (top-down) ง่ายต่อการ debug

ถ้า app ใหญ่ขึ้นจนมี prop drilling ลึก 4-5 ชั้น ผมจะใช้ Context หรือ state library ครับ ตอนนี้ max 2 ชั้น ยังไม่จำเป็น"

---

### Q5: "ทำไมใช้ Tailwind แทน CSS Modules หรือ styled-components?"

**ตอบ:**

"เหตุผลหลัก 3 ข้อ:
1. **Co-location** — style อยู่ใน JSX เลย ไม่ต้องสลับไฟล์ เปิด component เห็นหมดเลยว่าหน้าตาเป็นยังไง
2. **No naming** — ไม่ต้องคิดชื่อ class ไม่มี naming collision
3. **Performance** — Tailwind 4 generate CSS ตอน build เท่านั้น ไม่มี runtime cost เหมือน styled-components

**ข้อเสีย** ที่รู้: className ยาว อ่านยากบ้าง แก้โดยแยก component ให้เล็กพอ เช่น `Badge`, `Avatar` — แต่ละตัว className ไม่เยอะครับ"

---

## หมวด 2: Code Quality & Patterns

---

### Q6: "ทำไม `ActionButtons` return null แทนที่จะใช้ CSS ซ่อน?"

**ตอบ:**

"Return null = ไม่ render DOM element เลย ข้อดี:
- ไม่มี invisible element ค้างใน DOM ที่ screen reader อ่านได้
- ไม่ต้อง maintain hidden state
- React ไม่ต้อง diff node ที่ไม่จำเป็น

ใช้ CSS hidden เมื่อ: element ต้อง toggle บ่อยมาก (tooltip, dropdown) เพราะ mount/unmount มี cost
ใช้ return null เมื่อ: state change ที่เกิดไม่บ่อย เช่น approve แล้วหายไปเลย ครั้งเดียว"

---

### Q7: "Mock API ใช้ spread operator ซ้อนหลายชั้น ทำไมไม่ใช้ structuredClone หรือ Immer?"

**ตอบ:**

"structuredClone deep copy ทุกอย่าง — ทำเกินความจำเป็น เพราะผมต้องการเปลี่ยนแค่บาง field ไม่ใช่ทั้ง object

spread operator ชัดเจนกว่า — เห็นเลยว่า field ไหนเปลี่ยน field ไหนเท่าเดิม

Immer เหมาะกับ nested state ที่ลึก 4-5 ชั้น data ของเราลึกแค่ 2-3 ชั้น spread ยังอ่านง่ายครับ

**ถ้า data ซับซ้อนขึ้น** (เช่น step มี sub-steps, comments) ผมจะพิจารณา Immer ครับ"

---

### Q8: "มี error handling ไหม? ถ้า API fail?"

**ตอบ:**

"ตอนนี้ mock API ไม่ fail เพราะเป็น local transform แต่ถ้าจะเพิ่ม error handling โครงสร้างรองรับอยู่:

```ts
const handleApprove = async () => {
  setLoading(true)
  try {
    const result = await approveRequest(data)
    setData(result)
  } catch (error) {
    // show error toast / alert
  } finally {
    setLoading(false)
  }
}
```

ผมตั้งใจไม่เพิ่ม error handling ที่ไม่จำเป็นใน scope นี้ เพราะโจทย์ไม่ได้ต้องการ backend integration จริง — ไม่อยาก over-engineer ครับ แต่พร้อมเพิ่มได้ทันทีเมื่อ integrate backend จริง"

---

### Q9: "ทำไม `formatDate` ใช้ UTC methods?"

**ตอบ:**

"เพราะ mock data เป็น ISO string ที่ลงท้ายด้วย `Z` (UTC) ถ้าใช้ `getDate()` ปกติ จะ convert เป็น local timezone ทำให้วันที่อาจเลื่อนไป 1 วัน (เช่น UTC 00:00 = ไทย 07:00 — แต่ถ้าข้ามวันจะมีปัญหา)

ใช้ UTC methods ทำให้ได้ค่าตรงตาม data เสมอ ไม่ว่า browser จะอยู่ timezone ไหน

**ใน production** ถ้าต้องแสดง local time ของ user จะใช้ `Intl.DateTimeFormat` หรือ library เช่น `date-fns` แทนครับ"

---

### Q10: "Testing ล่ะ? ทำไมไม่มี unit tests?"

**ตอบ:**

"ผมพิจารณาแล้วว่า scope ของโจทย์เน้น 3 อย่าง — code quality, component structure, state handling ไม่ได้ระบุ testing เป็น criteria

เวลามีจำกัด ผมเลือก focus ที่:
- UI ตรง Figma
- State management ที่ทำงานจริง (กด approve/reject แล้วหน้าเปลี่ยน)
- Code structure ที่ clean

**ถ้าจะเพิ่ม testing** ผมจะเริ่มจาก:
1. `mockApi.ts` — pure function test ได้ง่ายสุด (input → output)
2. `format.ts` — utility functions, test ง่าย
3. `ActionButtons` — test conditional rendering (APPROVED → null)
4. Integration test: กด approve → state เปลี่ยน → UI update

ใช้ Vitest + React Testing Library ครับ"

---

## หมวด 3: Component Design

---

### Q11: "Badge, Avatar, Tag ทำไมแยก component? แค่ `<span>` ธรรมดา"

**ตอบ:**

"ถูกครับ มันเป็นแค่ span — แต่ประโยชน์ของการแยก:

1. **Consistency** — ทุกที่ที่ใช้ Badge ได้ style เดียวกัน ไม่มีใครลืม class
2. **Single point of change** — อยากเปลี่ยน badge style ทั้ง app แก้ที่เดียว
3. **Self-documenting** — อ่าน `<Badge status='APPROVED' />` เข้าใจทันที ดีกว่าอ่าน `<span className='inline-block rounded-full px-3...'>`
4. **Type safety** — Badge บังคับ props `status` + `label` ไม่มีทาง miss

`ui/` folder = design system เล็กๆ ถ้า app โตขึ้น ก็มี foundation พร้อมแล้วครับ"

---

### Q12: "ApprovalStep มี `iconStatus = requestStatus === 'APPROVED' ? 'APPROVED' : step.status` ทำไม?"

**ตอบ:**

"เพราะตอน request ถูก Approve ทุก step ใน timeline ต้องแสดง check mark สีน้ำเงินหมด — ไม่ว่า step นั้นจะมี status เดิมเป็นอะไร (SUBMITTED, NEED_APPROVAL, UNDER_REVIEW)

logic นี้ override icon ของทุก step เป็น APPROVED → ได้ blue check mark ทั้งหมด

แต่ถ้าไม่ได้ approve (เช่น NEED_APPROVAL หรือ REJECTED) ก็ใช้ status ของ step นั้นๆ ตามปกติ

แยก `iconStatus` ออกมาเป็นตัวแปรแทนที่จะ inline ใน JSX เพราะอ่านง่ายกว่าครับ"

---

### Q13: "Attachments เป็น hardcoded data ทำไมไม่รับ props?"

**ตอบ:**

"เพราะ mock JSON ที่โจทย์ให้ไม่มี attachments data — แต่ Figma มี section นี้ ผมเลย hardcode ตาม Figma ไว้ก่อน

ถ้า backend มี API จริง ก็เปลี่ยนเป็น props ได้ทันที:
```tsx
interface AttachmentsProps {
  files: { id: string; filename: string }[]
}
```

ผมตั้งใจทำให้ UI ครบตาม design ก่อน data integration ค่อยทำทีหลังตามที่โจทย์บอกครับ"

---

## หมวด 4: Performance & Scalability

---

### Q14: "ถ้า approval flow มี 100 steps จะ render ช้าไหม?"

**ตอบ:**

"100 steps = 100 DOM nodes ไม่น่ามีปัญหาครับ React handle ได้สบาย

แต่ถ้า 1,000+ steps:
- ใช้ **virtualization** (`react-window` / `@tanstack/virtual`) render แค่ที่เห็นบน screen
- Paginate — API ส่งมาทีละ 20 steps

กรณี real-world approval flow ไม่น่าเกิน 10-20 steps ครับ ไม่ต้อง optimize ตอนนี้ — premature optimization is the root of all evil"

---

### Q15: "setState ทำให้ re-render ทั้ง App — performance เป็นไง?"

**ตอบ:**

"ถูกครับ `setData` ทำให้ App + ทุก child re-render แต่:

1. Component tree ไม่ลึก (max 3 ชั้น) re-render ไม่แพง
2. ไม่มี expensive computation ใน render
3. React มี reconciliation algorithm ที่ diff DOM เฉพาะส่วนที่เปลี่ยน

**ถ้าจะ optimize** (เมื่อ app ใหญ่ขึ้น):
- `React.memo()` wrap child ที่ไม่ค่อยเปลี่ยน (เช่น Navbar)
- `useMemo()` สำหรับ expensive derived data
- แยก state ลง sub-component (เช่น loading อยู่แค่ ActionButtons)

แต่ตอนนี้ **ไม่มี performance problem จริง** ผมเลยไม่เพิ่มครับ — optimize เมื่อมี evidence"

---

### Q16: "ถ้ามีหลาย page (list view, detail view) จะ scale ยังไง?"

**ตอบ:**

"เพิ่ม React Router:

```
src/
├── pages/
│   ├── RequestListPage.tsx
│   └── RequestDetailPage.tsx    ← ย้าย logic จาก App.tsx มาที่นี่
├── components/                   ← ใช้ร่วมกันได้เลย
│   ├── ui/                       ← Badge, Avatar, Tag ใช้ได้ทุก page
│   ├── approval/                 ← ใช้ใน detail page
│   └── request/                  ← ใช้ใน detail page
```

- `App.tsx` เหลือแค่ Router + Layout
- State management ย้ายไป page-level หรือใช้ React Query สำหรับ server state
- `ui/` components reuse ได้ทันทีเพราะไม่ผูกกับ business logic

โครงสร้างปัจจุบัน**รองรับอยู่แล้ว**เพราะแยก layer ชัดเจนครับ"

---

## หมวด 5: Practical / Situational

---

### Q17: "ใช้เวลาทำนานแค่ไหน? ติดปัญหาอะไรบ้าง?"

**ตอบ:**

(ปรับตามจริงของคุณ)

"ใช้เวลาประมาณ ___ ชั่วโมงครับ

สิ่งที่ต้องตัดสินใจ:
- Figma มี 2 หน้า (Need Approval กับ Approved) — ผมเลือกทำเป็น **state transition** แทน 2 หน้าแยก เพราะ Figma comment บอกว่า user สามารถ approve/reject ได้
- สี badge บางตัวใน Figma ต้องดูละเอียด (Under Review = น้ำเงิน, Reviewer role = เทา) ผมตรวจกับ Figma หลายรอบจนตรง
- เลือกไม่ใช้ state management library เพราะ scope เล็ก — ตัดสินใจแล้วว่า `useState` เพียงพอ"

---

### Q18: "ถ้าให้เวลาเพิ่มอีก 2 ชั่วโมง จะเพิ่มอะไร?"

**ตอบ:**

"เรียงตาม priority:
1. **Error handling + Toast notification** — UX ดีขึ้น user รู้ว่า action สำเร็จหรือไม่
2. **Confirm dialog** ก่อน approve/reject — กัน misclick
3. **Unit tests** สำหรับ mockApi + utility functions — เขียนง่ายได้ confidence
4. **Transition animation** — fade/slide เวลา state เปลี่ยน ดู professional ขึ้น

จริงๆ ผมทำไว้แล้วใน branch `feature/version-upgrade` ครับ มี ConfirmDialog, Toast, animations พร้อมใช้เลย"

---

### Q19: "ทำไมเลือก Lucide React ไม่ใช่ Heroicons หรือ React Icons?"

**ตอบ:**

"3 เหตุผล:
1. **Tree-shakeable** — import แค่ icon ที่ใช้ ไม่ bloat bundle (React Icons import ทั้ง set)
2. **Consistent style** — ทุก icon เป็น stroke-based ขนาดเดียวกัน ดู clean
3. **Active maintenance** — update บ่อย มี icon ครบ

Heroicons ก็ดีครับ แต่ icon น้อยกว่า Lucide มีมากกว่า 1,400 icons"

---

### Q20: "มีอะไรที่รู้สึกว่าทำได้ดีกว่านี้?"

**ตอบ:**

(คำถามนี้เช็ค self-awareness — ตอบตรงๆ)

"มีครับ:
1. **Accessibility** — ยังไม่ได้ใส่ `aria-label` ให้ปุ่ม icon, ไม่ได้ทำ keyboard navigation ให้ timeline
2. **Loading skeleton** — ตอน loading ควรมี skeleton UI แทนที่จะแค่ disable ปุ่ม
3. **Error boundary** — ถ้า component crash ควรมี fallback UI
4. **Data fetching** — ตอนนี้ import JSON ตรงๆ ถ้าเป็น production ควรใช้ React Query หรือ SWR

ผมรู้ว่ายังมีช่องให้ปรับปรุง แต่เลือก scope ตามเวลาที่มีครับ"

---

## Tips สำหรับตอนพรีเซ็นต์

1. **เปิด dev server ไว้ก่อน** — อย่ามาเปิดตอนพรีเซ็นต์ เสียเวลา
2. **Demo ก่อน Code** — คนดูอยากเห็นผลลัพธ์ก่อน แล้วค่อยดู code
3. **กด Approve ให้เห็น transition** — นี่คือ "wow moment" ของงานนี้
4. **อย่าอ่าน code ทุกบรรทัด** — เลือกเน้นจุดที่น่าสนใจ (mock API, conditional rendering)
5. **ถ้าไม่รู้คำตอบ ตอบตรงๆ** — "ตรงนี้ผมยังไม่ได้ศึกษาลึก แต่ approach ที่จะทำคือ..." ดีกว่าเดาคำตอบ
6. **เตรียม VS Code** — เปิด file ที่จะโชว์ไว้ใน tab ก่อน
