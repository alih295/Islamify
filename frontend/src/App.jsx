import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./Pages/Home";
import Register from "./Pages/Register";
import Login from './Pages/Login';
import CreatorLayout from "./layouts/CreatorLayout";
import ProtectedRoute from "./ProtectedRoute";



function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes (Har koi dekh sakta hai) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="search" element={'search'} />
        </Route>
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 2. Protected Routes (Sirf Logged In Users ke liye) */}
        <Route element={<ProtectedRoute />}>
          {/* Iske andar jo bhi paths aayenge, unke liye login hona zaroori hai */}
          <Route path="/creator" element={<CreatorLayout />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;