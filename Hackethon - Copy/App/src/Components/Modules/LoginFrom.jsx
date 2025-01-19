import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [registerId, setRegisterId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { backendUrl,ShowCreatedRFQs, setIsLoggedIn, getUserData } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const onLogin = async (e) => {
    e.preventDefault();
  
    // Check if all fields are filled
    if (!backendUrl || !email || !password || !registerId) {
      toast.error("All fields are required");
      return;
    }
  
    setIsLoading(true);
  
    try {
      axios.defaults.withCredentials = true;
  
      // Send login request to the backend
      const { data } = await axios.post(`${backendUrl}/api/auth/login`, {
        registerId,
        email,
        password,
      });
  
      if (data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
  
        // Update app state
        setIsLoggedIn(true);
        await getUserData(registerId);
  
        toast.success(data.message || "Login Successful");
        ShowCreatedRFQs(email);
        // Navigate to the homepage or dashboard
        navigate("/");
      } else {
        toast.error(data.message || "Login Failed");
      }
    } catch (error) {
      toast.error(
        "Error during login: " + (error.response?.data?.message || error.message)
      );
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="flex gap-2">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`h-4 w-4 rounded-full bg-white animate-bounce`}
                style={{ animationDelay: `${i * 0.1}s` }}
              ></div>
            ))}
          </div>
        </div>
      )}
      <form
        className="h-[380px] p-3 text-[14px] max-w-screen sm:w-[490px] bg-[#EDEDED] flex flex-col justify-evenly items-center"
        onSubmit={onLogin}
      >
        <p className="text-center text-lg font-bold">Login Now</p>
        <label htmlFor="registerId" className="sr-only">
          RFQs ID/Vendor ID
        </label>
        <input
          id="registerId"
          onChange={(e) => setRegisterId(e.target.value)}
          value={registerId}
          placeholder="Enter Your RFQs ID/ Vendor ID"
          className="w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
          type="text"
          required
        />
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Enter Email Address"
          className="w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
          type="email"
          required
        />
        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="Enter Password"
            className="w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
            type={showPassword ? "text" : "password"}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-[#BCC1CA] hover:text-[#292a2d] text-sm"
            onClick={() => setShowPassword(!showPassword)}
            aria-label="Toggle Password Visibility"
          >
            {showPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
        </div>
        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
        >
          Login Now
        </button>
        <div className="flex flex-wrap gap-3 w-full justify-evenly text-[12px] mt-4">
          <p
            onClick={openModal}
            className="underline hover:text-[#33335a] cursor-pointer"
          >
            Reset Password via Mobile
          </p>
          <p
            onClick={openModal}
            className="underline hover:text-[#33335a] cursor-pointer"
          >
            Reset Password via Email
          </p>
        </div>
      </form>
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[300px] text-center">
            <h3 className="text-lg font-semibold mb-4">Notice</h3>
            <p>Check your email for the reset password link.</p>
            <button
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
