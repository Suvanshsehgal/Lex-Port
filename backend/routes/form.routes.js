import express from "express";
import { submitDocument } from "../controllers/form.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import protect from "../middlewares/auth.middleware.js";
import { getUserHistory } from "../controllers/form.controller.js";
const router = express.Router();

router.post("/documents",protect ,upload.single("SignatureImage"), submitDocument); 
router.get("/history", protect, getUserHistory);

export default router;