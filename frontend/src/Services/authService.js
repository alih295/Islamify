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
