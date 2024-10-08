import express from "express";
import bodyParser from "body-parser";
import CodeExecution from "./routes/CodeExecution.routes.js";
import UserRoutes from "./routes/User.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

const app = express();
// app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

// Routes for Code Execution
app.use("/api/v1/execute", CodeExecution);
app.use("/api/v1/user", UserRoutes);
app.listen(3000, () => {
  console.log("App is running on port 3000");
});
