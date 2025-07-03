import { RentAgreement } from "../models/rentAgreement.js";
import { LegalDocument } from "../models/form.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage, uploadFileToCloudinary } from "../utils/cloudinary.js";
import { generatePDFLocally } from "../utils/puppeteerHelper.js";
import fs from "fs";

export const submitDocument = asyncHandler(async (req, res) => {
  console.log("📨 New document submission received:", JSON.stringify(req.body, null, 2));

  const { DocumentType } = req.body;

  if (!DocumentType) {
    throw new ApiError(400, "DocumentType is required.");
  }

  // ✅ Parse SignatureSection if sent as string
  if (req.body.SignatureSection && typeof req.body.SignatureSection === "string") {
    try {
      req.body.SignatureSection = JSON.parse(req.body.SignatureSection);
    } catch (err) {
      throw new ApiError(400, "Invalid JSON in SignatureSection.");
    }
  }

  // ✅ Initialize SignatureSection if missing
  if (!req.body.SignatureSection) {
    req.body.SignatureSection = {};
  }

  // ✅ Handle signature image upload
  if (req.file) {
    const uploaded = await uploadImage(req.file.path);
    if (!uploaded?.url) {
      throw new ApiError(500, "Failed to upload signature image");
    }
    req.body.SignatureSection.SignatureImage = uploaded.url;
  }

  // ✅ Choose document model
  let documentModel;
  switch (DocumentType) {
    case "RentAgreement":
      documentModel = RentAgreement;
      break;

    default:
      throw new ApiError(400, `Unsupported DocumentType: ${DocumentType}`);
  }

  // ✅ Save form data to database
  const document = await documentModel.create(req.body);

  // ✅ Generate PDF locally using Puppeteer
  const pdfPath = await generatePDFLocally(document.toObject());

  // ✅ Upload the PDF to Cloudinary
  const cloudinaryResult = await uploadFileToCloudinary(pdfPath, "documents");

  if (!cloudinaryResult?.url) {
    throw new ApiError(500, "Failed to upload PDF to Cloudinary");
  }

  // ✅ Delete local file after upload
  if (fs.existsSync(pdfPath)) {
  fs.unlinkSync(pdfPath);
} else {
  console.warn("⚠️ Tried to delete a non-existent file:", pdfPath);
}

  // ✅ Optionally store the PDF URL in DB
  document.pdfUrl = cloudinaryResult.url;
  await document.save();

  // ✅ Send response
  return res
    .status(201)
    .json(
      new ApiResponse(201, { document, pdfUrl: cloudinaryResult.url }, `${DocumentType} submitted and PDF uploaded successfully.`)
    );
});

export default submitDocument;
