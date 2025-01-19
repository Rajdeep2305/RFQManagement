import userModel from "../models/userModel.js";

export const getUserRegistrationId = async (req, res, next) => {
  try {
    const { buyerEmail } = req.body;

    if (!buyerEmail) {
      return res.status(400).json({ success: false, message: "Missing buyerEmail." });
    }

    const user = await userModel.findOne({ email: buyerEmail });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    req.registerId = user.registerId; // Attach registerId to the request object
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};