"use client";
import { useState, useEffect } from "react";

export const useAuth = () => {
  // Initialize auth immediately from localStorage if available.
  const [auth, setAuth] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("brand_token") ||
        localStorage.getItem("influencer_token") ||
        null
      );
    }
    return null;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const brandToken = localStorage.getItem("brand_token");
      const influencerToken = localStorage.getItem("influencer_token");

      if (brandToken) {
        setAuth(brandToken);
      } else if (influencerToken) {
        setAuth(influencerToken);
      }
    }
  }, []);

  return auth;
};
