import Link from "next/link";
import Nav from "@/components/nav";
import { ArrowRight, CheckCircle, Clock, MessageSquare, Shield, Zap, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-sky-950/30 via-zinc-950 to-zinc-950 pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center">
          <div className="inline-flex items-center gap-2 bg-sky-950/50 border border-sky-800/50 text-sky-300 text-sm px-4 py-1.5 rounded-full mb-8">
            <Zap className="w-3.5 h-3.5" />
            Now in public beta — free forever for small teams
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-balance">
            Stop chasing client<br />
            <span className="text-sky-400">approvals over email.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-10 text-balance">
            henry-delivr gives freelancers and agencies a single link to share work, collect feedback, and get signoff — no accounts, no back-and-forth, no missed messages.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/dashboard" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3 rounded-xl transition-colors text-lg">
              Start for free <ArrowRight className="w-5 h-5" />
            </Link>
            <Link href="/features" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-100 font-medium px-6 py-3 rounded-xl border border-zinc-800 hover:border-zinc-600 transition-colors text-lg">
              See how it works
            </Link>
          </div>
          <p className="text-sm text-zinc-600 mt-6">No credit card required · Free plan forever · Set up in 60 seconds</p>
        </div>
      </section>

      {/* Social proof strip */}
      <section className="border-y border-zinc-800/50 bg-zinc-900/30 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-500 text-sm mb-4">Trusted by freelancers and agencies worldwide</p>
          <div className="flex items-center justify-center gap-8 flex-wrap">
            {["Acme Studio", "PixelCraft", "Bright Agency", "NovaDesign", "ClearMark"].map((name) => (
              <span key={name} className="text-zinc-600 font-medium text-sm">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything you need to close the loop</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">From first draft to final approval, henry-delivr handles the entire review workflow.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Zap, title: "Magic review links", desc: "Share a single URL. Clients review and approve without creating an account. Works for websites, designs, videos, and docs." },
            { icon: MessageSquare, title: "Contextual comments", desc: "Clients leave timestamped feedback directly on the deliverable. No more cryptic emails like 'make it pop more'." },
            { icon: CheckCircle, title: "One-click approvals", desc: "A big green Approve button. That's it. Get notified instantly when work is signed off and ready to invoice." },
            { icon: Clock, title: "Real-time status", desc: "Track every deliverable through Pending → Reviewing → Changes Requested → Approved. Always know where things stand." },
            { icon: Shield, title: "Secure by default", desc: "Unique tokens per deliverable. Share only what you want to share. Revoke access at any time." },
            { icon: Users, title: "Team collaboration", desc: "Multiple team members, shared dashboard, comment threads. Keep your whole team aligned." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-zinc-600 transition-colors">
              <div className="w-10 h-10 bg-sky-950 border border-sky-800 rounded-xl flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-gradient-to-br from-sky-900/30 to-zinc-900 border border-sky-800/30 rounded-3xl p-12 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to ship faster?</h2>
          <p className="text-zinc-400 text-lg mb-8">Join thousands of freelancers and agencies who&apos;ve ditched the approval email chain.</p>
          <Link href="/dashboard" className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-8 py-4 rounded-xl transition-colors text-lg">
            Get started for free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="font-bold text-lg mb-3">henry-delivr</div>
              <p className="text-zinc-500 text-sm">Client review & approval for modern agencies.</p>
            </div>
            <div>
              <div className="font-medium mb-3 text-sm text-zinc-300">Product</div>
              <div className="flex flex-col gap-2">
                {[["Features", "/features"], ["Pricing", "/pricing"], ["Docs", "/docs"]].map(([l, h]) => (
                  <Link key={l} href={h} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium mb-3 text-sm text-zinc-300">Developers</div>
              <div className="flex flex-col gap-2">
                {[["API Reference", "/docs"], ["MCP Endpoint", "/docs"]].map(([l, h]) => (
                  <Link key={l} href={h} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">{l}</Link>
                ))}
              </div>
            </div>
            <div>
              <div className="font-medium mb-3 text-sm text-zinc-300">Legal</div>
              <div className="flex flex-col gap-2">
                {[["Privacy", "#"], ["Terms", "#"]].map(([l, h]) => (
                  <Link key={l} href={h} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">{l}</Link>
                ))}
              </div>
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-8 text-zinc-600 text-sm text-center">
            © 2026 henry-delivr. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
