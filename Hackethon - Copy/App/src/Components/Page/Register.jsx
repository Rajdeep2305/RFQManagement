import React from "react";
import { assets } from "../../assets/assets";
import RegisterFrom from "../Modules/RegisterFrom";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="max-w-screen h-screen">
      <Link to="/">
        <img
          className="cursor-pointer absolute hidden md:flex md:w-[550px] lg:w-[600px]"
          src={assets.logo}
          alt=""
        />
      </Link>
      <RegisterFrom />
    </div>
  );
};

export default Register;
