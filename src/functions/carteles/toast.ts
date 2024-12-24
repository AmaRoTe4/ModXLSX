import { Bounce, toast } from "react-toastify";

export const cartelSuccessToast = (Mesanje: string, time: number = 5000) => {
  toast.success(Mesanje, {
    position: toast.POSITION.TOP_CENTER,
    transition: Bounce,
    autoClose: time,
  });
};

export const cartelErrorToast = (Mesanje: string, time: number = 5000) => {
  toast.error(Mesanje, {
    position: toast.POSITION.TOP_CENTER,
    transition: Bounce,
    autoClose: time,
  });
};
