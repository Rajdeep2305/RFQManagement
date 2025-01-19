// Middleware to validate rfqID for venderSchema
export const validateRfqID = (req, res, next) => {
    const { rfqID } = req.body;
  
    // Check if rfqID is provided
    if (!rfqID) {
      return res.status(400).json({
        success: false,
        message: "rfqID is required.",
      });
    }
  
    // Check if rfqID is a positive number
    if (typeof rfqID !== "number" || rfqID <= 0) {
      return res.status(400).json({
        success: false,
        message: "rfqID must be a positive number.",
      });
    }
  
    // Proceed if rfqID is valid
    next();
  };
  