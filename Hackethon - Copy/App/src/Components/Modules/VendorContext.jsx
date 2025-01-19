import React, { useState } from "react";
import { Link } from "react-router-dom";

const VendorContext = () => {
  const [isMenu, setIsMenu] = useState(false);

  const ShowMenu = () => {
    setIsMenu(!isMenu);
  };
  return (
    <>
      <div className="sm:w-full flex flex-wrap justify-center items-center">
        <Link to={"/"}>
          <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
            Home
          </div>
        </Link>
        <Link to={"/SearchRFQs"}>
          <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
            Search RFQs
          </div>
        </Link>
        <Link to={"/ProductManagement"}>
          <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
            Product Management
          </div>
        </Link>
        <Link to={"/CreateProduct"}>
          <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
            Create Products
          </div>
        </Link>
        <Link to={"/help"}>
          <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
            Help
          </div>
        </Link>
      </div>
      <div>
        <div
          onClick={ShowMenu}
          className="flex lg:hidden flex-col justify-between transform transition duration-500 items-center gap-1"
        >
          <div
            className={`h-1.5 rounded-xl w-8 transform transition duration-500 bg-black ${
              isMenu && "rotate-45 -mb-2.5"
            }`}
          ></div>
          <div
            className={`h-1.5 rounded-xl w-8 transform transition duration-500 bg-black ${
              isMenu && "hidden"
            }`}
          ></div>
          <div
            className={`h-1.5 rounded-xl w-8 transform transition duration-500 bg-black ${
              isMenu && "-rotate-45"
            }`}
          ></div>
        </div>
        {isMenu ? (
          <div>
            <div className=" absolute z-50 bg-[#fff] top-[56px] right-0">
              <Link to={"/"}>
                <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
                  Home
                </div>
              </Link>
              <Link to={"/SearchRFQs"}>
                <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
                  Search RFQs
                </div>
              </Link>
              <Link to={"/ProductManagement"}>
                <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
                  Product Management
                </div>
              </Link>
              <Link to={"/CreateProduct"}>
                <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
                  Create Products
                </div>
              </Link>
              <Link to={"/help"}>
                <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
                  Help
                </div>
              </Link>
              <Link to={"/TechManage"}>
                <div className="hidden lg:flex justify-center items-center w-[200px] h-full text-[14px] cursor-pointer text-[#565E6C] text-center font-semibold hover:font-extrabold hover:text-[#000]">
                  Technical Evaluation
                </div>
              </Link>
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
};

export default VendorContext;
