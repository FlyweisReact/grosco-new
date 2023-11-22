/** @format */

import axios from "axios";
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import HOC from "../layout/HOC";

const AddStore = () => {
  const [storeName, setStoreName] = useState("");
  const [ storeAddress , setStoreAddress ] = useState("")
  const [ pinCode , setPinCode] = useState("")
  const [ image , setImage ] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    try{
        const { res } = await axios.post(`${Baseurl}`)
    }catch{}
  }

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
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Store Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setStoreName(e.target.value)}
            />
          </Form.Group>
        </Form>
      </div>
    </section>
  );
};

export default HOC(AddStore);
