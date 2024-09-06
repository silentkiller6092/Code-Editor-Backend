import { exec } from "child_process";

const NodeExecution = async (req, res) => {
  try {
    const code = req.body;
    if (!code) {
      return res
        .status(400)
        .json({ status: "error", response: null, error: "Code is required" });
    }

    exec(
      `node -e "${code.replace(/"/g, '\\"')}"`,
      { timeout: 5000 },
      (err, stdout, stderr) => {
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
      }
    );
  } catch (err) {
    res.status(500).json({
      status: "error",
      response: null,
      data: null,
      error: err.message,
    });
  }
};

export default NodeExecution;
