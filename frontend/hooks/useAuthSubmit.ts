import { useState } from "react";
import Cookies from "js-cookie";
import axios, { AxiosError } from "axios";
import satellite from "@/utils/satellite";
import { useRouter } from "next/navigation";

export interface AuthData {
  email: string;
  password: string;
}

interface UseAuthReturn {
  submit: (data: AuthData) => Promise<void>;
  loading: boolean;
  error: string | null | { message: string };
  success: boolean;
}

const useAuthSubmit = (url: string): UseAuthReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const submit = async (data: AuthData): Promise<void> => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await satellite().post(url, data);

      // Simpan token ke cookie jika login berhasil
      if (response.data.accessToken || response.data.success) {
        Cookies.set("AUTH_TOKEN", response.data.accessToken, { expires: 7 }); // Cookie berlaku selama 7 hari
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
  };
};

export default useAuthSubmit;
