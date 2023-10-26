/** @format */
const token = localStorage.getItem("AdminToken");

export const Baseurl = "https://rohit-deka-grosco.vercel.app/";

export const Auth = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};
