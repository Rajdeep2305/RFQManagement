import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";

const ProfileHeader = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const userRole =
    user?.selectedValue === "VEN"
      ? "Vendor"
      : user?.selectedValue === "BUY"
      ? "Buyer"
      : "N/A";

  const onLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const { data } = await axios.post(`${backendUrl}/api/auth/logout`);
      if (data.success) {
        setIsLoggedIn(false);
        toast.success(data.message || "Logout Success");
        navigate("/");
      }
    } catch (error) {}
  };

  return (
    <div className="lg:w-[200px] h-[36px] flex items-center justify-between lg:pr-[24px]">

      {/* User profile button */}
      <span
        onClick={openModal}
        className="h-[36px] w-[36px] bg-[#071C2D] rounded-full flex justify-center items-center text-[27px] text-[#FEA500] border-[#FEA500] border-2 font-orbitron font-extrabold cursor-pointer"
      >
        {user?.name?.charAt(0).toUpperCase()}{" "}
        {/* Display first letter of user's name */}
      </span>

      {/* Modal for profile details */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white p-6 rounded-lg w-[300px] text-center relative">
            <h3 className="text-lg font-semibold mb-4">
              Dear, {user?.name || "User"}
            </h3>
            <p>
              <strong>RFQs ID:</strong> {user?.registerId || "N/A"}
            </p>
            <p>
              <strong>Email ID:</strong> {user?.email || "N/A"}
            </p>
            <p>
              <strong>Organization Name:</strong>{" "}
              {user?.organizationName || "N/A"}
            </p>
            <p>
              <strong>Phone no.:</strong> +91 {user?.phoneNo || "N/A"}
            </p>
            <p>
              <strong>Role:</strong> {userRole}
            </p>

            {/* Modal buttons */}
            <div className="mt-4 flex justify-center">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-2"
                onClick={closeModal}
              >
                Close
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                onClick={() => {
                  closeModal();
                  onLogout();
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
