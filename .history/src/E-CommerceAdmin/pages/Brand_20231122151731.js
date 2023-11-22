/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { Auth, Baseurl, showMsg } from "../../Baseurl";
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

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `${Baseurl}api/v1/vender/status/${id}`,
        Auth
      );
      showMsg("Success", "Removed", "success");
      fetchHandler();
    } catch {}
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const payload = {
      name,
      email,
      phone,
      password,
    };

    const postHandler = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append("image", image);
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/vender/register`,
          payload,
          Auth
        );
        const msg = data.message;
        showMsg("Success", msg, "success");
        props.onHide();
        fetchHandler();
      } catch (e) {
        console.log(e);
      }
    };

    return (
      <Modal
        {...props}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Create New
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
           
            <Form.Group className="mb-3">
              <Form.Label> Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Email</Form.Label>
              <Form.Control
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Nummber</Form.Label>
              <Form.Control
                type="tel"
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label> Password</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#19376d", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

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

export default HOC(Brand);
