import {LegalDocument} from "../models/form.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";


export const submitDocument = asyncHandler(async (req, res) => {
console.log("📥 New document submission received:", JSON.stringify(req.body, null, 2));
  const document = await LegalDocument.create(req.body);

  return res
    .status(201)
    .json(new ApiResponse(201, document, "Document submitted successfully."));
});
console.log(`Document controller loaded successfully , ${LegalDocument}`);

export default submitDocument;

