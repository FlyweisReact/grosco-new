/** @format */

import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <>
    <div></div>
      <Spinner animation="border" role="status" >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </>
  );
};

export default Loader;
