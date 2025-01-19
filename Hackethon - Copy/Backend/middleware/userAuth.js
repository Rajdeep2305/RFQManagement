import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

    if (tokenDecode && tokenDecode.id) {
      req.body.registerId = tokenDecode.id;
      next();  // Proceed to the next middleware or route handler
    } else {
      return res.status(401).json({ success: false, message: "Not Authorized. Invalid Token" });
    }
  } catch (error) {
    console.error("Authentication error:", error);  // Log the error for debugging
    return res.status(500).json({ success: false, message: "Server error. Please try again later." });
  }
};

export default userAuth;
