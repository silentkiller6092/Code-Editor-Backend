import jwt from "jsonwebtoken";

const verifyAccessToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) {
    return res
      .status(403)
      .json({ status: 403, message: "Access token missing" });
  }
  jwt.verify(accessToken, process.env.ACCESS_TOEKN_SECERATE, (err, user) => {
    if (err) {
      if (!refreshToken) {
        return res
          .status(403)
          .json({ status: 403, message: "Refresh token missing" });
      }
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOEKN_SECERATE,
        (err, user) => {
          if (err) {
            return res.status(403).json({
              status: 403,
              message: "Invalid or expired refresh token",
            });
          }

          req.user = user;
          return next();
        }
      );
    } else {
      req.user = user;
      next();
    }
  });
};

export { verifyAccessToken };
