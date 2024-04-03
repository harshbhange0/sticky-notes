"use client";
import { loadingAtom, noteAtom } from "@/store/atoms";
import { NoteType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Notes from "./components/Notes";
import { useRerender } from "@/store/hooks";

export default function Home(): React.ReactElement{
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
    <div className="flex flex-wrap justify-start px-3 gap-3 mt-10 mx-auto">
      {notes[0] &&
        notes.map((note: NoteType) => {
          return <Notes note={{ ...note }} key={note.id} />;
        })}
    </div>
  );
}
