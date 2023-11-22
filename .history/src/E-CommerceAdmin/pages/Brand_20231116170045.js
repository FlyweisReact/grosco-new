/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table } from "react-bootstrap";
import axios from "axios";
import { Baseurl } from "../../Baseurl";
import NoData from "./Component/NoData";
import { useNavigate } from "react-router-dom";

const Brand = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

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

  return (
    <>
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Vendor's ({data?.length})
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
                      <th>Vendor Name</th>
                      <th>Vendor Mobile Number</th>
                      <th>Store Name</th>
                      <th>Store Address</th>
                      <th>Pin Code</th>
                      <th>Status</th>
                      <th>Products</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td> {i?.user?.name} </td>
                        <td> {i?.user?.mobileNumber} </td>
                        <td> {i.storeName} </td>
                        <td> {i.storeAddress} </td>
                        <td> {i.pinCode} </td>
                        <td> {i.status} </td>
                        <td>
                          <button className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider" >
                            View
                          </button>
                        </td>
                        <td>
                          <span className="flexCont">
                            <i className="fa-solid fa-trash" />
                          </span>
                        </td>
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

export default HOC(Brand);
