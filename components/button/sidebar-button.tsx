import { Button } from "../ui/button";
import {
  FaHouse,
  FaDiagramProject,
  FaUserPlus,
  FaBars,
  FaUser,
} from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Link from "next/link";
import LogoutButton from "./logout-button";

const menuItems = [
  { label: "Home", icon: FaHouse, url: "/home" },
  { label: "Task", icon: FaDiagramProject, url: "/task" },
  { label: "Invitations", icon: FaUserPlus, url: "/invitations" },
  { label: "Profile", icon: FaUser, url: "/profile" },
];

const SidebarButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <FaBars size={5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 ml-4 translate-y-1">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <Link href={item.url} key={item.label}>
              <DropdownMenuItem key={item.label} className="cursor-pointer ">
                <item.icon size={5} />
                {item.label}
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <LogoutButton />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarButton;
