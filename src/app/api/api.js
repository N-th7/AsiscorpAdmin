import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

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

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshResponse = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const newToken = refreshResponse.data.accessToken;
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        console.warn("🔒 Refresh token inválido. Cerrando sesión...");
        handleSessionExpired();
      }
    }

    if (
      error.response?.status === 401 ||
      error.response?.status === 440 ||
      error.response?.status === 403
    ) {
      console.warn("⚠️ Sesión expirada o token inválido. Cerrando sesión...");
      handleSessionExpired();
    }

    return Promise.reject(error);
  }
);

function handleSessionExpired() {
  localStorage.removeItem("accessToken");

  if (typeof window !== "undefined") {
    if (window.location.pathname !== "/") {
      window.location.href = "/?sessionExpired=true";
    }
  }
}

export default api;
