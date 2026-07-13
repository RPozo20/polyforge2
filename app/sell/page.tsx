// app/sell/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Upload, DollarSign, TrendingUp, Globe, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Sell Assets",
  description: "Sell your 3D characters and digital assets on POLYFORGE and earn up to 85% revenue share.",
};

const steps = [
  { num: "01", title: "Create Your Account", description: "Sign up as a creator and set up your studio profile in minutes." },
  { num: "02", title: "Upload Your Assets", description: "Our smart uploader supports FBX, OBJ, GLTF, BLEND, and more. Add thumbnails, previews, and tags." },
  { num: "03", title: "Set Your Price", description: "Choose your license types and pricing. We suggest based on similar assets in your category." },
  { num: "04", title: "Start Earning", description: "Get discovered by thousands of developers and studios. Payouts every 2 weeks." },
];

export default function SellPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 50%, #0a0a1a 100%)" }}>
        <div className="container-xl text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">For Creators</p>
          <h1 className="display-lg text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Turn Your Art into<br />
            <span className="gradient-text">Recurring Revenue.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] max-w-3xl mx-auto mb-12">
            Join 12,000+ creators earning on POLYFORGE. Upload once, sell forever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/register" className="btn btn-primary btn-lg">
              Start Selling <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/creator-program" className="btn btn-ghost btn-lg">Learn About Creator Program</Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto mb-8">
            {[
              { icon: <DollarSign className="w-6 h-6" />, value: "Up to 85%", label: "Revenue Share" },
              { icon: <Globe className="w-6 h-6" />, value: "150+", label: "Countries Reached" },
              { icon: <TrendingUp className="w-6 h-6" />, value: "$12M+", label: "Creator Earnings" },
            ].map((s) => (
              <div key={s.label} className="glass-strong rounded-2xl p-8 text-center flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 text-white glow-sm">
                  {s.icon}
                </div>
                <p className="text-3xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>{s.value}</p>
                <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-xl max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12" style={{ fontFamily: "var(--font-display)" }}>How It Works</h2>
          <div className="space-y-6">
            {steps.map((s) => (
              <div key={s.num} className="card p-8 flex flex-col items-center text-center">
                <span className="text-5xl font-black text-violet-500/30 mb-4" style={{ fontFamily: "var(--font-display)" }}>{s.num}</span>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{s.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/register" className="btn btn-primary btn-lg">
              Create Your Creator Account <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
