import { exec } from "child_process";
const PythonExecution = async (req, res) => {
  try {
    const code = req.body;

    if (!code)
      return res
        .staus(404)
        .json({ status: "error", response: null, error: "Code Required" });
    exec(`python3 -c "${code.replace(/"/g, '\\"')}"`, (err, stdout, stderr) => {
      if (err) {
        return res.status(200).json({
          status: "error",
          response: null,
          data: null,
          error: stderr || err.message,
        });
      }

      res.status(200).json({
        status: "success",
        response: stdout,
        data: null,
        error: null,
      });
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      response: null,
      data: null,
      error: err.message,
    });
  }
};
export default PythonExecution;
