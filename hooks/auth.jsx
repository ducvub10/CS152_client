"use client";

import fetch from "@/utils/fetchClient";
import { useRouter, usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuthProvider = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    isUserAuthenticated();
  }, []);

  const isUserAuthenticated = async () => {
    const res = await fetch("/auth/google/success", router, pathname, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    setLoading(false);
    if (res?.success) {
      if (!user) {
        setUser(res.user);
      }
      return true;
    }
    if (user) {
      setUser(null);
    }
    return false;
  };

  const authenticate = async () => {
    const url =
      process.env.NEXT_PUBLIC_MODE === "DEV"
        ? process.env.NEXT_PUBLIC_DEV_SERVER_URL
        : process.env.NEXT_PUBLIC_PROD_SERVER_URL;
    window.open(`${url}/auth/google`, "_self");
  };

  const logout = async () => {
    const res = await fetch("/auth/logout", router, pathname, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
      },
    });
    if (res.success) {
      setUser(null);
    }
    router.replace("/login");
  };

  const rerouteIfNotAuthenticated = async () => {
    const isAuthenticated = await isUserAuthenticated();

    if (!isAuthenticated) {
      router.replace("/login");
    }
  };

  const rerouteIfAuthenticated = async () => {
    const isAuthenticated = await isUserAuthenticated();
    if (isAuthenticated) {
      router.replace("/");
    }
  };

  return {
    user,
    loading,
    authenticate,
    logout,
    rerouteIfNotAuthenticated,
    rerouteIfAuthenticated,
  };
};

export const useAuth = () => useContext(AuthContext);
