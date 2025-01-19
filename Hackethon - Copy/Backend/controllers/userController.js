import userModel from "../models/userModel.js"; // Assuming userModel is properly imported

export const getUserData = async (req, res) => {
  try {
    const { registerId } = req.body;

    if (!registerId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing registerId." });
    }

    // Find the user by registerId
    const user = await userModel.findOne({ _id: registerId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    // Return user data in a structured response
    res.status(200).json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        organizationName: user.organizationName,
        registerId: user.registerId,
        phoneNo: user.phoneNo,
        selectedValue: user.selectedValue,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error); // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const getRegistrationID = async (req, res) => {
  try {
    const { buyerEmail } = req.body;

    // Check if the buyerEmail is provided
    if (!buyerEmail) {
      return res.status(400).json({ success: false, message: "Missing buyerEmail." });
    }
    console.log(buyerEmail)
    // Find the user by buyerEmail
    const user = await userModel.findOne({ email: buyerEmail });

    if (!user) {
      console.log("User not found.");
      return res.status(404).json({ success: false, message: "User not found." });
    }

    console.log("User found with registerId:", user.registerId);
    return res.status(200).json({ success: true, message: "User found", registerId: user.registerId });

  } catch (error) {
    // Handle any unexpected errors
    console.error("Error fetching user data:", error); // Log error details
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};
