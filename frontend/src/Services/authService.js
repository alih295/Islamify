import { api } from "../Api/api";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);

    return response.data;
  } catch (err) {
    console.error("BACKEND SAYS:", err.response?.data); 
    
    const errorMessage = err.response?.data?.message || "Registration failed";
    throw new Error(errorMessage);
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
};


export const checkAuthSession = async () => {
  try {
    // backend se profile call ki
    const response = await api.get("/auth/me");
    return response.data; // Yeh { success: true, user: {...} } return karega
  } catch (err) {
    const errorMessage = err.response?.data?.message || "Session expired";
    throw new Error(errorMessage);
  }
};