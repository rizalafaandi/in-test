"use client";
import React, { useEffect, useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import AuthForm from "@/components/organisms/AuthForm";
import useAuthSubmit, { AuthData } from "@/hooks/useAuthSubmit";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const firebaseConfig = {
  apiKey: "AIzaSyBkLG3OFB4ICVM-dO2m5qcILHtV3ct3Bpk",
  authDomain: "oauth--sign.firebaseapp.com",
  projectId: "oauth--sign",
  storageBucket: "oauth--sign.firebasestorage.app",
  messagingSenderId: "960087290675",
  appId: "1:960087290675:web:8b2471e66beca7e87cc446",
  measurementId: "G-NYYSJZSCTS",
};
// Initialize firebase and google providerfirebase.initializeApp(firebaseConfig);
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });

// Sign in and sign out functins
const signIn = () => auth.signInWithPopup(provider);

const SignIn = () => {
  const router = useRouter();
  const { submit, loading, error, success } =
    useAuthSubmit("/api/v1/auth/login");

  const [user, setUser] = useState<firebase.User | null>(null);
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      setUser(user);
    });
  }, []);

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
    if (user) {
    }
  }, [success, router, error]);
  return (
    <AuthForm
      isRegister={false}
      onSubmit={handleSubmit}
      childern={
        <div className="flex items-center flex-col gap-3 my-5">
          <span className="text-gray-400">Or sign with</span>
          <div className="flex gap-5">
            <button className="flex flex-row-reverse gap-1" onClick={signIn}>
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

export default SignIn;
