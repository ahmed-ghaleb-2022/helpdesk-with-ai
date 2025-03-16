"use client";

import { useUserContext } from "@/app/context/UserContext";
import { getUserRole } from "@/app/db/dbActions";
import { userSignOut } from "@/app/utils/firebase/firebase.utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsRobot } from "react-icons/bs";

const Narbar = () => {
  const { currentUser } = useUserContext();
  const [userRole, setUserRole] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSignOut = async () => {
    await userSignOut();
    setIsOpen(false);
    window.location.href = "/";
  }
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
    <nav className="flex justify-between items-center border-b border-gray-300 shadow-md p-4 bg-linear-to-t from-sky-200 to-sky-100">
      <div>
        <Link href="/" className="text-2xl font-bold flex items-center gap-2 font-sans">
          <BsRobot className="text-2xl" />
          Helpdesk
        </Link>
      </div>
      <div>
        <Link href="/our-services" className="text-2xl font-semibold text-gray-600">
          Our Services
        </Link>
      </div>
      <div>
        {currentUser ? (
          <div className="relative cursor-pointer flex items-center justify-between gap-4">
            {userRole !== "user" ? (
              <Link href="/dashboard" className=" bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded">Dashboard</Link>
            ) : null}
            <img
              onClick={toggleDropdown}
              src={currentUser.photoURL}
              className="w-9 h-9 rounded-full"
              alt=""
            />
            {isOpen && (
              <div className="absolute top-10 right-2 bg-white p-4 rounded-md shadow-md">
                <p>{currentUser.displayName}</p>
                <p>{currentUser.email}</p>
                <hr className="my-2 text-gray-300 " />
                <button
                  onClick={handleSignOut}
                  className="cursor-pointer"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link href="/sign-in">Sign In</Link>
        )}
      </div>
    </nav>
  );
};

export default Narbar;
