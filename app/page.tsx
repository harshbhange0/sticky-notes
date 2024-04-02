"use client";
import { useSession } from "next-auth/react";
import { useNoteContext } from "./context";
import Notes from "./components/Notes";
import { NoteType } from "@/types";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default function Home() {
  const { status } = useSession();
  const { notes, run } = useNoteContext();
  const { getUserNotes } = useNoteContext();
  const router = useRouter();
  useEffect(() => {
    console.log("refresh");
    router.refresh();
    if (status == "authenticated") {
      getUserNotes();
    }
  }, []);
  return (
    <>
      <div className="flex flex-wrap justify-start px-3 gap-3 mt-10 mx-auto">
        {status == "authenticated" ? (
          notes.length < 0 ? (
            <Notes note={{ title: "No Note found", content: "" }} />
          ) : (
            notes.map((note: NoteType) => {
              return <Notes note={note} key={note.id} />;
            })
          )
        ) : (
          "unAuth"
        )}
      </div>
    </>
  );
}
