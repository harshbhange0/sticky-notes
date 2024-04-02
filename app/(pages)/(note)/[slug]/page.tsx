"use client";
import Notes from "@/app/components/Notes";
import { useNoteContext } from "@/app/context";
import { NoteType } from "@/types";
import React, { useEffect } from "react";

export default  function page({ params }: any) {
  console.log(params.slug);
  const { getNoteByFlag, setFlag, flagNote } = useNoteContext();
  setFlag(params.slug);
  useEffect(() => {
    getNoteByFlag();
  }, []);
  return (
    flagNote &&
    flagNote.map((note: NoteType) => {
      return <Notes note={note} />;
    })
  );
}
