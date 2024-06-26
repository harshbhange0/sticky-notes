"use Client";
import { NoteType } from "@/types";
import { ReactNode, useState } from "react";
import Dialog from "./dialog";

export default function Notes({ note }: { note: NoteType }): ReactNode {
  const [input, setInput] = useState<NoteType>({ ...note });
  const handleUpdate = () => {
    console.log("update");
  };

  return (
    <div className="mb-auto h-auto">
      <div
        className="min-w-[250px] max-w-[350px] h-auto flex flex-col gap-2 p-4 border rounded-md cursor-pointer hover:shadow-md shadow-sm transition-all break-words mb-auto"
        onClick={() =>
          // @ts-ignore
          document?.getElementById(note.id).showModal()
        }
      >
        <h1 className="text-xl font-semibold">
          {note.title ? note.title : "No title"}
        </h1>
        <p className="text-md font-semibold">
          {note.content ? note.content : "No content"}
        </p>
      </div>
      <Dialog
        note={{
          id: note.id,
          title: note.title,
          content: note.content,
          userId: note.userId,
          flag: note.flag,
          inputTitle: input.title,
          inputContent: input.content,
          setInputTitle: (e: any) =>
            setInput({ ...input, title: e.target.value }),
          setInputContent: (e: any) =>
            setInput({ ...input, content: e.target.value }),
          onUpdate: handleUpdate,
        }}
      />
    </div>
  );
}
