"use client";
import { noteAtom } from "@/store/atoms";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";

export default function AppBar() {
  const { data: session, status } = useSession();
  const notes = useRecoilValue(noteAtom);
  useEffect(() => {}, [notes]);
  console.log("rerender");
  return (
    <nav className="flex justify-end items-center px-10 py-2 border">
      {session && session.user.email ? (
        <div className="dropdown  dropdown-end">
          <div tabIndex={0} role="button" className="">
            <Avatar />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li className="">
              <span className="hover:border-b hover:border-gray-300 border-transparent border-b capitalize">
                {session && session.user.name}
              </span>
            </li>

            <li>
              <span className="hover:border-b hover:border-gray-300 border-transparent border-b">
                {session && session.user.email}
              </span>
            </li>
            <li>
              <LoginOptions />
            </li>
          </ul>
        </div>
      ) : (
        <LoginOptions />
      )}
    </nav>
  );
}

/**
 * size must be in number @example{32 == 32px}
 */
export const Avatar = ({ size = 32 }: { size?: number }) => {
  const { data: session, status } = useSession();
  return status == "loading" ? (
    <div className="w-9 flex items-center justify-center rounded-full">
      <span className="loading loading-ring loading-md"></span>
    </div>
  ) : (
    session && (
      <div className="avatar">
        <div className={`w-[${size}px] h- rounded-full`}>
          <Image
            width={size}
            height={size}
            src={session?.user.image || "./user.png"}
            alt="user"
          />
        </div>
      </div>
    )
  );
};

const LoginOptions = () => {
  const { data: session, status } = useSession();
  return status == "loading" ? (
    <div className="w-[32px] h-[32px] flex items-center justify-center rounded-full">
      <span className="loading loading-ring loading-lg"></span>
    </div>
  ) : session && session.user?.email ? (
    <button onClick={() => signOut()}>Sign Out</button>
  ) : (
    <button onClick={() => signIn()}>Sign in</button>
  );
};
