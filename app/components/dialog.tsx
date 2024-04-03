import { NoteStatusType, NoteType } from "@/types";
import { successToast, errorToast } from "@/helpers/helper";
import { runAtom } from "@/store/atoms";
import { useRecoilState } from "recoil";
import axios from "axios";
import React from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegFileArchive } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";

interface dialogProps extends NoteType {
  inputTitle: string;
  inputContent: string;
  setInputTitle: any;
  setInputContent: any;
  onUpdate: any;
}

export default function Dialog({ note }: { note: dialogProps }) {
  const [run, setRun] = useRecoilState(runAtom);

  const changeFlag = async (flag: NoteStatusType) => {
    if (flag == "Archived" || flag == "Public" || flag == "Trashed") {
      try {
        const res = await axios.put(
          `/api/v1/note/update/flag?id=${note.id}&flag-type=${flag}`
        );
        if (res) {
          successToast(res.data.message);
          setRun(!run);
          return;
        }
      } catch (error: any) {
        errorToast(error?.response.data.message);
        return;
      }
    }
  };
  const deleteNotes = async () => {
    try {
      const res = await axios.delete(`/api/v1/note/delete?id=${note.id}`);
      if (res) {
        successToast(res.data.message);
        setRun(!run);
        return;
      }
    } catch (error: any) {
      errorToast(error?.response.data.message);
      return;
    }
  };

  return (
    <div>
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
              <div
                className="tooltip"
                data-tip={
                  note.flag == "Trashed" || note.flag == "Archived"
                    ? "Restore Note"
                    : "Save Note"
                }
              >
                <button
                  className="btn btn-sm btn-circle btn-ghost"
                  onClick={() =>
                    note.flag == "Trashed" || note.flag == "Archived"
                      ? changeFlag("Public")
                      : note.onUpdate()
                  }
                >
                  <CiEdit className="text-xl" />
                </button>
              </div>
              <div
                className="tooltip"
                data-tip={
                  note.flag == "Trashed" ? "Delete Permanently" : "To Trash"
                }
              >
                <button
                  className={`btn btn-sm btn-circle btn-ghost ${note.flag == "Trashed" ? "text-red-500" : ""}`}
                  onClick={() =>
                    note.flag == "Trashed"
                      ? deleteNotes()
                      : changeFlag("Trashed")
                  }
                >
                  <MdOutlineDelete className={`text-xl `} />
                </button>
              </div>
              {note.flag == "Public" ? (
                <div className="tooltip" data-tip="To Archived">
                  <button
                    className="btn btn-sm btn-circle btn-ghost "
                    onClick={() => changeFlag("Archived")}
                  >
                    <FaRegFileArchive />
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </form>
          <div className="mt-4 p-1 flex flex-col gap-y-4">
            <h1 className="text-xl font-semibold ">
              <input
                placeholder="Title"
                className="w-full outline-none"
                type="text"
                readOnly={
                  note.flag == "Trashed" || note.flag == "Archived"
                    ? true
                    : false
                }
                value={note.inputTitle}
                onChange={note.setInputTitle}
              />
            </h1>
            <p className="text-md font-semibold resize-none hover:resize">
              <textarea
                className="w-full outline-none "
                placeholder="Content"
                readOnly={
                  note.flag == "Trashed" || note.flag == "Archived"
                    ? true
                    : false
                }
                onChange={note.setInputContent}
                value={note.inputContent}
                rows={5}
              />
            </p>
          </div>
          <div className="w-full flex items-center justify-between"></div>
        </div>
      </dialog>
    </div>
  );
}
