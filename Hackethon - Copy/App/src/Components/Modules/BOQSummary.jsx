import React from "react";
import { assets } from "../../assets/assets";

const BOQSummary = () => {
  return (
    <div className="flex flex-wrap justify-between w-[calc(100vw-24px)] gap-2">
      <div className="h-fit">
        <form className=" w-[calc(100vw-24px)] lg:w-[490px] h-[151px] bg-[#dfdfe1] rounded-2xl">
          <label htmlFor="fileUpload">
            <img
              src={assets.magic}
              className=" absolute w-[54px] h-[34px] pl-2 pt-2"
              alt=""
            />
            <div className=" pt-3 flex flex-col items-center justify-center">
              <p className="text-[22px]"> Create a summary of BOQ</p>
              <input type="file" id="fileUpload" className="hidden" />
              <i class="bi bi-cloud-upload text-[30px]"></i>

              <p className="hover:underline">Upload BOQ file</p>
            </div>
            {/* <div className="flex gap-3  ">
              {/* <button className="w-[150px] h-[36px]  bg-[#9095A0] rounded-xl text-white">
                {" "}
                Previous{" "}
              </button>
              <button className="w-[150px] h-[36px] bg-[#071C2D] text-white rounded-xl">
                {" "}
                Next
              </button>
              <button className="w-[150px] h-[36px] text-black rounded-xl bg-[#F2F8FD]">
                Review
              </button> 
            </div> */}
          </label>
        </form>
      </div>
      <div>
        <div
          name=""
          id=""
          className="w-[calc(100vw-24px)] lg:w-[calc(100vw-525px)] outline-none p-3 text-[13px] sm:text-[15px] md:text-[17px] lg:text-[19px] xl:text-[21px] overflow-y-auto 2xl:text-[23px] 3xl:text-[25px] h-[151px] resize-none bg-[#f2f2f2] border-[#dfdfe1] border-[2px] rounded-xl"
        >
          <p className="text-justify font-mono text-[#565656]">
            Shadow is a dedicated and skilled team member of the Incognito Team,
            where they contribute to the team's innovative and collaborative
            efforts. With a passion for problem-solving and a strong commitment
            to excellence, they help drive the success of the team's projects.
            Their ability to adapt, communicate, and work effectively with
            others makes them an invaluable asset. Always focused on achieving
            high standards, Shadow thrives in a dynamic, fast-paced environment
            and is excited to continue growing with the team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default BOQSummary;
