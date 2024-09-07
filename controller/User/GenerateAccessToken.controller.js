import jwt from "jsonwebtoken";
const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken; // Or you can get this from req.body, depending on how it's being sent by the client
    if (!refreshToken) {
      return res.status(403).json({
        status: "error",
        response: null,
        error: "Refresh token is missing",
      });
    }

    // Verify the refresh token
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          status: "error",
          response: null,
          error: "Invalid refresh token",
        });
      }

      // Create a new access token
      const newAccessToken = createAccessToken({
        id: user.id,
        email: user.email,
      });

      // Optionally, update the cookie with the new access token
      res.cookie("accessToken", newAccessToken, {
        httpOnly: true,
        secure: true,
        maxAge: 15 * 60 * 1000,
      }); // 15 mins

      // Return the new access token
      return res.status(200).json({
        status: "success",
        response: {
          accessToken: newAccessToken,
        },
        error: null,
      });
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      response: null,
      error: err.message,
    });
  }
};

// Reuse the function that creates an access token
const createAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "1h" }
  );
};

export { refreshAccessToken };
