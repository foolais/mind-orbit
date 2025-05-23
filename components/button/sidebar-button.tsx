import React from "react";
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

const menuItems = [
  { label: "Home", icon: FaHouse, link: "/" },
  { label: "Task", icon: FaDiagramProject, link: "/task" },
  { label: "Invitations", icon: FaUserPlus, link: "/invitations" },
  { label: "Profile", icon: FaUser, link: "/profile" },
];

const SidebarButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="cursor-pointer" variant="outline">
          <FaBars size={5} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 ml-4 mt-1">
        <DropdownMenuLabel>Menu</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {menuItems.map((item) => (
            <DropdownMenuItem key={item.label} className="cursor-pointer">
              <item.icon size={5} />
              {item.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarButton;
