import { FileText, Eye, Download } from 'lucide-react'

const mockAttachments = [
  { id: '1', filename: 'Purchase_Request_Form.pdf' },
  { id: '2', filename: 'Quotation_Office_Supplies.pdf' },
]

export default function Attachments() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 transition-shadow hover:shadow-sm">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Attachment</h3>

      <div className="divide-y divide-gray-100">
        {mockAttachments.map((file) => (
          <div key={file.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            {/* Left: icon + filename */}
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-red-500 shrink-0" />
              <span className="text-sm text-gray-700">{file.filename}</span>
            </div>

            {/* Right: actions */}
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                onClick={() => console.log('Preview:', file.filename)}
                title="Preview"
              >
                <Eye className="w-4 h-4 text-gray-400" />
              </button>
              <button
                className="p-1.5 rounded hover:bg-gray-100 transition-colors"
                onClick={() => console.log('Download:', file.filename)}
                title="Download"
              >
                <Download className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
