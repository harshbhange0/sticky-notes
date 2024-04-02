import { NoteType } from "@/types";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";

export default function Notes({ note }: { note: NoteType }) {
  return (
    <>
      <div
        className="min-w-[200px] max-w-[300px] flex flex-col gap-2 p-4 border rounded-md cursor-pointer break-words h-full"
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
      <dialog id={note.id} className="modal">
        <div className="modal-box">
          <h1 className="text-xl font-semibold">
            <input
              placeholder="Title"
              className="w-full outline-none"
              type="text"
              value={note.title ? note.title : "No title"}
            />
          </h1>
          <p className="text-md font-semibold">
            <textarea
              placeholder="Content"
              className="w-full outline-none "
              value={note.content ? note.content : "No content"}
            />
          </p>
          <div className="w-full flex items-center justify-between">
            <button>
              <CiEdit />
            </button>
            <button>
              <MdOutlineDelete />
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
