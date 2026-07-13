// app/enterprise/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Building2, Users, Shield, Headphones, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Enterprise",
  description: "Enterprise-grade 3D asset solutions for studios, game companies, and VFX houses.",
};

const benefits = [
  { icon: <Building2 className="w-6 h-6" />, title: "Dedicated Infrastructure", description: "Private CDN, custom SLAs, and isolated storage for your studio's assets." },
  { icon: <Users className="w-6 h-6" />, title: "Team Management", description: "Unlimited seats, SSO integration, and granular permission controls." },
  { icon: <Shield className="w-6 h-6" />, title: "Compliance & Legal", description: "Enterprise licensing, NDAs, and full IP indemnification." },
  { icon: <Headphones className="w-6 h-6" />, title: "Dedicated Support", description: "24/7 priority support with a named account manager and onboarding specialist." },
];

const clients = ["Ubisoft", "CD Projekt", "Riot Games", "Epic Games", "Activision", "Bungie"];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <section className="section-padding pt-32" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #0a1535 60%, #0a0a1a 100%)" }}>
        <div className="container-xl text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Enterprise</p>
          <h1 className="display-lg text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Built for Studios.<br />
            <span className="gradient-text">Scaled for Production.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto mb-10">
            Custom contracts, dedicated infrastructure, and white-glove onboarding for the world's leading game studios and VFX houses.
          </p>
          <Link href="/contact" className="btn btn-primary btn-xl">
            Talk to Enterprise Sales <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Logos */}
      <section className="py-12 border-b border-[var(--border-subtle)]">
        <div className="container-xl text-center">
          <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-8">Trusted by leading studios worldwide</p>
          <div className="flex flex-wrap justify-center gap-8">
            {clients.map((c) => (
              <span key={c} className="text-lg font-bold text-[var(--text-muted)] opacity-50 hover:opacity-100 transition-opacity" style={{ fontFamily: "var(--font-display)" }}>
                {c}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="section-padding">
        <div className="container-xl">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>Enterprise Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {benefits.map((b) => (
              <div key={b.title} className="card p-8 flex flex-col items-center text-center h-full">
                <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6 glow-sm">
                  <span className="text-white">{b.icon}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{b.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{b.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-xl max-w-2xl mx-auto text-center">
          <div className="card p-10">
            <h2 className="text-2xl font-bold text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Ready to get started?</h2>
            <p className="text-[var(--text-secondary)] mb-8">Our enterprise team will get back to you within 24 hours.</p>
            <div className="space-y-3">
              {["Custom pricing & volume discounts", "Dedicated onboarding & migration", "Private asset repositories", "Legal & compliance support"].map((p) => (
                <div key={p} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" /> {p}
                </div>
              ))}
            </div>
            <Link href="/contact" className="btn btn-primary btn-lg mt-8 w-full">
              Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
