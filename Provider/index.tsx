"use client";
import { useEffect, useState } from "react";
import { StoreContext } from "@/context";
import { SessionProvider, useSession } from "next-auth/react";
import { NotesType } from "@/types";
import axios from "axios";
import { log } from "console";

export function Provider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <SessionProvider>{children}</SessionProvider>;
}

export function NotesContextProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: session, status } = useSession();
  const [userNotes, setUserNotes] = useState<NotesType>([]);
  useEffect(() => {
    if (status != "loading") {
      getNotesByUserId();
    }
  }, [session]);
  const getNotesByUserId = async () => {
    const url = process.env.BASE_URL;
    console.log(session?.user.id);
    try {
      const res = await axios.get(
        `api/v1/note/get?by=userId&userId=${session?.user.id}`
      );
      setUserNotes(res.data.data);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <StoreContext.Provider
      value={{
        userNotes,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}
