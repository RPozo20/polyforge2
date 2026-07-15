"use client";
// app/(auth)/login/page.tsx
import React, { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
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

        {/* Video Background */}
        <div className="absolute inset-0 z-0 flex items-end justify-center pointer-events-none">
          <div className="relative w-full h-full">
            <video
              src="https://res.cloudinary.com/zmbauhpv/video/upload/v1783964591/Woman_in_white_red_outfit_202607131927_zc6h3f.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="object-cover w-full h-full opacity-60 animate-fade-in"
            />
            {/* Gradient overlay to blend with the dark theme */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a1a] via-transparent to-transparent" />
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
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        <div className="absolute top-8 right-8">
          <Link href="/" className="text-sm text-[var(--text-muted)] hover:text-white transition-colors">
            Back to home
          </Link>
        </div>

        <div className="w-full max-w-md">
          <h1
            className="text-3xl font-bold text-white mb-2"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Welcome back
          </h1>
          <p className="text-[var(--text-secondary)] mb-8">
            Sign in to your POLYFORGE account securely
          </p>

          {/* OAuth Placeholder for Future Google Login */}
          <button
            id="google-signin"
            className="w-full btn btn-ghost btn-lg mb-6 gap-3"
            type="button"
          >
            <Globe className="w-5 h-5" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
            <span className="text-xs text-[var(--text-muted)]">or</span>
            <div className="flex-1 h-px bg-[var(--border-subtle)]" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}
            
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
              className="w-full mt-2"
              iconRight={!loading ? <ArrowRight className="w-4 h-4" /> : undefined}
            >
              Sign In
            </Button>
          </form>

          <p className="text-center text-sm text-[var(--text-muted)] mt-6">
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
