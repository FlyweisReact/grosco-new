/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Auth, Baseurl, showMsg } from "../../Baseurl";
import NoData from "./Component/NoData";
import { useNavigate } from "react-router-dom";

const Stores = () => {
  const [data, setData] = useState([]);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/vendors/details`);
      setData(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`${Baseurl}api/v1/vendors/delete`);
    } catch {}
  };

  return (
    <>
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Store's ({data?.length})
            </span>
          </div>

          {data?.length === 0 || !data ? (
            <NoData
              message={"It seems we don't have Vendor available at the moment"}
            />
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Store Name</th>
                      <th>Store Address</th>
                      <th>Pincode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td> {i.user?.name} </td>
                        <td> {i.user?.email} </td>
                        <td> {i.storeName} </td>
                        <td> {i.storeAddress} </td>
                        <td> {i.pinCode} </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            </>
          )}
        </section>
      </section>
    </>
  );
};

export default HOC(Stores);