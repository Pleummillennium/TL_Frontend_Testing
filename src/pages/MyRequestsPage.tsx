import { Link } from "react-router";
import Navbar from "../components/layout/Navbar";

export default function MyRequestsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <h1 className="text-xl font-bold text-gray-900 mb-6">My Requests</h1>

        <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
          <Link
            to="/requests/PR-2025-001"
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div>
              <p className="text-sm font-semibold text-gray-900">
                PR-2025-001
              </p>
              <p className="text-sm text-gray-500">
                Purchase Request - Office Supplies
              </p>
            </div>
            <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">
              Need Approval
            </span>
          </Link>
        </div>
      </main>
    </div>
  );
}
