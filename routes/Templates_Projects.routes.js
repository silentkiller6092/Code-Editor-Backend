import express from "express";
import { All_Templates } from "../controller/Templates_Projects/Inbuild_Templates.controller.js";
import { getFileTree } from "../controller/Templates_Projects/FileTree_data.controller.js";
const router = express.Router();
router.get("/inbuild/templates", All_Templates);
router.get("/inbuild/templates/filetree/:template_id", getFileTree);
export default router;
