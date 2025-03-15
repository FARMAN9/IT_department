import jwt from "jsonwebtoken";

export const validateToken = async (req, res) => {
  try {
    const { token } = req.body; // Get token from JSON request body

    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.status(200).json({ success: true, message: "Token is valid", user: decoded });
  } catch (error) {
    console.error(error);
    res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};
