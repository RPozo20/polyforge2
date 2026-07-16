// app/page.tsx — POLYFORGE Homepage
import type { Metadata } from "next";
import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedSection, TrendingSection } from "@/components/home/FeaturedSection";
import { CreatorSpotlight } from "@/components/home/CreatorSpotlight";
import { CTABanner } from "@/components/home/CTABanner";

export const metadata: Metadata = {
  title: "POLYFORGE — Digital Asset Commerce Platform | Premium 3D Characters",
  description:
    "Discover and buy premium AAA-quality 3D characters for games, VFX, and animation. The world's most advanced digital asset marketplace.",
};

export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <FeaturedSection />
      <TrendingSection />
      <CreatorSpotlight />
      <CTABanner />
    </>
  );
}
