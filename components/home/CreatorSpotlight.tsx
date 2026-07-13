// components/home/CreatorSpotlight.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users, Star, Download, ShoppingBag } from "lucide-react";
import { creators } from "@/lib/mock/creators";
import { formatNumber } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

export function CreatorSpotlight() {
  const featured = creators.filter((c) => c.featured).slice(0, 3);

  return (
    <section
      className="section-padding border-t border-[var(--border-subtle)]"
      style={{ background: "var(--bg-surface)" }}
      aria-labelledby="creators-heading"
    >
      <div className="container-xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Users className="w-3.5 h-3.5" /> Top Creators
            </p>
            <h2
              id="creators-heading"
              className="display-md text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Meet Our Star Artists
            </h2>
          </div>
          <Link
            href="/creators"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors group"
          >
            All creators <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featured.map((creator, i) => (
            <Link
              key={creator.id}
              href={`/creators/${creator.username}`}
              id={`creator-card-${creator.username}`}
              className="group card card-interactive overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              {/* Banner */}
              <div className="relative h-28 overflow-hidden">
                <Image
                  src={creator.banner}
                  alt={`${creator.displayName} banner`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-surface)] via-transparent to-transparent" />
              </div>

              {/* Profile info */}
              <div className="px-5 pb-5">
                {/* Avatar overlapping banner */}
                <div className="flex items-end justify-between -mt-8 mb-4">
                  <div className="relative">
                    <Avatar
                      src={creator.avatar}
                      name={creator.displayName}
                      size="lg"
                      verified={creator.verified}
                    />
                  </div>
                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-full glass border border-amber-500/20">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="text-xs font-semibold text-amber-400">
                      {creator.rating.toFixed(2)}
                    </span>
                  </div>
                </div>

                <h3
                  className="font-bold text-white group-hover:text-violet-200 transition-colors mb-0.5"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {creator.displayName}
                </h3>
                <p className="text-xs text-[var(--text-muted)] mb-3">{creator.location}</p>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {creator.specialties.slice(0, 3).map((s) => (
                    <span key={s} className="badge badge-surface text-[10px]">
                      {s}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[var(--border-subtle)]">
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {formatNumber(creator.totalAssets)}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1">
                      <ShoppingBag className="w-2.5 h-2.5" /> Assets
                    </div>
                  </div>
                  <div className="text-center border-x border-[var(--border-subtle)]">
                    <div className="text-sm font-bold text-white">
                      {formatNumber(creator.totalSales)}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1">
                      <Download className="w-2.5 h-2.5" /> Sales
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-white">
                      {formatNumber(creator.followers)}
                    </div>
                    <div className="text-[10px] text-[var(--text-muted)] flex items-center justify-center gap-1">
                      <Users className="w-2.5 h-2.5" /> Fans
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
