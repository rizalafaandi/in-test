"use client";
import React, { useEffect } from "react";
import AuthForm from "@/components/organisms/AuthForm";
import useAuthSubmit, { AuthData } from "@/hooks/useAuthSubmit";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
// import { FaFacebook } from "react-icons/fa";
import { firebaseOauth } from "@/utils/firebaseOauth";

const SignIn = () => {
  const router = useRouter();
  const { submit, error, success } = useAuthSubmit("/api/v1/auth/login");

  const { loginWithGoogle } = firebaseOauth(submit);

  const handleSubmit = async (val: AuthData) => {
    await submit(val);
  };

  useEffect(() => {
    if (success) {
      router.replace("/dashboard");
    }
    if (typeof error === "object" && error?.message?.includes("not active")) {
      router.replace("/success/activate-account");
    }
  }, [success, router, error, submit]);
  return (
    <AuthForm
      isRegister={false}
      onSubmit={handleSubmit}
      childern={
        <div className="flex items-center flex-col gap-3 my-5">
          <span className="text-gray-400">Or sign with</span>
          <div className="flex gap-5">
            <button
              className="flex flex-row-reverse gap-1"
              onClick={loginWithGoogle}
            >
              <label htmlFor="google-sign" className="text-black">
                Google
              </label>
              <FcGoogle size={24} id="google-sign" />
            </button>
            {/* <button className="flex flex-row-reverse gap-1">
              <label htmlFor="google-sign" className="text-black">
                Facebook
              </label>
              <FaFacebook color="#1877F2" size={24} />
            </button> */}
          </div>
        </div>
      }
    />
  );
};

export default SignIn;
