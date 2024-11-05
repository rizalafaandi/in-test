"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";

export function withAuth(WrappedComponent: React.ComponentType) {
  const ProtectedComponent: React.FC = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = !!Cookies.get("AUTH_TOKEN"); // save token on cookies

      if (!isAuthenticated) {
        router.replace("/auth/sign-in"); // direct to sigin if not have access token
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
}
