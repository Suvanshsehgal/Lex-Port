import mongoose, { Schema } from "mongoose";
import { LegalDocument } from "./form.models.js"; // base model

const RentAgreementSchema = new Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },

  Landlord: {
    FullName: { type: String, required: true, trim: true },
    FathersName: { type: String, trim: true },
    Address: { type: String, required: true, trim: true },
  },

  Tenant: {
    Name: { type: String, required: true, trim: true },
    Working:{type:String,required:true,trim:true},
    FatherName: { type: String, required: true, trim: true },
    RegisteredAddress: { type: String, required: true, trim: true },
  },

  PropertyDetails: {
    PropertyNumber: { type: String, required: true, trim: true },
    NumberOfBedrooms:{type: String},
    Inventory:[
      {
        NumberOfFans:{type: String},
        NumberOfCFLLights:{type: String},
        NumberOfGeyser:{type: String},
        NumberOfMirrors:{type: String}
      }
    ]
  },

  RentDetails: {
    MonthlyRent: { type: Number, required: true },
    MaintenanceCharge:{type:String},
    SecurityDeposit :{type:String},
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
    Witnesses: [
      {
        FullName: { type: String, trim: true },
        SignedDate: { type: Date }
      }
    ]
  }

}, {
  timestamps: true
});

export const RentAgreement = LegalDocument.discriminator("RentAgreement", RentAgreementSchema);
