/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Modal, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../Baseurl";

const SkinCondition = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [id, setId] = useState(null);
  const [edit, setEdit] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/shift`);
      setData(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [ shift, setShift ] = useState("")
    const [ timeOfWork ,setTimeOfWork ] = useState("")
    const [ earningPerMonth , setEarningPerMonth] = useState("")


    

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          `${Baseurl}api/v1/shift`,
          fd,
          Auth
        );
        toast.success(data.message);
        fetchHandler();
        props.onHide();
      } catch (e) {
        console.log(e);
      }
    };

    const putHandler = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://shahina-backend.vercel.app/api/v1/admin/SkinCondition/updateSkinCondition/${id}`,
          fd,
          Auth
        );
        toast.success(data.message);
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
            {" "}
            {edit ? "Edit" : "Create New"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? putHandler : postHandler}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                required
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button
              style={{ backgroundColor: "#042b26", borderRadius: "0" }}
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }

  const handleDelete = async (ide) => {
    const url = `https://shahina-backend.vercel.app/api/v1/admin/SkinCondition/deleteSkinCondition/${ide}`;
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
              All Shift
            </span>
            <button
              className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
              onClick={() => {
                setEdit(false);
                setModalShow(true);
              }}
            >
              Create New
            </button>
          </div>

          {data?.length === 0 || !data ? (
            <Alert>Banner Not Found</Alert>
          ) : (
            <>
              <div className="overFlowCont">
                <Table>
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Shift</th>
                      <th>Time of Work</th>
                      <th>Earning Per Month</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {data?.map((i, index) => (
                      <tr key={index}>
                        <td>#{index + 1} </td>

                        <td>{i.shift} </td>
                        <td>{i.timeOfWork} </td>
                        <td>{i.earningPerMonth} </td>
                        <td>
                          <span className="flexCont">
                            <i
                              className="fa-solid fa-trash"
                              onClick={() => handleDelete(i._id)}
                            />
                            <i
                              className="fa-solid fa-pen-to-square"
                              onClick={() => {
                                setId(i._id);
                                setEdit(true);
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

export default HOC(SkinCondition);
