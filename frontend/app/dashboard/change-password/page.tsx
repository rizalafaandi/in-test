"use client";
import { passwordValdation } from "@/utils/passwordValdation";
import satellite from "@/utils/satellite";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const FieldPassword = ({
  label,
  value,
  handleChange,
}: {
  label: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}) => {
  return (
    <div className="mt-4">
      <label className="block text-gray-700">{label}</label>
      <input
        type="password"
        value={value}
        onChange={handleChange}
        className="w-full p-2 border rounded-lg mt-1"
      />
    </div>
  );
};

const ChangePassword: React.FC = () => {
  const router = useRouter();
  const [oldPassword, setOldPassword] = useState({ value: "", error: "" });
  const [newPassword, setNewPassword] = useState({ value: "", error: "" });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    error: "",
  });

  const handleChangePassword = async (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "oldPass" | "newPass" | "retypePass"
  ) => {
    const value = e.target.value;
    const error = passwordValdation(value) || "";
    if (type === "oldPass") {
      setOldPassword({ error, value });
    } else if (type === "newPass") {
      setNewPassword({ error, value });
    } else {
      setConfirmPassword({ error, value });
    }
  };

  const handleSubmitPassword = async () => {
    try {
      const { status } = await satellite().patch(
        "/api/v1/auth/change-password",
        {
          oldPassword: oldPassword.value,
          newPassword: newPassword.value,
        }
      );
      if (status === 200) {
        router.replace("/dashboard");
      }
    } catch (error) {
      return error;
    }
  };

  const shouldDisabled =
    newPassword.value !== confirmPassword.value ||
    !oldPassword.value.length ||
    !newPassword.value.length ||
    !confirmPassword.value.length ||
    oldPassword.error.length ||
    newPassword.error.length ||
    confirmPassword.error.length;

  return (
    <div>
      <h1 className="text-3xl font-bold">Change Password</h1>
      <FieldPassword
        label="Old Password"
        value={oldPassword.value || ""}
        handleChange={(e) => handleChangePassword(e, "oldPass")}
      />
      {oldPassword.error && (
        <p className="text-red-500 text-sm mt-1">{oldPassword.error}</p>
      )}
      <FieldPassword
        label="New Password"
        value={newPassword.value || ""}
        handleChange={(e) => handleChangePassword(e, "newPass")}
      />
      {newPassword.error && (
        <p className="text-red-500 text-sm mt-1">{newPassword.error}</p>
      )}
      <FieldPassword
        label="Re-Enter Password"
        value={confirmPassword.value || ""}
        handleChange={(e) => handleChangePassword(e, "retypePass")}
      />
      {confirmPassword.error && (
        <p className="text-red-500 text-sm mt-1">{confirmPassword.error}</p>
      )}
      {!confirmPassword.error &&
        !newPassword.error &&
        confirmPassword.value !== newPassword.value && (
          <p className="text-red-500 text-sm mt-1">
            re-enter password not contain with new password
          </p>
        )}
      <button
        onClick={handleSubmitPassword}
        className={`mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg ${
          shouldDisabled ? "opacity-40" : ""
        }`}
        disabled={typeof shouldDisabled === "boolean" ? shouldDisabled : false}
      >
        Change Password
      </button>
    </div>
  );
};

export default ChangePassword;
