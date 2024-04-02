import { NotesType } from "@/types";
import { atom } from "recoil";

export const noteAtom = atom({
  key: "notes",
  default: [],
});
