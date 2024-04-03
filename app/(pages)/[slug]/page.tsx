"use client";
import { noteAtom } from "@/store/atoms";
import { NoteType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Notes from "@/app/components/Notes";
import { useRerender } from "@/store/hooks";

export default function page({ params }: { params: { slug: string } }) {
  const { status, data: session } = useSession();
  const [notes, setNotes] = useRecoilState(noteAtom);
  const run = useRerender();
  const getNotes = async () => {
    try {
      if (session?.user && params.slug) {
        const res = await axios.get(
          `/api/v1/note/get/flag?userId=${session.user.id}&flag=${params.slug.replace(/^\w/, (char) => char.toUpperCase())}`
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
  }, [status, run]);

  return (
    <div className="flex flex-wrap justify-start px-3 gap-3 mt-10 mx-auto">
      {notes.length > 0
        ? notes.map((note: NoteType) => {
            return <Notes note={{ ...note }} key={note.id} />;
          })
        : "No notes yet"}
    </div>
  );
}
