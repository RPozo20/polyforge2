// app/creators/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Users, Star, Download, ShoppingBag, Search, Filter } from "lucide-react";
import { creators } from "@/lib/mock/creators";
import { formatNumber } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";

export const metadata: Metadata = {
  title: "Creators",
  description: "Discover top 3D artists and asset creators on POLYFORGE.",
};

export default function CreatorsPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      {/* Hero */}
      <section className="section-padding pt-32" style={{ background: "linear-gradient(135deg, #0a0a1a 0%, #1a0a35 50%, #0a0a1a 100%)" }}>
        <div className="container-xl max-w-4xl mx-auto text-center">
          <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Community</p>
          <h1 className="display-md text-white mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Discover Top Creators
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mx-auto mb-10 max-w-2xl">
            Meet the talented artists and studios building the digital worlds of tomorrow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-xl mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
              <input 
                type="text" 
                placeholder="Search creators..." 
                className="input w-full pl-12 h-12 mb-0"
              />
            </div>
            <button className="btn btn-secondary h-12 px-6">
              <Filter className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>
      </section>

      {/* Creators Grid */}
      <section className="section-padding border-t border-[var(--border-subtle)]" style={{ background: "var(--bg-surface)" }}>
        <div className="container-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {creators.map((creator, i) => (
              <Link
                key={creator.id}
                href={`/creators/${creator.username}`}
                className="group card card-interactive overflow-hidden animate-fade-in-up flex flex-col h-full"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                {/* Banner */}
                <div className="relative h-32 overflow-hidden flex-shrink-0">
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
                <div className="px-6 pb-6 flex-1 flex flex-col">
                  {/* Avatar overlapping banner */}
                  <div className="flex items-end justify-between -mt-10 mb-4">
                    <div className="relative">
                      <Avatar
                        src={creator.avatar}
                        name={creator.displayName}
                        size="lg"
                        verified={creator.verified}
                      />
                    </div>
                    <div className="flex items-center gap-1 px-3 py-1.5 rounded-full glass border border-amber-500/20 mb-2">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-semibold text-amber-400">
                        {creator.rating.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <h3
                    className="text-xl font-bold text-white group-hover:text-violet-200 transition-colors mb-1"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {creator.displayName}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{creator.location}</p>

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {creator.specialties.slice(0, 3).map((s) => (
                      <span key={s} className="badge badge-surface text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                  
                  {/* Push stats to bottom if card expands */}
                  <div className="mt-auto">
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[var(--border-subtle)]">
                      <div className="text-center">
                        <div className="text-base font-bold text-white">
                          {formatNumber(creator.totalAssets)}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1 mt-1">
                          <ShoppingBag className="w-3 h-3" /> Assets
                        </div>
                      </div>
                      <div className="text-center border-x border-[var(--border-subtle)]">
                        <div className="text-base font-bold text-white">
                          {formatNumber(creator.totalSales)}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1 mt-1">
                          <Download className="w-3 h-3" /> Sales
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-base font-bold text-white">
                          {formatNumber(creator.followers)}
                        </div>
                        <div className="text-xs text-[var(--text-muted)] flex items-center justify-center gap-1 mt-1">
                          <Users className="w-3 h-3" /> Fans
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
