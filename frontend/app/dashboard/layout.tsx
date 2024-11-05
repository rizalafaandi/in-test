"use client";
import React from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import satellite from "@/utils/satellite";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await satellite().patch("/api/v1/auth/logout");
      Cookies.remove("AUTH_TOKEN");
      Cookies.remove("current_user");
      router.replace("/auth/sign-in");
    } catch (error) {
      return error;
    }
  };
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link href="/dashboard">
                <div className="block px-4 py-2 hover:bg-gray-200">Home</div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/user-profile">
                <div className="block px-4 py-2 hover:bg-gray-200">
                  User Profile
                </div>
              </Link>
            </li>
            <li>
              <Link href="/dashboard/change-password">
                <div className="block px-4 py-2 hover:bg-gray-200">
                  Change Password
                </div>
              </Link>
            </li>
            <li>
              <button
                className="w-full flex justify-start hover:bg-gray-200"
                onClick={handleLogout}
              >
                <div className="px-4 py-2">Logout</div>
              </button>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
