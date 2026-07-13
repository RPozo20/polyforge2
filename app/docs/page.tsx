// app/docs/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Book, Code2, Upload, ShoppingBag, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
  description: "POLYFORGE developer and creator documentation — APIs, SDKs, upload guides, and more.",
};

const sections = [
  {
    icon: <Upload className="w-5 h-5" />,
    title: "Creator Guides",
    links: ["Getting Started as a Creator", "Uploading Your First Asset", "Setting Licenses & Pricing", "Optimizing for Discovery", "Managing Your Catalog"],
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    title: "Buyer Guides",
    links: ["Browsing & Searching Assets", "Understanding Licenses", "Downloading & Importing", "Requesting Refunds", "Commercial Use FAQ"],
  },
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "API Reference",
    links: ["Authentication", "Assets Endpoint", "Search Endpoint", "Webhooks", "Rate Limits"],
  },
  {
    icon: <Book className="w-5 h-5" />,
    title: "Platform",
    links: ["Account Setup", "Team Management", "Analytics Overview", "Payouts & Taxes", "Security & Privacy"],
  },
];

export default function DocsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Documentation</p>
            <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>
              Everything You Need to Know
            </h1>
            <p className="text-lg text-[var(--text-secondary)] mx-auto">
              Comprehensive guides for creators, buyers, and developers integrating with POLYFORGE.
            </p>
          </div>

          {/* Search bar */}
          <div className="max-w-xl mx-auto mb-20">
            <div className="relative">
              <input
                type="text"
                placeholder="Search documentation..."
                className="input w-full pl-4 pr-12 text-center"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((s) => (
              <div key={s.title} className="card p-8 flex flex-col items-center text-center">
                <div className="flex flex-col items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white glow-sm">
                    {s.icon}
                  </div>
                  <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h2>
                </div>
                <ul className="space-y-3 w-full">
                  {s.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors flex items-center justify-center gap-1 group">
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                        {l}
                      </a>
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
