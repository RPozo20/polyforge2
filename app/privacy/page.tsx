// app/privacy/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "POLYFORGE Privacy Policy — how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="display-md text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Privacy Policy</h1>
          <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: July 1, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>1. Information We Collect</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li><strong className="text-white">Account data:</strong> Name, email, password (hashed), profile picture, and role selection</li>
                <li><strong className="text-white">Payment data:</strong> Billing address and payment method (processed securely via Stripe)</li>
                <li><strong className="text-white">Usage data:</strong> Pages visited, assets viewed, search queries, and download history</li>
                <li><strong className="text-white">Device data:</strong> IP address, browser type, operating system, and device identifiers</li>
                <li><strong className="text-white">Creator data:</strong> Uploaded assets, portfolio information, payout details, and analytics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>2. How We Use Your Information</h2>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li>Provide, maintain, and improve the POLYFORGE platform</li>
                <li>Process transactions and send related notifications</li>
                <li>Personalize your experience (recommended assets, search results)</li>
                <li>Communicate service updates, security alerts, and support messages</li>
                <li>Detect and prevent fraud, abuse, and security threats</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>3. Data Sharing</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                We do not sell your personal data. We share data only with:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li><strong className="text-white">Payment processors</strong> (Stripe, PayPal) for transaction processing</li>
                <li><strong className="text-white">Cloud infrastructure</strong> (AWS, Cloudflare) for hosting and CDN delivery</li>
                <li><strong className="text-white">Analytics tools</strong> (anonymized usage data only)</li>
                <li><strong className="text-white">Law enforcement</strong> when required by valid legal process</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>4. Data Retention</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We retain your account data for as long as your account is active. If you delete your account, we remove personal data within 30 days, except where retention is required by law (e.g., financial records for tax purposes, retained for 7 years).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>5. Your Rights (GDPR & CCPA)</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">Depending on your jurisdiction, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li>Access, correct, or delete your personal data</li>
                <li>Export your data in a portable format</li>
                <li>Opt out of marketing communications</li>
                <li>Restrict or object to data processing</li>
                <li>Withdraw consent at any time</li>
              </ul>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                To exercise these rights, contact us at <span className="text-violet-400">privacy@polyforge.io</span>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>6. Security</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We implement industry-standard security measures including TLS encryption, hashed passwords (bcrypt), access controls, regular security audits, and SOC 2 compliance. While no system is 100% secure, we take every reasonable measure to protect your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>7. Contact</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                For privacy-related inquiries, contact our Data Protection Officer at <span className="text-violet-400">privacy@polyforge.io</span>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
