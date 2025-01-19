import React from "react";
import { asearch2 } from "../../assets/assets";

const DecisionsVen = () => {
  return (
    <div className="pt-10">
      {" "}
      <div className="">
        <p className="text-[29px] pl-10 "> Decision support tools </p>
      </div>
      <div className="pt-10 flex justify-evenly gap-6 overflow-auto">
        {asearch2.map((item, index) => (
          <div className="border-2 rounded-lg flex p-4 flex-row min-w-[250px] xl:w-[500px] flex-wrap" key={index}>
            <div className="p-3">
              <p className="text-black text-[24px] pb-3">{item.head4}</p>

              <p className="pb-3 text-gray-300 xl:w-[200px]">{item.Sen}</p>
              <p className="pb-3 text-gray-300">{item.Publish}</p>
              <button className="p-2 border-2 pl-2 border-black rounded-xl w-[108px]">
                {item.b3}
              </button>
            </div>
            <div className="pt-7">
              <img
                src={item.image3}
                className="bg-[#D9D9D9] w-[160px] h-[190px]"
              ></img>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DecisionsVen;
