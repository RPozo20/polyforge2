// lib/mock/creators.ts
export interface Creator {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  banner: string;
  bio: string;
  location: string;
  specialties: string[];
  totalAssets: number;
  totalSales: number;
  totalRevenue: number;
  followers: number;
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  joinedAt: string;
  software: string[];
  website?: string;
  social: {
    artstation?: string;
    instagram?: string;
    twitter?: string;
  };
}

export const creators: Creator[] = [
  {
    id: "cr-001",
    username: "artvortex",
    displayName: "ArtVortex Studio",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=artvortex&backgroundColor=7c3aed",
    banner: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    bio: "Award-winning character artists specializing in AAA-quality humanoid characters. 10+ years in AAA game development (EA, Ubisoft, CD Projekt Red). Every asset is production-tested.",
    location: "Los Angeles, CA",
    specialties: ["AAA Characters", "Photorealism", "Facial Rigging"],
    totalAssets: 34,
    totalSales: 12847,
    totalRevenue: 847230,
    followers: 28400,
    rating: 4.97,
    reviewCount: 3241,
    verified: true,
    featured: true,
    joinedAt: "2021-03-15",
    software: ["ZBrush", "Maya", "Substance Painter", "Unreal Engine"],
    website: "https://artvortex.studio",
    social: { artstation: "artvortex", instagram: "artvortexstudio" },
  },
  {
    id: "cr-002",
    username: "neonkitsune",
    displayName: "Neon Kitsune",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=neonkitsune&backgroundColor=ec4899",
    banner: "https://images.unsplash.com/photo-1614729939124-032d1e6c9945?w=1200&q=80",
    bio: "Anime character specialist with a love for vibrant stylized worlds. Formerly at Bandai Namco. Creating game-ready anime characters that bring stories to life.",
    location: "Tokyo, Japan",
    specialties: ["Anime", "Stylized", "VRChat Ready"],
    totalAssets: 67,
    totalSales: 31240,
    totalRevenue: 492800,
    followers: 54200,
    rating: 4.91,
    reviewCount: 7832,
    verified: true,
    featured: true,
    joinedAt: "2020-11-08",
    software: ["Blender", "Substance Painter", "Unity", "VRoid Studio"],
    social: { artstation: "neonkitsune", twitter: "neonkitsune_art" },
  },
  {
    id: "cr-003",
    username: "polycraft",
    displayName: "PolyCraft Labs",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=polycraft&backgroundColor=22c55e",
    banner: "https://images.unsplash.com/photo-1547606373-d50f9f853c16?w=1200&q=80",
    bio: "Indie game asset specialists. We create highly optimized, beautiful characters for indie and mobile games. Our low-poly art style is recognized worldwide.",
    location: "Berlin, Germany",
    specialties: ["Low Poly", "Mobile", "Game Ready"],
    totalAssets: 189,
    totalSales: 87430,
    totalRevenue: 621400,
    followers: 41800,
    rating: 4.88,
    reviewCount: 12340,
    verified: true,
    featured: true,
    joinedAt: "2019-06-22",
    software: ["Blender", "Unity", "Godot"],
    website: "https://polycraftlabs.com",
    social: { artstation: "polycraftlabs", twitter: "polycraftlabs" },
  },
  {
    id: "cr-004",
    username: "shadowforge",
    displayName: "Shadow Forge VFX",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=shadowforge&backgroundColor=ef4444",
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80",
    bio: "VFX artist turned game character specialist. Creatures, monsters, and otherworldly beings are my passion. Every creature has a story.",
    location: "Vancouver, Canada",
    specialties: ["Creatures", "VFX", "Rigging"],
    totalAssets: 28,
    totalSales: 8920,
    totalRevenue: 312600,
    followers: 17300,
    rating: 4.94,
    reviewCount: 1847,
    verified: true,
    featured: false,
    joinedAt: "2022-01-10",
    software: ["ZBrush", "Houdini", "Maya", "Unreal Engine"],
    social: { artstation: "shadowforgevfx", instagram: "shadowforgevfx" },
  },
  {
    id: "cr-005",
    username: "mechwright",
    displayName: "MechWright",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=mechwright&backgroundColor=64748b",
    banner: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=1200&q=80",
    bio: "Hard-surface modeling expert specializing in mechs, robots, and sci-fi characters. Former automotive designer, now building the future of digital machinery.",
    location: "Seoul, South Korea",
    specialties: ["Robots", "Hard Surface", "Sci-Fi"],
    totalAssets: 41,
    totalSales: 14230,
    totalRevenue: 534200,
    followers: 22100,
    rating: 4.89,
    reviewCount: 2934,
    verified: true,
    featured: false,
    joinedAt: "2021-08-19",
    software: ["Maya", "3ds Max", "Substance Painter", "Marmoset Toolbag"],
    social: { artstation: "mechwright", twitter: "mechwright3d" },
  },
];
