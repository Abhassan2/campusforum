"use client";
import { createContext, useContext, useEffect, useState } from "react";
import clientServer from "../config/clientServer.js";
import { toast } from "react-toastify";
import { useRouter, usePathname } from "next/navigation";
import { fetchMe } from "@/api/serverApi.js";

const AuthContext = createContext();

const AuthContextProvider = ({ initialUser, children }) => {
  const router = useRouter();
  const [token, setToken] = useState(initialUser.token);
  const [currentUser, setCurrentUser] = useState(initialUser.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  
  const handleLogin = async (formData) => {
    try {
      setIsLoading(true)
      const response = await clientServer.post("/api/user/login", formData);

      if (response.data.success) {
        setIsLoading(false)
        localStorage.setItem("token", response.data.token);
        setToken(response.data.token);
        router.push("/home");
        toast.success("Login successful!");
      } else {
        setIsLoading(false)
        toast.error("Please try again later");
      }
    } catch (error) {
      setIsLoading(false)
      console.log("error:  ", error);
    }
  };

  const handleRegister = async (formData) => {
    try {
      setIsLoading(true)
      const res = await clientServer.post("/api/user/register", formData);

      if (res.data.token) {
        setIsLoading(false)
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        toast.success("Signup successful!");
        router.push("/home");
      } else {
        setIsLoading(false)
        toast.error("Please try again later");
      }
    } catch (error) {
      setIsLoading(false)
      console.log("error:  ", error);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token]);

  useEffect(()=>{
    if(pathname.includes("user")){
      if(pathname.split("/")[2] === currentUser?.owner?.username){
        router.push("/profile");
      }
    }
  }, [pathname]);

  const value = {
    handleLogin,
    handleRegister,
    handleLogout,
    token,
    currentUser,
    isLoading,
    setIsLoading
  };

  return (
    <AuthContext.Provider value={{ ...value }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
