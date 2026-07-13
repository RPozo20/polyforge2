// app/status/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "System Status",
  description: "Real-time operational status of the POLYFORGE platform.",
};

const services = [
  { name: "Marketplace & Storefront", status: "operational", uptime: "99.99%" },
  { name: "Asset Uploads & Processing", status: "operational", uptime: "99.97%" },
  { name: "Search & Discovery", status: "operational", uptime: "99.98%" },
  { name: "Payments & Payouts", status: "operational", uptime: "99.99%" },
  { name: "Creator Dashboard", status: "operational", uptime: "99.96%" },
  { name: "CDN & Downloads", status: "operational", uptime: "99.99%" },
  { name: "Authentication & SSO", status: "operational", uptime: "99.98%" },
  { name: "API", status: "operational", uptime: "99.95%" },
];

const statusColor: Record<string, string> = {
  operational: "bg-green-400",
  degraded: "bg-amber-400",
  outage: "bg-red-500",
};

const statusLabel: Record<string, string> = {
  operational: "Operational",
  degraded: "Degraded Performance",
  outage: "Major Outage",
};

const incidents = [
  { date: "Jul 8, 2025", title: "Intermittent upload delays", description: "Some creators experienced slow asset processing times between 14:00–15:30 UTC. Root cause identified as a CDN cache invalidation spike. Fully resolved.", status: "Resolved" },
  { date: "Jun 22, 2025", title: "Payment gateway maintenance", description: "Scheduled maintenance window for Stripe integration upgrade. No payments were affected.", status: "Resolved" },
  { date: "Jun 10, 2025", title: "Search indexing delay", description: "Newly published assets took up to 15 minutes to appear in search results (normally <1 min). Fixed by scaling the search indexer.", status: "Resolved" },
];

export default function StatusPage() {
  const allOperational = services.every((s) => s.status === "operational");

  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-4xl mx-auto">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">System Status</p>
          <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Platform Status</h1>

          {/* Overall status */}
          <div className={`card p-6 mb-10 flex items-center gap-4 ${allOperational ? "border-green-500/30" : "border-amber-500/30"}`}>
            <div className={`w-4 h-4 rounded-full ${allOperational ? "bg-green-400 animate-pulse" : "bg-amber-400 animate-pulse"}`} />
            <p className="text-lg font-semibold text-white">
              {allOperational ? "All Systems Operational" : "Some Systems Experiencing Issues"}
            </p>
          </div>

          {/* Services */}
          <div className="space-y-2 mb-16">
            {services.map((s) => (
              <div key={s.name} className="card px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${statusColor[s.status]}`} />
                  <span className="text-sm font-medium text-white">{s.name}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs text-[var(--text-muted)]">{s.uptime} uptime</span>
                  <span className="text-xs text-green-400 font-medium">{statusLabel[s.status]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Past incidents */}
          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>Past Incidents</h2>
          <div className="space-y-4">
            {incidents.map((i) => (
              <div key={i.title} className="card p-5">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{i.status}</span>
                  <span className="text-xs text-[var(--text-muted)]">{i.date}</span>
                </div>
                <h3 className="text-sm font-semibold text-white mb-1">{i.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{i.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
