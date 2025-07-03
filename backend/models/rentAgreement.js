import mongoose, { Schema } from "mongoose";
import { LegalDocument } from "./form.models.js"; // base model

const RentAgreementSchema = new Schema({
  Landlord: {
    FullName: { type: String, required: true, trim: true },
    FathersName: { type: String, trim: true },
    Address: { type: String, required: true, trim: true },
  },

  TenantCompany: {
    CompanyName: { type: String, required: true, trim: true },
    DirectorName: { type: String, required: true, trim: true },
    RegisteredAddress: { type: String, required: true, trim: true },
  },

  PropertyDetails: {
    PropertyNumber: { type: String, required: true, trim: true },
    IncludedRooms: { type: String, default: "One Office Room, One Toilet & Bathroom Set" }
  },

  RentDetails: {
    MonthlyRent: { type: Number, required: true },
    MonthlyRentInWords: { type: String },
    AdvanceRent: { type: Number, required: true },
    Currency: { type: String, default: "INR" },
    PaymentTerms: { type: String, default: "Monthly, excluding electricity and water charges" }
  },

  LeaseTerms: {
    LeaseStartDate: { type: Date, required: true },
    LeaseDurationMonths: { type: Number, default: 11 },
    IsRenewable: { type: Boolean, default: true },
    UseOfPremises: { type: String, default: "Official Purpose Only" }
  },

  SignatureSection: {
    SignedAt: { type: String, trim: true }, // Place
    SignedDate: { type: Date, required: true },
    LandlordSignature: { type: String, trim: true }, // base64 or URL
    TenantSignature: { type: String, trim: true },
    Witnesses: [
      {
        FullName: { type: String, trim: true },
        Signature: { type: String },
        SignedDate: { type: Date }
      }
    ]
  }

}, {
  timestamps: true
});

export const RentAgreement = LegalDocument.discriminator("RentAgreement", RentAgreementSchema);
