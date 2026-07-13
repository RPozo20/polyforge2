// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Creator stories, industry insights, and platform updates from the POLYFORGE team.",
};

const posts = [
  {
    slug: "top-3d-character-trends-2025",
    category: "Industry",
    title: "Top 3D Character Trends Dominating Games in 2025",
    excerpt: "From stylized cel-shading to photorealistic scans, we break down the character art trends shaping AAA and indie games this year.",
    date: "Jul 10, 2025",
    readTime: "6 min read",
    author: "POLYFORGE Team",
  },
  {
    slug: "creator-spotlight-artvortex",
    category: "Creator Spotlight",
    title: "Creator Spotlight: How ArtVortex Studio Earns $30K/Month on POLYFORGE",
    excerpt: "We sat down with ArtVortex Studio to learn how they went from freelance gigs to a fully automated passive income stream on POLYFORGE.",
    date: "Jul 7, 2025",
    readTime: "9 min read",
    author: "POLYFORGE Team",
  },
  {
    slug: "understanding-3d-asset-licenses",
    category: "Guide",
    title: "Understanding 3D Asset Licenses: A Complete Buyer's Guide",
    excerpt: "Personal, Indie, Commercial, Enterprise — what do they actually mean? We explain every license type in plain language.",
    date: "Jul 3, 2025",
    readTime: "5 min read",
    author: "POLYFORGE Team",
  },
  {
    slug: "polyforge-update-july-2025",
    category: "Updates",
    title: "POLYFORGE Platform Update — July 2025",
    excerpt: "New search filters, improved upload pipeline, real-time revenue dashboard, and more. Here's everything we shipped this month.",
    date: "Jul 1, 2025",
    readTime: "4 min read",
    author: "POLYFORGE Team",
  },
];

const categoryColors: Record<string, string> = {
  Industry: "text-blue-400 bg-blue-400/10",
  "Creator Spotlight": "text-violet-400 bg-violet-400/10",
  Guide: "text-green-400 bg-green-400/10",
  Updates: "text-amber-400 bg-amber-400/10",
};

export default function BlogPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-base)" }}>
      <section className="section-padding pt-32">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto mb-20 text-center">
            <p className="text-xs font-semibold text-violet-400 uppercase tracking-widest mb-4">Blog</p>
            <h1 className="display-md text-white mb-4" style={{ fontFamily: "var(--font-display)" }}>Stories, Insights & Updates</h1>
            <p className="text-lg text-[var(--text-secondary)] mx-auto">
              Creator spotlights, industry analysis, and what's new on POLYFORGE.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <article key={post.slug} className="card p-8 flex flex-col items-center text-center hover:border-violet-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-5">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColors[post.category] || "text-gray-400 bg-gray-400/10"}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-[var(--text-muted)]">{post.date} · {post.readTime}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-violet-300 transition-colors leading-snug" style={{ fontFamily: "var(--font-display)" }}>
                  {post.title}
                </h2>
                <p className="text-sm text-[var(--text-secondary)] flex-1 mb-6 leading-relaxed">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors">
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
