import React, { useContext, useEffect } from "react";
import Logo from "./Logo";
import LoginRegister from "./LoginRegister";
import HeaderContext from "./HeaderContext";
import ProfileHeader from "./ProfileHeader";
import { AppContext } from "../../Context/AppContext";
import VendorContext from "./VendorContext";

const Navbar = () => {
  const { userData, isLoggedIn } = useContext(AppContext);

  // Ensure userData is populated before rendering
  useEffect(() => {
    let a =0;
    if (userData) {
      a++;
    }
  }, [userData]);

  return (
    <div
      className={`${
        isLoggedIn ? "flex" : "block h-fit mb-1 sm:flex"
      } max-w-screen h-[56px] border-b-2 items-center justify-between`}
    >
      <div className="flex w-full h-fit items-center">
        <Logo />
        {isLoggedIn?(userData?.selectedValue === "VEN"? (<VendorContext/>): userData?.selectedValue === "BUY"? (<HeaderContext />): "N/A"):(<div/>)}
      </div>
      {isLoggedIn ? (
        // Display user information after login
        <ProfileHeader user={userData} />
      ) : (
        <LoginRegister />
      )}
    </div>
  );
};

export default Navbar;
