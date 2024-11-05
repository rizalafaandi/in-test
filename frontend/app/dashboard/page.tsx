"use client";
import React, { useEffect, useState } from "react";
import { withAuth } from "@/hoc/withAuth";
import satellite from "@/utils/satellite";
import UserLoginTable from "@/components/organisms/HomeTabel";

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState([]);
  const [activeSignupNum, setActiveSignupNum] = useState({
    activeLast7DaysCount: 0,
    activeTodayCount: 0,
    countUser: 0,
  });
  useEffect(() => {
    (async () => {
      try {
        const { data } = await satellite().get("/api/v1/user/all");
        const { data: dataCount } = await satellite().get(
          "/api/v1/user/num-active-signup"
        );
        setActiveSignupNum(dataCount?.result);

        setUsers(data?.result);
      } catch (error) {
        setUsers([]);
        return error;
      }
    })();
  }, []);
  return (
    <div>
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="flex flex-col gap-3 my-5">
        <span>{`User Sign Up : ${activeSignupNum.countUser}`}</span>
        <span>{`User Active Today : ${activeSignupNum.activeTodayCount}`}</span>
        <span>{`User Active Last 7 Days : ${activeSignupNum.activeLast7DaysCount}`}</span>
      </div>
      <UserLoginTable users={users} />
    </div>
  );
};

export default withAuth(Dashboard);
