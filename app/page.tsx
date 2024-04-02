"use client";
import { noteAtom } from "@/store/atoms";
import { NoteType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Notes from "./components/Notes";

export default function Home() {
  
  const { status, data: session } = useSession();
  const [notes, setNotes] = useRecoilState(noteAtom);
  const getNotes = async () => {
    try {
      if (session?.user) {
        const res = await axios.get(
          `/api/v1/note/get?userId=${session.user.id}`
        );
        if (res.data.data) {
          setNotes(() => res.data.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotes();
  }, [status]);
  return (
    <>
      <div className="flex flex-wrap justify-start px-3 gap-3 mt-10 mx-auto">
        {notes.length > 0
          ? notes.map((note: NoteType) => {
              return <Notes note={{ ...note }} key={note.id} />;
            })
          : "No notes yet"}
      </div>
    </>
  );
}
