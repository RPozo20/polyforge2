// app/terms/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "POLYFORGE Terms of Service — the rules governing your use of our platform.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="display-md text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>Terms of Service</h1>
          <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: July 1, 2025</p>

          <div className="prose-custom space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>1. Acceptance of Terms</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                By accessing or using the POLYFORGE platform (&quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to all of these Terms, do not use our Service. These Terms apply to all visitors, users, creators, and buyers.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>2. Account Registration</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                To access certain features, you must create an account. You agree to provide accurate, complete information and to keep it updated. You are responsible for safeguarding your account credentials and for all activity under your account. You must be at least 16 years old to create an account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>3. Intellectual Property & Licensing</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                Creators retain full ownership of their uploaded assets. By listing on POLYFORGE, you grant us a non-exclusive license to display, distribute, and promote your work within the platform. Buyers receive a license as specified by the creator&apos;s chosen license type (Personal, Indie, Commercial, or Enterprise).
              </p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                You must not upload content you do not own or have rights to distribute. Violations will result in immediate removal and potential account suspension.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>4. Payments & Revenue Share</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                All prices are listed in USD. POLYFORGE retains a platform fee (15–30% depending on your Creator tier) and remits the remaining balance to the creator. Payouts are processed bi-weekly with a minimum threshold of $50. Refunds are handled on a case-by-case basis within 14 days of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>5. Prohibited Conduct</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li>Upload malicious files, viruses, or harmful code</li>
                <li>Redistribute purchased assets outside license scope</li>
                <li>Create accounts for fraudulent purposes</li>
                <li>Harass, abuse, or threaten other users</li>
                <li>Scrape or crawl the platform without written permission</li>
                <li>Circumvent security features or access controls</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>6. Termination</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We reserve the right to suspend or terminate accounts that violate these Terms, engage in fraudulent activity, or infringe on intellectual property rights. You may also delete your account at any time from your account settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>7. Limitation of Liability</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                POLYFORGE is provided &quot;as is&quot; without warranties of any kind. We are not liable for indirect, incidental, or consequential damages arising from your use of the platform. Our total liability shall not exceed the amount you&apos;ve paid us in the 12 months preceding the claim.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>8. Changes to These Terms</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We may update these Terms from time to time. Material changes will be communicated via email or in-app notification at least 30 days before taking effect. Continued use after changes constitutes acceptance.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>9. Contact</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                For questions about these Terms, contact us at <span className="text-violet-400">legal@polyforge.io</span>.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
