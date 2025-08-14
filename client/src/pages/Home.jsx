import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Personal Finance Tracker
        </h1>
        <p className="text-gray-600 mb-6">
          Track your income, expenses, and savings in one place.
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-4">
          <Link
            to="/register"
            className="bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition"
          >
            Create an Account
          </Link>
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
