/** @format */

import React, { useState, useEffect } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { } from "../../../Baseurl";
import HOC from "../layout/HOC";
import { Baseurl } from "../../Baseurl";

const VendorBrands = () => {
  const token = localStorage.getItem("AdminToken");
  const [modalShow, setModalShow] = useState(false);
  const [subCat, setSubcat] = useState([]);

  const getSubCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/brand/allBrand`);
      setSubcat(data?.Brands);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    getSubCategory();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/brand/removeBrand/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      toast.success(data?.message);
      getSubCategory();
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
          `${Baseurl}api/v1/brand/create/${name}`,
          fd,
          Auth
        );
        const msg = data.message;
        showMsg("Success", msg, "success");
        props.onHide();
        getSubCategory();
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
              className=" text-slate-900 font-semibold uppercase"
              style={{ fontSize: "1.5rem" }}
            >
              All Brand
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

          <div className="overFlowCont">
            <Table>
              <thead>
                <tr>
                  <th>Sno.</th>
                  <th>Image </th>
                  <th>Name </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {subCat?.map((ele, i) => (
                  <tr key={i}>
                    <td>{i + 1}</td>
                    <td>
                      {" "}
                      <img
                        src={ele?.image}
                        alt=""
                        style={{ maxWidth: "200px", width: "auto" }}
                      />{" "}
                    </td>
                    <td> {ele?.name} </td>
                    <td>
                      <span className="flexCont">
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(ele._id)}
                        />
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      </section>
    </>
  );
};

export default HOC(VendorBrands);


