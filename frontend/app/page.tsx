"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "@/components/organisms/LoginForm";
import { useRouter } from "next/navigation";
import { btnLandingMenus } from "@/constant/menus";

const ButtonMenu = ({
  onClick,
  name,
  isRegis,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  name: string;
  isRegis: boolean;
}) => {
  return (
    <button
      className={`capitalize ${
        isRegis ? "bg-transparent" : "bg-cyan-600"
      } border-2 border-cyan-600 px-5 py-2 rounded-lg font-semibold hover:bg-cyan-800`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export default function Home() {
  const router = useRouter();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold">Choose one below:</h1>
      <div className="flex gap-4 m-5">
        {btnLandingMenus.map((val, index) => (
          <ButtonMenu
            key={val.id}
            onClick={() => router.push(val.route_path)}
            name={val.name}
            isRegis={index === 1}
          />
        ))}
      </div>
    </div>
  );
}
