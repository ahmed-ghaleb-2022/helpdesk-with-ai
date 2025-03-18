"use client";

import Link from "next/link";
import { createUser } from "@/app/db/dbActions";
import { signInWithGooglePopup } from "@/app/utils/firebase/firebase.utils";
import { FcGoogle } from "react-icons/fc";

export default function SignIn() {
  const signInWithGoogle = async () => {
    try {
      const { user } = await signInWithGooglePopup();
      console.log(user.displayName);
      if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
        const response = await createUser(
          user.displayName,
          user.email,
          "admin"
        );
      } else {
        const response = await createUser(
          user.displayName,
          user.email,
          "staff"
        );
      }

      //console.log(response);
      window.location.href = "/our-services";
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-36 pt-40 h-screen">
      <h2 className="text-3xl text-center text-white">Staff Login page</h2>
      <div className="flex flex-col items-center justify-center">

      <button
        onClick={signInWithGoogle}
        className=" flex items-center justify-between gap-3 shadow-md border border-gray-100  hover:bg-blue-200 text-black font-bold py-2 px-4 rounded cursor-pointer transition-all ease-in-out duration-300 bg-white"
      >
       <FcGoogle className="text-2xl" /> Sign in with Google
      </button>

      <Link
        href="/sign-in"
        className="mt-6 text-white hover:underline "
      >
        I'm a customer 
      </Link>
      </div>
      <div></div>
    </div>
  );
}
