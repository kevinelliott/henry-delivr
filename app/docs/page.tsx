import Nav from "@/components/nav";
import { Code, BookOpen, Zap, Terminal } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <nav className="space-y-1 sticky top-24">
              {[
                { label: "Getting Started", icon: BookOpen },
                { label: "REST API", icon: Code },
                { label: "MCP API", icon: Zap },
                { label: "CLI", icon: Terminal },
              ].map(({ label, icon: Icon }) => (
                <a key={label} href="#" className="flex items-center gap-3 px-3 py-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 transition-colors text-sm">
                  <Icon className="w-4 h-4" />
                  {label}
                </a>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-12">
            <div>
              <h1 className="text-4xl font-bold mb-4">Documentation</h1>
              <p className="text-zinc-400 text-lg">Everything you need to integrate henry-delivr into your workflow.</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Quick Start</h2>
              <p className="text-zinc-400 mb-4">Get your first deliverable created and shared in under 60 seconds.</p>
              <ol className="space-y-3 text-zinc-300">
                <li className="flex gap-3"><span className="text-sky-400 font-bold">1.</span> Create an account or sign in at /dashboard</li>
                <li className="flex gap-3"><span className="text-sky-400 font-bold">2.</span> Click &quot;New Deliverable&quot; and fill in the details</li>
                <li className="flex gap-3"><span className="text-sky-400 font-bold">3.</span> Copy the magic link and send it to your client</li>
                <li className="flex gap-3"><span className="text-sky-400 font-bold">4.</span> Get notified when they comment or approve</li>
              </ol>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">REST API</h2>
              <p className="text-zinc-400 mb-4">Base URL: <code className="bg-zinc-900 px-2 py-0.5 rounded text-sky-400">/api/v1</code></p>
              <div className="space-y-4">
                {[
                  { method: "GET", path: "/api/v1/deliverables", desc: "List all deliverables" },
                  { method: "POST", path: "/api/v1/deliverables", desc: "Create a new deliverable" },
                  { method: "GET", path: "/api/v1/deliverables/:id", desc: "Get a single deliverable" },
                  { method: "PATCH", path: "/api/v1/deliverables/:id", desc: "Update deliverable status" },
                  { method: "POST", path: "/api/v1/deliverables/:id/comments", desc: "Add a comment" },
                  { method: "GET", path: "/api/v1/deliverables/:id/comments", desc: "List comments" },
                ].map(({ method, path, desc }) => (
                  <div key={path} className="flex items-start gap-4 bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <span className={`font-mono text-xs font-bold px-2 py-1 rounded ${
                      method === "GET" ? "bg-sky-900 text-sky-300" :
                      method === "POST" ? "bg-emerald-900 text-emerald-300" :
                      "bg-amber-900 text-amber-300"
                    }`}>{method}</span>
                    <div>
                      <code className="text-zinc-200 text-sm">{path}</code>
                      <p className="text-zinc-500 text-sm mt-1">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">MCP API</h2>
              <p className="text-zinc-400 mb-4">
                henry-delivr exposes a JSON-RPC 2.0 endpoint at <code className="bg-zinc-900 px-2 py-0.5 rounded text-sky-400">/api/mcp</code> for agentic tools.
              </p>
              <div className="space-y-4">
                {[
                  { method: "get_deliverable", desc: "Get deliverable details by token or ID" },
                  { method: "update_status", desc: "Update the status of a deliverable" },
                  { method: "add_comment", desc: "Add a comment to a deliverable" },
                ].map(({ method, desc }) => (
                  <div key={method} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                    <code className="text-sky-400 font-mono text-sm">{method}</code>
                    <p className="text-zinc-500 text-sm mt-1">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
