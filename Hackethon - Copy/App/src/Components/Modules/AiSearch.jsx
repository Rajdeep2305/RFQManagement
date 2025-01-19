import React from "react";
import { aISearch } from "../../assets/assets";
const AiSearch = () => {
  return (
    <div className="flex w-full gap-3 justify-evenly pt-10 overflow-auto">
      {aISearch.map((item, index) => (
        <div className="border-2 rounded-lg flex flex-wrap p-4 flex-row min-w-[250px]" key={index}>
          <div className="p-3">
            <p className="text-black text-[24px] pb-3">{item.head2}</p>

            <p className="pb-3 text-gray-300 text-pretty">{item.rate}</p>
            <p className="pb-3 text-gray-300">{item.rating}</p>
            <button className="p-2 border-2 pl-2 border-black rounded-xl w-[100px] ">
              {item.b1}
            </button>
          </div>
          <div className="pt-7">
            <img
              src={item.image1}
              className="bg-[#D9D9D9] w-[200px] h-[190px]"
            ></img>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AiSearch;
