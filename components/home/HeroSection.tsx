"use client";
// components/home/HeroSection.tsx
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Hexagon, Sparkles, Layers, Activity } from "lucide-react";

export function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20, // -10 to 10
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-end overflow-hidden pb-12 pt-32 lg:pb-24 lg:pt-40">
      {/* Cinematic Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105"
          style={{
            transform: `translate(${mousePos.x * -1}px, ${mousePos.y * -1}px) scale(1.05)`,
            transition: "transform 0.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)",
          }}
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260606_154941_df1a96e1-a06f-450c-bd02-d863414cc1a0.mp4"
            type="video/mp4"
          />
        </video>
        {/* Complex Gradient Overlay for Depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080f]/60 via-transparent to-[#08080f] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080f]/90 via-[#08080f]/30 to-transparent z-10" />
        
        {/* Noise overlay */}
        <div className="absolute inset-0 noise z-20 mix-blend-overlay opacity-50" />
      </div>

      <div className="container-xl relative z-30 flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-8 w-full h-full mt-auto">
        
        {/* Left Side: Massive Editorial Typography */}
        <div className="flex-1 max-w-3xl">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6 animate-fade-in-up">
            <div className="w-8 h-[1px] bg-violet-500" />
            <span className="text-violet-400 text-[10px] sm:text-xs tracking-[0.4em] uppercase font-bold flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" /> Next-Gen Ecosystem
            </span>
          </div>

          {/* Heading */}
          <h1
            className="uppercase leading-[0.85] tracking-tighter animate-fade-in-up delay-200"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 12vw, 10rem)",
            }}
          >
            <span className="block text-white drop-shadow-2xl">
              SHAPE
            </span>
            <span 
              className="block italic pr-4"
              style={{
                WebkitTextStroke: "2px rgba(255,255,255,0.8)",
                color: "transparent",
              }}
            >
              THE
            </span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
              UNREAL.
            </span>
          </h1>

          <p className="text-white/60 text-sm sm:text-lg leading-relaxed max-w-lg mt-8 animate-fade-in-up delay-300 border-l-2 border-white/10 pl-6">
            Empowering visionary creators and studios with the highest-fidelity 3D assets on the market.
          </p>
        </div>

        {/* Right Side: Glassmorphism Control Panel */}
        <div className="w-full lg:w-[400px] flex-shrink-0 animate-fade-in-up delay-400">
          <div className="glass-strong rounded-3xl p-8 relative overflow-hidden group">
            {/* Ambient glow inside the card */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-violet-600/30 rounded-full blur-3xl group-hover:bg-violet-500/40 transition-colors duration-700" />
            
            {/* Status indicator */}
            <div className="flex items-center justify-between mb-8">
              <span className="text-xs text-white/50 tracking-widest uppercase font-semibold">Network Status</span>
              <span className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                <Activity className="w-3 h-3" /> Live
              </span>
            </div>

            {/* Micro Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div>
                <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>28.4k</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
                  <Layers className="w-3 h-3" /> Premium Assets
                </p>
              </div>
              <div>
                <p className="text-3xl font-bold text-white mb-1" style={{ fontFamily: "var(--font-display)" }}>$12M</p>
                <p className="text-[10px] text-white/50 uppercase tracking-wider flex items-center gap-1">
                  <Hexagon className="w-3 h-3" /> Creator Earnings
                </p>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/marketplace"
              id="hero-glass-cta"
              className="w-full flex items-center justify-between bg-white text-black hover:bg-violet-500 hover:text-white px-6 py-4 rounded-xl transition-all duration-300 group/btn"
            >
              <span className="text-sm font-bold tracking-widest uppercase">Enter Marketplace</span>
              <div className="w-8 h-8 rounded-full bg-black/10 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
}
