import express from "express";
import PythonExecution from "../controller/CodeExecution/PythonExecution.controller.js";
import NodeExecution from "../controller/CodeExecution/NodeExecution.controller.js";
const router = express.Router();
router.post("/python", PythonExecution);
router.post("/javascript", NodeExecution);
export default router;
