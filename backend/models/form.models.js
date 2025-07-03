import mongoose, { Schema } from "mongoose";

const legalDocumentSchema = new Schema({
  DocumentType: {
    type: String,
    required: true,
    trim: true
  },
  DocumentCreationDate: {
    type: Date,
  },
  FullName: {
    type: String,
    trim: true
  },
  Address: {
    type: String,
    trim: true
  },

  OtherParty: {
    FullName: { type: String, trim: true },
    Address: { type: String, trim: true },
    ContactNumber: { type: String, trim: true },
    Email: { type: String, trim: true },
    IdentificationDetails: {
      IDType: { type: String, trim: true },
      IDNumber: { type: String, trim: true }
    }
  },

  FinancialInfo: {
    Type: { type: String, trim: true },
    Amount: { type: Number },
    Currency: { type: String, trim: true },
    PaymentTerms: { type: String, trim: true },
    DueDates: [{ type: Date }]
  },

  WorkDetails: {
    WorkType: { type: String, trim: true },
    Position: { type: String, trim: true },
    StartDate: { type: Date },
    EndDate: { type: Date },
    DutiesAndResponsibilities: { type: String, trim: true },
    Deliverables: { type: String, trim: true }
  },

  ConfidentialityTerms: {
    IsNDAIncluded: { type: Boolean },
    ConfidentialityPeriod: { type: String, trim: true },
    RestrictedInformation: { type: String, trim: true },
    DisclosureExemptions: { type: String, trim: true },
    ConsequencesOfBreach: { type: String, trim: true }
  },

  POADetails: {
    IsPOAIncluded: { type: Boolean },
    POAGrantor: { type: String, trim: true },
    POAReceiver: { type: String, trim: true },
    POAScope: { type: String, trim: true },
    EffectiveFrom: { type: Date },
    EffectiveUntil: { type: Date }
  },

  WillDetails: {
    IsWillIncluded: { type: Boolean },
    Beneficiaries: [
      {
        FullName: { type: String, trim: true },
        Relation: { type: String, trim: true },
        AssetDetails: { type: String, trim: true }
      }
    ],
    Executor: {
      FullName: { type: String, trim: true },
      ContactInfo: { type: String, trim: true }
    },
    Conditions: { type: String, trim: true }
  },

  DeclarationStatement: {
    IsDeclarationIncluded: { type: Boolean },
    DeclarationType: { type: String, trim: true },
    Statement: { type: String, trim: true },
    DeclaredOn: { type: Date }
  },

  SignatureSection: {
    SignerFullName: { type: String,  trim: true },
    SignatureImage: { type: String,  }, // base64 or URL
    SignedDate: { type: Date},
    Witnesses: [
      {
        FullName: { type: String, trim: true },
        SignatureImage: { type: String },
        SignedDate: { type: Date }
      }
    ]
  }

}, {
  timestamps: true
});

export const LegalDocument = mongoose.model("LegalDocument", legalDocumentSchema);
