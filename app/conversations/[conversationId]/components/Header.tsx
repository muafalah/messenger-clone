"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Conversation, User } from "@prisma/client";
import { HiEllipsisHorizontal } from "react-icons/hi2";
import { HiChevronLeft } from "react-icons/hi";

import useOtherUser from "@/hooks/useOtherUser";
import Avatar from "@/components/Avatar/Avatar";

interface HeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const Header = ({ conversation }: HeaderProps) => {
  const otherUser = useOtherUser(conversation);

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.userIds.length} members`;
    }
    return "Active";
  }, [conversation]);

  return (
    <div className="bg-white w-full flex border-b-[1px] sm:px-4 py-3 px-4 lg:px-6 justify-between items-center shadow-sm">
      <div className="flex gap-3 items-center">
        <Link
          href="/conversations"
          className="lg:hidden block text-neutral-500 hover:text-neutral-600 transition cursor-pointer"
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className="flex flex-col">
          <div>{conversation.name || otherUser.name}</div>
          <div className="text-sm font-light text-neutral-500">
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => {}}
        className="text-neutral-500 cursor-pointer hover:text-neutral-600 transition"
      />
    </div>
  );
};

export default Header;
