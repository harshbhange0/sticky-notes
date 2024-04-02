"use client";
import { errorToast, successToast } from "@/helpers/helper";
import { NotesType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { createContext, useContext, useEffect, useState } from "react";

export const StoreContext = createContext<any>(null);

export function NotesContextProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: session, status } = useSession();
  const [run, setRun] = useState(0);
  const [notes, setNots] = useState<NotesType>([]);

  const getUserNotes = async () => {
    try {
      if (session?.user.id) {
        const res = await axios.get(
          `/api/v1/note/get?userId=${session.user.id}`
        );
        if (res.data?.data) {
          return setNots([...res.data.data]);
        }
        if (res.data.message !== undefined) {
          return errorToast(res.data.message);
        }
      }
      if (status !== "loading") {
        return errorToast("You Are Not Sign in");
      }
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };

  useEffect(() => {
    getUserNotes();
  }, [status, run]);

  return (
    <StoreContext.Provider value={{ notes, setRun }}>
      {children}
    </StoreContext.Provider>
  );
}
export const useNoteContext = () => {
  return useContext(StoreContext);
};
