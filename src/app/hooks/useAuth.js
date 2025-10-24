"use client";

import { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";

export function useAuth() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      setAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        console.warn("Token expirado, cerrando sesión automáticamente...");
        localStorage.removeItem("accessToken");
        window.location.href = "/?sessionExpired=true";
        setAuthenticated(false);
      } else {
        setAuthenticated(true);
      }
    } catch (err) {
      localStorage.removeItem("accessToken");
      window.location.href = "/?sessionExpired=true";
    }

    setLoading(false);
  }, []);

  return { authenticated, loading };
}
