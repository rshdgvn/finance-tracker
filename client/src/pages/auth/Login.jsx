import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { setToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) {
        setErrors(data.errors || { general: data.message });
        return;
      }

      localStorage.setItem("token", data.token);
      setToken(data.token);
      nav("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const res = await fetch("/api/auth/google/redirect");
      const data = await res.json();
      if (!data.url) return;
      window.location.href = data.url;
    } catch (error) {
      console.error("Google login error:", error);
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if (token) {
      localStorage.setItem("token", token);
      setToken(token);
      nav("/dashboard");
    }
  }, [nav, setToken]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4 text-center">{errors.general}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-500 mb-3">or</p>
          <button
            onClick={handleGoogleLogin}
            className="w-full bg-red-500 text-white font-semibold py-2 rounded-lg hover:bg-red-600 transition"
          >
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
