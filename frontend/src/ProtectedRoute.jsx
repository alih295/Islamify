import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { MusicContenxt } from './Context/AppContext'; // Verification context

function ProtectedRoute() {
  // 💡 Context se 'user' ke sath 'loading' state ko bhi destructure kar liya
  const { user, loading } = useContext(MusicContenxt);

  // 1. Jab tak backend se token verification chal rahi ho, tab tak check ko hold par rakhein
  if (loading) {
    return (
      <div className="w-full h-screen bg-stone-950 flex flex-col items-center justify-center text-stone-100">
        <p className="text-sm tracking-wider animate-pulse uppercase text-emerald-400 font-semibold">
          Verifying Session...
        </p>
      </div>
    );
  }


  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;