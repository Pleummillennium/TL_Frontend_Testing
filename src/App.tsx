import { useState } from 'react'
import needApprovalData from './data/mock-need-approval.json'
import approvedData from './data/mock-approved.json'
import type { RequestData } from './types/request'

function App() {
  const [isApproved, setIsApproved] = useState(false)
  const data = (isApproved ? approvedData : needApprovalData) as RequestData

  return (
    <div className="min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold p-4">{data.request.title}</h1>
      <p className="px-4 text-gray-500">{data.request.statusLabel}</p>
      <button
        className="m-4 px-4 py-2 bg-blue-600 text-white rounded"
        onClick={() => setIsApproved(!isApproved)}
      >
        Toggle: {isApproved ? 'Approved' : 'Need Approval'}
      </button>
    </div>
  )
}

export default App
