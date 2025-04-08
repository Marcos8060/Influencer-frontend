"use client";
import { useState, createContext, useEffect } from "react";
import { APP_API_URL } from "../api-endpoints";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { Logout } from "@/redux/services/auth";
import { setCookie, deleteCookie, getCookie } from 'cookies-next';

export const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Helper functions for cookie operations
  const getAuthToken = () => {
    return getCookie('auth_token') || null;
  };

  const getRefreshToken = () => {
    return getCookie('refresh_token') || null;
  };

  const setAuthToken = (token, roleName) => {
    setCookie('auth_token', token, {
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
      sameSite: 'lax',
      // secure: process.env.NODE_ENV === 'production',
    });
    setCookie('user_role', roleName, {
      path: '/',
      maxAge: 60 * 60 * 24,
      sameSite: 'lax',
      // secure: process.env.NODE_ENV === 'production',
    });
  };

  const setRefreshToken = (token) => {
    setCookie('refresh_token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      sameSite: 'lax',
      // secure: process.env.NODE_ENV === 'production',
    });
  };

  const clearAuthTokens = () => {
    deleteCookie('auth_token');
    deleteCookie('refresh_token');
    deleteCookie('user_role');
  };

  // Create axios instance with interceptors
  const authAxios = axios.create();

  // Add request interceptor to attach token and handle refresh
  authAxios.interceptors.request.use(
    async (config) => {
      const token = getAuthToken();

      if (token) {
        const decodedToken = jwtDecode(token);
        const isExpired = decodedToken.exp * 1000 < Date.now();

        if (isExpired) {
          try {
            const newToken = await refreshToken();
            if (newToken) {
              config.headers.Authorization = `Bearer ${newToken}`;
            }
          } catch (error) {
            await logoutUser();
            throw new axios.Cancel('Token refresh failed');
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
      const refreshToken = getRefreshToken();
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

        // Store the new token
        setAuthToken(newAccessToken, decodedUser.roleName);
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
          toast.error("You are not authorized to access Brand account");
          router.push("/auth/login/influencer");
        } else if(decodedUser.finishedOnboarding && decodedUser.roleName === "Brand") {
            setAuthToken(response.data.access, decodedUser.roleName);
            setRefreshToken(response.data.refresh);
            router.push("/onboarding/brand/dashboard");
            toast.success("Login successful");
        } else {
          router.push('/onboarding/brand')
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "Login failed");
    }
  };

  const logInfluencer = async (email, password) => {
    try {
      const response = await authAxios.post(APP_API_URL.LOGIN, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        const decodedUser = jwtDecode(response.data.access);
        setUser(decodedUser);
        if (decodedUser.roleName !== "Influencer") {
          toast.error("You are not authorized to access Influencer account");
          router.push("/auth/login/brand");
        } else if (decodedUser.finishedOnboarding && decodedUser.roleName === "Influencer") {
          setAuthToken(response.data.access, decodedUser.roleName);
          setRefreshToken(response.data.refresh);
          router.push("/onboarding/influencer/dashboard");
          toast.success("Login successful");
        } else {
          router.push("/onboarding/influencer");
          toast.success("Login successful");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.errorMessage?.[0] || "Login failed");
    }
  };

  const logoutUser = async () => {
    try {
      const refreshToken = getRefreshToken();
      const accessToken = getAuthToken();

      if (!refreshToken) {
        console.error("No refresh token found");
        toast.error("No refresh token found");
        return;
      }

      const response = await Logout(accessToken, refreshToken);
      if (response?.message === "Successfully logged out" || !response.error) {
        setUser(null);
        const role = getCookie('user_role');
        console.log(role);
        router.push(`/auth/login/${role?.toLowerCase() || 'brand'}`);
        clearAuthTokens();
        toast.success(response.message || "Logged out successfully");
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
      const token = getAuthToken();
      
      if (token) {
        const decodedToken = jwtDecode(token);
        const expiresIn = decodedToken.exp * 1000 - Date.now();
        // If token expires in less than 5 minutes, refresh it
        if (expiresIn < 300000 && expiresIn > 0) {
          refreshToken()
            .catch(err => console.error('Token refresh failed:', err));
        }
      }
    };
  
    // Initial check when component mounts
    checkTokenExpiration();
    
    // Then check every minute
    const interval = setInterval(checkTokenExpiration, 60000);
    
    return () => clearInterval(interval);
  }, []);

  // Set the user when component mounts
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    }
  }, []);

  const contextData = {
    loginUser: loginUser,
    logInfluencer: logInfluencer,
    logoutBrand: logoutUser, // Consolidated to single logout
    logoutInfluencer: logoutUser, // Consolidated to single logout
    user: user,
    authAxios: authAxios,
  };

  return (
    <authContext.Provider value={contextData}>{children}</authContext.Provider>
  );
};