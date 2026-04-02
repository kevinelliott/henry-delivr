import { DeliverableStatus } from "@/lib/types";

const STATUS_CONFIG: Record<DeliverableStatus, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-zinc-700 text-zinc-300" },
  reviewing: { label: "Reviewing", className: "bg-blue-900/50 text-blue-300 border border-blue-700" },
  changes_requested: { label: "Changes Requested", className: "bg-amber-900/50 text-amber-300 border border-amber-700" },
  approved: { label: "Approved", className: "bg-emerald-900/50 text-emerald-300 border border-emerald-700" },
};

export default function StatusBadge({ status }: { status: DeliverableStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.pending;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.label}
    </span>
  );
}
