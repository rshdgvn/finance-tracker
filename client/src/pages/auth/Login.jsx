import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Login = () => {
  const { setToken } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const nav = useNavigate();

  // Standard email/password login
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

  // Google login: redirect user
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

  // Check for token after Google redirect
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
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h2>

        {errors.general && <p className="text-red-500 text-sm mb-4">{errors.general}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Enter your password"
            />
          </div>
          <button type="submit">Login</button>
        </form>

        <button onClick={handleGoogleLogin}>Login with Google</button>
      </div>
    </div>
  );
};

export default Login;
