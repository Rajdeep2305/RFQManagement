import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { useSearch } from "../../Context/SearchContext";

const TableRFQ = () => {
  const { backendUrl } = useContext(AppContext);
  const [FullRFQ, setFullRFQ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/rfq/data`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        console.log("Fetched Data:", result); // Log the data to inspect the structure

        if (result && Array.isArray(result.rfqs)) {
          setFullRFQ(result.rfqs);
        } else {
          console.error("Expected an array in 'rfqs' property", result);
          setFullRFQ([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setFullRFQ([]);
      }
    };
    fetchData();
  }, [backendUrl]);

  const { searchQuery, updateSearchQuery } = useSearch();

  const handleSearchChange = (e) => {
    updateSearchQuery(e.target.value);
  };

  const filteredTickets = FullRFQ?.filter((item) => {
    const rfqID = item?.rfqID || "";
    const RFQProductName = item?.RFQProductName || "";
    const deliveredLocation = item?.deliveredLocation || "";

    return (
      rfqID.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      RFQProductName.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      deliveredLocation
        .toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  });

  return (
    <>
      <div className="flex flex-wrap items-center pt-8 px-4 justify-center gap-3">
        <div>
          <select
            className="border-2 flex justify-center items-center outline-none bg-gray-200 text-gray-500 rounded-2xl w-[calc(100vw-20px)] sm:w-[180px] h-[30px] md:h-[48px] pl-2"
            value="all"
          >
            <option value="all">All</option>
            <option value="productName">ProductName</option>
            <option value="productDetails">Product Details</option>
            <option value="address">Address</option>
          </select>
        </div>
        <div>
          <input
            name="find"
            id="find"
            required
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search Vendor"
            className="flex border-2 outline-none p-2 w-[calc(100vw-20px)] sm:w-[calc(100vw-232px)] md:w-[calc(100vw-300px)] lg:w-[700px] h-[30px] md:h-[48px] bg-gray-200 rounded-2xl text-gray-500 px-2"
          />
        </div>
        <button className="bg-gray-200 hidden rounded-full border-2 border-gray-300 md:flex items-center justify-center w-[40px] h-[40px]">
          <i className="bi bi-search text-[25px] text-[#363636] font-bold"></i>
        </button>
      </div>
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
                  Status
                </th>
                <th className="border border-gray-300 px-4 py-2 text-left">
                  Event
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.length ? (
                filteredTickets.map((vendor, index) => (
                  <tr
                    key={vendor.key || index}
                    className="odd:bg-gray-50 even:bg-white"
                  >
                    <td className="border border-gray-300 px-4 py-2">
                      {vendor.rfqID}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vendor.ContactName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vendor.RFQProductName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vendor.SubmissionDate}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                    {vendor.assistanceBot ? "Pending" : "Submitted"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {vendor.assistanceBot? (<button className="h-20px w-[150px] bg-blue-500">Apply</button>):(<div className="text-red-500">Closed</div>)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    className="text-[26px] text-center bg-slate-200"
                    colSpan={6}
                  >
                    There are no data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TableRFQ;
