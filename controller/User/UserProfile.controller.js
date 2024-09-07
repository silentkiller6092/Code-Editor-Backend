const AuthenticatedResource = async (req, res) => {
  return res.status(500).json({
    status: "success",
    response: null,
    error: "Resource Avilable",
  });
};
export { AuthenticatedResource };
