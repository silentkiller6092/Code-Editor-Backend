import express from "express";
import bodyParser from "body-parser";
import CodeExecution from "./routes/CodeExecution.routes.js";
const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.text());

// Routes for Code Execution
app.use("/api/v1/execute", CodeExecution);
app.listen(4000, () => {
  console.log("App is running on port 4000");
});
