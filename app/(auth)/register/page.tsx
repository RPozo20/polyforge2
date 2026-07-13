"use client";
// app/(auth)/register/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle, Gamepad2, Palette, Building2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

type Role = "buyer" | "creator" | "studio";

const roles = [
  {
    id: "buyer" as Role,
    icon: <Gamepad2 className="w-6 h-6" />,
    title: "Buyer",
    description: "Browse and purchase premium assets for your projects",
    perks: ["Instant downloads", "Commercial licenses", "Personal library"],
  },
  {
    id: "creator" as Role,
    icon: <Palette className="w-6 h-6" />,
    title: "Creator",
    description: "Sell your 3D assets and earn from your creativity",
    perks: ["Up to 80% revenue", "AI-assisted listings", "Analytics dashboard"],
  },
  {
    id: "studio" as Role,
    icon: <Building2 className="w-6 h-6" />,
    title: "Studio",
    description: "Enterprise tools, team accounts, and bulk licensing",
    perks: ["Team collaboration", "Enterprise licensing", "Dedicated support"],
  },
];

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1);
  const [role, setRole] = useState<Role>("buyer");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "", email: "", password: "", username: "",
  });

  const handleNext = () => setStep(2);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-16 px-4" style={{ background: "var(--bg-base)" }}>
      <div className="w-full max-w-2xl">

        <div className="card p-8">
          {/* Step indicator */}
          <div className="flex items-center gap-4 mb-8">
            {[1, 2].map((s) => (
              <React.Fragment key={s}>
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                    step >= s
                      ? "gradient-primary text-white"
                      : "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-default)]"
                  }`}
                >
                  {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                </div>
                {s < 2 && (
                  <div className={`flex-1 h-px transition-colors ${step > s ? "bg-violet-500" : "bg-[var(--border-subtle)]"}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {step === 1 ? (
            <>
              <h1
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                How will you use POLYFORGE?
              </h1>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                This helps us personalize your experience
              </p>

              <div className="flex flex-col gap-3 mb-8">
                {roles.map((r) => (
                  <button
                    key={r.id}
                    id={`role-${r.id}`}
                    onClick={() => setRole(r.id)}
                    className={`w-full text-left p-6 rounded-xl border transition-all ${
                      role === r.id
                        ? "border-violet-500 bg-violet-500/10"
                        : "border-[var(--border-default)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)]"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span
                        className={`mt-0.5 ${role === r.id ? "text-violet-400" : "text-[var(--text-muted)]"}`}
                      >
                        {r.icon}
                      </span>
                      <div className="flex-1">
                        <p className={`font-semibold mb-0.5 ${role === r.id ? "text-violet-200" : "text-white"}`}>
                          {r.title}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mb-2">{r.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {r.perks.map((p) => (
                            <span key={p} className="flex items-center gap-1 text-[10px] text-[var(--text-muted)]">
                              <CheckCircle className="w-2.5 h-2.5 text-green-400" /> {p}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border-2 mt-1 flex items-center justify-center transition-all ${
                          role === r.id ? "border-violet-500 bg-violet-500" : "border-[var(--border-strong)]"
                        }`}
                      >
                        {role === r.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ height: "32px" }} aria-hidden="true" />

              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleNext}
                id="role-next"
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Continue as {roles.find((r) => r.id === role)?.title}
              </Button>
            </>
          ) : (
            <>
              <h1
                className="text-2xl font-bold text-white mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Create your account
              </h1>
              <p className="text-[var(--text-secondary)] text-sm mb-6">
                Joining as{" "}
                <span className="text-violet-400 font-medium">
                  {roles.find((r) => r.id === role)?.title}
                </span>
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="register-name" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="register-name"
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Jane Doe"
                      className="input"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="register-username" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                      Username
                    </label>
                    <input
                      id="register-username"
                      type="text"
                      value={form.username}
                      onChange={(e) => setForm({ ...form, username: e.target.value })}
                      placeholder="janedoe3d"
                      className="input"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="register-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Email address
                  </label>
                  <input
                    id="register-email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    className="input"
                    required
                    autoComplete="email"
                  />
                </div>

                <div>
                  <label htmlFor="register-password" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                    Password
                  </label>
                  <input
                    id="register-password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    placeholder="Minimum 8 characters"
                    className="input"
                    required
                    minLength={8}
                    autoComplete="new-password"
                  />
                </div>

                <p className="text-xs text-[var(--text-muted)]">
                  By creating an account, you agree to our{" "}
                  <Link href="/terms" className="text-violet-400 hover:underline">Terms of Service</Link>
                  {" "}and{" "}
                  <Link href="/privacy" className="text-violet-400 hover:underline">Privacy Policy</Link>.
                </p>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={loading}
                  className="w-full"
                  id="register-submit"
                  iconRight={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}
                >
                  Create Account
                </Button>
              </form>

              <p className="mt-5 text-center text-sm text-[var(--text-muted)]">
                Already have an account?{" "}
                <Link href="/login" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
                  Sign in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
