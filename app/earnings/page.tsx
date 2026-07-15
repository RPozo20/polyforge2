// app/earnings/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, CreditCard, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Earnings",
  description: "Understand how earnings, payouts, and revenue share work on POLYFORGE.",
};

export default function EarningsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Earnings & Payouts</p>
          <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Get Paid for Your Craft</h1>
          <p className="text-lg text-[var(--text-secondary)] mb-20 max-w-2xl mx-auto">
            Transparent revenue splits, fast bi-weekly payouts, and detailed analytics to help you grow your business.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {[
              { icon: <DollarSign className="w-6 h-6" />, title: "Revenue Share", body: "Earn between 70–85% of every sale depending on your Creator tier. No surprise deductions." },
              { icon: <Clock className="w-6 h-6" />, title: "Payout Schedule", body: "Earnings are processed bi-weekly (every 2 weeks). Minimum payout threshold is $50." },
              { icon: <CreditCard className="w-6 h-6" />, title: "Payment Methods", body: "We support Stripe, PayPal, and SEPA bank transfer in 150+ countries." },
            ].map((c) => (
              <div key={c.title} className="card p-8 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 text-white glow-sm">
                  {c.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{c.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{c.body}</p>
              </div>
            ))}
          </div>

          <div className="card p-8">
            <h2 className="text-xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Revenue Share by Tier</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)]">
                    <th className="text-left py-3 pr-6 text-[var(--text-muted)] font-medium">Tier</th>
                    <th className="text-left py-3 pr-6 text-[var(--text-muted)] font-medium">Revenue Share</th>
                    <th className="text-left py-3 text-[var(--text-muted)] font-medium">Requirement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)]">
                  {[
                    { tier: "Standard", share: "70%", req: "Default for all creators" },
                    { tier: "Emerging", share: "75%", req: "10+ assets, $500+ lifetime earnings" },
                    { tier: "Rising", share: "80%", req: "50+ assets, $5,000+ lifetime earnings" },
                    { tier: "Elite", share: "85%", req: "100+ assets, $25,000+ lifetime earnings" },
                  ].map((r) => (
                    <tr key={r.tier}>
                      <td className="py-3 pr-6 text-white font-medium">{r.tier}</td>
                      <td className="py-3 pr-6 text-violet-400 font-bold">{r.share}</td>
                      <td className="py-3 text-[var(--text-secondary)]">{r.req}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Earning <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
