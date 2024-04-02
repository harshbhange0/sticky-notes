import Link from "next/link";
import React from "react";
export default function SidebarItem({
  children,
  href,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="mx-auto text-sm font-bold hover:bg-[#feefc3] px-8 py-2 text-start w-10/12 rounded-md border-b mt-2 grid grid-cols-2"
    >
      {children}
    </Link>
  );
}
