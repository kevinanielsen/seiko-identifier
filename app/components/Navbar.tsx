"use client";

import { User } from "@prisma/client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiLogIn } from "react-icons/fi";
import NavButton from "./SignOutButton";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  const path = usePathname();

  return (
    <nav className="
      flex 
      justify-between
      items-center
      shadow-md
      p-4
    ">
      <Link href="/home" className="flex justify-center items-center gap-3">
        <Image alt="Logo" width={128} height={128} src="/si-logo.png" className="w-8" />
        <h1 className="font-bold text-lg">Seiko Identifier</h1>
      </Link>

      <ul className="flex items-center justify-center">
        <li><Link href="/identify" className={path === "/identify" ? "border-b-2 border-sky-500" : ""}>Identify watch</Link></li>
      </ul>
      
      <div className="flex items-center justify-center gap-3">
        <p>Welcome{currentUser && `, ${currentUser.name}`}</p>
        {currentUser && <NavButton />}
        {!currentUser && <Link href="/">
          <FiLogIn size={24} />
        </Link>}
      </div>
    </nav>
  );
}

export default Navbar;