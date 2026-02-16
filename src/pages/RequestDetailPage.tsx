import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import PageHeader from "../components/layout/PageHeader";
import RequestDetails from "../components/request/RequestDetails";
import Attachments from "../components/request/Attachments";
import ActionButtons from "../components/request/ActionButtons";
import ApprovalFlow from "../components/approval/ApprovalFlow";
import { approveRequest, rejectRequest } from "../services/mockApi";
import initialData from "../data/frontend-homework-challenge-mock.json";
import type { RequestData } from "../types/request";

function RequestDetailPage() {
  const [data, setData] = useState<RequestData>(initialData as RequestData);
  const [loading, setLoading] = useState(false);

  const handleApprove = async () => {
    setLoading(true);
    const result = await approveRequest(data);
    setData(result);
    setLoading(false);
  };

  const handleReject = async () => {
    setLoading(true);
    const result = await rejectRequest(data);
    setData(result);
    setLoading(false);
  };

  const currentStep = data.approvalFlow.steps.find(
    (s) => s.id === data.approvalFlow.currentStepId,
  );
  const userInitials = currentStep
    ? currentStep.user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
    : "JM";

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userInitials={userInitials} />

      <main className="max-w-[1200px] mx-auto px-4 py-6">
        <PageHeader data={data} />

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            <RequestDetails title={data.request.title} details={data.details} />
            <Attachments />
            <ActionButtons
              permissions={data.permissions}
              status={data.request.status}
              onApprove={handleApprove}
              onReject={handleReject}
              loading={loading}
            />
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
  );
}

export default RequestDetailPage;
