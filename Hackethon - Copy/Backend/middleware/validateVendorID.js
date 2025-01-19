// Middleware to validate VendorID for venderSchema
export const validateVendorID = (req, res, next) => {
    const { VendorID } = req.body;
  
    // Check if VendorID is provided
    if (!VendorID) {
      return res.status(400).json({
        success: false,
        message: "VendorID is required.",
      });
    }
  
    // Check if VendorID is a positive number
    if (typeof VendorID !== "number" || VendorID <= 0) {
      return res.status(400).json({
        success: false,
        message: "VendorID must be a positive number.",
      });
    }
  
    // Proceed if VendorID is valid
    next();
  };
  