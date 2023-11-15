/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HOC from "../../layout/HOC";
import { Baseurl } from "../../../Baseurl";

const SingleOrder = () => {
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

  return (
    <>
      <section className="sectionCont">
        <p className="headP">Dashboard / {data?._id}</p>
        {ValueChecker(data?.totalAmount, "Total Amount")}
        {ValueChecker(data?.includePaperBag, "Include Paper Bag")}
        {ValueChecker(data?.status, "Status")}
        {ValueChecker(data?.paymentMethod, "Total Amount")}
        {data?.address && (
          <div className="Desc-Container">
            <p className="title"> Billing Address </p>
            <p className="desc"> Name : {data?.address?.name} </p>
            <p className="desc"> Flat : {data?.address?.flat}</p>
            <p className="desc"> Street : {data?.address?.street} </p>
          </div>
        )}
        {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}
      </section>
    </>
  );
};

export default HOC(SingleOrder);
