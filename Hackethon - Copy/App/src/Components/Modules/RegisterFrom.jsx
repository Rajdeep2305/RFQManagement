import React, { useContext, useState } from "react";
import { AppContext } from "../../Context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterFrom = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organizationName, setOrganizationName] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [selectedValue, setSelectedValue] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [onGoingRegister, setOnGoingRegister] = useState(false);

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const onGoing = () => {
    if (email || organizationName || phoneNo || selectedValue || name) {
      setOnGoingRegister(true);
    }
  };

  const handleChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordMatch(newPassword === confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    const newConfirmPassword = e.target.value;
    setConfirmPassword(newConfirmPassword);
    setIsPasswordMatch(password === newConfirmPassword);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!backendUrl || !email || !name || !password) {
      toast.error("All fields are required");
      return;
    }

    try {
      axios.defaults.withCredentials = true;

      const { data } = await axios.post(`${backendUrl}/api/auth/register`, {
        email,
        name,
        password,
        organizationName,
        phoneNo,
        selectedValue,
      });

      if (data.success) {
        setIsLoggedIn(true);
        getUserData(data.registerId);
        toast.success(data.message || "Registration Success");
        navigate("/");
      } else {
        setOnGoingRegister(false);
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      setOnGoingRegister(false);
      toast.error(
        "Error during registration: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="h-screen max-w-screen flex justify-center items-center">
      {onGoingRegister && (
        <div className="h-screen w-screen fixed flex gap-4 justify-center items-center bg-[#0004] z-50">
          <div className="h-[15px] w-[15px] animate-round rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-100 rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-200 rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-300 rounded-full bg-white"></div>
          <div className="h-[15px] w-[15px] animate-round delay-400 rounded-full bg-white"></div>
        </div>
      )}

      <form
        className="h-[470px] text-[14px] max-w-screen p-3 sm:w-[490px] bg-[#EDEDED] flex flex-col justify-evenly items-center"
        onSubmit={onSubmitHandler}
      >
        <p className="text-center">Register</p>

        <input
          onChange={(e) => setName(e.target.value)}
          required
          placeholder="Contact Person Name"
          className="max-w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
          type="text"
          value={name}
          name="PersonName"
          id="PersonName"
        />

        <div className="relative">
          <input
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Working Email Address"
            className="max-w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
            type="email"
            value={email}
            name="Email"
            id="Email"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-[#BCC1CA] hover:text-[#292a2d] text-sm"
          >
            <i className="fa-regular fa-envelope"></i>
          </button>
        </div>

        <div className="relative">
          <input
            onChange={(e) => setOrganizationName(e.target.value)}
            required
            placeholder="Organization Name"
            className="max-w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
            type="text"
            value={organizationName}
            name="OrganizationName"
            id="OrganizationName"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-[#BCC1CA] hover:text-[#292a2d] text-sm"
          >
            <i className="fa-thin fa-globe"></i>
          </button>
        </div>

        <div className="relative">
          <input
            onChange={(e) => setPhoneNo(e.target.value)}
            required
            value={phoneNo}
            placeholder="Phone no."
            className="max-w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3 appearance-none"
            type="number"
            name="PhoneNo"
            id="PhoneNo"
            inputMode="numeric"
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-[#BCC1CA] hover:text-[#292a2d] text-sm"
          >
            <i className="fa-solid fa-phone"></i>
          </button>
        </div>

        <select
          name="RegisterAs"
          id="RegisterAs"
          className={`max-w-full sm:w-[400px] outline-none text-[${
            selectedValue ? "#292a2d" : "#BCC1CA"
          }] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] px-3`}
          value={selectedValue}
          onChange={handleChange}
        >
          <option value="" disabled className="bg-[#bcc1ca]">
            Register as
          </option>
          <option value="VEN">Vendor</option>
          <option value="BUY">Buyer</option>
        </select>

        <div className="relative">
          <input
            required
            placeholder="Create Password"
            className="max-w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-[#BCC1CA] hover:text-[#292a2d] text-sm"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
        </div>

        <div className="relative">
          <input
            required
            placeholder="Confirm Password"
            className="max-w-full sm:w-[400px] h-[35px] rounded-[6px] border-[1px] border-[#BCC1CA] placeholder:text-[#BCC1CA] outline-none px-3"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <button
            type="button"
            className="absolute right-3 top-2 text-[#BCC1CA] hover:text-[#292a2d] text-sm"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? (
              <i className="fa-regular fa-eye-slash"></i>
            ) : (
              <i className="fa-solid fa-eye"></i>
            )}
          </button>
        </div>

        <div className=" w-full sm:w-[400px] h-[35px] flex justify-end items-center">
          <div
            className={`flex absolute cursor-pointer justify-center items-center w-[150px] h-[35px] rounded-[5px] ${
              isPasswordMatch ? "bg-[#79F6B8]" : "bg-[#BCC1CA]"
            }`}
          >
            <div className="w-[30px] flex justify-center items-center m-1 h-[27px] rounded-l-[3px] rounded-r-[50%] bg-[#EDEDED]">
              &#x279C;
            </div>
            <input
              onClick={onGoing}
              className={`w-[120px] h-[35px] font-medium cursor-pointer text-[#292a2d] ${
                isPasswordMatch ? "hover:text-[#787a7c]" : "cursor-not-allowed"
              }`}
              type="submit"
              value="Register now"
              disabled={!isPasswordMatch}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisterFrom;
