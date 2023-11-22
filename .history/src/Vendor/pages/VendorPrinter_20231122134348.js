/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../layout/HOC";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { Baseurl, Auth, showMsg } from "../../Baseurl";

const VendorPrinter = () => {
  const [data, setData] = useState([]);
  CONST[(loading, setLoading)] = useState(false);

  const fetchHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/printer`);
      setData(data?.printers);
      setLoading(false);
    } catch {
      setLoading(false);
    }
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

  return (
    <>
      <section>
       
      </section>
    </>
  );
};

export default HOC(VendorPrinter);
