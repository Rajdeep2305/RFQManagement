import React, { useState } from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const OpenChat = () => {
    setIsChatOpen(!isChatOpen);
  };
  return (
    <>
      <div className="max-w-screen flex flex-wrap justify-around">
        <div className="pt-7 h-[900px]">
          <div className="flex justify-center  items-center">
            <img onClick={OpenChat} src={assets.Ai} className="cursor-pointer w-[289px]"></img>
            {
                isChatOpen && <div onClick={OpenChat} className="cursor-pointer text-[30px] ml-[30px]">X</div>
            }
          </div>
          {isChatOpen && (
            <div className=" flex flex-col justify-end m-3 w-screen md:w-[400px] h-[600px] bg-slate-100 ">
              <div className=" overflow-auto p-3">
                <div className="flex gap-2 border-[1px] w-fit justify-center items-center rounded-full pr-3 bg-[#fff]">
                  <div className="h-5 w-5 bg-black rounded-full"></div>
                  <p className="">hi</p>
                </div>
                <div className="w-full flex justify-end">
                <div className="flex flex-row-reverse gap-2 border-[1px] w-fit justify-center items-center rounded-full pl-3 bg-[#fff]">
                  <div className="h-5 w-5 bg-black rounded-full"></div>
                  <p className="">hello</p>
                </div>
                </div>
              </div>
              <div className="">
                <div className="w-screen md:w-[400px] h-[52px] border -4 rounded-sm flex items-center gap-3 ">
                  <div className=" flex gap-3">
                    <i class="bi bi-plus-lg cursor-pointer"></i>
                    <i class="bi bi-card-image cursor-pointer"></i>
                    <i class="bi bi-paperclip cursor-pointer"></i>
                  </div>
                  <div className="relative w-full flex items-center gap-3">
                    <input
                      type="text"
                      placeholder="type a message"
                      className=" p-4 px-10 pr-12 w-full rounded-xl border-2 h-[35px] bg-[#F3F4F6] "
                    ></input>
                    <i class="bi bi-emoji-smile-fill absolute  right-10 top-2"></i>

                    <i className="bi bi-send cursor-pointer mr-2 right-3 top-2"></i>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="pt-7">
          <div className="pt-14 pb-3">
            <input
              type="email"
              required
              placeholder="Your mail"
              className="border-2 w-fit lg:w-[599px] rounded-lg p-3"
            />
          </div>
          <textarea
            type="text"
            required
            cols={4}
            placeholder="your message"
            className="border-2 resize-none w-full lg:w-[599px] rounded-lg p-3"
          ></textarea>
          <div className="pt-3">
            <button className="bg-[#071C2D] text-white w-[200px] h-[36px] rounded-xl">
              Send message
            </button>
          </div>
          <div className="h-[200px]"></div>
          <div className="items-center">
            <p>Customer Service:</p>
            <p>Email: support@example.com</p>
            <p>Phone: +1-800-555-0199</p>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="flex justify-center py-5">
        <div className="">
        This project is developed by <strong>'Incognito Team Members'</strong>
        <div className="w-full flex justify-evenly">
          <a href="https://github.com/Rajdeep2305" className="hover:underline">Rajdeep Pal</a>
          <a className="hover:underline" href="https://www.linkedin.com/in/shaunak-ghosh-752b74329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">Shaunak Ghosh</a>
        </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
