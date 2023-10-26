/** @format */
import { Store } from "react-notifications";

export const Baseurl = "https://rohit-deka-grosco.vercel.app/";

export const Auth = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
  },
};

const showMsg = (title, message, type) => {
  Store.addNotification({
    title,
    message,
    type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 2000,
      onScreen: true,
    },
  });
};
