/** @format */

import { Store } from "react-notifications-component";

export const Baseurl = process.env.React_App_Baseurl;

export const Auth = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
  },
};

export const showMsg = (title, message, type) => {
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
