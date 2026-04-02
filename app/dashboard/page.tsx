import { DEMO_DELIVERABLES } from "@/lib/demo-data";
import StatusBadge from "@/components/status-badge";
import { Plus, Package, ExternalLink } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Sidebar */}
      <div className="flex h-screen overflow-hidden">
        <aside className="w-64 bg-zinc-900 border-r border-zinc-800 flex flex-col">
          <div className="p-6 border-b border-zinc-800">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg">
              <Package className="w-6 h-6 text-sky-400" />
              henry-delivr
            </Link>
          </div>
          <nav className="flex-1 p-4 space-y-1">
            {[
              { label: "Deliverables", href: "/dashboard", active: true },
              { label: "Comments", href: "#" },
              { label: "Settings", href: "#" },
            ].map(({ label, href, active }) => (
              <Link
                key={label}
                href={href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                  active ? "bg-sky-950/50 text-sky-300 border border-sky-800/50" : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="p-4 border-t border-zinc-800">
            <div className="text-xs text-zinc-600 mb-2">Demo mode — no Supabase connected</div>
            <Link href="/pricing" className="text-xs text-sky-400 hover:text-sky-300">Upgrade to Pro →</Link>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold">Deliverables</h1>
                <p className="text-zinc-500 text-sm mt-1">Manage and track your client deliverables</p>
              </div>
              <button className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-medium px-4 py-2 rounded-lg transition-colors text-sm">
                <Plus className="w-4 h-4" />
                New Deliverable
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total", value: DEMO_DELIVERABLES.length },
                { label: "Reviewing", value: DEMO_DELIVERABLES.filter(d => d.status === "reviewing").length },
                { label: "Changes Requested", value: DEMO_DELIVERABLES.filter(d => d.status === "changes_requested").length },
                { label: "Approved", value: DEMO_DELIVERABLES.filter(d => d.status === "approved").length },
              ].map(({ label, value }) => (
                <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="text-2xl font-bold">{value}</div>
                  <div className="text-zinc-500 text-sm">{label}</div>
                </div>
              ))}
            </div>

            {/* Deliverables table */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-zinc-800 text-xs text-zinc-500 uppercase tracking-wide">
                <div className="col-span-4">Title</div>
                <div className="col-span-2">Status</div>
                <div className="col-span-3">Client</div>
                <div className="col-span-2">Created</div>
                <div className="col-span-1">Actions</div>
              </div>
              {DEMO_DELIVERABLES.map((d) => (
                <div key={d.id} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors items-center">
                  <div className="col-span-4">
                    <div className="font-medium text-sm">{d.title}</div>
                    <div className="text-zinc-500 text-xs mt-0.5 truncate">{d.description}</div>
                  </div>
                  <div className="col-span-2">
                    <StatusBadge status={d.status as "pending" | "reviewing" | "changes_requested" | "approved"} />
                  </div>
                  <div className="col-span-3 text-zinc-400 text-sm">{d.client_email}</div>
                  <div className="col-span-2 text-zinc-500 text-xs">{new Date(d.created_at).toLocaleDateString()}</div>
                  <div className="col-span-1 flex items-center gap-2">
                    <Link href={`/review/${d.token}`} target="_blank">
                      <ExternalLink className="w-4 h-4 text-zinc-500 hover:text-zinc-300" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
