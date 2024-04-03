"use client";
import { noteAtom } from "@/store/atoms";
import { NoteType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import Notes from "@/app/components/Notes";
import { useRerender } from "@/store/hooks";

export default function page({
  params,
}: {
  params: { slug: string };
}): React.ReactElement {
  const { status, data: session } = useSession();
  const [notes, setNotes] = useRecoilState(noteAtom);
  const run = useRerender();
  const getNotesByFlag = async () => {
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
    getNotesByFlag();
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
