import { X, Check, Loader2 } from "lucide-react";
import type { Permissions, RequestStatus } from "../../types/request";

interface ActionButtonsProps {
  permissions: Permissions;
  status: RequestStatus;
  onApprove: () => void;
  onReject: () => void;
  loading: boolean;
}

export default function ActionButtons({
  permissions,
  status,
  onApprove,
  onReject,
  loading,
}: ActionButtonsProps) {
  if (status === "APPROVED" || status === "REJECTED") return null;
  if (!permissions.canApprove && !permissions.canReject) return null;

  return (
    <div className="flex gap-3">
      {permissions.canReject && (
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg border border-red-500 text-red-500 bg-white text-sm font-medium hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onReject}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <X className="w-4 h-4" />
          )}
          Reject
        </button>
      )}

      {permissions.canApprove && (
        <button
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-400 text-white text-sm font-medium hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onApprove}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Check className="w-4 h-4" />
          )}
          Approve
        </button>
      )}
    </div>
  );
}
