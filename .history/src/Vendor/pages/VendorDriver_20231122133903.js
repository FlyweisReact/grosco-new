/** @format */

import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../Baseurl";
import HOC from "../layout/HOC";

const VendorDriver = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/driver/details`);
      setData(data);
      setLoading(false)
    } catch (e) {
      console.log(e.message);
      setLoading(false)
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleDelete = async (ide) => {
    const url = `${Baseurl}api/v1/delete/user/${ide}`;
    try {
      const { data } = await axios.delete(url, Auth);
      toast.success(data.message);
      fetchHandler();
    } catch (e) {
      console.log(e);
    }
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
              All Driver
            </span>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>Drive Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Lastname</th>
                      <th>Door</th>
                      <th>Street</th>
                      <th> City </th>
                      <th> Gender </th>
                      <th> Pincode </th>
                      <th> Landmark </th>
                      <th> Status </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.lastName} </td>
                        <td>{i.door} </td>
                        <td>{i.street} </td>
                        <td>{i.city} </td>
                        <td>{i.gender} </td>
                        <td>{i.pincode} </td>
                        <td>{i.landmark} </td>
                        <td>{i.status} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(i._id)}
                            />
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

export default HOC(VendorDriver);
