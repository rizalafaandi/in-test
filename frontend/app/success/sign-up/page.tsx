import React from "react";
import Link from "next/link";

const RegistrationSuccess: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-green-500">
          Registration Successful!
        </h1>
        <p className="mt-4 text-gray-700">
          Thank you for registering! Please check your email inbox for a
          confirmation link to activate your account.
        </p>

        {/* <div className="mt-8">
          <img
            src="/images/email-confirmation.png" // Tambahkan gambar jika ada
            alt="Check your email"
            className="mx-auto w-32 h-32"
          />
        </div> */}

        <p className="mt-4 text-gray-500">
          Didn’t receive the email? Please check your spam folder or{" "}
          <a href="/resend-activation" className="text-blue-500 underline">
            click here
          </a>{" "}
          to resend.
        </p>

        <Link href="/">
          <div className="mt-6 inline-block bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600">
            Go to Home
          </div>
        </Link>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
