"use Client";
import { NoteStatusType, NoteType } from "@/types";
import axios from "axios";
import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { FaRegFileArchive } from "react-icons/fa";
import { useNoteContext } from "../context";

export default function Notes({ note }: { note: NoteType }) {
  const { setRun } = useNoteContext();
  const [input, setInput] = useState<NoteType>({ ...note });
  const [flag, setFlag] = useState<NoteStatusType>();

  const updateNote = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.put(`/api/v1/note/update?id=${note.id}`, {
        title: input.title,
        content: input.content,
      });
      setRun(1 + 1);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const UpdateFlag = async (e: any) => {
    e.preventDefault();
    try {
      setFlag((prevFlag) => {
        const newFlag = flag === "Trashed" ? "Archived" : "Trashed";
        const res = axios
          .put(`/api/v1/note/update/flag?id=${note.id}&flag-type=${newFlag}`, {
            flag: newFlag,
          })
          .then((data) => {
            console.log(data.data);
          });
        return newFlag;
      });
    } catch (error) {
      console.log(error);
    }
  };
  return note.flag === "Public" ? (
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
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={(e) => updateNote(e)}
                >
                  <CiEdit className="text-xl" />
                </button>
              </div>
              <div className="tooltip" data-tip="To Trash">
                <button className="btn btn-sm btn-circle btn-ghost ">
                  <MdOutlineDelete
                    className="text-xl"
                    onClick={(e) => {
                      setFlag(() => "Trashed");
                      UpdateFlag(e);
                    }}
                  />
                </button>
              </div>
              <div className="tooltip" data-tip="To Archived">
                <button
                  className="btn btn-sm btn-circle btn-ghost "
                  onClick={(e) => {
                    setFlag(() => "Archived");
                    UpdateFlag(e);
                  }}
                >
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
                onChange={(e) => setInput({ ...input, title: e.target.value })}
                value={input.title ? input.title : "No title"}
              />
            </h1>
            <p className="text-md font-semibold">
              <textarea
                placeholder="Content"
                className="w-full outline-none "
                onChange={(e) =>
                  setInput({ ...input, content: e.target.value })
                }
                value={input.content ? input.content : "No content"}
              />
            </p>
          </div>
          <div className="w-full flex items-center justify-between"></div>
        </div>
      </dialog>
    </>
  ) : (
    ""
  );
}
