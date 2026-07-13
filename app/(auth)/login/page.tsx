"use client";
// app/(auth)/login/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff, Sparkles, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex" style={{ background: "var(--bg-base)" }}>
      {/* Left panel — Visual */}
      <div
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-end p-12"
        style={{
          background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 50%, #0a0a1a 100%)",
        }}
      >
        {/* Orbs */}
        <div
          className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full opacity-25 blur-3xl animate-pulse-glow"
          style={{ background: "radial-gradient(circle, #7c3aed, transparent)" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 blur-3xl"
          style={{ background: "radial-gradient(circle, #f59e0b, transparent)" }}
        />

        {/* Character Image Integration */}
        <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
          {/* We use a div to apply the float animation */}
          <div className="relative w-full h-[85%] animate-float">
            <Image
              src="/login-character.png"
              alt="Premium 3D Character"
              fill
              className="object-contain object-bottom drop-shadow-2xl opacity-90 animate-fade-in-up"
              priority
              unoptimized
            />
          </div>
        </div>


        {/* Quote / Stats Glass Panel */}
        <div className="relative z-10 mt-auto w-full animate-fade-in-up delay-300">
          <div className="glass-strong rounded-2xl p-6 md:p-8 relative overflow-hidden group">
            {/* Ambient glow inside card */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-violet-600/30 rounded-full blur-3xl" />
            
            <blockquote className="mb-6 relative z-10">
              <p
                className="text-xl sm:text-2xl font-bold text-white mb-4 leading-tight"
                style={{ fontFamily: "var(--font-display)" }}
              >
                &ldquo;The world&apos;s most advanced marketplace for digital assets&rdquo;
              </p>
            </blockquote>
            
            <div className="flex items-center gap-6 relative z-10">
              {[
                { value: "28K+", label: "Assets" },
                { value: "12K+", label: "Creators" },
                { value: "150+", label: "Countries" },
              ].map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-bold text-white drop-shadow-md" style={{ fontFamily: "var(--font-display)" }}>
                    {s.value}
                  </p>
                  <p className="text-[10px] text-white/60 tracking-widest uppercase font-semibold">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right panel — Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-8">

        <div className="w-full max-w-md">
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Sign in to your POLYFORGE account
          </p>

          {/* OAuth */}
          <button
            id="google-signin"
            className="w-full btn btn-ghost btn-lg mb-6 gap-3"
          >
            <Globe className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <hr className="flex-1 divider" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <hr className="flex-1 divider" />
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-[var(--text-secondary)] mb-1.5">
                Email address
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="input"
                required
                autoComplete="email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="block text-sm font-medium text-[var(--text-secondary)]">
                  Password
                </label>
                <Link href="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input pr-10"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-white transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              loading={loading}
              className="w-full"
              id="login-submit"
              iconRight={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--text-muted)]">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">
              Create one free
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
