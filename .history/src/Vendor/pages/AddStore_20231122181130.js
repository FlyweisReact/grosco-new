/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Baseurl, showMsg } from "../../Baseurl";
import HOC from "../layout/HOC";

const AddStore = () => {
  const [data, setData] = useState({});
  const [storeName, setStoreName] = useState(data ? data?.storeName : "");
  const [storeAddress, setStoreAddress] = useState(data ? data?.storeAddress : "");
  const [pinCode, setPinCode] = useState(data ? data?.pinCode : "");
  const [image, setImage] = useState("");

  const id = localStorage.getItem("VendorId");

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/vendors/single/details/${id}`
      );
      setData(data.data);
    } catch {}
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const fd = new FormData();
  fd.append("storeAddress", storeAddress);
  fd.append("storeName", storeName);
  fd.append("pinCode", pinCode);
  fd.append("image", image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { res } = await axios.post(
        `${Baseurl}api/v1/vendor/details/${id}`,
        fd
      );
      showMsg("success", "", "success");
    } catch {}
  };

  return (
    <section className="sectionCont">
      <div className="pb-4   w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          Store
        </span>
      </div>

      <div>
        <Form onSubmit={handleSubmit}>
          <img
            src={data?.image}
            alt=""
            style={{ maxWidth: "200px", margin: "auto" }}
          />
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Store Address</Form.Label>
            <Form.Control
              type="text"
              value={stroe}
              onChange={(e) => setStoreAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Pin Code</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setPinCode(e.target.value)}
            />
          </Form.Group>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    </section>
  );
};

export default HOC(AddStore);
