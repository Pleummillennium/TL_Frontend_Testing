import ApprovalStep from './ApprovalStep'
import ApprovalResult from './ApprovalResult'
import type { ApprovalFlow as ApprovalFlowType, RequestStatus } from '../../types/request'

interface ApprovalFlowProps {
  approvalFlow: ApprovalFlowType
  requestStatus: RequestStatus
}

export default function ApprovalFlow({ approvalFlow, requestStatus }: ApprovalFlowProps) {
  const showResult = requestStatus === 'APPROVED' || requestStatus === 'REJECTED'

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-5">Approval flow</h3>

      <div>
        {approvalFlow.steps.map((step, index) => (
          <ApprovalStep
            key={step.id}
            step={step}
            isLast={!showResult && index === approvalFlow.steps.length - 1}
          />
        ))}

        {showResult && <ApprovalResult status={requestStatus} />}
      </div>
    </div>
  )
}
