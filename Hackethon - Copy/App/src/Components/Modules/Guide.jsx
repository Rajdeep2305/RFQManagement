import React from "react";
import { guide } from "../../assets/assets";
import { assets } from "../../assets/assets";
const Guide = () => {
  return (
    <div className=" pt-4">
      <p className="text-black text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] xl:text-[23px] 2xl:text-[25px] 3xl:text-[27px] text-center">Guides and Tutorials</p>

      <div className="flex overflow-auto justify-evenly gap-10  p-10 ">
        {guide.map((item, index) => (
          <div
            className="border-2 min-w-[250px] rounded-lg flex flex-wrap p-4 flex-row "
            key={index}
          >
            <div className="p-3 max-w-[300px]">
              <p className="text-black font-extrabold text-[15px] sm:text-[17px] md:text-[19px] lg:text-[21px] xl:text-[23px] 2xl:text-[25px] 3xl:text-[27px] pb-3">{item.head1}</p>
              <p className="pb-3 font-medium text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[24px]">{item.inst}</p>
              <p className="pb-3 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[24px]">{item.time}</p>
              <button className="p-2 text-[12px] sm:text-[14px] md:text-[16px] lg:text-[18px] xl:text-[20px] 2xl:text-[22px] 3xl:text-[24px] border-2 pl-2 border-black rounded-xl ">
                {item.b}
              </button>
            </div>
            <div className="pt-7">
              <video
                src="blank"
                className="bg-[#D9D9D9] w-[160px] h-[170px]"
              ></video>
            </div>
          </div>
        ))}
      </div>
      <div className=" flex justify-center">
        <button className="bg-[#071C2D] text-white p-2 rounded-xl">
          Download resources
        </button>
      </div>
    </div>
  );
};

export default Guide;
