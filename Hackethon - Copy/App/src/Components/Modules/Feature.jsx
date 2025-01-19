import React from "react";
// import "./CSS/Feature.css";
import { featureList } from "../../assets/assets";
const Feature = () => {
  return (
    <div className="max-w-screen p-2 lg:p-20 " >
      <div className="Heading p-3">
        <h1 className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[40px] 2xl:text-[45px] 3xl:text-[50px] text-center font-bold">Features</h1>
        <div className="flex overflow-auto justify-evenly p-1 lg:p-12 gap-10 " >
          {featureList.map((item, index) => (
              <div className="border-2 p-6 rounded-xl min-w-[300px]" key={index}>
                <div className=" flex justify-center ">
                <img src={item.image} className="flex w-20 h-20 pb-5 "></img>
                </div>
                <div className=" justify-center ">            
                <h1 className="text-black  text-[20px] font-bold p-3" >{item.name}</h1>
                </div>
                <div div className="p-3">
                <p className="text-gray-300">{item.sub}</p>
                </div>
                <p className="text-justify">{item.desc}</p>
                <div className="p-2">
                <button className="rounded-full bg-blue-200 w-10 h-10">&#8594;</button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center items-center">   
        <button className=" rounded-lg  bg-[#071C2D] w-275 h-50 text-white text-[18px] px-4 py-1">Explore features</button>
        </div>
      </div>
      
    </div>
  );
};

export default Feature;
