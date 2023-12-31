/** @format */

import React, { useEffect, useState } from "react";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import HOC from "../../layout/HOC";
import { Baseurl, Auth, showMsg } from "../../../Baseurl";
import { Store } from "react-notifications-component";

const Coupon = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);
  const [total, setTotal] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/coupon`);
      setData(data);
      setTotal(data.length);
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
        `${Baseurl}api/v1/coupon/${id}`,
        Auth
      );
      const msg = data.message;
      showMsg("Success", msg, "success");
      fetchData();
    } catch (e) {
      console.log(e);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [code, setCode] = useState("");
    const [discount, setDiscount] = useState("");
    const [startDate, setStartDay] = useState("");
    const [endDate, setEndDate] = useState("");
    const [minOrder, setMinOrder] = useState("");

    const fd = new FormData();
    fd.append("couponCode", code);
    fd.append("discount", discount);
    fd.append("startDate", startDate);
    fd.append("endDate", endDate);
    fd.append("minOrder", minOrder);

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(`${Baseurl}api/v1/coupon`, fd, Auth);
        const msg = data.message;
        showMsg("Success", msg, "success");
        props.onHide();
        fetchData();
      } catch (e) {
        const msg = e?.response?.data?.message;
        showMsg("Invalid", msg, "danger");
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          ` ${Baseurl}api/v1/admin/updatesubcategory/${id}`,
          fd,
          Auth
        );

        const msg = data.message;
        showMsg("Success", msg, "success");
        props.onHide();

        fetchData();
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
            {" "}
            {edit ? "Edit Category" : " Add Coupon"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCode(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Min Order</Form.Label>
              <Form.Control
                type="number"
                onChange={(e) => setMinOrder(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Starting date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setStartDay(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Expiration date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{
                backgroundColor: "#0c0c0c",
                borderRadius: "0",
                border: "1px solid #0c0c0c",
              }}
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
              All Coupon's ( Total : {total} )
            </span>
            <button
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#0c0c0c] text-white tracking-wider"
            >
              Create New
            </button>
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
                      <th>Code</th>
                      <th>Discount</th>
                      <th>Starting Date</th>
                      <th>Expiration Date</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>
                        <td>{i.couponCode} </td>
                        <td>
                          <span>
                          <span>
                            {i.discount}</span>
                            <span>
                              {" "}
                              <i className="fa-solid fa-percent"></i>{" "}
                            </span>
                          </span>
                        </td>
                        <td> {i.startDate?.substr(0, 10)} </td>
                        <td> {i.endDate?.substr(0, 10)} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => deleteHandler(i._id)}
                            />
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setEdit(true);
                                setId(i._id);
                                setModalShow(true);
                              }}
                            ></i>
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

export default HOC(Coupon);
