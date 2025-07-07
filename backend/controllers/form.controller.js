import { RentAgreement } from "../models/rentAgreement.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage } from "../utils/cloudinary.js";
import { generatePDFLocally } from "../utils/puppeteerHelper.js";
import fs from "fs";
import path from "path";

export const submitDocument = asyncHandler(async (req, res) => {
  console.log("📨 New document submission received:", JSON.stringify(req.body, null, 2));

  const { DocumentType } = req.body;
  if (!DocumentType) {
    throw new ApiError(400, "DocumentType is required.");
  }

  if (req.body.SignatureSection && typeof req.body.SignatureSection === "string") {
    try {
      req.body.SignatureSection = JSON.parse(req.body.SignatureSection);
    } catch (err) {
      throw new ApiError(400, "Invalid JSON in SignatureSection.");
    }
  }

  if (!req.body.SignatureSection) {
    req.body.SignatureSection = {};
  }

  if (req.file) {
    const uploaded = await uploadImage(req.file.path);
    if (!uploaded?.url) {
      throw new ApiError(500, "Failed to upload signature image");
    }
    req.body.SignatureSection.SignatureImage = uploaded.url;
  }

  let documentModel;
  switch (DocumentType) {
    case "RentAgreement":
      documentModel = RentAgreement;
      break;
    default:
      throw new ApiError(400, `Unsupported DocumentType: ${DocumentType}`);
  }

  const document = await documentModel.create({
    ...req.body,
    user:req.user.id
  });


  const pdfPath = await generatePDFLocally(document.toObject());


  const pdfBuffer = fs.readFileSync(pdfPath);

  res.set({
    'Content-Type': 'application/pdf',
    'Content-Disposition': 'attachment; filename="agreement.pdf"',
  });
  res.send(pdfBuffer);

  fs.unlink(pdfPath, (err) => {
    if (err) console.error("Error deleting PDF:", err);
    else console.log(" Temp PDF deleted");
  });
});
