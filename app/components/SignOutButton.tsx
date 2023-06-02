"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi"

const SignOutButton: React.FC = () => {
  const logOut = () => {
    signOut({ callbackUrl: '/' });
    toast.success("Successfully signed out");
  }

  return (
    <button onClick={logOut}>
      <FiLogOut size={20} />
    </button>
  );
}

export default SignOutButton;