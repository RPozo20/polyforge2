// app/creator-program/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Star, Gift, Megaphone, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Creator Program",
  description: "Join the POLYFORGE Creator Program and unlock exclusive benefits, higher revenue share, and promotional opportunities.",
};

const tiers = [
  {
    name: "Emerging",
    requirement: "10+ assets | $500+ earnings",
    color: "text-gray-300",
    border: "border-gray-600",
    perks: ["75% revenue share", "Creator badge", "Newsletter feature eligibility", "Community access"],
  },
  {
    name: "Rising",
    requirement: "50+ assets | $5K+ earnings",
    color: "text-violet-300",
    border: "border-violet-500",
    perks: ["80% revenue share", "Rising creator badge", "Homepage spotlight", "Priority support", "Monthly creator calls"],
  },
  {
    name: "Elite",
    requirement: "100+ assets | $25K+ earnings",
    color: "text-amber-300",
    border: "border-amber-500",
    perks: ["85% revenue share", "Elite gold badge", "Featured collection page", "Dedicated manager", "Early access to beta features", "Co-marketing opportunities"],
  },
];

export default function CreatorProgramPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32 text-center" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 50%, #0a0a1a 100%)" }}>
        <div className="container-xl">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Creator Program</p>
          <h1 className="display-lg text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Grow With Us.<br />
            <span className="gradient-text">Earn More as You Rise.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            The POLYFORGE Creator Program rewards your growth with higher revenue share, promotional boosts, and exclusive benefits.
          </p>
          <Link href="/register" className="btn btn-primary btn-lg">
            Join the Program <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>Creator Tiers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {tiers.map((tier) => (
              <div key={tier.name} className={`card p-8 border-2 flex flex-col items-center h-full ${tier.border}`}>
                <h3 className={`text-2xl font-bold mb-2 text-center ${tier.color}`} style={{ fontFamily: "var(--font-display)" }}>{tier.name}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-8 text-center">{tier.requirement}</p>
                <ul className="space-y-4 w-full max-w-[240px] flex-1">
                  {tier.perks.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" /> {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
