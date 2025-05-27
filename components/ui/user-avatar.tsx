import { auth } from "@/auth";
import React from "react";
import { Avatar, AvatarFallback } from "./avatar";
import Image from "next/image";

const UserAvatar = async () => {
  const session = await auth();

  return (
    <div
      className="flex items-center justify-center cursor-pointer gap-2"
      role="button"
    >
      <Avatar>
        <Image
          src={session?.user.image || ""}
          alt="Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />

        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <div className="hidden flex-col sm:flex">
        <p className="text-sm font-semibold text-gray-900 capitalize">
          {session?.user?.name}
        </p>
      </div>
    </div>
  );
};

export default UserAvatar;
