/** @format */

export const Baseurl = "https://rohit-deka-grosco.vercel.app/";

export const Auth = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("AdminToken")}`,
  },
};
