import { User } from "@prisma/client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiBookOpen, FiLogIn, FiMenu, FiWatch } from "react-icons/fi";
import NavButton from "./SignOutButton";

interface DropDownProps {
  currentUser?: User | null;
}

const DropDown: React.FC<DropDownProps> = ({ currentUser }: DropDownProps) => {
  const path = usePathname();

  return (
    <div className="dropdown dropdown-end inline-block static sm:hidden">
      <label tabIndex={0} className="cursor-pointer">
        <FiMenu size={24} aria-label="Dropdown menu" focusable="false" />
      </label>
      <ul
        className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4 z-[1]"
        tabIndex={0}
      >
        <li>
          <Link
            href="/identify"
            className={clsx(
              "gap-2 flex items-center pt-2 px-4 pb-2 hover:bg-sky-100 relative m-1 rounded-md",
              path === "/identify" ? "bg-sky-100" : "hover:bg-sky-200"
            )}
          >
            <FiWatch size={20} className="text-sky-500" />
            Identify watch
          </Link>
        </li>
        <li>
          <Link
            href="/collection"
            className={clsx(
              "gap-2 flex items-center px-4 py-2 hover:bg-sky-100 relative m-1 rounded-md",
              path === "/collection" ? "bg-sky-100" : "hover:bg-sky-200"
            )}
          >
            <FiBookOpen size={20} className="text-sky-500" />
            Collection
          </Link>
        </li>
        <li>
          {currentUser ? (
            <NavButton dropdown>Sign out</NavButton>
          ) : (
            <Link
              href="/"
              className="gap-2 flex items-center px-4 pb-2 pt-2 hover:bg-sky-200 relative m-1 rounded-md"
            >
              <FiLogIn size={20} className="text-sky-500" />
              Sign in
            </Link>
          )}
        </li>
      </ul>
    </div>
  );
};
export default DropDown;
