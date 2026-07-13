// app/licenses/page.tsx
import type { Metadata } from "next";
import { CheckCircle, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Licenses",
  description: "Understand POLYFORGE asset licensing — Personal, Indie, Commercial, and Enterprise.",
};

const licenses = [
  {
    name: "Personal",
    price: "Included",
    description: "For learning, portfolio pieces, and non-commercial personal projects.",
    allowed: ["Personal projects & portfolios", "Student work & learning", "Non-commercial game jams", "Social media posts & renders"],
    notAllowed: ["Commercial products or services", "Client work of any kind", "Redistribution or resale"],
  },
  {
    name: "Indie",
    price: "Base Price",
    description: "For independent developers and small studios with up to $100K annual revenue.",
    allowed: ["Indie games & apps (< $100K revenue)", "Freelance projects for small clients", "YouTube / Twitch content", "Personal commercial websites"],
    notAllowed: ["Products exceeding $100K revenue", "AAA studio productions", "Redistribution as standalone assets"],
  },
  {
    name: "Commercial",
    price: "2× Base",
    description: "For studios and businesses with no revenue cap.",
    allowed: ["AAA games & enterprise software", "Film, TV, and advertising", "Unlimited revenue products", "Client work for any size company"],
    notAllowed: ["Redistribution as standalone assets", "Sub-licensing to third parties"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Volume licensing, source files, and custom terms for large organizations.",
    allowed: ["Everything in Commercial", "Source files & editable formats", "Custom modifications", "Sub-licensing rights (negotiable)", "Priority support & SLA"],
    notAllowed: ["Resale on competing marketplaces"],
  },
];

export default function LicensesPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Legal</p>
            <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Asset Licenses</h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Every asset on POLYFORGE comes with a clear license. Choose the one that fits your project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {licenses.map((l) => (
              <div key={l.name} className="card p-8">
                <div className="flex items-baseline justify-between mb-2">
                  <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>{l.name}</h2>
                  <span className="text-sm font-semibold text-violet-400">{l.price}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mb-6">{l.description}</p>

                <div className="mb-4">
                  <p className="text-xs font-semibold text-green-400 uppercase tracking-widest mb-3">Allowed</p>
                  <ul className="space-y-2">
                    {l.allowed.map((a) => (
                      <li key={a} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0 mt-0.5" /> {a}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3">Not Allowed</p>
                  <ul className="space-y-2">
                    {l.notAllowed.map((n) => (
                      <li key={n} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                        <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" /> {n}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="card p-8 mt-12 text-center">
            <h3 className="text-xl font-bold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>Need a Custom License?</h3>
            <p className="text-sm text-[var(--text-secondary)] mb-4">
              For bulk purchases, exclusive rights, or custom terms, our enterprise team is ready to help.
            </p>
            <a href="/contact" className="btn btn-primary btn-lg">Contact Enterprise Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
}
