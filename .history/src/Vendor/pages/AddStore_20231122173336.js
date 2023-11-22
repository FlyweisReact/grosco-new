/** @format */

import React from "react";
import HOC from "../layout/HOC";

const AddStore = () => {
  return (
    <section className="sectionCont">
      <div className="pb-4   w-full flex justify-between items-center">
        <span
          className="tracking-widest text-slate-900 font-semibold uppercase"
          style={{ fontSize: "1.5rem" }}
        >
          All Vendor's ({data?.length})
        </span>
        <div className="d-flex gap-2 flex-wrap">
          <button
            className="md:py-2 px-3 md:px-4 py-1 rounded-sm bg-[#042b26] text-white tracking-wider"
            onClick={() => setModalShow(true)}
          >
            Create
          </button>
        </div>
      </div>

    </section>
  );
};

export default HOC(AddStore);
