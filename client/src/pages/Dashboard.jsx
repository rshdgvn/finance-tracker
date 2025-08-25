import React from "react";
import { useAuth } from "../contexts/AuthContext";

const Dashboard = () => {
  const { token, setToken } = useAuth();

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
        nav('/')
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
    <>
      <div>Dashboard</div>
      <button onClick={handleLogout}>Log Out</button>
    </>
  );
};

export default Dashboard;
