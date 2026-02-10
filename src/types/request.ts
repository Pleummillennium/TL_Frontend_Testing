export interface User {
  id: string;
  name: string;
  title?: string;
}

export interface Company {
  id: string;
  name: string;
}

export interface RequestType {
  code: string;
  label: string;
}

export interface LinkedRequest {
  id: string;
  type: string;
}

export type RequestStatus =
  | "NEED_APPROVAL"
  | "APPROVED"
  | "REJECTED"
  | "UNDER_REVIEW"
  | "SUBMITTED";

export interface ApprovalStep {
  id: string;
  order: number;
  user: User;
  companyTag: string;
  role: "SUBMITTER" | "REVIEWER" | "APPROVER";
  status: RequestStatus;
  statusLabel: string;
  actedAt: string | null;
}

export interface ApprovalFlow {
  currentStepId: string;
  steps: ApprovalStep[];
}

export interface Permissions {
  canApprove: boolean;
  canReject: boolean;
  canDuplicate: boolean;
}

export interface RequestData {
  request: {
    id: string;
    title: string;
    status: RequestStatus;
    statusLabel: string;
    createdBy: User;
    createdAt: string;
    viewCount: number;
  };
  details: {
    company: Company;
    requestType: RequestType;
    linkedRequests: LinkedRequest[];
  };
  approvalFlow: ApprovalFlow;
  permissions: Permissions;
}
