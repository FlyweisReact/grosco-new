/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../Baseurl";

const VendorPrinter = () => {
  const [data, setData] = useState([]);
  CONST [ loading , setLoading ] = useState(false)

  const fetchHandler = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/printer`);
      setData(data?.printers);
      setLoading(false)
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleDelete = async (ide) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/printer/${ide}`,
        Auth
      );
      const msg = data.message;
      showMsg("Success", msg, "success");
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
              All Printer's ({data?.length})
            </span>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>Data Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Image</th>
                      <th>Title</th>
                      <th>Location Type </th>
                      <th> Address </th>
                      <th>City</th>
                      <th>State</th>
                      <th>Postal Code</th>
                      <th>Paper Size</th>
                      <th>Number of Copies</th>
                      <th>Print Type </th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>
                          <img
                            src={i.image}
                            alt=""
                            style={{ maxWidth: "100px" }}
                          />
                        </td>
                        <td>{i.name} </td>
                        <td> {i.locationType} </td>
                        <td> {i.addressLine1} </td>
                        <td> {i.city} </td>
                        <td> {i.state} </td>
                        <td> {i.postalCode} </td>
                        <td> {i.paperSize} </td>
                        <td> {i.numberOfCopies} </td>
                        <td> {i.printType} </td>
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

export default HOC(VendorPrinter);
