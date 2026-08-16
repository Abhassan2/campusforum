"use client";
import { createContext, useContext, useEffect, useState } from "react";
import clientServer from "../config/clientServer.js";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const router = useRouter();
  const [token, setToken] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("token");
    }
    return null;
  });
  const [currentUser, setCurrentUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const fetchMe = async () => {
    try {
      const response = await clientServer.get("/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.data.success) {
        setCurrentUser(response.data.currentUserProfile);
      } else {
        console.error("currenUser not found");
        return {};
      }
    } catch (error) {
      if(error?.response){
        if (error.response.status === 401) {
          console.error("Token issue → redirect to login");
          router.push("/login")
          localStorage.removeItem("token");
        }
      }
    }
  };

  const handleLogin = async (formData) => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        router.push("/home");
        toast.success("Login successful!");
      } else {
        console.error(response.data.message);
        toast.error("Token not generated! Please try again");
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/auth/register", formData, {
        withCredentials: true,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        toast.success("Signup successful!");
        router.push("/home");
      } else {
        toast.error("Please try again later");
      }
    } catch (error) {
      console.log("error message:  ", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post("/api/auth/logout");

      if (response.data.success) {
        localStorage.removeItem("token");
        setToken(null);
        router.push("/login");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  useEffect(() => {
    if (pathname.includes("user")) {
      if (pathname.split("/")[2] === currentUser?.owner?.username) {
        router.push("/profile");
      }
    }
  }, [pathname]);

  useEffect(() => {
    if (!token) return;
    fetchMe();
  }, [token, pathname]);

  useEffect(() => {
    if (pathname === "/" || pathname === "/login") {
      if (token) {
        router.push("/home");
      }
    }
  }, [pathname, router]);

  const value = {
    handleLogin,
    handleRegister,
    handleLogout,
    token,
    currentUser,
    isLoading,
    setIsLoading,
  };

  return (
    <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
