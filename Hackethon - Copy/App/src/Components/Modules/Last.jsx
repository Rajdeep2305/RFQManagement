import React from "react";
import { assets, la } from "../../assets/assets";

const Last = () => {
  return (
    <div className="p-9 max-w-screen mt-[200px] sm:mt-[10px] md:mt-0">
      <div className="flex justify-center">
        <img src={assets.logo} className="w-60"></img>
      </div>
      <div className="flex flex-wrap justify-evenly  gap-13 p-8 ">
        {la.map((item, index) => (
          <div key={index} className="justify-center">
            <a href="#" className="flex font-bold text-black text-[20px]">{item.head}</a>
            <a href="#" className="flex p-3">{item.blo}</a>
            <a href="#" className="flex p-3">{item.web}</a>
            <a href="#" className="flex p-3">{item.Us}</a>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <div className="flex justify-center">
          <i className="bi bi-c-circle absolute left-2"></i>
          <p>
            2025 brand , Inc. <span className="align-super pr-1">.</span>Privacy{" "}
            <span className="align-super pr-1">.</span>terms and conditions
            <span className="align-super pr-1">.</span> sitemap
          </p>
        </div>
        <div className="flex gap-4">
          <i class="bi bi-twitter-x"></i>
          <i class="bi bi-facebook"></i>
          <i class="bi bi-linkedin"></i>
          <i class="bi bi-youtube"></i>
        </div>
      </div>
    </div>
  );
};

export default Last;
