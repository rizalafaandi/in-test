"use client";
import AuthForm from "@/components/organisms/AuthForm";
import useAuthSubmit, { AuthData } from "@/hooks/useAuthSubmit";
import { firebaseOauth } from "@/utils/firebaseOauth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignupPage = () => {
  const router = useRouter();
  const { submit, success, loginData } = useAuthSubmit("/api/v1/auth/register");

  const { loginWithGoogle } = firebaseOauth(submit);

  const handleSubmit = async (val: AuthData) => {
    await submit({ ...val, sign_method: "basic" });
  };

  useEffect(() => {
    if (success) {
      if (loginData?.result.is_active) {
        router.replace("/dashboard");
      } else {
        router.replace("/success/sign-up");
      }
    }
  }, [success, router, loginData]);
  return (
    <AuthForm
      isRegister
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
            <button className="flex flex-row-reverse gap-1">
              <label htmlFor="google-sign" className="text-black">
                Facebook
              </label>
              <FaFacebook color="#1877F2" size={24} />
            </button>
          </div>
        </div>
      }
    />
  );
};

export default SignupPage;
