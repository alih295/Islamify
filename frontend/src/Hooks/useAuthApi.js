import { useContext, useState } from "react";
import { MusicContenxt } from "../Context/AppContext";
import { loginUser, registerUser } from "../Services/authService";
import {api} from '../Api/api'

const useAuthApi = () => {
  const { user, setUser ,loading , setLoading , error , setError } = useContext(MusicContenxt);

 

  // --- 1. REGISTER METHOD ---
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await registerUser(userData);

      if (data && data.success) {
        setUser(data.user); // Global state update
        return data;
      }
    } catch (err) {
      console.error("Register Hook Error:", err.message);
      setError(err.message); // UI Form par error message sync karne ke liye
    } finally {
      setLoading(false);
    }
  };

  // --- 2. LOGIN METHOD ---
  const login = async ({ email, password }) => {
    setLoading(true); // 💡 Added: Login process start hote hi loading true
    setError(null); // 💡 Added: Purane errors reset karne ke liye
    try {
      const data = await loginUser({ email, password });

      if (data && data.success) {
        setUser(data.user); // Global Context user sync
        return data; // Component level responses (jaise navigate) ke liye return
      }
    } catch (err) {
      console.error("Backend says:", err.message);
      setError(err.message); // 💡 Added: Login screen par error alert show karne ke liye
    } finally {
      setLoading(false); // 💡 Added: Request complete hone par loading false
    }
  };

  const logout = async () => {
    try {
      const response = await api.get("/auth/logout");
      if (response) {
        setUser(null);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  // UI elements ko trigger methods aur tracking states deliver karna
  return { register, login, user, loading, error ,logout , setError};
};

export default useAuthApi;
