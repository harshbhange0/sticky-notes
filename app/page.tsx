"use client";
import { loadingAtom, noteAtom } from "@/store/atoms";
import { NoteType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Notes from "./components/Notes";
import { useRerender } from "@/store/hooks";

export default function Home(): React.ReactElement {
  const { status, data: session } = useSession();
  const [notes, setNotes] = useRecoilState(noteAtom);
  const [loading, setLoading] = useRecoilState(loadingAtom);
  const run = useRerender();
  const getNotes = async () => {
    try {
      if (session?.user) {
        setLoading(true);
        const res = await axios.get(
          `/api/v1/note/get?userId=${session.user.id}`
        );
        if (res.data.data) {
          setNotes(() => res.data.data);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);

      return;
    }
  };

  useEffect(() => {
    getNotes();
  }, [status, run]);

  return (
    <div className="w-full px-3 flex justify-start flex-wrap gap-1 mt-10 mx-auto transition-all">
      {notes.length > 0 ? (
        notes.map((note: NoteType) => {
          return <Notes note={{ ...note }} key={note.id} />;
        })
      ) : (
        <div className="h-[40vh] grid place-items-center w-full">
          <p className=" w-full text-center">No notes found!</p>
        </div>
      )}
    </div>
  );
}
