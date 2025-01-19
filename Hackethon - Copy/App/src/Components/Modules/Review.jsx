import React, { useState } from "react";
import { Revi } from "../../assets/assets"; // Assuming Revi is an array of review objects

const Review = () => {
  // Initialize state variable to manage the current review index
  const [currentIndex, setCurrentIndex] = useState(0);

  // Handle left button click to show previous review
  const leftCall = () => {
    // Update to previous index, wrapping around if needed
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? Revi.length - 1 : prevIndex - 1
    );
  };

  // Handle right button click to show next review
  const rightCall = () => {
    // Update to next index, wrapping around if needed
    setCurrentIndex((prevIndex) =>
      prevIndex === Revi.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="max-w-screen">
      <p className="text-[20px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[40px] 2xl:text-[45px] 3xl:text-[50px] text-center font-bold">Review</p>
      <div className="block lg:flex flex-col">
        {Revi.slice(currentIndex, currentIndex + 1).map((item) => (
          <div
            key={item.id}
            className="block sm:flex justify-evenly h-[312px] items-center m-4 bg-[#fff] p-5 min-w-[300px]"
          >
            <img
              src={item.img}
              alt=""
              className="h-[312px] w-[280x] rounded-[16px]"
            />
            <div className="ml-4 flex flex-col justify-evenly h-full">
              <div className="flex gap-3">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`${
                      i < item.star ? "text-[#ffad00]" : "text-[#555]"
                    } font-extrabold text-[30px] gap-9`}
                  >
                    &#9733;
                  </span>
                ))}
              </div>
              <p className="text-[10px] sm:text-[13px] md:text-[16px] lg:text-[19px] xl:text-[22px] 2xl:text-[25px] 3xl:text-[28px]">{item.desc}</p>
              <div>
                <p className="text-[7px] sm:text-[10px] md:text-[13px] lg:text-[16px] xl:text-[19px] 2xl:text-[21px] 3xl:text-[24px] font-bold">{item.name}</p>
                <p className="text-[7px] sm:text-[10px] md:text-[13px] lg:text-[16px] xl:text-[19px] 2xl:text-[21px] 3xl:text-[24px]">{item.position}</p>
              </div>
            </div>
          </div>
        ))}
          <div className="flex gap-5 mr-7 mb-4 justify-end items-center">
            {/* Left Arrow Button */}
            <button onClick={leftCall} className="rotate-180">
              &#x27A7;
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {Revi.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 w-3 ${
                    i === currentIndex ? "bg-slate-900" : "bg-slate-500"
                  } rounded-full`}
                ></div>
              ))}
            </div>

            {/* Right Arrow Button */}
            <button onClick={rightCall} className="text-[20px]">
              &#x27A7;
            </button>
          </div>
      </div>
    </div>
  );
};

export default Review;
