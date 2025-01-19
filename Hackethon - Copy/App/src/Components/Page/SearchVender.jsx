import React from "react";
import Navbar from "../Modules/Navbar";
import AiSearch from "../Modules/AiSearch";
import TableVen from "../Modules/TableVen";
import DecisionsVen from '../Modules/DecisionsVen'

const SearchVender = () => {
  return (
    <div className="max-w-screen">
      <Navbar />
      <div className="p-3">
      <div className="text-center text-red-500 font-extrabold text-[30px] absolute">***In this page there is some logical Error</div>
        <AiSearch />
        <TableVen/>
        {/* <GetVendor/> */}
        <DecisionsVen/>
      </div>
    </div>
  );
};

export default SearchVender;
