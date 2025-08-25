import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ handleLogout, user }) => {
  const nav = useNavigate();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-6">
        <button
          onClick={() => nav("/dashboard")}
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Dashboard
        </button>
        <button
          onClick={() => nav("/transactions")}
          className="text-gray-700 font-medium hover:text-blue-600 transition"
        >
          Transactions
        </button>
      </div>

      <div className="flex items-center gap-4">
        {user && <span className="text-gray-600">Hi, {user.name}</span>}
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
