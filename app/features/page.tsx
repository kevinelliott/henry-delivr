import Nav from "@/components/nav";
import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, MessageSquare, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-20">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Built for the way agencies actually work</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">Every feature designed to eliminate the most painful parts of getting client approvals.</p>
        </div>

        <div className="space-y-24">
          {[
            {
              icon: Zap,
              title: "Magic Review Links",
              description: "Generate a unique, secure URL for every deliverable. Share it with your client and they can review your work instantly — no account creation, no passwords, no friction.",
              features: ["Unique token per deliverable", "Works for websites, PDFs, images, videos", "No client account required", "Revoke access anytime"],
            },
            {
              icon: MessageSquare,
              title: "Contextual Comments",
              description: "Clients leave feedback directly tied to the deliverable. Every comment is timestamped so you always have a clear record of who said what and when.",
              features: ["Timestamped comment threads", "Full comment history", "Export to PDF", "Email notifications"],
            },
            {
              icon: CheckCircle,
              title: "One-Click Approval",
              description: "When the client is happy, one click is all it takes. You get notified immediately and the deliverable status updates in your dashboard.",
              features: ["Instant approval notifications", "Approval audit trail", "Trigger webhooks on approval", "Export approval records"],
            },
            {
              icon: Clock,
              title: "Status Tracking",
              description: "Always know where every project stands. The workflow moves automatically: Pending → Reviewing → Changes Requested → Approved.",
              features: ["Visual status pipeline", "Status change history", "Filter and sort by status", "Bulk status updates"],
            },
          ].map(({ icon: Icon, title, description, features }) => (
            <div key={title} className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <div className="w-12 h-12 bg-sky-950 border border-sky-800 rounded-2xl flex items-center justify-center mb-6">
                  <Icon className="w-6 h-6 text-sky-400" />
                </div>
                <h2 className="text-3xl font-bold mb-4">{title}</h2>
                <p className="text-zinc-400 text-lg mb-6 leading-relaxed">{description}</p>
                <ul className="space-y-3">
                  {features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 h-64 flex items-center justify-center">
                <Icon className="w-24 h-24 text-zinc-800" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/pricing" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
            View pricing <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
