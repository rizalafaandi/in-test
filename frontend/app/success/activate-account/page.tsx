import React from "react";

const ActivateAccount: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center text-blue-500">
          Activate Your Account
        </h2>
        <p className="mt-4 text-center text-gray-700">
          Your account is not yet activated. Please check your email for the
          activation link.
        </p>
        <p className="mt-2 text-center text-gray-700">
          If you did not receive the email, you can request a new one.
        </p>
        {/* Tombol untuk mengirim ulang email aktivasi jika diperlukan */}
        <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg">
          Resend Activation Email
        </button>
      </div>
    </div>
  );
};

export default ActivateAccount;
