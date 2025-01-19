import React from 'react';
import { Link } from 'react-router-dom';

const LoginRegister = () => {
  return (
    <div className='flex justify-between w-screen sm:w-fit items-center'>
      <Link to="/login">
        <div className='bg-[#C99300] cursor-pointer transform transition duration-300 shadow-md hover:scale-110 w-[80px] lg:w-[160px] h-[36px] flex justify-center items-center mx-[13px] text-[#fff] text-[14px] rounded-[10px]'>Login</div>
      </Link>
      <Link to="/register">
        <div className='bg-[#071C2D] cursor-pointer transform transition duration-300 shadow-md hover:scale-110 w-[80px] lg:w-[160px] h-[36px] flex justify-center items-center mx-[13px] text-[#fff] text-[14px] rounded-[10px]'>Register</div>
      </Link>
      <Link to='/help'>
      <div className='bg-[#071C2D] cursor-pointer transform transition duration-300 shadow-md hover:scale-110 w-[80px] lg:w-[160px] h-[36px] flex justify-center items-center mx-[13px] text-[#fff] text-[14px] rounded-[10px]'>? Help</div>
      </Link>
    </div>
  );
};

export default LoginRegister;
