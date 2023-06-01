import { User } from "@prisma/client";

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
      <h1 className="font-bold text-lg">Seiko Identifier</h1>
      <p>Welcome, {currentUser?.name}</p>
    </nav>
  );
}

export default Navbar;