// app/pricing/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Transparent pricing for buyers and creators on POLYFORGE.",
};

const plans = [
  {
    name: "Indie",
    price: "Free",
    sub: "Forever",
    description: "Perfect for solo developers and hobbyists.",
    cta: "Get Started Free",
    href: "/register",
    primary: false,
    perks: [
      "Up to $100K annual revenue",
      "70% revenue share",
      "5 asset listings",
      "Basic analytics",
      "Community support",
      "Personal & Indie licenses",
    ],
  },
  {
    name: "Creator",
    price: "$29",
    sub: "per month",
    description: "For professional creators building their catalog.",
    cta: "Start 14-Day Trial",
    href: "/register",
    primary: true,
    perks: [
      "Unlimited revenue",
      "80% revenue share",
      "Unlimited listings",
      "Advanced analytics",
      "Priority support",
      "All license types",
      "Team collaboration (3 seats)",
      "Custom store page",
    ],
  },
  {
    name: "Studio",
    price: "$99",
    sub: "per month",
    description: "For teams and production studios.",
    cta: "Contact Sales",
    href: "/contact",
    primary: false,
    perks: [
      "Unlimited revenue",
      "85% revenue share",
      "Unlimited listings",
      "Enterprise analytics",
      "Dedicated account manager",
      "All license types + source files",
      "Unlimited team seats",
      "White-label store",
      "API access",
      "SLA guarantee",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Pricing</p>
            <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-16">
              Start free. Scale as you grow. No hidden fees, ever.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`card p-8 flex flex-col items-center text-center relative h-full ${plan.primary ? "border-violet-500 ring-1 ring-violet-500/30" : ""}`}
              >
                {plan.primary && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="bg-violet-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">Most Popular</span>
                  </div>
                )}
                <div className="mb-8 w-full flex flex-col items-center">
                  <h2 className="text-2xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{plan.name}</h2>
                  <p className="text-sm text-[var(--text-secondary)] mb-6 min-h-[40px] leading-relaxed">{plan.description}</p>
                  <div className="flex items-baseline justify-center gap-1 w-full">
                    <span className="text-5xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{plan.price}</span>
                    <span className="text-sm text-[var(--text-muted)]">/ {plan.sub}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 flex-1 w-full max-w-[260px] text-left">
                  {plan.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" />
                      {p}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`btn btn-lg w-full ${plan.primary ? "btn-primary" : "btn-ghost"}`}
                >
                  {plan.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
