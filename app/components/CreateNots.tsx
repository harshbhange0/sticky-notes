"use client";
import { errorToast, successToast } from "@/helpers/helper";
import { runAtom } from "@/store/atoms";
import { NoteType } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";
import { MouseEvent, useState } from "react";
import { CiSaveDown2 } from "react-icons/ci";
import { MdCancelPresentation } from "react-icons/md";
import { useRecoilState } from "recoil";

export default function CreateNots(): React.ReactElement {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [note, setNote] = useState<NoteType>({ title: "", content: "" });
  const [run, setRun] = useRecoilState(runAtom);
  const addNotes = async (e: MouseEvent) => {
    try {
      if (!session?.user.id) {
        errorToast("Unable to add Note");
        cancel(e);
        return;
      }
      if (note.content == "") return;
      const res = await axios.post(`/api/v1/note/create`, {
        userId: session?.user.id,
        ...note,
      });
      if (res.data.message) {
        successToast(res.data.message);
        setRun(!run);
      }
      cancel(e);
    } catch (error) {
      console.log(error);
      cancel(e);
      errorToast("Something Went  wrong!");
    }
  };
  const cancel = (e: MouseEvent) => {
    e.preventDefault();
    setNote({
      title: "",
      content: "",
    });
    setIsOpen(!isOpen);
    console.log(isOpen);
  };
  return (
    <div
      className={`${isOpen ? "h-auto" : "h-[70px]"} flex flex-col gap-4 sm:mx-auto mt-10 mx-auto md:mx-10 w-[90%] md:w-[80%] lg:w-1/2 border p-4 rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all`}
    >
      <input
        onFocus={(e) => setIsOpen(isOpen !== true && !isOpen)}
        type="text"
        placeholder="Title"
        className="w-full outline-none text-3xl"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        className="w-full outline-none text-2xl "
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
        rows={2}
      />
      <div className="w-1/2 grid grid-cols-2 mx-auto">
        <div className="tooltip tooltip-top" data-tip="Save  Note">
          <button className="" onClick={addNotes}>
            <CiSaveDown2 className="mx-auto text-xl text-green-500 hover:text-green-600 transition" />
          </button>
        </div>
        <div className="tooltip tooltip-top" data-tip="Cancel">
          <button onClick={cancel}>
            <MdCancelPresentation className="mx-auto text-xl text-gray-300 hover:text-gray-600 transition" />
          </button>
        </div>
      </div>
    </div>
  );
}
