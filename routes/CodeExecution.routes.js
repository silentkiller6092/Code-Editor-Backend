import express from "express";
import PythonExecution from "../controller/CodeExecution/PythonExecution.controller.js";
const router = express.Router();
router.post("/python", PythonExecution);
export default router;
