"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Sparkles, MessageCircle, Camera, Video, Code, ArrowRight } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Marketplace", href: "/marketplace" },
    { label: "Creators", href: "/creators" },
    { label: "Studio", href: "/studio" },
    { label: "Pricing", href: "/pricing" },
  ],
  Creators: [
    { label: "Creator Program", href: "/creator-program" },
    { label: "Earnings", href: "/earnings" },
    { label: "Documentation", href: "/docs" },
    { label: "Blog", href: "/blog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Status", href: "/status" },
  ],
  Legal: [
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Licenses", href: "/licenses" },
    { label: "DMCA", href: "/dmca" },
  ],
};

const socialLinks = [
  { icon: <MessageCircle className="w-4 h-4" />, href: "#", label: "Twitter" },
  { icon: <Camera className="w-4 h-4" />, href: "#", label: "Instagram" },
  { icon: <Video className="w-4 h-4" />, href: "#", label: "YouTube" },
  { icon: <Code className="w-4 h-4" />, href: "#", label: "GitHub" },
];

export function Footer() {
  const pathname = usePathname();

  if (pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface)] mt-24">
      {/* Newsletter strip */}
      <div className="border-b border-[var(--border-subtle)]">
        <div className="container-xl py-10">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3
                className="text-lg font-semibold text-white mb-1"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stay ahead of the curve
              </h3>
              <p className="text-sm text-[var(--text-secondary)]">
                New assets, creator spotlights, and industry insights. Weekly.
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="your@email.com"
                className="input text-sm flex-1 md:w-64"
                id="newsletter-email"
              />
              <button className="btn btn-primary btn-md flex-shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Links grid */}
      <div className="container-xl py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <Image src="/logo.png" alt="Polyforge Logo" width={32} height={32} className="object-contain group-hover:scale-110 transition-transform" />
              <span
                className="font-bold text-lg text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                POLYFORGE
              </span>
            </Link>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              The world&apos;s most trusted digital asset ecosystem for creators, studios, and businesses.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-[var(--border-subtle)] flex items-center justify-center text-[var(--text-muted)] hover:text-white hover:bg-white/10 hover:border-[var(--border-default)] transition-all"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section}>
              <h4 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-4">
                {section}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--text-secondary)] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--border-subtle)]">
        <div className="container-xl py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[var(--text-muted)]">
            © 2026 POLYFORGE. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--text-muted)]">
              🌍 English (US) · USD
            </span>
            <span className="text-xs text-[var(--text-muted)]">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
