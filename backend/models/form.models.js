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

  Parties: [
    {
      Role: { type: String, trim: true },  // e.g. Lessor, Lessee, Grantor
      FullName: { type: String,  trim: true },
      Address: { type: String, trim: true },
      ContactNumber: { type: String, trim: true },
      Email: { type: String, trim: true }
    }
  ],

  SignatureSection: {
    SignerFullName: { type: String, trim: true },
    SignatureImage: { type: String }, // base64 or URL
    SignedDate: { type: Date},
    Witnesses: [
      {
        FullName: { type: String, trim: true },
        SignatureImage: { type: String },
        SignedDate: { type: Date }
      }
    ]
  }
}, baseOptions);

// ✅ Export Base Model
export const LegalDocument = mongoose.model("LegalDocument", LegalDocumentSchema);
