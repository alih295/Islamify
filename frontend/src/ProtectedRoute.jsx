import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AppContext, { MusicContenxt } from './Context/AppContext'; // Make sure context name spelling matches your context file

function ProtectedRoute() {
  const {user} = useContext(MusicContenxt);

  // Agar user logged in hai, toh children components (<Outlet />) ko render karo
  // Agar user login nahi hai, toh use login page par redirect kar do
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;