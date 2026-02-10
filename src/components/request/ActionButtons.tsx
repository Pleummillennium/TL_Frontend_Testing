import { X, Check } from 'lucide-react'
import type { Permissions, RequestStatus } from '../../types/request'

interface ActionButtonsProps {
  permissions: Permissions
  status: RequestStatus
}

export default function ActionButtons({ permissions, status }: ActionButtonsProps) {
  if (status === 'APPROVED') return null
  if (!permissions.canApprove && !permissions.canReject) return null

  return (
    <div className="flex gap-3 justify-end">
      {permissions.canReject && (
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-500 text-red-500 bg-white text-sm font-medium hover:bg-red-50 transition-colors"
          onClick={() => console.log('Reject clicked')}
        >
          <X className="w-4 h-4" />
          Reject
        </button>
      )}

      {permissions.canApprove && (
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-800 text-white text-sm font-medium hover:bg-blue-900 transition-colors"
          onClick={() => console.log('Approve clicked')}
        >
          <Check className="w-4 h-4" />
          Approve
        </button>
      )}
    </div>
  )
}
