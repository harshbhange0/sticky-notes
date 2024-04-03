
import { useRecoilValue } from "recoil";
import { loadingAtom, noteAtom, runAtom } from "../atoms";

export const useBalance = () => {
  const value = useRecoilValue(noteAtom);
  return value;
};
export const useRerender = () => {
  const value = useRecoilValue(runAtom);
  return value;
};
export const useLoading = () => {
  const value = useRecoilValue(loadingAtom);
  return value;   
};
