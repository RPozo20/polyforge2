"use client";
// app/marketplace/page.tsx
import React, { useState, useMemo } from "react";
import { SlidersHorizontal, Grid3X3, List, Search, X } from "lucide-react";
import { categories, licenseTypes, softwareList } from "@/lib/mock/categories";
import { AssetCard } from "@/components/marketplace/AssetCard";
import { formatNumber } from "@/lib/utils";

type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "rating" | "popular";

export default function MarketplacePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLicenses, setSelectedLicenses] = useState<string[]>([]);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [sort, setSort] = useState<SortOption>("featured");
  const [view, setView] = useState<"grid" | "list">("grid");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  const [realAssets, setRealAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    async function fetchAssets() {
      try {
        const res = await fetch("/api/assets?feed=marketplace", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          // Map backend format to match the Asset interface
          const mappedAssets = (data.assets || []).map((a: any) => ({
            id: a.id,
            slug: a.id,
            title: a.title || "Untitled",
            description: a.description || "",
            thumbnail: a.coverImageKey 
              ? `${process.env.NEXT_PUBLIC_R2_DEV_URL}/${a.coverImageKey}`
              : "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=600&q=80",
            gallery: [],
            creatorId: a.PK,
            creatorName: a.author?.name || "Studio Admin",
            creatorAvatar: a.author?.avatar || "https://api.dicebear.com/7.x/shapes/svg?seed=fallback",
            category: a.category || "stylized",
            tags: a.tags ? (typeof a.tags === 'string' ? a.tags.split(',') : a.tags) : [],
            price: a.price || 0,
            currency: "USD",
            rating: 5.0,
            reviewCount: 0,
            downloadCount: 0,
            favoriteCount: 0,
            publishedAt: a.createdAt || new Date().toISOString(),
            updatedAt: a.updatedAt || new Date().toISOString(),
            featured: true,
            trending: true,
            staffPick: false,
            newRelease: true,
            polyCount: 0,
            triangleCount: 0,
            hasRig: false,
            lodLevels: 0,
            formats: [],
            software: [],
            textureResolution: "N/A",
            hasBlendShapes: false,
            hasBones: false,
            licenseType: "personal",
            accentColor: "#7c3aed"
          }));
          setRealAssets(mappedAssets);
        }
      } catch (err) {
        console.error("Failed to fetch assets", err);
      } finally {
        setLoading(false);
      }
    }
    fetchAssets();
  }, []);

  const allAssets = useMemo(() => [...realAssets], [realAssets]);

  const filtered = useMemo(() => {
    let list = [...allAssets];

    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.tags.some((t: string) => t.includes(q)) ||
          a.creatorName.toLowerCase().includes(q)
      );
    }

    if (selectedCategories.length > 0) {
      list = list.filter((a) => selectedCategories.includes(a.category));
    }

    if (selectedLicenses.length > 0) {
      list = list.filter((a) => selectedLicenses.includes(a.licenseType));
    }

    if (selectedSoftware.length > 0) {
      list = list.filter((a) =>
        selectedSoftware.some((s) => a.software.includes(s))
      );
    }

    list = list.filter((a) => a.price >= priceRange[0] && a.price <= priceRange[1]);

    switch (sort) {
      case "newest": list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); break;
      case "price-asc": list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "popular": list.sort((a, b) => b.downloadCount - a.downloadCount); break;
      default: list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }

    return list;
  }, [query, selectedCategories, selectedLicenses, selectedSoftware, priceRange, sort]);

  const toggleFilter = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  const activeFilterCount =
    selectedCategories.length + selectedLicenses.length + selectedSoftware.length +
    (priceRange[0] > 0 || priceRange[1] < 500 ? 1 : 0);

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedLicenses([]);
    setSelectedSoftware([]);
    setPriceRange([0, 500]);
    setQuery("");
  };

  return (
    <div className="min-h-screen pt-20 px-4" style={{ background: "var(--bg-base)" }}>
      {/* Page header */}
      <div
        className="border-b border-[var(--border-subtle)] py-8"
        style={{ background: "var(--bg-surface)" }}
      >
        <div className="container-xl">
          <h1
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Marketplace
          </h1>
          <p className="text-[var(--text-secondary)] text-sm">
            {formatNumber(allAssets.length)} premium character assets
          </p>
        </div>
      </div>

      <div className="container-xl py-8">
        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Search */}
          <div className="relative flex-1 min-w-48">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="search"
              placeholder="Search assets, creators, tags…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="input pl-9 text-sm h-9"
              id="marketplace-search"
            />
          </div>

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden btn btn-ghost btn-sm gap-2"
            id="filter-toggle"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFilterCount > 0 && (
              <span className="w-4 h-4 rounded-full bg-violet-500 text-white text-[10px] flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Sort */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortOption)}
            className="input text-sm h-9 w-auto cursor-pointer"
            id="sort-select"
          >
            <option value="featured">Featured</option>
            <option value="newest">Newest</option>
            <option value="rating">Top Rated</option>
            <option value="popular">Most Popular</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>

          {/* View toggle */}
          <div className="flex items-center gap-1 p-1 rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-subtle)]">
            <button
              onClick={() => setView("grid")}
              className={`p-1.5 rounded transition-all ${view === "grid" ? "bg-violet-600 text-white" : "text-[var(--text-muted)] hover:text-white"}`}
              aria-label="Grid view"
            >
              <Grid3X3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded transition-all ${view === "list" ? "bg-violet-600 text-white" : "text-[var(--text-muted)] hover:text-white"}`}
              aria-label="List view"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Active filters + clear */}
          {activeFilterCount > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        <div className="flex gap-6">
          {/* Mobile sidebar backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Sidebar */}
          <aside
            className={`
              flex-shrink-0
              lg:block lg:w-64
              ${sidebarOpen
                ? "fixed right-0 top-0 h-full w-72 z-50 glass-strong border-l border-[var(--border-default)] p-6 overflow-y-auto"
                : "hidden"
              }
            `}
          >
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Price range */}
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                  Price Range
                </h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min={0}
                    max={500}
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
                    className="w-full"
                    id="price-range"
                  />
                  <div className="flex justify-between text-xs text-[var(--text-muted)]">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}{priceRange[1] >= 500 ? "+" : ""}</span>
                  </div>
                </div>
              </div>

              <hr className="divider" />

              {/* Categories */}
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                  Category
                </h3>
                <div className="space-y-1.5">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center justify-between gap-2 cursor-pointer group"
                    >
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.slug)}
                          onChange={() => toggleFilter(cat.slug, selectedCategories, setSelectedCategories)}
                          className="flex-shrink-0"
                        />
                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors">
                          {cat.name}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--text-muted)]">
                        {cat.count.toLocaleString('en-US')}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="divider" />

              {/* License */}
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                  License Type
                </h3>
                <div className="space-y-1.5">
                  {licenseTypes.map((l) => (
                    <label key={l.id} className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedLicenses.includes(l.id)}
                        onChange={() => toggleFilter(l.id, selectedLicenses, setSelectedLicenses)}
                        className="mt-0.5 flex-shrink-0"
                      />
                      <div>
                        <span className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors block">
                          {l.name}
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          {l.description}
                        </span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="divider" />

              {/* Software */}
              <div>
                <h3 className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest mb-3">
                  Software
                </h3>
                <div className="space-y-1.5">
                  {softwareList.map((sw) => (
                    <label key={sw} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={selectedSoftware.includes(sw)}
                        onChange={() => toggleFilter(sw, selectedSoftware, setSelectedSoftware)}
                      />
                      <span className="text-sm text-[var(--text-secondary)] group-hover:text-white transition-colors">
                        {sw}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Results */}
          <div className="flex-1 min-w-0">
            <div className="text-sm text-[var(--text-muted)] mb-5">
              Showing <span className="text-white font-medium">{filtered.length}</span> assets
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-24 text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold text-white mb-2">No results found</h3>
                <p className="text-[var(--text-secondary)] mb-4">Try adjusting your filters or search query</p>
                <button onClick={clearAll} className="btn btn-secondary btn-sm">Clear all filters</button>
              </div>
            ) : (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                    : "flex flex-col gap-4"
                }
              >
                {filtered.map((asset, i) => (
                  <div
                    key={asset.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
                  >
                    <AssetCard asset={asset} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
