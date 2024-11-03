"use client";
import React from "react";
import { withAuth } from "@/hoc/withAuth";

const Dashboard: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="mt-4">Welcome to your dashboard!</p>
    </div>
  );
};

export default withAuth(Dashboard);
