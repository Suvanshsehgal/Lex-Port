import mongoose, { Schema } from "mongoose";
import { LegalDocument } from "./form.models.js";
const ServiceAgreementSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    effectiveDate: { type: String, required: true, trim: true },

    customer: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    },

    serviceProvider: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
    },

    services: {
      type: [String],
      default: [],
    },

    compensation: {
      totalFee: { type: String, required: true, trim: true },
      totalCost: { type: String, required: true, trim: true },
      dueAtSigning: { type: String, required: true, trim: true },
      dueAtCompletion: { type: String, required: true, trim: true },
    },

    paymentDetails: {
      invoiceEveryDays: { type: String, required: true, trim: true },
      paymentDueInDays: { type: String, required: true, trim: true },
      paymentMethods: {
        type: [String],
        default: [],
      },
    },

    contractTerm: {
      duration: { type: String, required: true, trim: true },
    },

    terminationNoticePeriod: {
      days: { type: String, required: true, trim: true },
    },

    governingLaw: {
      type: String,
      required: true,
      trim: true,
    },

    notices: {
      customerNotice: {
        type: [String],
        default: [],
      },
      serviceProviderNotice: {
        type: [String],
        default: [],
      },
    },

    signatures: {
      customer: {
        name: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true },
      },
      serviceProvider: {
        name: { type: String, required: true, trim: true },
        date: { type: String, required: true, trim: true },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const ServiceAgreement = LegalDocument.discriminator(
  "ServiceAgreement",
  ServiceAgreementSchema
);