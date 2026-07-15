// lib/mock/categories.ts
export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  count: number;
  featured?: boolean;
  color: string;
}

export const categories: Category[] = [
  {
    id: "cat-aaa",
    name: "AAA Characters",
    slug: "aaa",
    icon: "Crown",
    description: "Photorealistic, production-grade characters for AAA games and films",
    count: 847,
    featured: true,
    color: "#7c3aed",
  },
  {
    id: "cat-stylized",
    name: "Stylized",
    slug: "stylized",
    icon: "Palette",
    description: "Artistic stylized characters with unique visual flair",
    count: 1243,
    featured: true,
    color: "#ec4899",
  },
  {
    id: "cat-anime",
    name: "Anime",
    slug: "anime",
    icon: "Sparkles",
    description: "Japanese animation-inspired characters in various styles",
    count: 2156,
    featured: true,
    color: "#06b6d4",
  },
  {
    id: "cat-lowpoly",
    name: "Low Poly",
    slug: "low-poly",
    icon: "Hexagon",
    description: "Optimized low polygon characters for mobile and indie games",
    count: 934,
    featured: true,
    color: "#22c55e",
  },
  {
    id: "cat-gameready",
    name: "Game Ready",
    slug: "game-ready",
    icon: "Gamepad2",
    description: "Fully rigged, LOD-equipped characters ready for engine import",
    count: 3421,
    featured: true,
    color: "#f59e0b",
  },
  {
    id: "cat-npc",
    name: "NPCs",
    slug: "npc",
    icon: "Users",
    description: "Non-player characters, civilians, guards, and background roles",
    count: 1872,
    featured: true,
    color: "#6366f1",
  },
  {
    id: "cat-creatures",
    name: "Creatures",
    slug: "creatures",
    icon: "Ghost",
    description: "Fantasy creatures, monsters, aliens, and mythical beings",
    count: 658,
    color: "#ef4444",
  },
  {
    id: "cat-robots",
    name: "Robots & Mechs",
    slug: "robots",
    icon: "Bot",
    description: "Mechanical characters, androids, and mech suits",
    count: 412,
    color: "#64748b",
  },
];

export const licenseTypes = [
  { id: "personal", name: "Personal", description: "Non-commercial use only" },
  { id: "indie", name: "Indie", description: "Up to $100K annual revenue" },
  { id: "commercial", name: "Commercial", description: "Full commercial rights" },
  { id: "enterprise", name: "Enterprise", description: "Unlimited commercial use + source files" },
];

export const softwareList = [
  "Blender", "Maya", "3ds Max", "Cinema 4D", "ZBrush",
  "Unreal Engine", "Unity", "Godot", "Houdini",
];

export const polyRanges = [
  { id: "micro",  label: "< 1K",    min: 0,      max: 1000   },
  { id: "low",    label: "1K–10K",  min: 1000,   max: 10000  },
  { id: "mid",    label: "10K–50K", min: 10000,  max: 50000  },
  { id: "high",   label: "50K–200K",min: 50000,  max: 200000 },
  { id: "ultra",  label: "200K+",   min: 200000, max: Infinity},
];
