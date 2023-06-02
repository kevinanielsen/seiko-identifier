import { User } from "@prisma/client";

import NavButton from "./SignOutButton";
import Link from "next/link";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";

interface NavbarProps {
  currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <nav className="
      flex 
      justify-between
      items-center
      shadow-md
      p-4
    ">
      <div className="flex justify-center items-center gap-3">
        <Image alt="Logo" width={128} height={128} src="/si-logo.png" className="w-8" />
        <h1 className="font-bold text-lg">Seiko Identifier</h1>
      </div>
      
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