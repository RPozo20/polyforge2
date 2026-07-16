"use client";

import { DollarSign, TrendingUp, Calendar, ArrowUpRight, Download, Activity } from "lucide-react";

export default function EarningsPage() {
  const stats = [
    { label: "Total Earnings", value: "$12,450.00", change: "+14.5%", icon: DollarSign, color: "text-violet-400", bg: "bg-violet-500/20" },
    { label: "Available Payout", value: "$3,240.50", change: "Ready", icon: TrendingUp, color: "text-emerald-400", bg: "bg-emerald-500/20" },
    { label: "Next Payout Date", value: "Aug 1, 2026", change: "15 Days", icon: Calendar, color: "text-amber-400", bg: "bg-amber-500/20" },
  ];

  const transactions = [
    { id: "TX-9021", date: "Jul 15, 2026", item: "Cyberpunk City Environment", amount: "$29.99", status: "Completed" },
    { id: "TX-9020", date: "Jul 14, 2026", item: "Sci-Fi Weapon Pack v2", amount: "$14.50", status: "Completed" },
    { id: "TX-9019", date: "Jul 12, 2026", item: "Low Poly Nature Kit", amount: "$9.99", status: "Completed" },
    { id: "TX-9018", date: "Jul 10, 2026", item: "Rigged Character - Mech", amount: "$49.99", status: "Completed" },
    { id: "TX-9017", date: "Jul 05, 2026", item: "Payout to PayPal", amount: "-$1,500.00", status: "Processed" },
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-12 animate-fade-in-up pb-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold font-display text-white mb-2">Earnings & Payouts</h1>
          <p className="text-gray-400">Track your sales revenue, analytics, and payout history.</p>
        </div>
        <button className="btn btn-secondary flex items-center gap-2 self-start md:self-auto">
          <Download className="w-4 h-4" />
          <span>Export CSV</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} blur-[80px] rounded-full transform translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700`}></div>
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <span className="badge badge-surface text-xs font-medium px-2.5 py-1 rounded-full border border-white/10">{stat.change}</span>
            </div>
            <p className="text-gray-400 font-medium mb-1">{stat.label}</p>
            <h2 className="text-3xl font-display font-bold text-white">{stat.value}</h2>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Chart Area */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-2xl p-10 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-display font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-violet-400" /> Revenue Overview
            </h3>
            <select className="bg-[#0a0a1a] border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 focus:outline-none focus:border-violet-500 appearance-none text-center">
              <option>Last 30 Days</option>
              <option>This Year</option>
              <option>All Time</option>
            </select>
          </div>
          
          {/* Mock Chart */}
          <div className="flex-1 min-h-[300px] flex items-end gap-3 md:gap-6 mt-4 pb-6 border-b border-white/5 relative">
            {[40, 60, 45, 80, 55, 90, 70, 100, 65, 85, 50, 75].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div 
                  className="w-full bg-violet-600/20 hover:bg-violet-500/80 rounded-t-sm transition-all duration-300 relative cursor-pointer"
                  style={{ height: `${height}%` }}
                >
                  <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-[#0a0a1a] border border-white/10 text-white text-xs py-1.5 px-3 rounded-lg shadow-xl transition-opacity whitespace-nowrap pointer-events-none z-10">
                    ${(height * 12.5).toFixed(0)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-xs font-medium text-gray-500">
            <span>Jul 1</span>
            <span>Jul 8</span>
            <span>Jul 15</span>
            <span>Jul 22</span>
            <span>Jul 30</span>
          </div>
        </div>

        {/* Request Payout Card */}
        <div className="bg-gradient-to-b from-violet-600/10 to-transparent border border-violet-500/20 rounded-2xl p-10 flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
          
          <h3 className="text-2xl font-display font-bold text-white mb-6">Withdraw Funds</h3>
          
          <div className="bg-[#0a0a1a]/50 border border-white/10 rounded-xl p-8 mb-8 backdrop-blur-md text-center">
            <p className="text-sm text-gray-400 mb-2">Available Balance</p>
            <h2 className="text-4xl font-display font-bold text-white mb-2">$3,240.50</h2>
            <p className="text-xs text-emerald-400 flex items-center justify-center gap-1">
              <TrendingUp className="w-3 h-3" /> Minimum payout met
            </p>
          </div>

          <div className="space-y-4 flex-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Payout Method</span>
              <span className="text-white font-medium">PayPal (...ardm@...)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Platform Fee (5%)</span>
              <span className="text-white font-medium">-$162.03</span>
            </div>
            <hr className="border-white/10 my-4" />
            <div className="flex justify-between text-base">
              <span className="text-gray-300">You will receive</span>
              <span className="text-emerald-400 font-bold">$3,078.47</span>
            </div>
          </div>

          <button className="btn btn-primary w-full mt-8 py-4 font-bold text-base shadow-[0_0_20px_rgba(124,58,237,0.4)]">
            Request Payout
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <h3 className="text-2xl font-display font-bold text-white">Recent Transactions</h3>
          <button className="text-sm font-medium text-violet-400 hover:text-violet-300 transition-colors flex items-center gap-1">
            View All <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#0a0a1a]/50 text-xs uppercase tracking-wider text-gray-500 font-medium">
                <th className="p-6 font-medium">Transaction ID</th>
                <th className="p-6 font-medium">Date</th>
                <th className="p-6 font-medium">Item</th>
                <th className="p-6 font-medium">Amount</th>
                <th className="p-6 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {transactions.map((tx, i) => (
                <tr key={i} className="hover:bg-white/[0.02] transition-colors group cursor-default">
                  <td className="p-6 text-sm text-gray-400 font-mono group-hover:text-white transition-colors">{tx.id}</td>
                  <td className="p-6 text-sm text-gray-300">{tx.date}</td>
                  <td className="p-6 text-sm text-white font-medium">{tx.item}</td>
                  <td className={`p-6 text-sm font-bold ${tx.amount.startsWith('-') ? 'text-gray-300' : 'text-emerald-400'}`}>
                    {tx.amount}
                  </td>
                  <td className="p-6 text-sm">
                    <span className={`badge ${tx.status === 'Completed' ? 'badge-success' : 'badge-surface'}`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
