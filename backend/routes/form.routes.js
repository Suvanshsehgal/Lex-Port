import express from "express";
import { submitDocument } from "../controllers/form.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/documents",upload.single("SignatureImage"), submitDocument); // Only POST route

export default router;