import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsChart from "../components/StatsChart";

const Dashboard = () => {
  const { token, setToken, user } = useAuth();
  const nav = useNavigate();

  const [totals, setTotals] = useState({
    income: 0,
    expenses: 0,
    balance: 0,
  });

  const handleLogout = async () => {
    try {
      if (!token) return;

      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setToken(null);
        localStorage.removeItem("token");
        const data = await res.json();
        console.log("Logout response:", data);

        nav("/");
      } else {
        console.error("Logout failed:", await res.json());
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchTotals = async () => {
    if (!token) return;

    try {
      const res = await fetch("/api/dashboard/totals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        setToken(null);
        localStorage.removeItem("token");
        nav("/login");
        return;
      }

      if (!res.ok) throw new Error("Failed to fetch totals");

      const data = await res.json();

      setTotals({
        income: parseFloat(data.total_income) || 0,
        expenses: parseFloat(data.total_expenses) || 0,
        balance: parseFloat(data.total_income - data.total_expenses) || 0,
      });
    } catch (err) {
      console.error("Failed to fetch totals:", err);
    }
  };

  useEffect(() => {
    if (!token) {
      nav("/");
    } else {
      fetchTotals();
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Navbar handleLogout={handleLogout} user={user} />
      <main className="flex-1 p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-800">Budget Overview</h1>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="flex flex-col md:flex-row gap-6 mb-6">
          <div className="flex-1 bg-green-50 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <p className="text-sm font-medium text-green-700">Total Income</p>
            <p className="text-2xl font-bold text-green-900">
              ${totals.income.toFixed(2)}
            </p>
          </div>
          <div className="flex-1 bg-red-50 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <p className="text-sm font-medium text-red-700">Total Expenses</p>
            <p className="text-2xl font-bold text-red-900">
              ${totals.expenses.toFixed(2)}
            </p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <p className="text-sm font-medium text-blue-700">Balance</p>
            <p className="text-2xl font-bold text-blue-900">
              ${totals.balance.toFixed(2)}
            </p>
          </div>
        </div>

        <div className="h-80">
          <StatsChart />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
