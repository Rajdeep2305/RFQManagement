import React from "react";
import CreationForm from "./CreationForm";
import BOQSummary from "./BOQSummary";
const Creation = () => {
  return (
    <div className="p-3 h-fit max-w-screen flex flex-wrap gap-1">
      <p className="text-center w-[calc(100vw-24px)] text-[25px] font-bold">Summary</p>
      <BOQSummary/>
      <CreationForm/>
    </div>
  );
};

export default Creation;
