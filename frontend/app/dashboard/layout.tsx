import React from "react";
import Link from "next/link";

const DashboardLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-xl font-bold">Dashboard</h2>
        </div>
        <nav className="mt-4">
          <ul>
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
              <Link href="/api/logout">
                <div className="block px-4 py-2 hover:bg-gray-200">Logout</div>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
};

export default DashboardLayout;
