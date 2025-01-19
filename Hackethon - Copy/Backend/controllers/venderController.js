import transporter from "../config/nodemailer.js";
import userModel from "../models/userModel.js";
import vendorModel from "../models/venderModel.js";

export const CreateVendor = async (req, res) => {
  const {
    VenderName,
    VendorEmail,
    VendorMobile,
    productName,
    productDetails,
    productSpecification,
    address,
    assistanceBot,
  } = req.body;

  if (
    !VenderName ||
    !VendorEmail ||
    !VendorMobile ||
    !productName ||
    !productDetails ||
    !productSpecification ||
    !address
  ) {
    return res.json({ success: false, message: "Missing Details"});
  }

  try {
    // Check if the user exists
    const existingUser = await userModel.findOne({ email: VendorEmail });
    if (!existingUser) {
      return res.status(404).json({ success: false, message: "User does not exist." });
    }

    const registerId = existingUser.registerId;
    // Generate unique VendorID
    let VendorID;
    do {
      VendorID = Math.floor(Math.random() * 100000 + 100000);
    } while (await vendorModel.exists({ VendorID }));

    // Create new vendor linked to the user
    const vendor = new vendorModel({
      VendorID,
      VendorName: VenderName,
      VendorEmail,
      VendorMobile,
      productName,
      productDetails, 
      productSpecification,
      assistanceBot,
      registerId,
      address,
      userId: existingUser._id, // Linking to user
    });

    await vendor.save();

    // Send email to the vendor
    const sendEmail = {
      from: process.env.EMAIL_USER,
      to: VendorEmail,
      subject: "Vendor Registration Successful",
      text: `Dear ${VenderName},\n\nYour vendor account has been created successfully. Your VendorID is ${VendorID}.\n\nThank you.`,
    };
    await transporter.sendMail(sendEmail);

    res.status(201).json({
      success: true,
      message: "Vendor created successfully.",
      VendorID,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Show the Vendor data
export const showVendor = async (req, res) => {
  try {
    const { registerId } = req.body;

    if (!registerId) {
      return res.status(400).json({
        success: false,
        message: "Missing registerId.",
      });
    }

    // Find vendor data by registerId
    const vendor = await userModel.findOne({registerId });

    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found.",
      });
    }

    // Return the vendor object
    res.status(200).json({
      success: true,
      vendorData: vendor.venderObject,
    });
  } catch (error) {
    console.error("Error fetching vendor data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};


// Delete Vendor
export const DeleteVendorByVendorID = async (req, res) => {
  try {
    const { VendorID } = req.body;

    if (!VendorID) {
      return res
        .status(400)
        .json({ success: false, message: "Missing VendorID." });
    }

    const FindVenderID = await vendorModel.findOne({VendorID});

    // Delete the vendor object using VendorID
    const deleteResult = await vendorModel.deleteOne({_id:FindVenderID._id})

    if (deleteResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Vendor not found." });
    }

    res.status(200).json({
      success: true,
      message: `Vendor with VendorID ${VendorID} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting vendor object:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Show this Vendor
export const ShowThisVendor = async (req, res) => {
  try {
    const { VendorID } = req.body;

    if (!VendorID) {
      return res
        .status(400)
        .json({ success: false, message: "Missing VendorID." });
    }

    const FindVenderID = await vendorModel.findOne({VendorID});

    res.status(200).json({
      success: true,
      message: `Founded`,
      data: FindVenderID.data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// show all vender Data 
export const ShowAllVendorData = async (req, res) => {
  try {
    const allVendorData = await vendorModel.find();
    if(!allVendorData || allVendorData.length ===0){
      return res.status(400).json({
        success: false,
        massage:"Data did not fetch successfully",
        rfqs:[],
      })
    }
    return res.status(200).json({
      success: true,
      massage:"All data fetch successfully",
      rfqs:allVendorData
    })
  } catch (error) {
    console.error("Error deleting vendor object:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
      rfqs:[],
    });
  }
}