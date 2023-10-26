/** @format */

export const Baseurl = "https://rohit-deka-grosco.vercel.app/";

export const Auth = () => {

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  return auth;
};
