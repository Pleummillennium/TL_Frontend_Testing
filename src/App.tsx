import { useState } from 'react'
import Navbar from './components/layout/Navbar'
import PageHeader from './components/layout/PageHeader'
import RequestDetails from './components/request/RequestDetails'
import Attachments from './components/request/Attachments'
import ActionButtons from './components/request/ActionButtons'
import ApprovalFlow from './components/approval/ApprovalFlow'
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
        {/* State Toggle Tabs */}
        <div className="flex gap-1 mb-6 bg-gray-200 rounded-lg p-1 w-fit">
          <button
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              !isApproved ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsApproved(false)}
          >
            Need Approval
          </button>
          <button
            className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isApproved ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setIsApproved(true)}
          >
            Approved
          </button>
        </div>

        <PageHeader data={data} />

        {/* Two-column layout: Left + Right (Right จะใส่ Phase 5) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <RequestDetails title={data.request.title} details={data.details} />
            <Attachments />
            <ActionButtons permissions={data.permissions} status={data.request.status} />
          </div>

          {/* Right Column */}
          <div>
            <ApprovalFlow
              approvalFlow={data.approvalFlow}
              requestStatus={data.request.status}
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
