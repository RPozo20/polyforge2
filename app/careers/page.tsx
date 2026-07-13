// app/careers/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the POLYFORGE team. Open roles in engineering, design, marketing, and creator success.",
};

const jobs = [
  { title: "Senior Full-Stack Engineer", dept: "Engineering", location: "Remote · EU/US", type: "Full-time" },
  { title: "3D Technical Artist", dept: "Product", location: "Remote · Worldwide", type: "Full-time" },
  { title: "Creator Success Manager", dept: "Community", location: "Remote · US", type: "Full-time" },
  { title: "Product Designer (UI/UX)", dept: "Design", location: "Remote · EU", type: "Full-time" },
  { title: "Marketing Lead", dept: "Growth", location: "Remote · Worldwide", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 50%, #0a0a1a 100%)" }}>
        <div className="container-xl max-w-3xl mx-auto text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Careers</p>
          <h1 className="display-lg text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Build the Future of<br />
            <span className="gradient-text">Digital Art Commerce.</span>
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mx-auto">
            We're a remote-first team of engineers, designers, and artists building the most creator-friendly digital asset platform on the planet. Come join us.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-xl max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-10 text-center" style={{ fontFamily: "var(--font-display)" }}>Open Positions</h2>
          <div className="space-y-4">
            {jobs.map((job) => (
              <div key={job.title} className="card p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-violet-500/30 transition-colors group">
                <div>
                  <p className="text-xs text-violet-400 font-semibold uppercase tracking-widest mb-1">{job.dept}</p>
                  <h3 className="text-lg font-semibold text-white group-hover:text-violet-300 transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                      <MapPin className="w-3 h-3" /> {job.location}
                    </span>
                    <span className="text-xs text-[var(--text-muted)]">{job.type}</span>
                  </div>
                </div>
                <Link href="/contact" className="btn btn-ghost btn-sm flex-shrink-0">
                  Apply <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            ))}
          </div>

          <div className="card p-8 mt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Don't see your role?</h3>
            <p className="text-[var(--text-secondary)] mb-6">We're always looking for exceptional talent. Send us your portfolio and tell us how you'd contribute.</p>
            <Link href="/contact" className="btn btn-primary btn-lg">
              Send an Open Application <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
