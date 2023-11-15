/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { Baseurl } from "../../../Baseurl";
import HOC from "../../layout/HOC";

const SingleProduct = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  const getOrder = async () => {
    try {
      const response = await axios.get(`${Baseurl}api/v1/product/single/${id}`);
      setData(response.data.product);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  function ValueChecker(holder, string) {
    return holder ? (
      <div className="Desc-Container">
        <p className="title"> {string} </p>
        <p className="desc"> {holder} </p>
      </div>
    ) : (
      ""
    );
  }

  console.log(data)

  return (
    <>
      <section>
        <p className="headP">Dashboard / {data?.name}</p>
        <section className="sectionCont">
          <Form>
            {data?.images && (
              <div className="Desc-Container">
                <p className="title"> Product Images </p>
                <div className="img-cont">
                  {data?.images?.map((i, index) => (
                    <img
                      src={i}
                      alt=""
                      className="centerImage"
                      key={`image ${index}}`}
                    />
                  ))}
                </div>
              </div>
            )}
            {ValueChecker(data?.name, "Product Name")}
            {ValueChecker(data?.unit, "Unit")}
            {ValueChecker(data?.price, "Price")}
            {ValueChecker(data?.description, "Description")}
            {ValueChecker(data?.category?.name, "Category Name")}
            {ValueChecker(data?.subcategory?.name, "Sub-Category Name")}
            {ValueChecker(data?.stock, "Stock")}
            {ValueChecker(data?.numOfReviews, "Number of Reviews")}
            {ValueChecker(data?.brand?.name, "Brand")}

            {/* Vender Details */}
            {ValueChecker(data?.createdBy?.fullName, "Vendor Name")}
            {ValueChecker(data?.createdBy?.phone, "Created By")}
           

            {/* ---------- */}

            {ValueChecker(data?.createdAt?.slice(0, 10), "Created At")}


            <Link to="/Product">
              <Button variant="dark">Back</Button>
            </Link>
          </Form>
        </section>
      </section>
    </>
  );
};

export default HOC(SingleProduct);
