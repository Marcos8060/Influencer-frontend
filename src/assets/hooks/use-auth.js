"use client";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let token;
    if (typeof window !== "undefined") {
      token = localStorage.getItem("token");
    }
    if (token) {
      setAuth(token);
    }
  }, []);

  return auth;
};
