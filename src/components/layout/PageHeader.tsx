import { ArrowLeft, Share2, Printer, Eye, Copy } from 'lucide-react'
import Badge from '../ui/Badge'
import { formatDate } from '../../utils/format'
import type { RequestData } from '../../types/request'

interface PageHeaderProps {
  data: RequestData
}

export default function PageHeader({ data }: PageHeaderProps) {
  const { request, permissions } = data
  const isApproved = request.status === 'APPROVED'

  const formattedDate = formatDate(request.createdAt)

  return (
    <div className="mb-6">
      {/* Row 1: Back link */}
      <button
        className="flex items-center gap-1 text-blue-600 text-sm font-medium mb-3 hover:underline"
        onClick={() => console.log('Back clicked')}
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      {/* Row 2: Title + Badge + Actions */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        {/* Left: Title + Badge */}
        <div className="flex items-center gap-3 flex-wrap">
          <h1 className="text-xl font-bold text-gray-900">{request.title}</h1>
          <Badge status={request.status} label={request.statusLabel} />
        </div>

        {/* Right: Action icons */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => console.log('Share clicked')}
            title="Share"
          >
            <Share2 className="w-5 h-5 text-gray-500" />
          </button>

          {isApproved && (
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => console.log('Print clicked')}
              title="Print"
            >
              <Printer className="w-5 h-5 text-gray-500" />
            </button>
          )}

          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors flex items-center gap-1"
            onClick={() => console.log('View count clicked')}
            title="Views"
          >
            <Eye className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">{request.viewCount}</span>
          </button>

          {permissions.canDuplicate && (
            <button
              className="ml-2 px-3 py-1.5 rounded-lg border border-gray-300 hover:bg-gray-100 transition-colors flex items-center gap-1.5 text-sm text-gray-700"
              onClick={() => console.log('Duplicate clicked')}
            >
              <Copy className="w-4 h-4" />
              Duplicate as copy
            </button>
          )}
        </div>
      </div>

      {/* Row 3: Meta info */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
        <span>{request.id}</span>
        <span className="w-px h-4 bg-gray-300" />
        <span>Created by: {request.createdBy.name}</span>
        <span className="w-px h-4 bg-gray-300" />
        <span>Created date: {formattedDate}</span>
      </div>
    </div>
  )
}
