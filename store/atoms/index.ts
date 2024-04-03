import { atom } from "recoil";

export const noteAtom = atom({
  key: "notes",
  default: [],
});

export const runAtom = atom({
  key: "rerender",
  default: false,
});

export const loadingAtom = atom({
  key: "loading",
  default: false,
});
