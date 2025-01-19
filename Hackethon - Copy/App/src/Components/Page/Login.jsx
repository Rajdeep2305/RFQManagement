import React from "react";
import { assets } from "../../assets/assets";
import LoginFrom from "../Modules/LoginFrom";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="max-w-screen h-screen">
      <Link to="/">
        <img
          className="cursor-pointer absolute hidden md:flex md:w-[550px] lg:w-[600px]"
          src={assets.logo}
          alt=""
        />
      </Link>
      <LoginFrom />
    </div>
  );
};

export default Login;
