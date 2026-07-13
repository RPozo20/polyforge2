// app/dmca/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description: "POLYFORGE DMCA takedown policy — how to report intellectual property infringement.",
};

export default function DMCAPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-3xl mx-auto">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Legal</p>
          <h1 className="display-md text-white mb-2" style={{ fontFamily: "var(--font-display)" }}>DMCA Policy</h1>
          <p className="text-sm text-[var(--text-muted)] mb-12">Last updated: July 1, 2025</p>

          <div className="card p-6 mb-10 flex gap-4 items-start border-violet-500/20">
            <Shield className="w-6 h-6 text-violet-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
              POLYFORGE respects intellectual property rights and expects our users to do the same. We promptly respond to valid DMCA takedown notices and take appropriate action against repeat infringers.
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Filing a DMCA Takedown Notice</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-3">
                If you believe your copyrighted work has been uploaded to POLYFORGE without authorization, you may submit a DMCA takedown notice. Your notice must include:
              </p>
              <ul className="list-disc list-inside space-y-1.5 text-sm text-[var(--text-secondary)]">
                <li>A physical or electronic signature of the copyright owner or authorized representative</li>
                <li>Identification of the copyrighted work claimed to be infringed</li>
                <li>The URL(s) of the infringing content on POLYFORGE</li>
                <li>Your contact information (name, address, phone number, email)</li>
                <li>A statement that you have a good-faith belief the use is not authorized</li>
                <li>A statement, under penalty of perjury, that the information is accurate and you are the owner or authorized to act</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Where to Send Notices</h2>
              <div className="card p-5 bg-[var(--bg-elevated)]">
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                  <strong className="text-white">DMCA Agent:</strong> POLYFORGE Legal Department<br />
                  <strong className="text-white">Email:</strong> <span className="text-violet-400">dmca@polyforge.io</span><br />
                  <strong className="text-white">Response time:</strong> Within 48 business hours
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Counter-Notification</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                If you believe your content was wrongfully removed, you may file a counter-notification. The counter-notice must include your signature, identification of the removed material, a statement under penalty of perjury that the removal was a mistake, and your consent to jurisdiction. If a valid counter-notification is filed, we will restore the material within 10–14 business days unless the original complainant files a court action.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Repeat Infringers</h2>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                POLYFORGE maintains a strict repeat infringer policy. Accounts with multiple valid DMCA strikes will be permanently suspended. We track all takedown requests and their resolution status.
              </p>
            </section>
          </div>

          <div className="mt-12">
            <Link href="/contact" className="btn btn-primary btn-lg">
              Report Infringement <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
