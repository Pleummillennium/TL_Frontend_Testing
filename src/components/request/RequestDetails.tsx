import Tag from '../ui/Tag'
import type { RequestData } from '../../types/request'

interface RequestDetailsProps {
  title: string
  details: RequestData['details']
}

export default function RequestDetails({ title, details }: RequestDetailsProps) {
  const { company, requestType, linkedRequests } = details

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Cell 1: Company */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Company</p>
          <p className="text-sm text-gray-900">{company.name}</p>
        </div>

        {/* Cell 2: Request type */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Request type</p>
          <p className="text-sm text-gray-900">{requestType.label}</p>
        </div>

        {/* Cell 3: Title */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Title</p>
          <p className="text-sm text-gray-900">{title}</p>
        </div>

        {/* Cell 4: Linked requests */}
        <div>
          <p className="text-xs text-gray-500 mb-1">Linked request</p>
          {linkedRequests.length > 0 ? (
            <div className="flex flex-wrap gap-1.5">
              {linkedRequests.map((req) => (
                <Tag key={req.id} label={req.id} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-900">-</p>
          )}
        </div>
      </div>
    </div>
  )
}
