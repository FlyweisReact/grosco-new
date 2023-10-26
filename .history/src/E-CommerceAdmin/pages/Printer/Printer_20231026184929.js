/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Alert, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../../Baseurl";

const Printer = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/printer`);
      setData(data?.printers);
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

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState("");
    const [name, setName] = useState("");

    const fd = new FormData();
    fd.append("image", image);
    fd.append("name", name);

    const postHandler = async (e) => {
      e.preventDefault();

      const fd = new FormData();
      fd.append("image", image);
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/printer`,
          fd,
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
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label> Title</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
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
              All Printer's ({data?.length})
            </span>
            <div className="d-flex gap-2 flex-wrap">
              <button
                className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
                onClick={() => setModalShow(true)}
              >
                Create New
              </button>
            </div>
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
                      <th> Address  </th>
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

export default HOC(Printer);
