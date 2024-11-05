import express from "express";
import { All_Templates } from "../controller/Templates_Projects/Inbuild_Templates.controller.js";
const router = express.Router();
router.get("/inbuild/templates", All_Templates);
export default router;
