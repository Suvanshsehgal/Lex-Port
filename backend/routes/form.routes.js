import express from "express";
import { submitDocument } from "../controllers/form.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/documents",protect ,upload.single("SignatureImage"), submitDocument); // Only POST route

export default router;