export const validateCreateRFQ = (req, res, next) => {
  const {
    buyerEmail,
    ContactName,
    BuyerOrganizationName,
    SubmissionDate,
    RFQProductName,
    RFQProductSpecification,
    RFQProductQuantity,
    UploadBOQ,
    deliveredLocation,
    terms,
  } = req.body;

  //   check for Missing field
  if (
    !buyerEmail ||
    !ContactName ||
    !BuyerOrganizationName ||
    !SubmissionDate ||
    !RFQProductName ||
    !RFQProductSpecification ||
    !RFQProductQuantity
  ) {
    return res.json({ success: false, message: "Missing Details" });
  }
  // Validate buyerEmail format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(buyerEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  // Validate ContactName: must be a string
  if (typeof ContactName !== "string" || ContactName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid vendor name. Must be a non-empty string.",
    });
  }

  next();
};
