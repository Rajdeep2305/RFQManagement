import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

const generateRegisterId = async (organizationName, phoneNo, selectedValue) => {
  const currentYear = new Date().getFullYear();
  const yearPart = currentYear.toString().slice(-2);
  const organizationPart = organizationName.slice(0, 2).toUpperCase();
  const StringPhoneNo = phoneNo.toString();
  const phonePart = StringPhoneNo.slice(-3);
  const selectedPart = selectedValue;
  let registerId;

  while (true) {
    const randomPart = Math.floor(100 + Math.random() * 900).toString();
    registerId = `${yearPart}${organizationPart}${phonePart}${selectedPart}${randomPart}`;

    // Check if the ID is already in the database
    const existingUser = await userModel.findOne({ registerId });
    if (!existingUser) break; // Exit loop if unique
  }

  return registerId;
};

//User Registration
export const register = async (req, res) => {
  const { name, email, password, organizationName, phoneNo, selectedValue } =
    req.body;
  if (
    !name ||
    !email ||
    !password ||
    !organizationName ||
    !phoneNo ||
    !selectedValue
  ) {
    return res.json({ success: false, message: "Missing Details" });
  }
  try {
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return res.json({ success: false, message: "User already exists" });
    }

    const registerId = await generateRegisterId(
      organizationName,
      phoneNo,
      selectedValue
    );
    const hashedPassword = await bcrypt.hash(password, 16);
    const user = new userModel({
      name,
      registerId,
      email,
      password: hashedPassword,
      organizationName,
      phoneNo,
      selectedValue,
    });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 3600 * 1000,
    });
    //sending welcome email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Welcome",
      text: `Welcome to site. Your account has ben created with email id: ${email}`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({ success: true, message: "Registration successful!" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.json({
      success: false,
      message: error.message || "Unknown error occurred",
    });
  }
};

//User Login
export const login = async (req, res) => {
  const { email, password, registerId } = req.body;

  // Validate required fields
  if (!registerId || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required details.",
    });
  }

  // Optional: Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  try {
    const user = await userModel.findOne({ registerId });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Please check your register ID.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password.",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 3600 * 1000, // 7 days in milliseconds
    });

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during login. Please try again later.",
      error: error.message,
    });
  }
};

//User logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    return res.json({ success: true, message: "Logged Out" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//Send User verified Otp
export const sendVerifyOtp = async (req, res) => {
  try {
    const { registerId } = req.body;

    if (!registerId) {
      return res
        .status(400)
        .json({ success: false, message: "User ID is required" });
    }

    const user = await userModel.findById(registerId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.isAccountVerified) {
      return res.json({ success: false, message: "Account already verified" });
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));

    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 600 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Account Verification OTP",
      text: `Your OTP is ${otp}. Verify your account using this OTP.`,
    };

    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP. Please try again.",
    });
  }
};

//Check for OTP verification
export const verifyEmail = async (req, res) => {
  const { registerId, otp } = req.body;

  if (!registerId || !otp) {
    return res.json({ success: false, message: "Missing Details" });
  }

  try {
    const user = await userModel.findById(registerId);

    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    if (user.verifyOtp === "" || user.verifyOtp != otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.verifyOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expired" });
    }

    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;

    await user.save();
    return res.json({
      success: true,
      message: "Account Verified successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//check if user is authenticated
export const isAuthenticated = async (req, res) => {
  try {
    return res.json({ success: true, message: "User is authenticated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//send password reset OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({
      success: false,
      message: "Email is required",
    });
  }

  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({
        success: false,
        message: "User not found",
      });
    }

    const otp = String(Math.floor(Math.random() * 900000 + 100000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 600 * 1000;

    await user.save();

    const mailOption = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: "Reset Password OTP",
      text: `Your OTP is ${otp}. Verify your Email using this OTP and Reset the password`,
    };

    await transporter.sendMail(mailOption);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

//reset user Password
export const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword) {
    return res.json({ success: false, message: "Missing Inputs" });
  }

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    if (user.resetOtp === "" || user.resetOtp !== otp) {
      return res.json({ success: false, message: "Invalid OTP" });
    }

    if (user.resetOtpExpireAt < Date.now()) {
      return res.json({ success: false, message: "OTP expire" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 16);

    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;

    await user.save();

    return res.json({
      success: true,
      message: "Password has been reset Successfully",
    });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const checkLogin = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header is missing" });
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token is missing" });
    }

    // Continue with token verification...
    // Example: const decoded = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
