/** @format */

export const Baseurl = "https://rohit-deka-grosco.vercel.app/";

export const Auth = () => {
  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
