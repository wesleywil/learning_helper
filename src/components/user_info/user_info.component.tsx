"use client";

import { useSession, signOut, signIn } from "next-auth/react";
import { FaSyncAlt } from "react-icons/fa";

const UserInfo = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="my-8 text-[#f6603b] text-6xl animate-spin">
        <FaSyncAlt />
      </div>
    );
  } else if (status === "authenticated") {
    return (
      <div className="mb-4 px-2 flex flex-col justify-center items-center text-[#edf0ef]">
        <img
          src={session.user.image}
          alt="profile"
          className="h-24 w-24 rounded-full"
        />
        <h1 className="text-xl font-bold ">{session.user.name}</h1>
        <h2 className="text-sm">{session.user.email}</h2>
        <button
          onClick={() => signOut()}
          className="mt-4 px-2 py-1 font-bold bg-[#f6603b] hover:bg-[#f6603b]/60 rounded transform duration-500 ease-in-out"
        >
          SignOut
        </button>
      </div>
    );
  }
  return (
    <button
      onClick={() => signIn("google")}
      className="mt-4 px-2 py-1 font-bold bg-[#f6603b] hover:bg-[#f6603b]/60 rounded transform duration-500 ease-in-out"
    >
      Sign In
    </button>
  );
};

export default UserInfo;
