"use Client";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFileArchive } from "react-icons/fa";
import { NoteType } from "@/types";
import { ReactNode } from "react";

export default function Notes({ note }: { note: NoteType }): ReactNode {
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
        <div className="modal-box ">
          <form method="dialog">
            <div
              className="tooltip tooltip-left absolute right-2 top-2"
              data-tip="Close"
            >
              <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
            </div>
            <div className=" absolute left-10 bottom-1 w-auto flex items-center gap-5 ">
              <div className="tooltip" data-tip="Save Note">
                <button className="btn btn-sm btn-circle btn-ghost">
                  <CiEdit className="text-xl" />
                </button>
              </div>
              <div className="tooltip" data-tip="To Trash">
                <button className="btn btn-sm btn-circle btn-ghost ">
                  <MdOutlineDelete className="text-xl" />
                </button>
              </div>
              <div className="tooltip" data-tip="To Archived">
                <button className="btn btn-sm btn-circle btn-ghost ">
                  <FaRegFileArchive />
                </button>
              </div>
            </div>
          </form>
          <div className="mt-4 p-1 ">
            <h1 className="text-xl font-semibold ">
              <input
                placeholder="Title"
                className="w-full outline-none"
                type="text"
              />
            </h1>
            <p className="text-md font-semibold">
              <textarea
                placeholder="Content"
                className="w-full outline-none "
              />
            </p>
          </div>
          <div className="w-full flex items-center justify-between"></div>
        </div>
      </dialog>
    </>
  );
}
