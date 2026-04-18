import jwt from "jsonwebtoken";
import "dotenv/config";

function authenticateToken(req, res, next) {
  const token = req.cookies["__Host-accessToken"]; // Http only cookie

  // Check if access token exists
  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Authentication required (Cookie missing)",
    });
  }

  // Verifying access token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedPayload) => {
    // Clear Http only cookie if there is an error
    if (err) {
      res.clearCookie("__Host-accessToken", {
        httpOnly: true,
        secure: true,
        sameSite: "Lax",
        path: "/",
      });

      return res.status(403).json({
        error: true,
        message: "Session expired or invalid. Please log in again.",
      });
    }

    req.user = decodedPayload;
    next();
  });
}

export default authenticateToken;
