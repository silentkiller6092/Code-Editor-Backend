import jwt from "jsonwebtoken";
import { DatabaseConnection } from "../../DB/DBConnection.js";

const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(403).json({
        status: "Error",
        response: null,
        error: "Refresh token is missing",
      });
    }

    // Verify the refresh token
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOEKN_SECERATE,
      async (err, decoded) => {
        if (err) {
          return res.status(403).json({
            status: "Error",
            response: null,
            error: "Invalid refresh token",
          });
        }

        const db = DatabaseConnection; // Ensure this is the correct instance

        // Query to find the user by email
        const query = `SELECT * FROM Users WHERE email = ?`;
        try {
          const user = await new Promise((resolve, reject) => {
            db.get(query, [decoded.email], (err, row) => {
              if (err) {
                reject(err);
              } else {
                resolve(row);
              }
            });
          });

          if (!user) {
            return res.status(404).json({
              status: "Error",
              response: null,
              error: "Invalid Token",
            });
          }

          // Compare the verification token from the database with the refresh token

          if (user.refresh_token !== refreshToken) {
            return res.status(403).json({
              status: "Error",
              response: null,
              error: "Token mismatch",
            });
          }

          // If the verification token matches, create a new access token

          const newAccessToken = createAccessToken({
            id: user.id,
            email: user.email,
            full_name: user.full_name,
          });

          req.user = user;

          // Optionally, update the cookie with the new access token
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 40 * 1000, // Set to 40 seconds
          });

          return res.status(200).json({
            status: "Success",
            response: req.user,
            error: null,
          });
        } catch (dbError) {
          return res.status(500).json({
            status: "Error",
            response: null,
            error: "Database query failed",
          });
        }
      }
    );
  } catch (err) {
    return res.status(500).json({
      status: "Error",
      response: null,
      error: err.message,
    });
  }
};

// Reuse the function that creates an access token
const createAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, full_name: user.full_name },
    process.env.ACCESS_TOEKN_SECERATE, // Correct the variable name here
    { expiresIn: "30s" } // Set to 30 seconds
  );
};

export { refreshAccessToken };
