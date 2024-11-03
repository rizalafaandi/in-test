"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

type WithAuthProps = {
  children: ReactNode;
};

export function withAuth(WrappedComponent: React.ComponentType) {
  const ProtectedComponent: React.FC<WithAuthProps> = (props) => {
    const router = useRouter();

    useEffect(() => {
      const isAuthenticated = !!Cookies.get("AUTH_TOKEN"); // save token on cookies
      console.log({ isAuthenticated });

      if (!isAuthenticated) {
        router.replace("/auth/sign-in"); // direct to sigin if not have access token
      }
    }, [router]);

    // @ts-ignore
    return <WrappedComponent {...props} />;
  };

  return ProtectedComponent;
}
