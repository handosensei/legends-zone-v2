import {toast} from "react-toastify";

export const notif = (type, message, colorText='text-white') => {
  toast(message, {
    position: "top-right",
    hideProgressBar: true,
    className: `bg-${type} text-white`
  });
}
