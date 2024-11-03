"use client";
import React, { useState } from "react";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    alert("Password changed successfully!");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">Change Password</h1>
      <div className="mt-4">
        <label className="block text-gray-700">Current Password</label>
        <input
          type="password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">New Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 border rounded-lg mt-1"
        />
      </div>
      <button
        onClick={handleChangePassword}
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
