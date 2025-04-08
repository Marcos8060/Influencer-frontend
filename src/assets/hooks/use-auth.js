"use client";
import { useState, useEffect } from "react";

export const useAuth = () => {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const brandToken = localStorage.getItem("brand_token");
      const influencerToken = localStorage.getItem("influencer_token");

      if (brandToken) {
        setAuth(brandToken);
      }else if(influencerToken){
        setAuth(influencerToken);
      }
    }
    
  }, []);

  return auth;
};