import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rfqData, setRfqData] = useState([]);

  // Function to check the authentication state
  const getAuthState = useCallback(async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage

      if (!token) {
        setIsLoggedIn(false);
        setLoading(false);
        return;
      }

      // Validate token with the backend
      const { data } = await axios.get(`${backendUrl}/api/auth/validity`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setIsLoggedIn(true);
        if (data.registerId) {
          await getUserData(data.registerId); // Fetch user data if authenticated
        } else {
          toast.error("Register ID not found in auth response.");
        }
      } else {
        setIsLoggedIn(false);
        toast.error("Not authenticated");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to authenticate");
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  }, [backendUrl]);

  // Function to fetch created RFQs

  const ShowCreatedRFQs = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/rfq/data`);
      if (response.success) {
        toast.success(response.massage);
        console.log(response.allRfqData);
        setRfqData(response.allRfqData);
      } else {
        console.error("Failed to fetch RFQs:", response.massage);
      }
    } catch (error) {
      console.error("Error fetching RFQs:", error);
    }
  };

  // Function to fetch user data from the backend
  const getUserData = async (registerId) => {
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/user/data`,
        { registerId },
        { withCredentials: true }
      );

      if (data.success) {
        setUserData(data.userData); // Update user data in state
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const getAllVendorData = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/vender/data`);

      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  // Fetch authentication state on component mount
  useEffect(() => {
    getAuthState();
  }, [getAuthState]);

  // Context value to provide
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    loading,
    getAllVendorData,
    rfqData,
    ShowCreatedRFQs,
  };

  return (
    <AppContext.Provider value={value}>
      {loading ? <div>Loading...</div> : props.children}
    </AppContext.Provider>
  );
};
