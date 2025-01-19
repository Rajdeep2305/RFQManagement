import mongoose from "mongoose";

export const validateRegisterId = (req, res, next) => {
  const { registerId } = req;

  // Check if registerId is provided
  if (!registerId) {
    return res.status(400).json({
      success: false,
      message: "Missing registerId.",
    });
  }

  // Validate MongoDB ObjectId format or non-empty string
  if (mongoose.Types.ObjectId.isValid(registerId) || (typeof registerId === "string" && registerId.trim().length > 0)) {
    return next(); // Pass validation
  }

  // Invalid format
  return res.status(400).json({
    success: false,
    message: "Invalid registerId format. Must be a valid string or ObjectId.",
  });
};
