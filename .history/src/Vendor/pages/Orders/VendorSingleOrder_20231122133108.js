/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Baseurl } from "../../../Baseurl";
import Spinner from "../../../Component/Spinner";

const VendorSingleOrder = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  const token = localStorage.getItem("AdminToken");

  const getOrder = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/order/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
    );
  }

  console.log();

  return (
    <>

    {
      Object.keys(data).length === 0 ? <Spinner /> : 

    }


    </>
  );
};

export default HOC(VendorSingleOrder);
