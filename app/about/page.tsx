// app/about/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about POLYFORGE — our mission, team, and the story behind the world's most advanced 3D asset marketplace.",
};

const values = [
  { title: "Creator First", description: "Every decision we make starts with asking: does this help creators earn more and work better?" },
  { title: "Quality Over Quantity", description: "We curate our marketplace. Only high-fidelity, production-ready assets make it in." },
  { title: "Radical Transparency", description: "Clear pricing, honest revenue share, and no hidden fees — ever." },
  { title: "Global Community", description: "Creators and buyers from 150+ countries. We're building the world's art market, not just a software tool." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <section className="section-padding pt-32" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 50%, #0a0a1a 100%)" }}>
        <div className="container-xl max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">About POLYFORGE</p>
          <h1 className="display-lg text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            We Built the Marketplace<br />
            <span className="gradient-text">Creators Deserved.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed mx-auto">
            POLYFORGE was founded in 2023 by a team of 3D artists and game developers who were tired of platforms that took 50% cuts, buried great work, and treated creators like afterthoughts. We built what we wished existed.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding">
        <div className="container-xl max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Our Mission</h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
            To make premium 3D content creation economically sustainable for independent artists — and to give developers and studios access to the highest-fidelity assets on the market, without the wait times and NDAs of traditional pipelines.
          </p>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            We believe that the future of real-time content is open, collaborative, and creator-owned. POLYFORGE is the infrastructure that makes that future possible.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {values.map((v) => (
              <div key={v.title} className="card p-8 flex flex-col items-center text-center">
                <h3 className="text-xl font-bold text-violet-300 mb-3" style={{ fontFamily: "var(--font-display)" }}>{v.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding">
        <div className="container-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto text-center">
            {[
              { value: "28K+", label: "Premium Assets" },
              { value: "12K+", label: "Active Creators" },
              { value: "150+", label: "Countries" },
              { value: "$12M+", label: "Paid to Creators" },
            ].map((s) => (
              <div key={s.label} className="card p-6">
                <p className="text-3xl font-black text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding text-center">
        <div className="container-xl">
          <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Ready to Join?</h2>
          <p className="text-[var(--text-secondary)] mb-8">Whether you create or consume, there's a place for you at POLYFORGE.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/marketplace" className="btn btn-primary btn-lg">Browse the Marketplace <ArrowRight className="w-4 h-4" /></Link>
            <Link href="/register" className="btn btn-ghost btn-lg">Start Selling</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
