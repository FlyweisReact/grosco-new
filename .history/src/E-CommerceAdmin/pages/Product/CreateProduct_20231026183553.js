/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Link } from "react-router-dom";
import { Form, Button, FloatingLabel, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import { Auth, Baseurl, showMsg } from "../../../Baseurl";

const CreateProduct = () => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [unit, setUnit] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubCategory] = useState("");
  const [stock, setStock] = useState("");
  const [images, setImages] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryArr, setCateoryArr] = useState([]);
  const [brands, setBrands] = useState([]);
  const [subArr, setSubArr] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/allCategory`);
      setCateoryArr(data?.data);
    } catch {}
  };

  const getAllBrands = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/brand/allBrand`);
      setBrands(data.Brands);
    } catch {}
  };

  const getAllSub = async () => {
    try {
      const { data } = await axios.get(`${Baseurl}api/v1/admin/allsubcategory`);
      setSubArr(data?.subcategories);
    } catch {}
  };

  useEffect(() => {
    getAllCategory();
    getAllBrands();
    getAllSub();
  }, []);

  const fd = new FormData();
  Array.from(images).forEach((img) => {
    fd.append("image", img);
  });
  fd.append("name", name);
  fd.append("description", description);
  fd.append("unit", unit);
  fd.append("quantity", 1);
  fd.append("price", price);
  fd.append("category", category);
  fd.append("subcategory", subcategory);
  fd.append("stock", stock);
  fd.append("brand", brand);

  const createProduct = async (e) => {
    e.preventDefault();
    setSubmitLoading(true);
    try {
      const { data } = await axios.post(
        `${Baseurl}api/v1/product/new`,
        fd,
        Auth
      );
      const msg = data.message;
      showMsg("Success", msg, "success");
      setSubmitLoading(false);
    } catch (e) {
      console.log(e);
      const msg = e.response.data.message;
      toast.error(msg);
      setSubmitLoading(false);
    }
  };

  return (
    <section>
      <section className="sectionCont">
        <p className="headP">Dashboard / Create New Product</p>

        <Form onSubmit={createProduct}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select onChange={(e) => setCategory(e.target.value)}>
              <option>Selete Your Prefrence</option>
              {categoryArr?.map((i, index) => (
                <option value={i._id} key={`Category ${index}`}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Brand</Form.Label>
            <Form.Select onChange={(e) => setBrand(e.target.value)}>
              <option>Select Your Prefrence</option>
              {brands?.map((i, index) => (
                <option value={i._id} key={`Brand ${index}`}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Sub Category</Form.Label>
            <Form.Select onChange={(e) => setSubCategory(e.target.value)}>
              <option>Select Your Prefrence</option>
              {subArr?.map((i, index) => (
                <option value={i._id} key={`SubCategory ${index}`}>
                  {" "}
                  {i.name}{" "}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={(e) => setImages(e.target.files)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Unit</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setUnit(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control
              type="number"
              min={0}
              onChange={(e) => setStock(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <FloatingLabel>
              <Form.Control
                as="textarea"
                style={{ height: "100px" }}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>

          <div className="w-100 d-flex justify-content-between">
            <Button variant="success" type="submit">
              {submitLoading ? (
                <Spinner animation="border" role="status" />
              ) : (
                "Submit"
              )}
            </Button>

            <Link to="/Orders">
              <Button variant="dark">Back</Button>
            </Link>
          </div>
        </Form>
      </section>
    </section>
  );
};

export default HOC(CreateProduct);
