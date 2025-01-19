import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ProductFrom = () => {
  const navigate = useNavigate();
  const [VenderName, setVenderName] = useState("");
  const [VendorMobile, setVendorMobile] = useState("");
  const [productName, setProductName] = useState("");
  const [productDetails, setProductDetails] = useState("");
  const [productSpecification, setProductSpecification] = useState("");
  const [address, setAddress] = useState("");
  const [assistanceBot, setAssistanceBot] = useState("");
  const [onGoingRegister, setOnGoingRegister] = useState(false);
  const { backendUrl, ShowCreatedRFQs, userData } = useContext(AppContext);

  const OnGoing = () => {
    if (
      VenderName ||
      VendorMobile ||
      productName ||
      productDetails ||
      productSpecification ||
      address ||
      assistanceBot
    ) {
      setOnGoingRegister(true);
    }
  };

  const onSubmitHandlerRFQ = async (e) => {
    e.preventDefault();
    if (
      !VenderName ||
      !VendorMobile ||
      !productName ||
      !productDetails ||
      !productSpecification ||
      !address ||
      !assistanceBot
    ) {
      setOnGoingRegister(false);
      toast.error("All fields are required");
      return;
    }
  
    try {
      axios.defaults.withCredentials = true;
      
      const formData = {
        VenderName,
        VendorEmail: userData.email,
        VendorMobile,
        productName,
        productDetails,
        productSpecification,
        address,
        assistanceBot,
      };
      
      console.log("Request Data:", formData);  // Log the request data for debugging
      
      const { data } = await axios.post(
        `${backendUrl}/api/vender/create-vendor`,
        formData
      );
      
      console.log("Response Data:", data);  // Log the response data for debugging
  
      if (data.success) {
        toast.success(data.message || "Product Submit Successful");
        navigate("/ProductManagement");
        setOnGoingRegister(false);
      } else {
        toast.error(data.message);
      }
      
      setOnGoingRegister(false);
    } catch (error) {
      setOnGoingRegister(false);
      console.error("API Error:", error.response || error.message || error);  // Log error details
      toast.error("Error during Product Submission");
    }
  };
  
  return (
    <div className="pt-4 pl-2 w-full">
      {onGoingRegister && (
        <div className="h-screen w-screen top-0 left-0 fixed flex gap-4 justify-center items-center bg-[#0004] z-50">
          <div className="h-[15px] w-[15px] animate-round rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-100 rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-200 rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-300 rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-400 rounded-full bg-white"></div>
        </div>
      )}
      <form onSubmit={onSubmitHandlerRFQ} className="w-full flex flex-col justify-center items-center">
        <div className="max-w-[1000px] bg-slate-100 px-3 py-7 m-3 rounded-md">
          {/* Email */}
          <div className="flex flex-wrap justify-evenly gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                value={userData.email}
                readOnly
                type="email"
                required
                className="mt-1 block lg:w-[450px] border-2 w-[calc(100vw-50px)] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vendor Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setVenderName(e.target.value)}
                type="text"
                required
                className="mt-1 block lg:w-[450px] border-2 w-[calc(100vw-50px)] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                placeholder="Enter contact person"
              />
            </div>
            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 ">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setVendorMobile(e.target.value)}
                type="tel"
                required
                className="mt-1 block lg:w-[450px] border-2 w-[calc(100vw-50px)] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                placeholder="Enter contact number"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setProductName(e.target.value)}
                type="text"
                required
                className="mt-1 block border-2 w-[calc(100vw-50px)] lg:w-[450px] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product Details<span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setProductDetails(e.target.value)}
                required
                name="product"
                type="text"
                className=" border-gray-300 w-[calc(100vw-50px)] lg:w-[450px] border-2 p-3 rounded-md shadow-sm"
              />
            </div>

            {/* Product specific */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product specifications <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setProductSpecification(e.target.value)}
                type="text"
                required
                className="mt-1 block  w-[calc(100vw-50px)] lg:w-[450px] border-2 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Do you need AssistanceBot?{" "}
                <span className="text-red-500">*</span>
              </label>
              <select
                onChange={(e) => setAssistanceBot(e.target.value)}
                required
                className="mt-1 block w-[calc(100vw-50px)] lg:w-[450px] border-2 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option selected disabled>Select an option</option>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Delivery Location <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => setAddress(e.target.value)}
                type="text"
                className="mt-1 block lg:w-[450px] border-2 w-[calc(100vw-50px)] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                placeholder="Enter delivery location"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={OnGoing}
            type="submit"
            className="px-6 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Create RFQ
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductFrom;
