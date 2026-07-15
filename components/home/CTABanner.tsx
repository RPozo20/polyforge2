// components/home/CTABanner.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, TrendingUp, Globe } from "lucide-react";

export function CTABanner() {
  return (
    <section className="section-padding" aria-label="Call to action">
      <div className="container-xl">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 border border-violet-500/20"
          style={{
            background:
              "linear-gradient(135deg, rgba(124,58,237,0.15) 0%, rgba(8,8,15,0.8) 50%, rgba(245,158,11,0.08) 100%)",
            backdropFilter: "blur(20px)",
          }}
        >
          {/* Background glow */}
          <div
            className="absolute -top-32 -left-32 w-80 h-80 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
          />
          <div
            className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-xs text-violet-300 font-semibold mb-5">
                <Sparkles className="w-3 h-3" />
                For Creators
              </div>
              <h2
                className="display-md text-white mb-4"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Turn Your Art Into
                <br />
                <span className="gradient-text">Passive Income</span>
              </h2>
              <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                Join thousands of creators earning from their 3D art. Set your own prices,
                keep up to 80% of every sale, and reach thousands of studios and developers worldwide.
              </p>

              {/* Benefits */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                {[
                  { icon: <TrendingUp className="w-4 h-4" />, label: "80% Revenue Share", sub: "Industry-leading rates" },
                  { icon: <Globe className="w-4 h-4" />, label: "Global Reach", sub: "Sell to 150+ countries" },
                  { icon: <Sparkles className="w-4 h-4" />, label: "AI Assistance", sub: "Auto-tag & optimize" },
                ].map((b) => (
                  <div
                    key={b.label}
                    className="flex items-start gap-3 p-3 rounded-xl border"
                    style={{ background: "rgba(255,255,255,0.03)", borderColor: "rgba(255,255,255,0.08)" }}
                  >
                    <span className="text-violet-400 mt-0.5 flex-shrink-0">{b.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-white">{b.label}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/register"
                  id="cta-start-selling"
                  className="btn btn-primary btn-lg group"
                >
                  Start Selling Today
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/creator-program" className="btn btn-ghost btn-lg">
                  Learn More
                </Link>
              </div>
            </div>

            {/* Right side — earnings display */}
            <div className="flex-shrink-0 w-full lg:w-72">
              <div className="glass rounded-2xl border border-violet-500/15 p-6">
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-4">
                  Top Creator This Month
                </p>
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-10 h-10 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, #7c3aed, #ec4899)",
                    }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-white">ArtVortex Studio</p>
                    <p className="text-xs text-[var(--text-muted)]">Los Angeles, CA</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "This Month", value: "$24,800", positive: true },
                    { label: "Total Earned", value: "$847,230", positive: true },
                    { label: "Assets Sold", value: "1,247", positive: true },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center justify-between">
                      <span className="text-xs text-[var(--text-muted)]">{row.label}</span>
                      <span className="text-sm font-bold text-green-400">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
