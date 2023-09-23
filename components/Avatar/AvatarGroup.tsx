"use client";

import Image from "next/image";
import { User } from "@prisma/client";

interface AvatarGroupProps {
  users: User[];
}

const AvatarGroup = ({ users }: AvatarGroupProps) => {
  const slicedUsers = users?.slice(0, 3);

  const positionMap = {
    0: "top-0 left-[12px]",
    1: "bottom-0",
    2: "bottom-0 right-0",
  };

  return (
    <div className="relative h-11 w-11">
      {slicedUsers.map((user, i) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] ${
            positionMap[i as keyof typeof positionMap]
          }`}
        >
          <Image
            src={user?.image || "/images/avatar-placeholder.jpg"}
            fill
            alt="avatar"
          />
        </div>
      ))}
    </div>
  );
};

export default AvatarGroup;
