/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Alert, Badge, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const VendorOrder = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const getOrders = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/order/all`, Auth);
      setData(response?.data?.orders);
      setTotal(response?.data?.orders?.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p>
        </Modal.Body>
      </Modal>
    );
  }
  

  return (
    <>
      <section>
        <section className="sectionCont">
          <div className="pb-4  w-full flex justify-between items-center">
            <span
              className="tracking-widest text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Order's (Total : {total})
            </span>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>No Data Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>SNO.</th>
                      <th> Order Id </th>
                      <th> Total Amount </th>
                      <th> Status </th>
                      <th> Payment Method </th>
                      <th> Shipping </th>
                      <th> Tax </th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td> #{index + 1} </td>
                        <td> {i._id} </td>
                        <td>
                          {" "}
                          <i className="fa-solid fa-indian-rupee-sign"></i>
                          {i.totalAmount}{" "}
                        </td>
                        <td> {i.status} </td>
                        <td> {i.paymentMethod} </td>
                        <td>
                          {" "}
                          <i className="fa-solid fa-indian-rupee-sign"></i>
                          {i.shipping}{" "}
                        </td>
                        <td>
                          {" "}
                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                          {i.tax}{" "}
                        </td>
                        <td>
                          <Button>Assign Order</Button>
                        </td>
                        <td>
                          <span className="flexCont">
                            <span>
                              <Link to={`/vendor_Orders/${i._id}`}>
                                <i className="fa-solid fa-eye" />
                              </Link>
                            </span>
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

export default HOC(VendorOrder);
