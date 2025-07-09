import { RentAgreement } from "../models/rentAgreement.js";
import { NdaAgreement } from "../models/ndaAgreement.js";
import { FreelanceAgreement } from "../models/freelanceAgree.model.js";
import { PartnershipAgreement } from "../models/partnerAgree.model.js";
import { ServiceAgreement } from "../models/serviceAgree.model.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { uploadImage } from "../utils/cloudinary.js";
import { generatePDFLocally } from "../utils/puppeteerHelper.js";
import fs from "fs";
import path from "path";

export const submitDocument = asyncHandler(async (req, res) => {
  console.log(
    "📨 New document submission received:",
    JSON.stringify(req.body, null, 2)
  );

  const { DocumentType } = req.body;
  if (!DocumentType) {
    throw new ApiError(400, "DocumentType is required.");
  }

  if (
    req.body.SignatureSection &&
    typeof req.body.SignatureSection === "string"
  ) {
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
    case "NdaAgreement":
      documentModel = NdaAgreement;
      break;
    case "FreelanceAgreement":
      documentModel = FreelanceAgreement;
      break;
    case "PartnershipAgreement":
      documentModel = PartnershipAgreement;
      break;
    case "ServiceAgreement":
      documentModel = ServiceAgreement;
      break;
    default:
      throw new ApiError(400, `Unsupported DocumentType: ${DocumentType}`);
  }

  const document = await documentModel.create({
    ...req.body,
    user: req.user.id,
  });

  const rawDate = req.body.agreementDate || new Date().toISOString();
  const parsedDate = new Date(rawDate);
  const agreementDay = parsedDate.getDate();
  const agreementMonth = parsedDate.toLocaleString("default", {
    month: "long",
  });
  const agreementYear = parsedDate.getFullYear();

  const pdfPath = await generatePDFLocally({
    ...document.toObject(),
    DocumentType,
    agreementDay,
    agreementMonth,
    agreementYear,
    
  });
  
  const pdfBuffer = fs.readFileSync(pdfPath);

  res.set({
    "Content-Type": "application/pdf",
    "Content-Disposition": 'attachment; filename="agreement.pdf"',
  });
  res.send(pdfBuffer);

  fs.unlink(pdfPath, (err) => {
    if (err) console.error("Error deleting PDF:", err);
    else console.log(" Temp PDF deleted");
  });
});

export const getUserHistory = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const documents = await RentAgreement.find({ user: userId }).sort({
    createdAt: -1,
  });

  res.status(200).json({
    success: true,
    message: "User history fetched successfully",
    data: documents,
  });
});
