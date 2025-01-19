import React, { useContext } from "react";
import { AppContext } from "../../Context/AppContext";
import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
const Part = () => {
  const { isLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const explore = () =>{
    if(!isLoggedIn){
      navigate('/login')
    } 
  }

  return (
    <div className="flex max-w-screen justify-center items-center">
      <div className="absolute ">
        <div className="bg-[#5556] hi px-4 h-[45px] sm:h-[60px] md:h-[75px] lg:h-[90px] xl:h-[105px] 2xl:h-[120px] 3xl:h-[135px] pt-2 w-full flex flex-col justify-between items-center">
          <h1 className="text-white text-[10px] sm:text-[15px] md:text-[20px] lg:text-[25px] xl:text-[30px] 2xl:text-[35px] 3xl:text-[40px] font-extrabold">
            CONNECT WITH VENDORS EFFORTLESSLY
          </h1>
          <h3 className="text-white text-[6px] sm:text-[10px] md:text-[14px] lg:text-[18px] xl:text-[22px] 2xl:text-[26px] 3xl:text-[330px] pb-5">
            Streamline your vendor partnership with ease and efficiency
          </h3>
        </div>
        <div className="flex justify-center items-center pt-9">
        <button onClick={explore} className="bg-[#071C2D] text-[7px] sm:text-[10px] md:text-[13px] lg:text-[16px] xl:text-[19px] 2xl:text-[21px] 3xl:text-[24px] px-4 py-1 rounded-[10px] text-[#fff] ">Explore now</button>
        </div>
      </div>
      <img src={assets.background} className="w-full h-[200px] sm:h-[300px] md:h-[350px] lg:h-[400px] xl:h-[450px] 2xl:h-[500px] 3xl:h-[550px]" alt="" />
    </div>
  );
};

export default Part;
