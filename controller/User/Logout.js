import express from "express";

const LogoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    return res.status(200).json({
      status: "Success",
      response: "Logged out Successfully",
      error: null,
    });
  } catch (e) {
    return res.status(500).json({
      status: "error",
      response: null,
      error: e.message,
    });
  }
};
export { LogoutUser };
