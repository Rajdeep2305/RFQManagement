import React from "react";
import { asearch1 } from "../../assets/assets";
const GetVendor = () => {
  return (
    <div className="pt-12 ">
      <div className="">
        <p className="text-[29px] pl-10 "> Vendor bid comparison </p>
      </div>
      <div className="pt-7 flex justify-evenly">
        {asearch1.map((item, index) => (
          <div className="border-2 rounded-lg flex p-4 flex-row " key={index}>
            <div className="p-3">
              <p className="text-black text-[24px] pb-3">{item.head3}</p>

              <p className="pb-3 text-gray-300">{item.Price}</p>
              <p className="pb-3 text-gray-300">{item.Delivery}</p>
              <button className="p-2 border-2 pl-2 border-black rounded-xl w-[108px]">
                {item.b2}
              </button>
            </div>
            <div className="pt-7">
              <img
                src={item.image2}
                className="bg-[#D9D9D9] w-[160px] h-[190px]"
              ></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GetVendor;
