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
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section>
        <section className="sectionCont">
          <div className="pb-4   w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Store's ({data?.length})
            </span>
            <div className="d-flex gap-2 flex-wrap">
              <button
                className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
                onClick={() => setModalShow(true)}
              >
                Create
              </button>
            </div>
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
                      <th>Email</th>
                      <th>Role</th>
                      <th>Products</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td> {i.email} </td>
                        <td> {i.role} </td>
                        <td>
                          <button
                            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
                            onClick={() => navigate(`/vendor_product/${i._id}`)}
                          >
                            View
                          </button>
                        </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
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

export default HOC(Stores);
