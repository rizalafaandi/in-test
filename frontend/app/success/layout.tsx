"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SuccessLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const currentUser = Cookies.get("current_user");
  const token = Cookies.get("AUTH_TOKEN");
  const router = useRouter();
  useEffect(() => {
    if (typeof currentUser === "string" && JSON.parse(currentUser)?.is_active) {
      router.replace("/dashboard");
    }
    if (!token) {
      router.replace("/auth/sign-in");
    }
  }, [currentUser, router, token]);
  return <div>{children}</div>;
};

export default SuccessLayout;
