import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthenticated = () => {
  const nav = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">
          You must be logged in to access this page.
        </p>
        <button
          onClick={() => nav("/login")}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default Unauthenticated;
