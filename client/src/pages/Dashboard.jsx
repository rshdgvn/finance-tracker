import React, { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import StatsChart from "../components/StatsChart";

const Dashboard = () => {
  const { token, setToken, user } = useAuth();
  const nav = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        nav("/");
        localStorage.removeItem("token");
        setToken(null);
        console.log("Logged out successfully");
      } else {
        console.error("Logout failed:", await res.json());
      }
    } catch (error) {
      console.log("token: ", token);
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Navbar handleLogout={() => handleLogout} user={user} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
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
              ${/* insert total income */}
            </p>
          </div>
          <div className="flex-1 bg-red-50 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <p className="text-sm font-medium text-red-700">Total Expenses</p>
            <p className="text-2xl font-bold text-red-900">
              ${/* insert total expenses */}
            </p>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-4 flex flex-col justify-center items-center shadow-sm">
            <p className="text-sm font-medium text-blue-700">Balance</p>
            <p className="text-2xl font-bold text-blue-900">
              ${/* insert balance */}
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
