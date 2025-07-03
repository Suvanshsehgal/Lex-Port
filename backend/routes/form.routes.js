import express from "express";
import { submitDocument } from "../controllers/form.controller.js";

const router = express.Router();

router.post("/documents", submitDocument); // Only POST route

export default router;