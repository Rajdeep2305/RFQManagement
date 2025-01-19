import React from "react";
import Navbar from "../Modules/Navbar";
import DecisionsVen from "../Modules/DecisionsVen";
import TableRFQ from "../Modules/TableRFQ";

const SearchRFQ = () => {
  return (
    <div className="max-w-screen">
      <Navbar />
      <div className="p-3">
        <TableRFQ />
        <DecisionsVen />
      </div>
    </div>
  );
};

export default SearchRFQ;
