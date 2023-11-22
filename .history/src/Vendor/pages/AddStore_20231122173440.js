/** @format */

import React from "react";
import { Form } from "react-bootstrap";
import HOC from "../layout/HOC";

const AddStore = () => {
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
                <Form.Group className="mb-3" >
                    <Form.Label>Store Name</Form.Label>
                    <Form.Control type='text' />
                </Form.Group>
            </Form>
        </div>

    </section>
  );
};

export default HOC(AddStore);
