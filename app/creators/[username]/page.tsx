"use client";
// app/creators/[username]/page.tsx
import React, { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import {
  MapPin, Globe, MessageCircle, ExternalLink, Star, Download,
  Users, ShoppingBag, UserPlus, MessageSquare, CheckCircle
} from "lucide-react";
import { creators } from "@/lib/mock/creators";
import { getAssetsByCreator } from "@/lib/mock/assets";
import { formatNumber } from "@/lib/utils";
import { Avatar } from "@/components/ui/Avatar";
import { AssetCard } from "@/components/marketplace/AssetCard";

interface PageProps {
  params: { username: string };
}

export default function CreatorProfilePage({ params }: PageProps) {
  const creator = creators.find((c) => c.username === params.username);
  if (!creator) notFound();

  const creatorAssets = getAssetsByCreator(creator.id);
  const [following, setFollowing] = useState(false);

  return (
    <div className="min-h-screen pt-20" style={{ background: "var(--bg-base)" }}>
      {/* Banner */}
      <div className="relative h-56 md:h-72 overflow-hidden">
        <Image
          src={creator.banner}
          alt={`${creator.displayName} banner`}
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-base)] via-[var(--bg-base)]/40 to-transparent" />
      </div>

      <div className="container-xl">
        {/* Profile header */}
        <div className="relative -mt-20 mb-10 flex flex-col md:flex-row items-start md:items-end gap-6">
          <div className="relative flex-shrink-0">
            <Avatar
              src={creator.avatar}
              name={creator.displayName}
              size="xl"
              verified={creator.verified}
            />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-3 mb-2">
              <h1
                className="text-3xl font-bold text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {creator.displayName}
              </h1>
              {creator.verified && (
                <span className="badge badge-primary">
                  <CheckCircle className="w-3 h-3" /> Verified
                </span>
              )}
              {creator.featured && (
                <span className="badge badge-gold">⭐ Featured Creator</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" /> {creator.location}
              </span>
              <span className="flex items-center gap-1.5">
                Joined {new Date(creator.joinedAt).getFullYear()}
              </span>
              {creator.website && (
                <a
                  href={creator.website}
                  className="flex items-center gap-1.5 hover:text-violet-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Globe className="w-3.5 h-3.5" /> Website <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {creator.social.twitter && (
                <a
                  href={`https://twitter.com/${creator.social.twitter}`}
                  className="flex items-center gap-1.5 hover:text-violet-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> @{creator.social.twitter}
                </a>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {creator.specialties.map((s) => (
                <span key={s} className="badge badge-primary">{s}</span>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 flex-shrink-0">
            <button
              onClick={() => setFollowing(!following)}
              id="follow-button"
              className={`btn btn-md ${following ? "btn-secondary" : "btn-primary"}`}
            >
              {following ? (
                <><CheckCircle className="w-4 h-4" /> Following</>
              ) : (
                <><UserPlus className="w-4 h-4" /> Follow</>
              )}
            </button>
            <button className="btn btn-ghost btn-md" id="hire-button">
              <MessageSquare className="w-4 h-4" /> Hire
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { icon: <ShoppingBag className="w-5 h-5" />, label: "Assets", value: formatNumber(creator.totalAssets) },
            { icon: <Download className="w-5 h-5" />, label: "Total Sales", value: formatNumber(creator.totalSales) },
            { icon: <Users className="w-5 h-5" />, label: "Followers", value: formatNumber(creator.followers) },
            {
              icon: <Star className="w-5 h-5" />,
              label: "Avg. Rating",
              value: `${creator.rating.toFixed(2)} ★`,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="card p-4 flex items-center gap-3"
            >
              <span className="text-violet-400">{stat.icon}</span>
              <div>
                <p className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-display)" }}>
                  {stat.value}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bio */}
        <div className="card p-6 mb-10">
          <h2 className="text-lg font-semibold text-white mb-3" style={{ fontFamily: "var(--font-display)" }}>
            About
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed">{creator.bio}</p>
          <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-widest mb-2">Software</p>
            <div className="flex flex-wrap gap-2">
              {creator.software.map((sw) => (
                <span key={sw} className="badge badge-surface">{sw}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Assets */}
        <div className="mb-16">
          <h2
            className="text-2xl font-bold text-white mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Published Assets
            <span className="ml-3 text-sm font-normal text-[var(--text-muted)]">
              {creatorAssets.length} assets
            </span>
          </h2>
          {creatorAssets.length === 0 ? (
            <div className="card p-12 text-center">
              <p className="text-[var(--text-secondary)]">No assets published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {creatorAssets.map((asset) => (
                <AssetCard key={asset.id} asset={asset} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
