import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuthApi from "../Hooks/useAuthApi"; // Sahi path confirm kar lein

function Register() {
  // 1. Inputs track karne ke liye controlled state setup kiya
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user", // Form drop-down ka default value matches default option
  });
  const Navigate = useNavigate();

  // 2. Custom API Layer hook se dynamic methods aur states destructure kiye
  const { register, loading, error } = useAuthApi();

  // Input fields handle karne ka common function
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 3. Form Submission Event handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Payload structural objects pass to custom abstraction hook layer
    await register(formData);
    Navigate("/login");
  };

  return (
    <section className="w-full h-screen bg-bg-main px-10 py-5 flex items-center justify-between font-[Jakarta]">
      {/* Left Side: Islamic Tag & Hikayat (40%) */}
      <div className="w-[40%] h-full bg-emerald-900 text-stone-100 rounded-2xl p-10 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10">
          <span className="text-emerald-400 text-xs font-[Inter] font-bold tracking-widest uppercase">
            Welcome to the Portal
          </span>
          <h1 className="text-3xl font-serif font-semibold mt-4 text-amber-100 leading-snug">
            "Indeed, actions are judged by intentions."
          </h1>
          <p className="text-stone-300 text-xs mt-1">— Sahih al-Bukhari</p>
        </div>

        <div className="relative z-10 border-l-2 border-amber-400/40 pl-5 my-auto">
          <h3 className="text-amber-200 text-sm font-semibold mb-2 uppercase tracking-wider">
            A Beautiful Wisdom
          </h3>
          <p className="text-stone-200 text-sm leading-relaxed italic">
            "An old wise man was once asked: 'How do we purify our hearts?' He
            replied: 'By aligning your actions with your intentions. When you
            create or listen for the sake of true spiritual growth, your
            platform becomes a sanctuary for peace and guidance.'"
          </p>
        </div>

        <div className="relative z-10 text-xs text-stone-400 tracking-wide">
          Join a community of listeners and creators.
        </div>
      </div>

      {/* Right Side: Registration Form (45%) */}
      <form
        onSubmit={handleSubmit}
        className="w-[45%] h-full bg-white rounded-2xl shadow-xl p-10 flex flex-col justify-center border border-stone-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-stone-800">Create Account</h2>
          <p className="text-sm text-stone-500 mt-1">
            Start your spiritual audio journey today.
          </p>
        </div>

        {/* 4. Displaying Dynamic API Errors to the User */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {/* Full Name Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Muzamil Ahmad"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="muzamil@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
              required
            />
          </div>

          {/* Account Role Selection */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Join As
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 bg-white focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800 cursor-pointer"
              required
            >
              <option value="user">Regular Listener (User)</option>
              <option value="creator">Audio Publisher (Creator)</option>
            </select>
          </div>

          {/* 5. Submit Button tracks loading status */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-emerald-800 text-white font-medium py-3 rounded-xl shadow-md transition-colors duration-200 mt-2 text-sm tracking-wide ${loading ? "opacity-70 cursor-not-allowed bg-emerald-900" : "hover:bg-emerald-900"}`}
          >
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </div>

        {/* Existing User Redirect */}
        <p className="text-center text-xs text-stone-500 mt-6">
          Already have an account?{" "}
          <Link
            to={"/login"}
            className="text-emerald-800 font-semibold cursor-pointer hover:underline"
          >
            Log in
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
