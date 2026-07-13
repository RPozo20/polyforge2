// components/home/FeaturedSection.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { getFeaturedAssets, getTrendingAssets } from "@/lib/mock/assets";
import { AssetCard } from "@/components/marketplace/AssetCard";

export function FeaturedSection() {
  const featured = getFeaturedAssets().slice(0, 4);

  return (
    <section
      className="section-padding border-t border-[var(--border-subtle)]"
      aria-labelledby="featured-heading"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="container-xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Flame className="w-3.5 h-3.5" /> Featured
            </p>
            <h2
              id="featured-heading"
              className="display-md text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Handpicked by Our Experts
            </h2>
          </div>
          <Link
            href="/marketplace?filter=featured"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors group"
          >
            View all
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featured.map((asset, i) => (
            <div
              key={asset.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <AssetCard asset={asset} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrendingSection() {
  const trending = getTrendingAssets().slice(0, 4);

  return (
    <section className="section-padding" aria-labelledby="trending-heading">
      <div className="container-xl">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              🔥 Trending Now
            </p>
            <h2
              id="trending-heading"
              className="display-md text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              What Studios Are Buying
            </h2>
          </div>
          <Link
            href="/marketplace?filter=trending"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors group"
          >
            View all <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {trending.map((asset, i) => (
            <div
              key={asset.id}
              className="animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <AssetCard asset={asset} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
