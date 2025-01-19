import transporter from "../config/nodemailer.js";
import buyerModel from "../models/buyerModel.js";
import userModel from "../models/userModel.js";
import vendorModel from "../models/venderModel.js";

// create RFQ
export const CreateRFQ = async (req, res) => {
  const {
    buyerEmail,
    ContactName,
    ContactNumber,
    BuyerOrganizationName,
    SubmissionDate,
    RFQProductName,
    RFQProductSpecification,
    RFQProductQuantity,
    UploadBOQ,
    deliveredLocation,
    terms,
  } = req.body;

  if (
    !buyerEmail ||
    !ContactName ||
    !ContactNumber ||
    !BuyerOrganizationName ||
    !SubmissionDate ||
    !RFQProductName ||
    !RFQProductSpecification ||
    !RFQProductQuantity
  ) {
    return res.json({
      success: false,
      message: "Missing Details",
    });
  }

  try {
    // Check if the user exists
    const existingUser = await userModel.findOne({ email: buyerEmail });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist." });
    }

    const registerId = existingUser.registerId;

    // Generate unique rfqID
    let rfqID;
    do {
      rfqID = Math.floor(Math.random() * 100000 + 100000);
    } while (await buyerModel.exists({ rfqID }));

    // Create new RFQ linked to the user
    const buyerRFQ = new buyerModel({
      rfqID,
      buyerEmail,
      ContactName,
      ContactNumber,
      BuyerOrganizationName,
      SubmissionDate,
      RFQProductName,
      RFQProductDetails: "Not Uploaded",
      RFQProductSpecification,
      RFQProductQuantity,
      UploadBOQ,
      deliveredLocation,
      registerId,
      terms,
      userId: existingUser._id, // Linking to user
    });

    await buyerRFQ.save();

    // Send email to the vendor
    const sendEmail = {
      from: process.env.EMAIL_USER,
      to: buyerEmail,
      subject: "RFQ Creation Successful",
      text: `Dear ${ContactName},\n\nYour RFQ has been created successfully and also it will be published. Your rfqID is ${rfqID}.\n\nThank you.`,
    };
    await transporter.sendMail(sendEmail);

    res.status(201).json({
      success: true,
      message: "RFQ Creation Successful.",
      rfqID,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Show the RFQ data
export const showRFQs = async (req, res) => {
  try {
    const { registerId } = req; // Access registerId from the request object

    if (!registerId) {
      return res.status(400).json({
        success: false,
        message: "Missing registerId.",
      });
    }

    const userdata = await buyerModel.find({ registerId });
    if (userdata && userdata.length > 0) {
      return res.json({ success: true, userdata });
    }

    // If no data found
    return res.status(404).json({
      success: false,
      message: "No data found for the provided registerId.",
    });
  } catch (error) {
    console.error("Error fetching buyer data:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Delete RFQ
export const DeleteRfqID = async (req, res) => {
  try {
    const { rfqID } = req.body;

    if (!rfqID) {
      return res
        .status(400)
        .json({ success: false, message: "Missing rfqID." });
    }

    const FindRfqID = await buyerModel.findOne({ rfqID });

    // Delete the vendor object using rfqID
    const deleteResult = await buyerModel.deleteOne({ _id: FindRfqID._id });

    if (deleteResult.modifiedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Buyer not found." });
    }

    res.status(200).json({ 
      success: true,
      message: `Buyer product with rfqID ${rfqID} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting buyer object:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

// Fetch RFQ
export const fetchRFQ = async (req, res) => {
  try {
    const { rfqID } = req.body;

    // Check if rfqID is provided
    if (!rfqID) {
      return res.status(400).json({
        success: false,
        message: "Missing rfqID.",
      });
    }

    // Find RFQ by rfqID
    const rfq = await buyerModel.findOne({ rfqID }).lean();

    if (rfq) {
      // Respond with RFQ details
      return res.status(200).json({
        success: true,
        message: `Buyer product with rfqID ${rfqID} is found.`,
        data: {
          buyerEmail: rfq.buyerEmail,
          contactName: rfq.ContactName,
          contactNumber: rfq.ContactNumber,
          buyerOrganizationName: rfq.BuyerOrganizationName,
          publishedDate: rfq.publishedDate,
          submissionDate: rfq.SubmissionDate,
          rfqProductName: rfq.RFQProductName,
          rfqProductSpecification: rfq.RFQProductSpecification,
          rfqProductQuantity: rfq.RFQProductQuantity,
          uploadBOQ: rfq.UploadBOQ,
          deliveredLocation: rfq.deliveredLocation,
        },
      });
    } else {
      // RFQ not found
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }
  } catch (error) {
    console.error("Error fetching RFQ:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",
    });
  }
};

export const ShowAllRfqData = async (req, res) => {
  try { 
    const allRfqData = await buyerModel.find(); // Assuming this returns an array of RFQ data
    if (!allRfqData || allRfqData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Data did not fetch successfully",  // Message when no data is found
        rfqs: [],  // Return an empty array for consistency
      });
    }
    return res.status(200).json({
      success: true,
      message: "All data fetched successfully",  // Success message
      rfqs: allRfqData,  // Return the data as an array inside the "rfqs" property
    });
  } catch (error) {
    console.error("Error fetching RFQ data:", error);  // Log the error for debugging
    res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later.",  // Generic error message
      rfqs: [],  // Return an empty array in case of an error
    });
  }
};

