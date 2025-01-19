import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const RFQForm = () => {
  const navigate = useNavigate();
  const [buyerEmail, getBuyerEmail] = useState("");
  const [ContactName, getContactName] = useState("");
  const [ContactNumber, getContactNumber] = useState("");
  const [BuyerOrganizationName, getBuyerOrganizationName] = useState("");
  const [SubmissionDate, getSubmissionDate] = useState("");
  const [RFQProductName, getRFQProductName] = useState("");
  const [RFQProductSpecification, getRFQProductSpecification] = useState("");
  const [RFQProductQuantity, getRFQProductQuantity] = useState("");
  const [UploadBOQ, getUploadBOQ] = useState("");
  const [deliveredLocation, getDeliveredLocation] = useState("");
  const [onGoingRegister, setOnGoingRegister] = useState(false);
  const { backendUrl, ShowCreatedRFQs, userData } = useContext(AppContext);

  const OnGoing = () => {
    if (
      ContactName ||
      ContactNumber ||
      BuyerOrganizationName ||
      SubmissionDate ||
      RFQProductName ||
      RFQProductQuantity ||
      RFQProductSpecification
    ) {
      setOnGoingRegister(true);
    }
  };

  const onSubmitHandlerRFQ = async (e) => {
    e.preventDefault();
    if (
      !ContactName ||
      !ContactNumber ||
      !BuyerOrganizationName ||
      !SubmissionDate ||
      !RFQProductName ||
      !RFQProductQuantity ||
      !RFQProductSpecification
    ) {
      toast.error("All fields are required");
      return;
    }

    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/rfq/createRfq`, {
        buyerEmail: userData.email,
        ContactName,
        ContactNumber,
        BuyerOrganizationName,
        SubmissionDate,
        RFQProductDetails: null,
        RFQProductName,
        RFQProductQuantity,
        RFQProductSpecification,
        UploadBOQ,
        deliveredLocation,
      });

      if (data.success) {

        ShowCreatedRFQs(buyerEmail);
        toast.success(
          data.message + " " + data.rfqID || "Rfq Creation Successful"
        );
        navigate('/Management')
        setOnGoingRegister(false);
      } else {
        toast.error(data.message);
      }
      setOnGoingRegister(false);
    } catch (error) {
      toast.error("Error during RFQCreation");
    }
  };

  const today = new Date().toISOString().split("T")[0];
    
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
      <form onSubmit={onSubmitHandlerRFQ} className="w-full ">
        <div className="w-full">
          <div className="w-full mb-3">
            <label className="block mt-3 text-sm font-medium text-gray-700  text-[18px]">
              Upload Your BOQ (Optional)
            </label>
            <input
              onChange={(e) => getUploadBOQ(e.target.value)}
              type="file"
              title="Upload only csv or excel file"
              className="mt-1 block  border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm w-[calc(100vw-50px)] border-2 p-3"
            />
          </div>

          {/* Email */}
          <div className="flex flex-wrap justify-evenly gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => getBuyerEmail(e.target.value)}
                value={userData.email}
                type="email"
                required
                className="mt-1 block lg:w-[450px] border-2 w-[calc(100vw-50px)] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Contact Person */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Person <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => getContactName(e.target.value)}
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
                onChange={(e) => getContactNumber(e.target.value)}
                type="tel"
                required
                className="mt-1 block lg:w-[450px] border-2 w-[calc(100vw-50px)] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm outline-none"
                placeholder="Enter contact number"
              />
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => getBuyerOrganizationName(e.target.value)}
                type="text"
                required
                className="mt-1 block border-2 w-[calc(100vw-50px)] lg:w-[450px] p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Enter company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Product name<span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => getRFQProductName(e.target.value)}
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
                onChange={(e) => getRFQProductSpecification(e.target.value)}
                type="text"
                required
                className="mt-1 block  w-[calc(100vw-50px)] lg:w-[450px] border-2 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity <span className="text-red-500">*</span>
              </label>
              <input
                onChange={(e) => getRFQProductQuantity(e.target.value)}
                type="text"
                required
                className="mt-1 block  w-[calc(100vw-50px)] lg:w-[450px] border-2 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Procurement end date <span className="text-red-500">*</span>
              </label>
              <input
                min={today}
                onChange={(e) => getSubmissionDate(e.target.value)}
                type="date"
                required
                className="mt-1 block w-[calc(100vw-50px)] lg:w-[450px] border-2 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          {/*Procurement end date */}

          {/* Delivery Location */}
          <div className="pt-2">
            <label className="block text-sm font-medium text-gray-700">
              Delivery Location (Optional)
            </label>
            <input
              onChange={(e) => getDeliveredLocation(e.target.value)}
              type="text"
              className="mt-1 block lg:w-[618px] w-[calc(100vw-50px)] border-2 p-3 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter delivery location"
            />
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

export default RFQForm;
