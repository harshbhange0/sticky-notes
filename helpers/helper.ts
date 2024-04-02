import toast from "react-hot-toast";

export const errorToast = (msg: string) => toast.error(msg);

export const successToast = (msg: string) => toast.success(msg);
