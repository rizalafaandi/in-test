"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = Cookies.get("AUTH_TOKEN");
  const router = useRouter();
  useEffect(() => {
    if (token) {
      router.replace("/dashboard");
    }
  }, [token, router]);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      {children}
    </div>
  );
};

export default AuthLayout;
