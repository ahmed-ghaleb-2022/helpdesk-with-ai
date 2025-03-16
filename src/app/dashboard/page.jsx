"use client";
import { useEffect, useState } from "react";

import { getUserRole } from "../db/dbActions";
import { useUserContext } from "../context/UserContext";
import DashboardLayout from "./DashboardLayout";

const Dashboard = () => {
  const [userRole, setUserRole] = useState(null);

  const { currentUser } = useUserContext();

  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(currentUser.email);
      setUserRole(role);
    };

    if (currentUser) {
      fetchUserRole();
    }
  }, [currentUser]);
  return (
    <DashboardLayout>
      <div className="p-4 flex flex-col justify-center items-center h-[calc(100vh-74px)]">
        {userRole === "admin" ? (
          <div>
            <h1 className="text-3xl text-center text-white">Admin Dashboard</h1>
            <p className="text-center text-2xl text-gray-200 ">You can manage  staff, and problems here.</p>
          </div>
        ) : userRole === "staff" ? (
          <div>
            <h1 className="text-3xl text-center text-white">Staff Dashboard</h1>
            <p className="text-center text-2xl text-gray-200">This is the staff dashboard.</p>
          </div>
        ) : null}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
