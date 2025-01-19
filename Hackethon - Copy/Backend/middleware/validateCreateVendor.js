export const validateCreateVendor = (req, res, next) => {
  const {
    VenderName,
    VendorEmail,
    VendorMobile,
    productName,
    productDetails,
    productSpecification,
    address,
  } = req.body;

  // Check for missing fields
  if (
    !VenderName ||
    !VendorEmail ||
    !VendorMobile ||
    !productName ||
    !productDetails ||
    !productSpecification ||
    !address
  ) {
    return res.status(400).json({
      success: false,
      message: "Missing required fields.",
    });
  }

  // Validate VenderEmail format
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if (!emailRegex.test(VendorEmail)) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format.",
    });
  }

  // Validate VenderMobile: must be a string and exactly 10 digits
  if (typeof VendorMobile !== "string" || VendorMobile.length !== 10) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number. Must be 10 digits.",
    });
  }

  // Validate VenderName: must be a string
  if (typeof VenderName !== "string" || VenderName.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid vendor name. Must be a non-empty string.",
    });
  }

  // Validate product details: Ensure they are strings and not empty
  if (
    typeof productName !== "string" ||
    productName.trim().length === 0 ||
    typeof productDetails !== "string" ||
    productDetails.trim().length === 0 ||
    typeof productSpecification !== "string" ||
    productSpecification.trim().length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: "Product fields must be non-empty strings.",
    });
  }

  // Validate address: Ensure it's a non-empty string
  if (typeof address !== "string" || address.trim().length === 0) {
    return res.status(400).json({
      success: false,
      message: "Address must be a non-empty string.",
    });
  }

  next();
};
