import React from "react";

const Status = () => {
  return (
    <div className="pt-6">
      <div className="px-9  ">
        <p className="text-[28px]">
          {" "}
          RFQ status tracking and notifications{" "}
          <i class="bi bi-bell h-[49pxx]"></i>
        </p>
      </div>
      <div className="flex justify-around p-5">
        <div className="flex flex-wrap w-full justify-evenly gap-10">
          <div className="">
            <p className="font-bold">RFQ submitted</p>
            <p className="pt-1">Your RFQ has been succesfully submitted</p>
            <p className="pt-5 text-gray-400">Just now</p>
          </div>
          <div>
            <p className="font-bold">RFQ Updated</p>
            <p className="pt-1">The status of your RFQ has been updated</p>
            <p className="pt-5 text-gray-400">10 mins ago</p>
          </div>
          <div>
            <p className="font-bold">Supplier response</p>
            <p className="pt-1">Supplier a has responde to your RFQ</p>
            <p className="pt-5 text-gray-400">5 mins ago</p>
          </div>
          <div>
            <p className="font-bold">RFQ closed</p>
            <p className="pt-1">Your RFQ has been closed succesfully </p>
            <p className="pt-5 text-gray-400">15 mins ago</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
