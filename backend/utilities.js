import jwt from "jsonwebtoken";
import "dotenv/config";

function authenticateToken(req, res, next) {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({
      error: true,
      message: "Authentication required (Cookie missing)",
    });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedPayload) => {
    if (err) {
      res.clearCookie("__Host-accessToken", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
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
