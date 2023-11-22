/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";

const GiftCard = () => {
  const [data, setData] = useState([]);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/work/log/get/all`);
      setData(data.workLogs);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/GiftCards/deletegiftCard/${id}`,
        Auth
      );
      toast.success(data.message);
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            Work Log's ( {data?.length} )
          </span>
          <div className="d-flex gap-1">
            <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider">
              Create New / Update Existing
            </button>
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="overFlowCont">
              {!data ? (
                <Alert>No Product Found</Alert>
              ) : (
                <Table>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th> </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ cursor: "pointer" }}>
                        <div className="CarouselImages">
                          <img src={data?.image} alt="" />
                        </div>
                      </td>
                      <td> {data?.name} </td>
                      <td>{data?.description}</td>

                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteHandler(data?._id)}
                          ></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}

              <div className="Desc-Container">
                <p className="title"> Gift Card Rewards </p>
                {data?.priceArray?.map((i, index) => (
                  <div className="Desc-Container" key={index}>
                    <p className="desc"> Gift Card : {i.giftCardrewards} </p>
                    <p className="desc"> Price : {i.price} </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(GiftCard);
