import mongoose, { Schema } from "mongoose";
import { LegalDocument } from "./form.models.js"


const NdaAgreementSchema = new Schema({

    user: {
       type: mongoose.Schema.Types.ObjectId,
       ref: "User",
       required: false,
     },

     Party1:{
        PartyName:{ type: String, required: true, trim: true },
        PartyAddress :{ type: String, required: true, trim: true },
     },
     Party2:{
        Party2Name:{ type: String, required: true, trim: true },
        Party2Address:{ type: String, required: true, trim: true },
     },
     proposedtransaction :{ type: String, required: true, trim: true },
     BindingAgreement:{
        TerminationYear:{ type: String, required: true, trim: true },
        ExpiryYears:{ type: String, required: true, trim: true },
     },
     PartySignature:{
        PartySignatory1Name:{ type: String, required: true, trim: true },
        PartySignatoryDesignation:{ type: String, required: true, trim: true },
        PartySignatoryPlace:{ type: String, required: true, trim: true },
        PartySignatureDate:{ type: String, required: true, trim: true },
     },
     Party2Signature:{
        Party2Signatory1Name:{ type: String, required: true, trim: true },
        Party2SignatoryDesignation:{ type: String, required: true, trim: true },
        Party2SignatoryPlace:{ type: String, required: true, trim: true },
        Party2SignatureDate:{ type: String, required: true, trim: true },
     }
    },
    {
        timestamps:true
    });

export const NdaAgreement = LegalDocument.discriminator("NdaAgreement", NdaAgreementSchema);