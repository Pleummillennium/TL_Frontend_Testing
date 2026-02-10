import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import needApprovalData from './data/mock-need-approval.json'
import approvedData from './data/mock-approved.json'
import type { RequestData } from './types/request'

function App() {
  const [isApproved, setIsApproved] = useState(false)
  const data = (isApproved ? approvedData : needApprovalData) as RequestData

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Temporary: state toggle + data preview (จะถูกแทนที่ด้วย components จริงใน Phase ถัดไป) */}
        <button
          className="mb-4 px-4 py-2 bg-blue-600 text-white rounded text-sm"
          onClick={() => setIsApproved(!isApproved)}
        >
          Toggle: {isApproved ? 'Approved' : 'Need Approval'}
        </button>

        <h1 className="text-2xl font-bold">{data.request.title}</h1>
        <p className="text-gray-500">{data.request.statusLabel}</p>
      </main>
    </div>
  )
}

export default App
