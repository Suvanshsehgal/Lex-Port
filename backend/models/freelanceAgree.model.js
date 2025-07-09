import mongoose, { Schema } from "mongoose";
import { LegalDocument } from "./form.models.js";

const FreelanceAgreementSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },

    AgreementLocation: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
    },

    EffectiveDate: { type: String, trim: true }, // optional, can default to current date on frontend

    Client: {
      CompanyName: { type: String, trim: true },
      RegisteredAddress: { type: String, trim: true },
      SignatoryName: { type: String, trim: true },
      SignatoryDesignation: {
        type: String,
        trim: true,
        default: "Director",
      },
    },

    Freelancer: {
      CompanyName: { type: String, trim: true },
      RegisteredAddress: { type: String, trim: true },
      SignatoryName: { type: String, trim: true },
      SignatoryDesignation: {
        type: String,
        trim: true,
        default: "Freelancer",
      },
    },

    AssignmentDetails: { type: String, trim: true },

    ContractPeriod: {
      StartDate: { type: String, trim: true }, // optional or default to EffectiveDate
      EndCondition: {
        type: String,
        trim: true,
        default: "Until completion or mutual termination",
      },
    },

    Compensation: {
      AmountNumeric: { type: Number },
      PaymentBasis: {
        type: String,
        enum: ["Flat Fee", "Hour", "Week", "Month"],
        default: "Flat Fee",
      },
      PaymentFrequency: {
        type: String,
        enum: ["On Completion", "Weekly", "Monthly"],
        default: "On Completion",
      },
    },

    Jurisdiction: {
      CityDistrict: { type: String, trim: true },
      Country: {
        type: String,
        trim: true,
        default: "India",
      },
    },

    SigningDetails: {
      Place: { type: String, trim: true },
      Date: { type: String, trim: true }, // could default to server-side current date if not provided
    },
  },
  {
    timestamps: true,
  }
);

export const FreelanceAgreement = LegalDocument.discriminator( "FreelanceAgreement",FreelanceAgreementSchema);
