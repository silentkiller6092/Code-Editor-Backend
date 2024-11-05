import express from "express";
import bodyParser from "body-parser";
import CodeExecution from "./routes/CodeExecution.routes.js";
import UserRoutes from "./routes/User.routes.js";
import TemplatesRoute from "./routes/Templates_Projects.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
dotenv.config();
app.use("/api/v1/execute", CodeExecution);
app.use("/api/v1/user", UserRoutes);
app.use("/api/v1/templates", TemplatesRoute);
app.listen(4000, () => {
  console.log("App is running on port 4000");
});
