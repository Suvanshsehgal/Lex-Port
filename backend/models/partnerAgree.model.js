import mongoose, { Schema } from "mongoose";
import { LegalDocument } from "./form.models.js";

const PartnershipAgreementSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    agreementDate: {
      type: String,
      trim: true,
      default: () => new Date().toISOString().split("T")[0], // YYYY-MM-DD
    },

    company: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      signatoryName: { type: String, required: true, trim: true },
      signatoryTitle: { type: String, trim: true, default: "Director" },
      signatureDate: {
        type: String,
        trim: true,
        default: () => new Date().toISOString().split("T")[0],
      },
    },

    partner: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      signatoryName: { type: String, required: true, trim: true },
      signatoryTitle: { type: String, trim: true, default: "Partner" },
      signatureDate: {
        type: String,
        trim: true,
        default: () => new Date().toISOString().split("T")[0],
      },
    },

    productInfo: {
      productList: {
        type: String,
        trim: true,
        default: "As per Exhibit B",
      },
      deliveryTerms: {
        type: String,
        trim: true,
        default: "Delivery as mutually agreed in writing.",
      },
      pricingTerms: {
        type: String,
        trim: true,
        default: "As detailed in Exhibit A",
      },
      commissionDetails: {
        type: String,
        trim: true,
        default: "As per mutually agreed terms.",
      },
    },

    paymentTerms: {
      paymentSchedule: {
        type: String,
        trim: true,
        default: "Monthly invoice payable within 30 days",
      },
      paymentDueDays: {
        type: String,
        trim: true,
        default: "30",
      },
      currency: {
        type: String,
        trim: true,
        default: "INR",
      },
    },

    legal: {
      jurisdictionState: {
        type: String,
        trim: true,
        default: "Delhi",
      },
      disputeResolution: {
        type: String,
        trim: true,
        default: "Any disputes shall be resolved under Indian Arbitration laws.",
      },
      confidentialityClause: {
        type: Boolean,
        default: true,
      },
      exclusivityClause: {
        type: Boolean,
        default: false,
      },
    },

    notices: {
      companyEmail: { type: String, trim: true },
      partnerEmail: { type: String, trim: true },
    },
  },
  {
    timestamps: true,
  }
);

export const PartnershipAgreement = LegalDocument.discriminator(
  "PartnershipAgreement",
  PartnershipAgreementSchema
);
