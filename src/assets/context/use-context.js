"use client";
import { useState, createContext, useEffect } from "react";
import { APP_API_URL } from "../api-endpoints";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Logout } from "@/redux/services/auth";

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Create axios instance with interceptors
  const authAxios = axios.create();

  // Add request interceptor to attach token and handle refresh
  authAxios.interceptors.request.use(
    async (config) => {
      let token;
      const brandToken = localStorage.getItem("brand_token");
      const influencerToken = localStorage.getItem("influencer_token");
      token = brandToken || influencerToken;

      if (token) {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          try {
            const newToken = await refreshToken();
            if (newToken) {
              token = newToken;
              config.headers.Authorization = `Bearer ${newToken}`;
            }
          } catch (error) {
            // If refresh fails, logout the user
            if (brandToken) await logoutBrand();
            if (influencerToken) await logoutInfluencer();
            throw new axios.Cancel("Token refresh failed");
          }
        } else {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Function to refresh token
  const refreshToken = async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);

    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        throw new Error("No refresh token available");
      }

      const response = await axios.post(APP_API_URL.REFRESH_TOKEN, {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        const newAccessToken = response.data.access;
        const decodedUser = jwtDecode(newAccessToken);
        setUser(decodedUser);

        // Store the new token based on user role
        if (decodedUser.roleName === "Brand") {
          localStorage.setItem("brand_token", newAccessToken);
        } else if (decodedUser.roleName === "Influencer") {
          localStorage.setItem("influencer_token", newAccessToken);
        }

        return newAccessToken;
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      throw error;
    } finally {
      setIsRefreshing(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      const response = await authAxios.post(APP_API_URL.LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        if (decodedUser.roleName !== "Brand") {
          toast.error(
            "This account is registered as an Influencer. Please login via Influencer portal."
          );
          router.push("/auth/login/influencer");
        } else {
          localStorage.removeItem("brand_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("influencer_token");
          // Store tokens regardless of onboarding status
          localStorage.setItem("brand_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          if (decodedUser.finishedOnboarding) {
            router.push("/onboarding/brand/dashboard");
          } else {
            router.push("/onboarding/brand");
          }
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "Login failed");
    }
  };

  const logInfluencer = async (email, password) => {
    let response;
    try {
      response = await authAxios.post(APP_API_URL.LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);

        if (decodedUser.roleName !== "Influencer") {
          toast.error(
            "This account is registered as a Brand. Please login via Brand portal"
          );
          router.push("/auth/login/brand");
        } else {
          localStorage.removeItem("brand_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("influencer_token");
          // Store tokens regardless of onboarding status
          localStorage.setItem("influencer_token", response.data.access);
          localStorage.setItem("refresh_token", response.data.refresh);

          if (decodedUser.finishedOnboarding) {
            router.push("/onboarding/influencer/dashboard");
          } else {
            router.push("/onboarding/influencer");
          }
          toast.success("Login successful");
        }
      }else{
        toast.error(response?.detail)
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || error.response?.data?.detail);
    }
  };

  const logoutBrand = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const accessToken = localStorage.getItem("brand_token");

      if (!refreshToken) {
        console.error("No refresh token found");
        toast.error("No refresh token found");
        return;
      }

      const response = await Logout(accessToken, refreshToken);

      if (response?.message === "Successfully logged out" || !response.error) {
        setUser(null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("brand_token");
        router.push("/auth/login/brand");
        toast.success(response.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "Logout failed");
    }
  };

  const logoutInfluencer = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      const accessToken = localStorage.getItem("influencer_token");

      if (!refreshToken) {
        console.error("No refresh token found");
        toast.error("No refresh token found");
        return;
      }

      const response = await Logout(accessToken, refreshToken);

      if (response?.message === "Successfully logged out" || !response.error) {
        setUser(null);
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("influencer_token");
        router.push("/auth/login/influencer");
        toast.success(response.message);
      } else {
        toast.error("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "Logout failed");
    }
  };

  // Check token expiration periodically
  useEffect(() => {
    const checkTokenExpiration = () => {
      console.log(
        "--- Running token expiration check ---",
        new Date().toISOString()
      );

      const brandToken = localStorage.getItem("brand_token");
      const influencerToken = localStorage.getItem("influencer_token");
      const token = brandToken || influencerToken;

      console.log("Token found:", token ? "Yes" : "No");

      if (token) {
        const decodedToken = jwtDecode(token);
        const expiresIn = decodedToken.exp * 1000 - Date.now();
        const expiresInMinutes = Math.floor(expiresIn / 60000);

        console.log(
          `Token expires in: ${expiresInMinutes} minutes (${expiresIn}ms)`
        );

        // If token expires in less than 5 minutes, refresh it
        if (expiresIn < 300000 && expiresIn > 0) {
          console.log("Token expires soon, refreshing...");
          refreshToken()
            .then(() => console.log("Token refreshed successfully"))
            .catch((err) => console.error("Token refresh failed:", err));
        } else if (expiresIn <= 0) {
          if (brandToken) {
            logoutBrand();
          } else if (influencerToken) {
            logoutInfluencer();
          }
          console.log("Token has already expired");
        } else {
          console.log("Token still valid, no refresh needed");
        }
      }
    };

    // Initial check when component mounts
    checkTokenExpiration();

    // Then check every minute
    const interval = setInterval(checkTokenExpiration, 60000);

    return () => {
      console.log("Cleaning up token expiration check");
      clearInterval(interval);
    };
  }, []);

  // decode the token and set the user when a component mounts
  useEffect(() => {
    let decodedUser;

    if (typeof window !== "undefined") {
      const brandToken = localStorage.getItem("brand_token");
      const influencerToken = localStorage.getItem("influencer_token");

      if (brandToken) {
        decodedUser = jwtDecode(brandToken);
      } else if (influencerToken) {
        decodedUser = jwtDecode(influencerToken);
      }
    }

    setUser(decodedUser);
  }, []);

  let contextData = {
    loginUser: loginUser,
    logInfluencer: logInfluencer,
    logoutBrand: logoutBrand,
    logoutInfluencer: logoutInfluencer,
    user: user,
    authAxios: authAxios, // Export the authenticated axios instance
  };

  return (
    <authContext.Provider value={contextData}>{children}</authContext.Provider>
  );
};
