import { Menu, Transition } from "@headlessui/react";
import { User } from "@prisma/client";
import Link from "next/link";
import { FiMenu, FiWatch, FiBookOpen, FiLogIn } from "react-icons/fi";
import NavButton from "./SignOutButton";
import { usePathname } from "next/navigation";
import clsx from "clsx";

interface DropDownProps {
  currentUser?: User | null;
}

const DropDown: React.FC<DropDownProps> = ({ currentUser }) => {
  const path = usePathname();

  return (
    <Menu>
      {({ open }) => (
        <>
          <Menu.Button className="block sm:hidden">
            <FiMenu size={24} aria-label="Dropdown menu" />
          </Menu.Button>
          <Transition
            show={open}
            className="bg-white absolute top-10 right-10 shadow-xl rounded-md border-[1px]"
            enter="transition duration-100 ease-out"
            enterFrom="transform -translate-y-5 scale-95 opacity-0"
            enterTo="transform translate-y-0 scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform translate-y-0 scale-100 opacity-100"
            leaveTo="transform -translate-y-5 scale-95 opacity-0"
          >
            <Menu.Items className="flex flex-col" static>
              <Menu.Item>
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
              </Menu.Item>
              <Menu.Item>
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
              </Menu.Item>
              <Menu.Item>
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
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
export default DropDown;
