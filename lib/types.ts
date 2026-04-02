export type DeliverableStatus = "pending" | "reviewing" | "changes_requested" | "approved";

export interface Deliverable {
  id: string;
  title: string;
  description: string;
  url?: string;
  file_url?: string;
  status: DeliverableStatus;
  token: string;
  created_at: string;
  agency_id: string;
  client_email?: string;
}

export interface Comment {
  id: string;
  deliverable_id: string;
  author: string;
  text: string;
  timestamp: string;
}
