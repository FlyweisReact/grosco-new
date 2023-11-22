/** @format */

import React, { useEffect, useState } from "react";
import { Table, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Baseurl } from "../../Baseurl";
import HOC from "../layout/HOC";
import Loader from "../../Component/Loader";

const VendorDriver = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("AdminToken");
  const Auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const fetchHandler = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/driver/details`);
      setData(data);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  const handleDelete = async (ide) => {
    const url = `${Baseurl}api/v1/delete/user/${ide}`;
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
      <section>
      {loading ? <Loader /> : }
     
      </section>
    </>
  );
};

export default HOC(VendorDriver);
