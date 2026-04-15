// src/services/auth.js
import api from "./api";

export const loginUser = async (email, password) => {
  const { data } = await api.post("/auth/login", { email, password });
  localStorage.setItem("token", data.token);   // token save
   return { token: data.token, role: data.role };
};

export const logoutUser = () => {
  localStorage.removeItem("token");
};
