"use client";
import React, { ReactNode, useState } from "react";
import Input from "@/components/moleculs/InputLabels";
import { passwordValdation } from "@/utils/passwordValdation";

interface ISubmit {
  email: string;
  password: string;
  confirmPassword?: string;
}

const AuthForm = ({
  isRegister = false,
  onSubmit,
  childern,
}: {
  onSubmit: (props: ISubmit) => void;
  isRegister: boolean;
  childern?: ReactNode;
}) => {
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Jika pengguna sedang mengetikkan password, kita validasi langsung
    if (name === "password") {
      const error = passwordValdation(value);
      setPasswordError(error);
    }
  };

  const validate = () => {
    const validationErrors = { email: "", password: "", confirmPassword: "" };

    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      validationErrors.email = "Email is not valid";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    if (isRegister && formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }

    return validationErrors;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    if (!validationErrors.email.length && !validationErrors.password.length) {
      const passwordValidationError = passwordValdation(formData.password);
      if (passwordValidationError) {
        setPasswordError(passwordValidationError);
        return;
      }
      onSubmit(formData);
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="w-[55%] p-6 bg-white shadow-lg rounded-lg">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          {isRegister ? "Register" : "Login"}
        </h2>

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">{passwordError}</p>
        )}

        {isRegister && (
          <>
            <Input
              label="Confirm Password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={errors.confirmPassword}
            />
          </>
        )}

        <button
          type="submit"
          className="w-full py-2 mt-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      {childern}
    </div>
  );
};

export default AuthForm;
