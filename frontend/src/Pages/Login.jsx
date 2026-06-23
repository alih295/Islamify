import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // 1. useNavigate ko yahan import kiya
import useAuthApi from "../Hooks/useAuthApi";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const navigate = useNavigate(); // 2. Navigate function ko initialize kiya

  // 3. Hook se login ke sath loading aur error states bhi nikal lein
  const { login, user, loading, error } = useAuthApi();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login({ email, password });
      
      // Agar login successfully true hai, toh ab navigate chalega smoothly
      if (data && data.success) {
        if (data.user.role === 'creator') {
          navigate('/creator');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      console.error("Login process layout error:", err);
    }
  };

  return (
    <section className="w-full h-screen bg-bg-main p-10 flex items-center justify-between font-sans">
      {/* Left Side: Islamic Tag & Hikayat */}
      <div className="w-[40%] h-full bg-emerald-900 text-stone-100 rounded-2xl p-10 flex flex-col justify-between shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>

        <div className="relative z-10">
          <span className="text-emerald-400 text-xs font-bold tracking-widest uppercase">
            Welcome Back
          </span>
          <h1 className="text-3xl font-serif font-semibold mt-4 text-amber-100 leading-snug">
            "Seek knowledge from the cradle to the grave."
          </h1>
          <p className="text-stone-300 text-xs mt-1">— Prophetic Wisdom</p>
        </div>

        <div className="relative z-10 border-l-2 border-amber-400/40 pl-5 my-auto">
          <h3 className="text-amber-200 text-sm font-semibold mb-2 uppercase tracking-wider">
            A Reflection on Consistency
          </h3>
          <p className="text-stone-200 text-sm leading-relaxed italic">
            "A student of knowledge once complained about his drifting focus.
            His mentor said: 'The heart is like an active spring. If you return
            to clean it daily with good intentions and pure reminders, its water
            remains clear. Consistency is the secret to a tranquil soul.'"
          </p>
        </div>

        <div className="relative z-10 text-xs text-stone-400 tracking-wide">
          Reconnect with your spiritual sanctuary.
        </div>
      </div>

      {/* Right Side: Login Form */}
      <form
        onSubmit={handleSubmit}
        className="w-[45%] h-full bg-white rounded-2xl shadow-xl p-10 flex flex-col justify-center border border-stone-100"
      >
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-stone-800">Account Login</h2>
          <p className="text-sm text-stone-500 mt-1">
            Enter your details to access your account.
          </p>
        </div>

        {/* 4. Displaying Dynamic Backend Login Errors */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="muzamil@example.com"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-xs font-semibold text-stone-600 uppercase tracking-wider">
                Password
              </label>
              <span className="text-xs text-emerald-800 hover:underline cursor-pointer font-medium">
                Forgot Password?
              </span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:ring-2 focus:ring-emerald-700 focus:border-emerald-700 outline-none transition text-sm text-stone-800"
              required
            />
          </div>

          {/* Remember Me Checkbox */}
          <div className="flex items-center">
            <input
              id="remember-me"
              type="checkbox"
              className="w-4 h-4 text-emerald-700 border-stone-300 rounded focus:ring-emerald-700 cursor-pointer"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 text-xs text-stone-600 cursor-pointer select-none"
            >
              Remember me on this device
            </label>
          </div>

          {/* 5. Submit Button now reflects asynchronous processing statuses */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-emerald-800 text-white font-medium py-3 rounded-xl shadow-md transition-colors duration-200 mt-2 text-sm tracking-wide ${loading ? 'opacity-70 bg-emerald-900 cursor-not-allowed' : 'hover:bg-emerald-900'}`}
          >
            {loading ? "Verifying..." : "Log In"}
          </button>
        </div>

        {/* New User Redirect */}
        <p className="text-center text-xs text-stone-500 mt-8">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="text-emerald-800 font-semibold cursor-pointer hover:underline"
          >
            Register here
          </Link>
        </p>
      </form>
    </section>
  );
}

export default Login;