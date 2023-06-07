"use client";

import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { FiLogOut } from "react-icons/fi";

interface SignOutButtonProps {
  children?: React.ReactNode;
  dropdown?: boolean;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  children,
  dropdown,
}) => {
  const logOut = () => {
    signOut({ callbackUrl: "/" });
    toast.success("Successfully signed out");
  };

  return (
    <button
      onClick={logOut}
      className={
        dropdown
          ? "gap-2 flex items-center px-4 py-2 hover:bg-sky-200 relative m-1 rounded-md"
          : "flex gap-2 justify-center items-center"
      }
    >
      <FiLogOut size={20} className={dropdown ? "text-sky-500" : ""} />
      {children}
    </button>
  );
};

export default SignOutButton;
