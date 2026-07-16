import { BarChart3, Download, Eye, TrendingUp, DollarSign, Package } from "lucide-react";
import Link from "next/link";

const stats = [
  { name: "Total Revenue", value: "$4,250", change: "+12.5%", icon: DollarSign, trend: "up" },
  { name: "Total Views", value: "12,450", change: "+5.2%", icon: Eye, trend: "up" },
  { name: "Total Downloads", value: "840", change: "+2.1%", icon: Download, trend: "up" },
  { name: "Active Assets", value: "24", change: "+3", icon: Package, trend: "neutral" },
];

const recentActivity = [
  { id: 1, action: "New Sale", asset: "Cyberpunk Character Model", time: "2 hours ago", amount: "$45.00" },
  { id: 2, action: "Asset Uploaded", asset: "Sci-Fi Weapon Pack", time: "5 hours ago", amount: null },
  { id: 3, action: "New Sale", asset: "Fantasy Environment Props", time: "1 day ago", amount: "$29.99" },
  { id: 4, action: "Review Received", asset: "Cyberpunk Character Model", time: "2 days ago", amount: null },
];

export default function DashboardOverview() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 animate-fade-in-up">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Welcome back, Studio Admin</h1>
          <p className="text-gray-400">Here's what's happening with your store today.</p>
        </div>
        <Link href="/dashboard/upload" className="btn btn-primary">
          Upload New Asset
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-violet-500/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-violet-600/20 flex items-center justify-center text-violet-400">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${
                stat.trend === "up" ? "bg-emerald-500/10 text-emerald-400" : "bg-gray-500/10 text-gray-400"
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 text-sm font-medium mb-1">{stat.name}</h3>
            <p className="text-2xl font-bold text-white font-display">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Main Chart Area (Placeholder) */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white font-display">Revenue Overview</h2>
            <select className="bg-[#0a0a1a] border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 outline-none">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-64 flex flex-col items-center justify-center text-gray-500 border border-dashed border-white/10 rounded-xl">
            <BarChart3 className="w-8 h-8 mb-3 opacity-50" />
            <p>Chart data will appear here</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-bold text-white font-display mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex gap-4">
                <div className="w-2 h-2 mt-2 rounded-full bg-violet-500 shadow-[0_0_8px_rgba(124,58,237,0.8)]"></div>
                <div>
                  <p className="text-sm font-medium text-white">{activity.action}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{activity.asset}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">{activity.time}</span>
                    {activity.amount && (
                      <>
                        <span className="text-gray-600">•</span>
                        <span className="text-xs font-medium text-emerald-400">{activity.amount}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2.5 text-sm font-medium text-violet-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
