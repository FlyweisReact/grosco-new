/** @format */

import React from "react";

const NoData = ({message}) => {
  return (
    <div className="No_Data_Found">
      <img src="/Image/folder.png" alt="" />
      <p> {message} </p>
    </div>
  );
};

export default NoData;
