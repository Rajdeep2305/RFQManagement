import React, { useEffect, useState } from "react";

const TableVen = () => {
  const [vendors, setVendors] = useState([]);
  const backendUrl = "your-backend-url-here"; // Replace with your actual backend URL

  const fetchData = async () => {
    try {
      const response = await fetch(`${backendUrl}/api/vendors`);
      if (!response.ok) {
        throw new Error("Failed to fetch vendor data");
      }

      const result = await response.json();
      console.log("Fetched Vendor Data:", result); // Log the response to inspect its structure

      if (result && result.vendors && Array.isArray(result.vendors)) {
        setVendors(result.vendors);
      } else {
        console.error("Expected an array in 'vendors' property", result);
        setVendors([]);  // Set vendors to an empty array if data is incorrect
      }
    } catch (error) {
      console.error("Error fetching vendor data:", error);
      setVendors([]);  // Handle the error by setting vendors to an empty array
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="pt-10 flex justify-center">
      <div className="overflow-x-auto w-full flex justify-center px-4">
        <table className="min-w-[500px] lg:w-[calc(100vw-10%)] border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-[#D9D9D9] text-gray-800">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Sl No.
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Vendor Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Product Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                About Product Details
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Rating
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Chat with Vendor Assistance
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.length > 0 ? (
              vendors.map((vendor, index) => (
                <tr key={vendor.id || index} className="odd:bg-gray-50 even:bg-white">
                  <td className="border border-gray-300 px-4 py-2">{vendor.VendorID}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.VendorName}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.productName}</td>
                  <td className="border border-gray-300 px-4 py-2">{vendor.productDetails}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    <span className="flex items-center">
                      <i className="bi bi-star-fill text-yellow-500 mr-2"></i>
                      {vendor.rating}
                    </span>
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <div className="flex items-center gap-2">
                      <i className="bi bi-chat-dots text-blue-500 text-xl"></i>
                      <span>{vendor.VendorMobile}</span>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-[26px] text-center bg-slate-200" colSpan={6}>
                  There are no data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableVen;
