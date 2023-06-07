"use client";

import { User } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NavButton from "./SignOutButton";
import { FiLogIn } from "react-icons/fi";
import DropDown from "./DropDown";



interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const path = usePathname();

  return (
    <nav
      className="
      flex 
      justify-between
      items-center
      shadow-md
      p-4
      text-lg
    "
    >
      <Link
        href="/home"
        className="flex justify-center items-center gap-3 shrink-0"
      >
        <Image
          alt="Logo"
          width={128}
          height={128}
          src="/si-logo.png"
          className="w-8"
        />
        <h1 className="font-bold text-lg">Seiko Identifier</h1>
      </Link>
      <ul className="items-center justify-center gap-6 w-3/4 mx-4 hidden sm:flex">
        <li className="shrink-0">
          <Link
            href="/identify"
            className={path === "/identify" ? "border-b-2 border-sky-500" : ""}
          >
            Identify watch
          </Link>
        </li>
        <li>
          <Link
            href="/collection"
            className={
              path === "/collection" ? "border-b-2 border-sky-500" : ""
            }
          >
            Collection
          </Link>
        </li>
      </ul>

      <div className="flex items-center justify-center gap-3 md:shrink-0">
        <DropDown currentUser={currentUser} />
        <p className="hidden sm:block text-base">
          Welcome{currentUser && `, ${currentUser.name}`}
        </p>
        {currentUser && <NavButton />}
        {!currentUser && (
          <Link href="/" aria-label="sign in">
            <span className="sr-only">Sign in</span>
            <FiLogIn size={24} />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
