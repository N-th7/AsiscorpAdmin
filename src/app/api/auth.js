import api from "./api";
import { navigate } from "next/navigation";


export function handleSessionExpired() {
  console.warn("⚠️ Sesión expirada.");
  window.location.href = "/";
}


// REGISTER
export async function register(credentials) {
  try {
    const res = await api.post("/auth/register", credentials);
    return res.data;
  } catch (err) {
    const backendMessage = err.response?.data?.message || err.response?.data?.error;

    if (backendMessage?.toLowerCase().includes("exists") || backendMessage?.toLowerCase().includes("correo")) {
      throw new Error("Ya existe un usuario con ese correo electrónico");
    }

    throw new Error(backendMessage || "Error al registrar usuario");
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

