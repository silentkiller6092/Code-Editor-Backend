import jwt from "jsonwebtoken";
const verifyAccessToken = (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(403).json({ message: "Access token missing" });

  jwt.verify(token, process.env.ACCESS_TOEKN_SECERATE, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid access token" });
    req.user = user;
    next();
  });
};
export { verifyAccessToken };
