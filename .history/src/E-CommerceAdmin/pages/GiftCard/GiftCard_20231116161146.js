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
        </div>

        {data?.length === 0 || !data ? (
          <SpinnerComp />
        ) : (
          <>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Total Hour Worked</th>
                    <th>Delivery Boy</th>
                    <th>Shift</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td> {i.date?.slice(0, 10)} </td>
                      <td> {i.totalHoursWorked} </td>
                      <td> {i.deliveryBoy} </td>
                      <td>
                        <ul style={{ listStyle: "disc" }}>
                          {i.shifts?.map((item, index) => (
                            <>
                              <li key={`Start${index}`}>
                                Start Time : {item?.startTime}
                              </li>
                              <li key={`End${index}`}>
                                End Time : {item?.endTime}
                              </li>
                              <li key={`Duration${index}`}>
                                Duration : {item?.duration?.hours}{" "}
                                {item?.duration?.minutes}{" "}
                              </li>
                            </>
                          ))}
                        </ul>
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default HOC(GiftCard);
