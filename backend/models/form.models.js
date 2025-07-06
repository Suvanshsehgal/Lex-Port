import mongoose, { Schema } from "mongoose";

// ✅ Base Schema Options
const baseOptions = {
  discriminatorKey: "DocumentType", // Discriminator key for Mongoose
  timestamps: true                  // Automatically adds createdAt and updatedAt
};

// ✅ Common Schema
const LegalDocumentSchema = new Schema({
  DocumentType: {
    type: String,
    trim: true
  },

  DocumentCreationDate: {
    type: Date,
    default: Date.now
  },

 

  
}, baseOptions);

// ✅ Export Base Model
export const LegalDocument = mongoose.model("LegalDocument", LegalDocumentSchema);
