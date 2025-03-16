"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { getUserRole } from "../db/dbActions";
import { TfiDashboard } from "react-icons/tfi";
import { FiUsers } from "react-icons/fi";
import { BiErrorAlt } from "react-icons/bi";

const DashboardLayout = ({ children }) => {
  const [userRole, setUserRole] = useState(null);

  const { currentUser } = useUserContext();
  useEffect(() => {
    const fetchUserRole = async () => {
      const role = await getUserRole(currentUser.email);
      setUserRole(role);
      console.log(role);
    };
    if (currentUser) {
      fetchUserRole();
    }
  }, [currentUser]);

  return (
    <>
      {userRole === "admin" ? (
        <div className="flex h-[calc(100vh-74px)]">
          <div className="w-1/6 bg-gray-200 ">
            <ul>
              <li className=" p-4 text-lg border-b border-gray-500 hover:bg-gray-300">
                <Link href="/dashboard" className="flex gap-2 items-center"><TfiDashboard className="text-2xl" /> Dashboard</Link>
              </li>
              <li className=" p-4 text-lg border-b border-gray-500 hover:bg-gray-300">
                <Link href="/dashboard/staff" className="flex gap-2 items-center"> <FiUsers className="text-2xl" /> Staff</Link>
              </li>
              <li className=" p-4 text-lg border-b border-gray-500 hover:bg-gray-300">
                <Link href="/dashboard/problems" className="flex gap-2 items-center"> <BiErrorAlt className="text-2xl" /> Problems</Link>
              </li>
            </ul>
          </div>
          <div className="w-full grow p-2">{children}</div>
        </div>
      ) : userRole === "staff" ? (
        <div className="flex h-[calc(100vh-74px)]">
          <div className="w-1/6 bg-gray-200 ">
            <ul>
              <li className=" p-4 text-lg border-b border-gray-500 hover:bg-gray-300">
                <Link href="/dashboard" className="flex gap-2 items-center"> <TfiDashboard className="text-2xl" /> Dashboard</Link>
              </li>
              <li className=" p-4 text-lg border-b border-gray-500 hover:bg-gray-300">
                <Link href="/dashboard/problems" className="flex gap-2 items-center"> <BiErrorAlt className="text-2xl" /> Problems</Link>
              </li>
            </ul>
          </div>
          <div className="w-full grow p-2">{children}</div>
        </div>
      ) : null}
    </>
  );
};

export default DashboardLayout;
