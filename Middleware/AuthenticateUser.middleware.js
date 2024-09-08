import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  // 1. Access token is missing
  if (!accessToken) {
    return res
      .status(403)
      .json({ status: 403, message: "Access token missing" });
  }

  // 2. Verify access token
  jwt.verify(accessToken, process.env.ACCESS_TOEKN_SECERATE, (err, user) => {
    if (err) {
      // Access token is expired or invalid
      if (!refreshToken) {
        // 3. Refresh token is missing
        return res
          .status(403)
          .json({ status: 403, message: "Refresh token missing" });
      }

      // 4. Verify refresh token if access token is invalid or expired
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOEKN_SECERATE,
        (err, user) => {
          if (err) {
            // Refresh token is expired or invalid
            return res.status(403).json({
              status: 403,
              message: "Invalid or expired refresh token",
            });
          }

          req.user = user;
          return next(); // Allow request to continue if refresh token is valid
        }
      );
    } else {
      req.user = user;
      next();
    }
  });
};

export { verifyAccessToken };
