"use client";
import axios from "axios";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL ;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, 
  headers: { "Content-Type": "application/json" },
});

// 🧠 Agregar accessToken a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🛡️ Interceptor para manejar expiración de token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Si el token expira, intentamos refrescarlo
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.accessToken;
        localStorage.setItem("accessToken", newToken);

        // Reintentamos la solicitud original
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.warn("🔒 Sesión expirada. Redirigiendo al inicio...");
        handleSessionExpired();
      }
    }

    // ❌ Si el refresh también falla o el token es inválido
    if (error.response?.status === 401 || error.response?.status === 440) {
      console.warn("⚠️ Token inválido o sesión finalizada. Redirigiendo...");
      handleSessionExpired();
    }

    return Promise.reject(error);
  }
);

// 🔁 Función auxiliar para limpiar sesión y redirigir
function handleSessionExpired() {
  localStorage.removeItem("accessToken");

  // 🔹 Evita usar router directamente aquí (no existe fuera de hooks)
  if (typeof window !== "undefined") {
    window.location.href = "/"; // Redirigir al inicio
  } else {
    try {
      redirect("/"); // fallback en SSR (Next.js)
    } catch (e) {
      console.error("Error al redirigir en servidor:", e);
    }
  }
}

export default api;
