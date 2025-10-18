import api from "./api";
import { navigate } from "next/navigation";
// Manejo de sesión expirada  


export function handleSessionExpired() {
  console.warn("⚠️ Sesión expirada.");
  window.location.href = "/";
}


// REGISTER
export async function register(name, email, password) {
  try {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Error al registrar usuario" };
  }
}

// LOGIN
export async function login(credentials) {
  try {
    const res = await api.post("/auth/login", credentials);
    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    return res.data;
  } catch (err) {
    throw err.response?.data || { error: "Error al iniciar sesión" };
  }
}

// REFRESH TOKEN (manual, normalmente lo maneja el interceptor)
export async function refreshToken() {
  try {
    const res = await api.post("/auth/refresh");
    const { accessToken } = res.data;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  } catch (err) {
    throw err.response?.data || { error: "Error al renovar token" };
  }
}

// LOGOUT
export const logout = async () => {
  try {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Error al cerrar sesión:", error);
  }
};

