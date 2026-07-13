// app/press/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Download, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Press",
  description: "POLYFORGE press kit, brand assets, and media contacts.",
};

const mentions = [
  { outlet: "TechCrunch", headline: "POLYFORGE raises $8M to build the 'Spotify for 3D assets'", date: "Jun 2025" },
  { outlet: "80.lv", headline: "POLYFORGE Is Changing How Studios Source 3D Characters", date: "May 2025" },
  { outlet: "Gamasutra", headline: "The Rise of AAA-Quality Asset Marketplaces", date: "Apr 2025" },
  { outlet: "The Verge", headline: "Inside the Creator Economy for 3D Art", date: "Mar 2025" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Press</p>
          <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Press & Media</h1>
          <p className="text-lg text-[var(--text-secondary)] mb-16 max-w-2xl mx-auto">
            Media inquiries, brand assets, and coverage of POLYFORGE. For press requests, contact us at <span className="text-violet-400">press@polyforge.io</span>.
          </p>

          {/* Stats for press */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { value: "28K+", label: "Assets Listed" },
              { value: "12K+", label: "Creators" },
              { value: "$12M+", label: "Creator Payouts" },
              { value: "150+", label: "Countries" },
            ].map((s) => (
              <div key={s.label} className="card p-4 text-center">
                <p className="text-2xl font-black text-white mb-0.5" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Brand Kit */}
          <div className="card p-8 mb-16 text-center">
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Brand Kit</h2>
            <p className="text-sm text-[var(--text-secondary)] mb-8">Download logos, wordmarks, color palettes, and usage guidelines.</p>
            <a href="#" className="btn btn-ghost btn-md">
              <Download className="w-4 h-4" /> Download Brand Kit (.zip)
            </a>
          </div>

          {/* Media mentions */}
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>In the News</h2>
          <div className="space-y-4">
            {mentions.map((m) => (
              <div key={m.headline} className="card p-5 flex items-start justify-between gap-4 hover:border-violet-500/30 transition-colors group">
                <div>
                  <p className="text-xs font-bold text-violet-400 mb-1">{m.outlet} · {m.date}</p>
                  <p className="text-sm font-semibold text-white group-hover:text-violet-300 transition-colors">{m.headline}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-[var(--text-muted)] flex-shrink-0 mt-1" />
              </div>
            ))}
          </div>

          <div className="mt-12">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Media Inquiries <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
