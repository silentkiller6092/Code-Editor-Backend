const AuthenticatedResource = async (req, res) => {
  return res.status(200).json({
    status: "Success",
    response: req.user,
    error: "Resource Avilable",
  });
};
export { AuthenticatedResource };
