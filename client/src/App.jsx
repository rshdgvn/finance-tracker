import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./auth/Home";
import Register from "./auth/Register";
import Login from "./auth/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
