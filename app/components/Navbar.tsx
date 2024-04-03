"use client";
import { signIn, signOut, useSession } from "next-auth/react";

import Image from "next/image";
import React from "react";

export default function Navbar() {
  const { data: session, status } = useSession();
  return (
    <div className="navbar ">
      <div className="flex-1 px-2 lg:flex-none">
        <a className="text-lg font-bold">Sticky Notes</a>
      </div>
      <div className="flex justify-end flex-1 px-2">
        <div className="flex items-stretch">
          <div className="dropdown dropdown-end">
            {!session?.user ? (
              <button onClick={() => signIn()}>Sign in</button>
            ) : (
              <>
                <div tabIndex={0} role="button" className="">
                  <div className="avatar placeholder">
                    <div className="rounded-full w-8 ">
                      <Image
                        width={32}
                        height={32}
                        src={session?.user.image || "/user.png"}
                        alt="user"
                      />
                    </div>
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-auto mt-4"
                >
                  <li>
                    <span>{session?.user && session.user.name}</span>
                  </li>
                  <li>
                    <span className="text-wrap">
                      {session?.user && session.user.email}
                    </span>
                  </li>
                  <li>
                    <button
                      className="text-wrap"
                      onClick={() => {
                        signOut();
                      }}
                    >
                      Sign Out
                    </button>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
