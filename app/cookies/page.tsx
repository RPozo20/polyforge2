// app/cookies/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "POLYFORGE Cookie Policy — how we use cookies and similar technologies.",
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="display-md text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Cookie Policy</h1>
          <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: July 1, 2025</p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>What Are Cookies?</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                Cookies are small text files stored on your device when you visit a website. They help us provide a better experience by remembering your preferences, keeping you logged in, and understanding how you use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Cookies We Use</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)]">
                      <th className="text-left py-3 pr-4 text-[var(--text-muted)] font-medium">Type</th>
                      <th className="text-left py-3 pr-4 text-[var(--text-muted)] font-medium">Purpose</th>
                      <th className="text-left py-3 text-[var(--text-muted)] font-medium">Duration</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-subtle)]">
                    {[
                      { type: "Essential", purpose: "Authentication, security, and core platform functionality", duration: "Session / 30 days" },
                      { type: "Functional", purpose: "Remembering preferences (theme, language, currency)", duration: "1 year" },
                      { type: "Analytics", purpose: "Understanding usage patterns and improving the platform", duration: "2 years" },
                      { type: "Marketing", purpose: "Tracking referrals and ad campaign effectiveness (opt-in only)", duration: "90 days" },
                    ].map((c) => (
                      <tr key={c.type}>
                        <td className="py-3 pr-4 text-white font-medium">{c.type}</td>
                        <td className="py-3 pr-4 text-[var(--text-secondary)]">{c.purpose}</td>
                        <td className="py-3 text-[var(--text-secondary)]">{c.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Managing Cookies</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                You can control cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li>View and delete existing cookies</li>
                <li>Block all cookies or only third-party cookies</li>
                <li>Set preferences for specific websites</li>
              </ul>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mt-3">
                Please note that blocking essential cookies may prevent certain features from working correctly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Contact</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                For questions about our use of cookies, contact us at <span className="text-violet-400">privacy@polyforge.io</span>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
