import { format } from 'date-fns'

export function formatDate(dateString: string | null): string {
  if (!dateString) return '-'
  return format(new Date(dateString), 'dd/MM/yyyy HH:mm:ss')
}

export function getInitials(name: string): string {
  if (!name) return '?'
  return name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    NEED_APPROVAL: 'border-yellow-500 text-yellow-600 bg-yellow-50',
    APPROVED: 'border-green-500 text-green-600 bg-green-50',
    SUBMITTED: 'border-green-500 text-green-600 bg-green-50',
    UNDER_REVIEW: 'border-gray-400 text-gray-500 bg-gray-50',
    REJECTED: 'border-red-500 text-red-600 bg-red-50',
  }
  return colors[status] ?? 'border-gray-400 text-gray-500 bg-gray-50'
}
