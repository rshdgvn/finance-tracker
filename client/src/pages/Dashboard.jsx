import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-600">
            Dashboard content here. Click on "Transactions" in the navbar to
            navigate.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
