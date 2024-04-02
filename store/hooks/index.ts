// "use client";
import { useRecoilState, useRecoilValue } from "recoil";
import { noteAtom } from "../atoms";

export const useBalance = () => {
  const value = useRecoilValue(noteAtom);
  return value;
};


