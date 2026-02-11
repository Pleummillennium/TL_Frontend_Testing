import { Check, XCircle, Circle } from 'lucide-react'
import Badge from '../ui/Badge'
import Avatar from '../ui/Avatar'
import { formatDate } from '../../utils/format'
import type { ApprovalStep as ApprovalStepType, RequestStatus } from '../../types/request'

interface ApprovalStepProps {
  step: ApprovalStepType
  isLast: boolean
  requestStatus?: RequestStatus
}

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case 'SUBMITTED':
    case 'APPROVED':
      return (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
        </div>
      )
    case 'NEED_APPROVAL':
      return (
        <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
          <div className="w-2.5 h-2.5 rounded-full bg-white" />
        </div>
      )
    case 'REJECTED':
      return <XCircle className="w-6 h-6 text-red-500 shrink-0" />
    case 'UNDER_REVIEW':
    default:
      return <Circle className="w-6 h-6 text-blue-300 shrink-0" />
  }
}

export default function ApprovalStep({ step, isLast, requestStatus }: ApprovalStepProps) {
  const formattedDate = step.actedAt ? formatDate(step.actedAt) : null
  const iconStatus = requestStatus === 'APPROVED' ? 'APPROVED' : step.status

  return (
    <div className="flex gap-4">
      {/* Left: Icon + connecting line */}
      <div className="flex flex-col items-center">
        <StatusIcon status={iconStatus} />
        {!isLast && <div className="w-px flex-1 bg-blue-500 my-1" />}
      </div>

      {/* Right: Content */}
      <div className="pb-6 flex-1 min-w-0">
        {/* User info */}
        <div className="flex items-center gap-2 mb-1">
          <Avatar name={step.user.name} size="sm" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{step.user.name}</p>
            {step.user.title && (
              <p className="text-xs text-gray-500 truncate">{step.user.title}</p>
            )}
          </div>
        </div>

        {/* Badges row */}
        <div className="flex items-center gap-2 flex-wrap mt-2">
          <span className="inline-block rounded-full border border-gray-300 bg-white px-2 py-0.5 text-xs font-semibold text-gray-600">
            {step.companyTag}
          </span>
          <Badge status={step.status} label={step.statusLabel} />
          {(step.role === 'REVIEWER' || step.role === 'APPROVER') && (
            <span className="inline-block rounded-full bg-gray-100 border border-gray-300 px-2 py-0.5 text-xs text-gray-500">
              {step.role.charAt(0) + step.role.slice(1).toLowerCase()}
            </span>
          )}
        </div>

        {/* Date */}
        {formattedDate && (
          <p className="text-xs text-gray-400 mt-1.5">{formattedDate}</p>
        )}
      </div>
    </div>
  )
}
