import React, { useEffect, useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const Dashboard = () => {
  const [totals, setTotals] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });

  // Mock data for demo - replace with your actual fetch logic
  useEffect(() => {
    setTotals({
      income: 12450.5,
      expenses: 8320.75,
      balance: 4129.75,
    });
  }, []);

  const stats = [
    {
      title: "Total Income",
      value: totals.income,
      icon: TrendingUp,
      gradient: "from-emerald-400 to-green-500",
      bg: "bg-gradient-to-br from-emerald-50 to-green-50",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      textColor: "text-emerald-700",
      change: "+12.5%",
      changePositive: true,
    },
    {
      title: "Total Expenses",
      value: totals.expenses,
      icon: TrendingDown,
      gradient: "from-rose-400 to-red-500",
      bg: "bg-gradient-to-br from-rose-50 to-red-50",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-600",
      textColor: "text-rose-700",
      change: "+8.2%",
      changePositive: false,
    },
    {
      title: "Balance",
      value: totals.balance,
      icon: Wallet,
      gradient: "from-blue-400 to-indigo-500",
      bg: "bg-gradient-to-br from-blue-50 to-indigo-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      textColor: "text-blue-700",
      change: "+18.7%",
      changePositive: true,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50">
      {/* Subtle background pattern */}
      <div
        className="fixed inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(203 213 225 / 0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <main className="relative z-10 p-6 md:p-8 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Budget Overview
              </h1>
              <p className="text-gray-600">Track your financial journey</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
              <Calendar className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                {new Date().toLocaleString("default", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bg} rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`${stat.iconBg} p-3 rounded-xl shadow-sm`}>
                    <Icon className={`w-6 h-6 ${stat.iconColor}`} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                      stat.changePositive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {stat.changePositive ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {stat.change}
                  </div>
                </div>

                <div>
                  <p className={`text-sm font-medium ${stat.textColor} mb-1`}>
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-800">
                    ${stat.value.toFixed(2)}
                  </p>
                </div>

                {/* Subtle gradient line at bottom */}
                <div className="mt-4 h-1 rounded-full overflow-hidden bg-gray-200/50">
                  <div
                    className={`h-full bg-gradient-to-r ${stat.gradient} w-3/4`}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Chart Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">
                Financial Trends
              </h2>
              <p className="text-sm text-gray-600">
                Your spending and income over time
              </p>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                Week
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white text-sm font-medium rounded-lg shadow-sm hover:shadow-md transition-all">
                Month
              </button>
              <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                Year
              </button>
            </div>
          </div>

          <div className="h-80 flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-50 rounded-xl border border-gray-200/50">
            <p className="text-gray-400 text-sm">Chart Component Goes Here</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-6 border border-emerald-200/50 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Add Income</h3>
            <p className="text-sm text-gray-600 mb-4">
              Record new income sources
            </p>
            <button className="w-full py-2 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-medium rounded-lg hover:shadow-lg transition-all">
              Add Income
            </button>
          </div>

          <div className="bg-gradient-to-br from-rose-50 to-red-50 rounded-2xl p-6 border border-rose-200/50 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Add Expense
            </h3>
            <p className="text-sm text-gray-600 mb-4">Track your spending</p>
            <button className="w-full py-2 bg-gradient-to-r from-rose-400 to-red-500 text-white font-medium rounded-lg hover:shadow-lg transition-all">
              Add Expense
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
