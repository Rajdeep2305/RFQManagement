import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";

const VendorCr = () => {
    const { backendUrl, userData } = useContext(AppContext);
      const [data, setData] = useState([]);
      const [check, setCheck] = useState(true);
    
      const changeCheck = () => {
        setCheck(false);
      };
    
      useEffect(() => {
        let a = 0;
        if (userData) {
          a++;
        }
      }, [userData]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${backendUrl}/api/vender/data`);
            if (!response.ok) {
              throw new Error("Failed to fetch data");
            }
            const result = await response.json();// Log the data to inspect the structure
    
            // Assuming the response is an object and contains an array property like 'rfqs'
            if (result && Array.isArray(result.rfqs)) {
              setData(result.rfqs); // Access the array inside the object
            } else {
              console.error("Expected an array in 'rfqs' property", result);
              setData([]); // Set to empty array if the structure is not as expected
            }
          } catch (error) {
            console.error("Error fetching data:", error);
            setData([]); // Set to empty array in case of error
          }
        };
        fetchData();
      }, [backendUrl]);
    
      const handleDelete = async (VendorID) => {
        try {
          const response = await fetch(`${backendUrl}/api/vender/delete-vendor-by-vendor`, {
            method: "POST", // Changed method to POST
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ VendorID }), // Send the vendor in the request body
          });
    
          const result = await response.json();
    
          if (response.ok) {
            toast.success(result.message); // Success message
            // Remove the deleted RFQ from the frontend
            setData((prevData) => prevData.filter((item) => item.VendorID !== VendorID));
          } else {
            toast.error(result.message || "Failed to delete Product.");
          }
        } catch (error) {
          console.error("Error deleting RFQ:", error);
          toast.error("An error occurred while deleting the Product.");
        }
      }; 
  return (
    <div className="pt-4 px-2 w-full">
      <div className="pt-7 pl-6">
        <p className="text-[26px]">Batch Management of Products</p>
      </div>
      <div className="pt-7 lg:px-5 w-full overflow-x-auto">
        {/* Check if data is empty */}
        {data.length === 0 ? (
          <p className="text-center text-gray-500">No Products found.</p>
        ) : (
          <div className="grid gap-4">
            {data.map((item) => {
              const submissionDate = new Date(item.SubmissionDate);
              const isTimeUp = submissionDate <= new Date();
              return (
                <>
                  {item.registerId === userData.registerId ? (
                    <div
                      key={item.id}
                      className="border flex items-center min-w-[600px] gap-3 justify-evenly border-gray-300 rounded-lg p-4"
                    >
                      <>
                        <div className="flex justify-between items-center">
                          <h3 className="text-xl font-semibold">
                            {item.VendorID}
                          </h3>
                        </div>
                        <p className="mt-2 text-gray-600">
                          Product Name:{" "}
                          <strong>{item.productName}</strong>
                        </p>
                        <p className="mt-1 text-gray-600">
                          AI Bot:{" "}
                          <strong>
                            {item.assistanceBot
                              ? "yes"
                              : "no"}
                          </strong>
                        </p>
                        <div>
                          <button className="text-gray-600 hover:animate-bounce hover:text-blue-500">
                            <i className="bi bi-bell text-[20px] "></i>
                          </button>
                        </div>
                        <div className="mt-4 text-center">
                          <button
                            onClick={() => handleDelete(item.VendorID)}
                            className="bg-[#071C2D] hover:bg-[#f00] text-white px-4 py-2 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </>
                    </div>
                  ) : check ? (
                    ((
                      <p className="text-center text-gray-500">
                        No RFQs found.
                      </p>
                    ),
                    changeCheck())
                  ) : (
                    <></>
                  )}
                </>
              );
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default VendorCr
