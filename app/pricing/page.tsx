import Nav from "@/components/nav";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for freelancers just getting started.",
    features: [
      "5 active deliverables",
      "Magic review links",
      "Client comments",
      "One-click approvals",
      "Email notifications",
      "7-day history",
    ],
    cta: "Start for free",
    href: "/dashboard",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$9",
    period: "per month",
    description: "For serious freelancers with multiple clients.",
    features: [
      "Unlimited deliverables",
      "Everything in Free",
      "Custom branding",
      "Priority notifications",
      "90-day history",
      "API access",
      "Zapier integration",
    ],
    cta: "Start Pro trial",
    href: "/dashboard",
    highlighted: true,
  },
  {
    name: "Agency",
    price: "$49",
    period: "per month",
    description: "For teams managing multiple clients at scale.",
    features: [
      "Everything in Pro",
      "Unlimited team members",
      "Multiple workspaces",
      "Advanced analytics",
      "SSO / SAML",
      "SLA guarantee",
      "Dedicated support",
      "MCP API access",
    ],
    cta: "Start Agency trial",
    href: "/dashboard",
    highlighted: false,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">Simple, honest pricing</h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">No hidden fees. No per-seat gotchas. Cancel anytime.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlighted
                  ? "bg-sky-950/30 border-2 border-sky-500"
                  : "bg-zinc-900 border border-zinc-800"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  MOST POPULAR
                </div>
              )}
              <div className="mb-6">
                <h2 className="text-xl font-bold mb-1">{plan.name}</h2>
                <div className="flex items-end gap-1 mb-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-zinc-500 mb-1">/{plan.period}</span>
                </div>
                <p className="text-zinc-400 text-sm">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                    <CheckCircle className="w-4 h-4 text-sky-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <Link
                href={plan.href}
                className={`inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-colors ${
                  plan.highlighted
                    ? "bg-sky-500 hover:bg-sky-400 text-white"
                    : "bg-zinc-800 hover:bg-zinc-700 text-zinc-100"
                }`}
              >
                {plan.cta} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-zinc-500 text-sm">All plans include SSL, automatic backups, and 99.9% uptime SLA.</p>
        </div>
      </div>
    </div>
  );
}
