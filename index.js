import express from "express";
import bodyParser from "body-parser";
import CodeExecution from "./routes/CodeExecution.routes.js";
import UserRoutes from "./routes/User.routes.js";
const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json());

// Routes for Code Execution
app.use("/api/v1/execute", CodeExecution);
app.use("/api/v1/user", UserRoutes);
app.listen(4000, () => {
  console.log("App is running on port 4000");
});
