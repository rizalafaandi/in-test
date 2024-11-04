import { useState } from "react";
import Cookies from "js-cookie";
import { AxiosError } from "axios";
import satellite from "@/utils/satellite";

export interface AuthData {
  email: string;
  password?: string;
  displayName?: string;
  sign_method?: "google" | "facebook" | "basic";
}

export interface IRespAuth {
  status: string;
  statusCode: number;
  message: string;
  result: {
    accessToken: string;
    is_active: boolean;
  };
}

interface UseAuthReturn {
  submit: (data: AuthData) => Promise<void>;
  loading: boolean;
  error: string | null | { message: string };
  success: boolean;
  loginData: IRespAuth | null;
}

const useAuthSubmit = (url: string): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loginData, setLoginData] = useState<IRespAuth | null>(null);

  const submit = async (data: AuthData): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await satellite().post(
        data?.sign_method !== "basic" ? "/api/v1/auth/oauth" : url,
        data
      );

      // Simpan token ke cookie jika login berhasil
      if (response.data?.result?.accessToken || response.data.success) {
        setLoginData(response.data);
        Cookies.set("AUTH_TOKEN", response.data.result?.accessToken, {
          expires: 7,
        }); // Cookie berlaku selama 7 hari
        setSuccess(true);
      }
    } catch (err) {
      const error = err as AxiosError;
      setError(
        error.response ? (error.response.data as string) : error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    submit,
    loading,
    error,
    success,
    loginData,
  };
};

export default useAuthSubmit;
