// app/studio/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Users, BarChart2, Layers, Shield, Zap, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Creators Studio",
  description: "Powerful tools for professional 3D asset creators — upload, manage, price, and distribute your work on POLYFORGE.",
};

const features = [
  { icon: <Layers className="w-6 h-6" />, title: "Smart Asset Uploader", description: "Drag-and-drop multi-format uploads with automatic LOD generation and thumbnail extraction." },
  { icon: <BarChart2 className="w-6 h-6" />, title: "Analytics Dashboard", description: "Track views, downloads, revenue, and audience demographics in real time." },
  { icon: <Users className="w-6 h-6" />, title: "Team Collaboration", description: "Invite team members, set roles, and manage studio assets under a shared account." },
  { icon: <Shield className="w-6 h-6" />, title: "License Management", description: "Set custom licensing per asset — personal, indie, commercial, or enterprise." },
  { icon: <Zap className="w-6 h-6" />, title: "Instant Payouts", description: "Get paid within 48 hours via Stripe, PayPal, or bank transfer." },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <section className="section-padding pt-32" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 60%, #0a0a1a 100%)" }}>
        <div className="container-xl text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Creators Studio</p>
          <h1 className="display-lg text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Your Creative Business,<br />
            <span className="gradient-text">Fully Managed.</span>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            Everything you need to upload, price, sell, and scale your 3D asset catalog — built for solo creators and full studios alike.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn btn-primary btn-lg">
              Open Your Studio <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/docs" className="btn btn-ghost btn-lg">View Documentation</Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>
            Everything a Creator Needs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="card p-8 hover:border-violet-500/30 transition-colors group flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 glow-sm group-hover:scale-110 transition-transform">
                  <span className="text-white">{f.icon}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{f.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
