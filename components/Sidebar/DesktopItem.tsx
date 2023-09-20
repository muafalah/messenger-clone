"use client";

import clsx from "clsx";
import Link from "next/link";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  onClick?: () => void;
  active?: boolean;
}

const DesktopItem = ({
  label,
  icon: Icon,
  href,
  onClick,
  active,
}: DesktopItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
  };

  return (
    <li onClick={handleClick}>
      <Link
        href={href}
        className={clsx(
          "group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semibold text-gray-500 hover:text-black hover:bg-gray-100",
          active && "bg-blue-100",
          active && "text-blue-500"
        )}
      >
        <Icon className="h-6 w-6 shrink-0" />
        {/* sr-only is used for element are only rendered on the server side and will not appear on the client side. 
        This is suitable for use if you want to hide an element but still improve SEO */}
        <span className="sr-only">{label}</span>
      </Link>
    </li>
  );
};

export default DesktopItem;