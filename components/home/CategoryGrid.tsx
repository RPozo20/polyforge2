// components/home/CategoryGrid.tsx
import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { categories } from "@/lib/mock/categories";
import { formatNumber } from "@/lib/utils";

export function CategoryGrid() {
  const featured = categories.filter((c) => c.featured);

  return (
    <section className="section-padding" aria-labelledby="categories-heading">
      <div className="container-xl">
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-3">
              Browse by Type
            </p>
            <h2
              id="categories-heading"
              className="display-md text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Find Your Perfect Character
            </h2>
          </div>
          <Link
            href="/marketplace"
            className="hidden md:flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-violet-400 transition-colors"
          >
            View all categories <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map((category, index) => (
            <Link
              key={category.id}
              href={`/marketplace?category=${category.slug}`}
              id={`category-${category.slug}`}
              className="group relative overflow-hidden rounded-2xl p-5 border border-[var(--border-subtle)] hover:border-[var(--border-default)] transition-all duration-300 cursor-pointer animate-fade-in-up"
              style={{
                background: `radial-gradient(ellipse at 0% 0%, ${category.color}15 0%, var(--bg-surface) 70%)`,
                animationDelay: `${index * 80}ms`,
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"
                style={{
                  background: `radial-gradient(ellipse at 30% 30%, ${category.color}18 0%, transparent 70%)`,
                }}
              />

              {/* Icon */}
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300 origin-left">
                {category.icon}
              </div>

              {/* Content */}
              <h3
                className="font-semibold text-white text-sm mb-1 group-hover:text-violet-200 transition-colors"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {category.name}
              </h3>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3 line-clamp-2">
                {category.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)]">
                  {formatNumber(category.count)} assets
                </span>
                <ArrowRight
                  className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-violet-400 group-hover:translate-x-1 transition-all"
                />
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ background: `linear-gradient(90deg, ${category.color}, transparent)` }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
