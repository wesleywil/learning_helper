"use client";

import { signIn } from "next-auth/react";

const SignInButton = () => {
  return (
    <button
      onClick={() => signIn("github")}
      className="mt-4 px-2 py-1 text-xl font-bold bg-[#f6603b] hover:bg-[#f6603b]/40 rounded transform duration-700 ease-in-out"
    >
      SignIn or Sign Up
    </button>
  );
};

export default SignInButton;
