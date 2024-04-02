"use client";
import { useSession } from "next-auth/react";
import { useNoteContext } from "./context";
import Notes from "./components/Notes";
import { NoteType } from "@/types";
export default function Home() {
  const { status } = useSession();
  const { notes } = useNoteContext();
  return (
    <>
      <div className="flex flex-wrap justify-start px-3 gap-3 mt-10">
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
