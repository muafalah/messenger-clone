"use client";

import clsx from "clsx";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { format } from "date-fns";

import { FullMessageType } from "@/types";
import Avatar from "@/components/Avatar/Avatar";
import ImageModal from "./ImageModal";

interface MessageBoxProps {
  isLast?: Boolean;
  data: FullMessageType;
}

const MessageBox = ({ isLast, data }: MessageBoxProps) => {
  const session = useSession();
  const [imageModalOpen, setImageModalOpen] = useState(false);

  const isOwn = session?.data?.user?.email === data?.sender?.email;
  const seenList = (data.seen || [])
    .filter((user) => user.email !== data?.sender?.email)
    .map((user) => user.name)
    .join(", ");

  const containerStyle = clsx("flex gap-3 p-4", isOwn && "justify-end");

  const avatarStyle = clsx(isOwn && "order-2");

  const bodyStyle = clsx("flex flex-col gap-2", isOwn && "items-end");

  const messageStyle = clsx(
    "text-sm w-fit overflow-hidden",
    isOwn ? "bg-sky-500 text-white" : "bg-gray-100",
    data.image ? "rounded-md p-0" : "rounded-full py-2 px-3"
  );

  return (
    <div className={containerStyle}>
      <div className={avatarStyle}>
        <Avatar user={data.sender} />
      </div>
      <div className={bodyStyle}>
        <div className="flex items-center gap-1">
          <div className="text-sm text-gray-500">{data.sender.name}</div>
          <div className="text-xs text-gray-400">
            {format(new Date(data.createdAt), "p")}
          </div>
        </div>
        <div className={messageStyle}>
          {data.image ? (
            <>
              <ImageModal
                src={data.image}
                isOpen={imageModalOpen}
                onClose={() => setImageModalOpen(false)}
              />
              <Image
                onClick={() => setImageModalOpen(true)}
                src={data.image}
                alt="image"
                height={288}
                width={288}
                objectFit="cover"
                className="cursor-pointer hover:scale-110 transition translate"
              />
            </>
          ) : (
            <div>{data.body}</div>
          )}
        </div>
        {isLast && isOwn && seenList.length > 0 && (
          <div className="text-xs  font-light text-gray-500">
            {`Seen by ${seenList.slice(0, 12)}`}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBox;
