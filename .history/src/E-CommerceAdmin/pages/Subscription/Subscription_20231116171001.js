/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Table, Badge, Alert } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import SpinnerComp from "../Component/SpinnerComp";
import { useParams } from "react-router-dom";
import { Auth, Baseurl } from "../../../Baseurl";
import { Store } from "react-notifications-component";
import NoData from "../Component/NoData";

const Subscription = () => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const { id } = useParams();

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${Baseurl}api/v1/product/my/vendor/${id}`
      );
      setData(data.products);
      setTotal(data.products.length);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${Baseurl}api/v1/product/${id}`,
        Auth
      );
      const msg = data?.message;
      Store.addNotification({
        title: "Success",
        message: msg,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true,
        },
      });
      fetchData();
    } catch (e) {
      const msg = e.response.data.message;
      toast.error(msg);
    }
  };

  return (
    <>
      <section className="sectionCont">
        <div className="pb-4  w-full flex justify-between items-center">
          <span
            className="tracking-widest text-slate-900 font-semibold uppercase"
            style={{ fontSize: "1.5rem" }}
          >
            All Product's ( Total : {total} )
          </span>
        </div>

        {data?.length === 0 || !data ? (
          <NoData message={"Vendor hasn't created any product yet "} />
        ) : (
          <>
            <div className="overFlowCont">
              <Table>
                <thead>
                  <tr>
                    <th>Sno.</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>MRP</th>
                    <th> Stock</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((i, index) => (
                    <tr key={index}>
                      <td> #{index + 1} </td>
                      <td style={{ cursor: "pointer" }}>
                        <div className="CarouselImages">
                          <img src={i.images?.[0]} alt="" />
                        </div>
                      </td>
                      <td> {i.name} </td>
                      <td>
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "2px",
                          }}
                        >
                          <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                          <span>{i.price}</span>
                        </span>
                      </td>
                      <td>
                        {i.stock >= 100 ? (
                          <Badge bg="success">{i.stock} In Stock</Badge>
                        ) : (
                          <Badge bg="danger">{i.stock} In Stock</Badge>
                        )}
                      </td>
                      <td>
                        <span className="flexCont">
                          <i
                            className="fa-sharp fa-solid fa-trash"
                            onClick={() => deleteHandler(i._id)}
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
    </>
  );
};

export default HOC(Subscription);
