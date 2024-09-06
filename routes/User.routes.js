import express from "express";
import { User_Signup } from "../controller/User/Signup.controller.js";
const router = express.Router();
router.post("/signup", User_Signup);
export default router;
