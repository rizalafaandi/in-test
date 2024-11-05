"use client";

import React, { useEffect, useRef, useState } from "react";
import satellite from "@/utils/satellite";
import Cookies from "js-cookie";
import { useGlobalContext } from "@/app/context/GlobalContext";

const UserProfile: React.FC = () => {
  const { state, setState } = useGlobalContext();
  const [disabled, setDisabled] = useState(true);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const currentUser = Cookies.get("current_user");
  const token = Cookies.get("AUTH_TOKEN");

  const handleChangeNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      setState((prev) => {
        if (prev) {
          return { ...prev, nickname: e.target.value };
        }
      });
    }
  };

  const handleSubmit = async () => {
    setDisabled(!disabled);
    try {
      if (!disabled) {
        await satellite().patch("/api/v1/user/profile", {
          nickname: state?.nickname,
        });
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (!currentUser && token) {
      (async () => {
        try {
          const { data } = await satellite().get("/api/v1/user/profile");
          const user = {
            email: data?.result?.user?.email,
            is_active: data?.result?.user.is_active,
            nickname: data?.result?.user.nickname,
          };
          setState(user);
          Cookies.set("current_user", JSON.stringify(user));
        } catch (error) {
          return error;
        }
      })();
    } else {
      if (typeof currentUser === "string") setState(JSON.parse(currentUser));
    }
  }, [currentUser, setState, token]);
  return (
    <div>
      <h1 className="text-3xl font-bold">User Profile</h1>
      <div className="flex flex-col-reverse w-full gap-4 mt-10">
        <div className=" flex flex-col">
          <label>Your Email:</label>
          <input disabled value={state?.email || "-"} />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="nickname">Your Name:</label>
          <div className="flex gap-3">
            <input
              ref={nameInputRef}
              id="nickname"
              className="w-1/3 p-2 rounded-md"
              type="text"
              name="nickname"
              disabled={disabled}
              value={state?.nickname || "-"}
              onChange={handleChangeNickname}
            />
            <button
              className="bg-gray-400 px-3 text-sm rounded-md text-white"
              onClick={handleSubmit}
            >
              {disabled ? "Edit" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
