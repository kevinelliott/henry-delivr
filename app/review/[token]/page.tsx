import { DEMO_DELIVERABLES, DEMO_COMMENTS } from "@/lib/demo-data";
import StatusBadge from "@/components/status-badge";
import { Package, ExternalLink, Clock, CheckCircle, MessageSquare } from "lucide-react";
import Link from "next/link";

export default async function ReviewPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;

  // Try to find demo deliverable
  const deliverable = DEMO_DELIVERABLES.find(d => d.token === token) ?? {
    id: token,
    title: "Client Deliverable",
    description: "This deliverable is ready for your review.",
    url: "https://example.com",
    status: "reviewing" as const,
    token,
    created_at: new Date().toISOString(),
    agency_id: "demo",
    client_email: "",
  };

  const comments = DEMO_COMMENTS.filter(c => c.deliverable_id === deliverable.id);

  return (
    <div className="min-h-screen bg-zinc-950">
      {/* Header */}
      <header className="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <Package className="w-5 h-5 text-sky-400" />
            henry-delivr
          </Link>
          <StatusBadge status={deliverable.status as "pending" | "reviewing" | "changes_requested" | "approved"} />
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Deliverable info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{deliverable.title}</h1>
          <p className="text-zinc-400 mb-4">{deliverable.description}</p>
          <div className="flex items-center gap-4 text-sm text-zinc-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {new Date(deliverable.created_at).toLocaleDateString()}
            </span>
            {deliverable.url && (
              <a href={deliverable.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sky-400 hover:text-sky-300">
                <ExternalLink className="w-4 h-4" />
                View deliverable
              </a>
            )}
          </div>
        </div>

        {/* Preview */}
        {deliverable.url && (
          <div className="mb-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-800 text-xs text-zinc-500">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="ml-2 font-mono">{deliverable.url}</span>
            </div>
            <iframe
              src={deliverable.url}
              className="w-full h-96 border-0"
              sandbox="allow-same-origin allow-scripts"
              title="Deliverable Preview"
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Comments */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-sky-400" />
              Comments ({comments.length})
            </h2>
            <div className="space-y-4 mb-4">
              {comments.map((c) => (
                <div key={c.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{c.author}</span>
                    <span className="text-zinc-500 text-xs">{new Date(c.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="text-zinc-300 text-sm">{c.text}</p>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-zinc-600 text-sm">No comments yet. Be the first!</p>
              )}
            </div>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Your name"
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors"
              />
              <textarea
                placeholder="Leave a comment..."
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-sky-500 transition-colors resize-none"
              />
              <button
                type="submit"
                className="w-full bg-zinc-800 hover:bg-zinc-700 text-zinc-100 font-medium py-3 rounded-xl transition-colors text-sm"
              >
                Post Comment
              </button>
            </form>
          </div>

          {/* Approval */}
          <div>
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-400" />
              Approval
            </h2>
            {deliverable.status === "approved" ? (
              <div className="bg-emerald-950/30 border border-emerald-800 rounded-2xl p-8 text-center">
                <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-emerald-300 mb-2">Approved!</h3>
                <p className="text-zinc-400 text-sm">This deliverable has been approved.</p>
              </div>
            ) : (
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 text-center">
                <p className="text-zinc-400 text-sm mb-6">Ready to approve this deliverable? Click the button below to confirm.</p>
                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-colors text-lg mb-4">
                  ✓ Approve Deliverable
                </button>
                <button className="w-full bg-amber-900/50 hover:bg-amber-900 border border-amber-700 text-amber-300 font-medium py-3 rounded-xl transition-colors text-sm">
                  Request Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
