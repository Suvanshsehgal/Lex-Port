import { LegalDocument } from "../models/form.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage } from "../utils/cloudinary.js";

export const submitDocument = asyncHandler(async (req, res) => {
  console.log(" New document submission received:", JSON.stringify(req.body, null, 2));

  // Parse SignatureSection if it's sent as a string (from frontend or Postman)
  if (req.body.SignatureSection && typeof req.body.SignatureSection === "string") {
    req.body.SignatureSection = JSON.parse(req.body.SignatureSection);
  }

  // Initialize SignatureSection if it doesn't exist
  if (!req.body.SignatureSection) {
    req.body.SignatureSection = {};
  }

  // If signature image is provided, upload it
  if (req.file) {
    const uploaded = await uploadImage(req.file.path);
    if (!uploaded?.url) {
      throw new ApiError(500, "Failed to upload signature image");
    }

    // Add the image URL to SignatureSection
    req.body.SignatureSection.SignatureImage = uploaded.url;
  }

  // ✅ Create the document with or without image
  const document = await LegalDocument.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, document, "Document submitted successfully."));
});

export default submitDocument;
