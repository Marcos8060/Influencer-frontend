"use client";
import { useState, useEffect } from "react";
import { getCookie } from "cookies-next";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const token = getCookie("auth_token");
    if (token) {
      setAuth(token);
    }
  }, []);

  return auth;
};
