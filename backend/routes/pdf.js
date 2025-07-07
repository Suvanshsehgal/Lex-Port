import express from "express";
import { generatePDFLocally } from "../utils/puppeteerHelper.js"; // adjust path as needed
import path from "path";
import fs from "fs";

const router = express.Router();

router.post("/generate", async (req, res) => {
  try {
    const data = req.body;

    const filePath = await generatePDFLocally(data);

    const fileName = path.basename(filePath);

    // Send file URL back to frontend
    res.status(200).json({
      message: "PDF generated successfully",
      downloadUrl: `/temp/${fileName}`,
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    res.status(500).json({ message: "Failed to generate PDF" });
  }
});

export default router;
