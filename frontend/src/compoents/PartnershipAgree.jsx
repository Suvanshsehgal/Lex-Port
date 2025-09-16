import { useState } from "react";
import axios from "axios";
import loader from "../assets/Loader1.gif";
import API from "../api";

export default function PartnershipAgreementForm() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    DocumentType: "PartnershipAgreement",
    agreementDate: "",
    company: {
      name: "",
      address: "",
      signatoryName: "",
      signatoryTitle: "Director",
      signatureDate: "",
    },
    partner: {
      name: "",
      address: "",
      signatoryName: "",
      signatoryTitle: "Partner",
      signatureDate: "",
    },
    productInfo: {
      productList: "",
      deliveryTerms: "",
      pricingTerms: "",
      commissionDetails: "",
    },
    paymentTerms: {
      paymentSchedule: "",
      paymentDueDays: "",
      currency: "INR",
    },
    legal: {
      jurisdictionState: "",
      disputeResolution: "",
      confidentialityClause: true,
      exclusivityClause: false,
    },
    notices: {
      companyEmail: "",
      partnerEmail: "",
    },
  });

  const handleChange = (e, path) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.split(".");
      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        obj = obj[keys[i]];
      }
      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = new FormData();
    const stime = Date.now();

    const flatten = (obj, prefix = "") => {
      for (const key in obj) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === "object" && obj[key] !== null && !Array.isArray(obj[key])) {
          flatten(obj[key], path);
        } else {
          form.append(path, obj[key]);
        }
      }
    };

    flatten(formData);

    try {
      const response = await API.post("documents", form, { 
        responseType: "blob",
        headers: {} // Let Axios set the correct Content-Type for FormData
      });
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(blobUrl);
      setShowDownloadBtn(true);

      const eTime = Date.now() - stime;
      const reTime = Math.max(2000 - eTime, 0);
      setTimeout(() => {
        setIsLoading(false);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, reTime);
    } catch (err) {
      setIsLoading(false);
      console.error("Error submitting form", err);
      alert("Failed to submit Partnership Agreement form.");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <img src={loader} alt="Loading..." className="w-16 h-16 animate-pulse" />
            <p className="mt-4 text-white text-lg font-medium">Generating Agreement...</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-[#FAF9F6] p-8 min-h-screen text-green-900">
        <h1 className="text-3xl font-bold text-center mb-2" style={{ fontFamily: "Playfair Display" }}>
          Partnership Agreement Form
        </h1>
        <p className="text-center mb-10 text-gray-700">Please fill in the details carefully.</p>

        {showDownloadBtn && pdfUrl && (
          <div className="flex item-center justify-center my-8">
            <a
              href={pdfUrl}
              download="PartnershipAgreement.pdf"
              className="bg-[#1e463c] text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-950 transition w-96 text-center"
            >
              Download PDF
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Company Details</h2>
            <label>Company Name</label>
            <input type="text" onChange={(e) => handleChange(e, "company.name")} className="w-full mb-3 p-2 border rounded" required />
            <label>Company Address</label>
            <input type="text" onChange={(e) => handleChange(e, "company.address")} className="w-full mb-3 p-2 border rounded" required />
            <label>Signatory Name</label>
            <input type="text" onChange={(e) => handleChange(e, "company.signatoryName")} className="w-full mb-3 p-2 border rounded" required />
            <label>Designation</label>
            <input type="text" onChange={(e) => handleChange(e, "company.signatoryTitle")} className="w-full mb-3 p-2 border rounded" />
            <label>Signature Date</label>
            <input type="date" onChange={(e) => handleChange(e, "company.signatureDate")} className="w-full p-2 border rounded" />
          </div>

          {/* Partner Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Partner Details</h2>
            <label>Partner Name</label>
            <input type="text" onChange={(e) => handleChange(e, "partner.name")} className="w-full mb-3 p-2 border rounded" required />
            <label>Partner Address</label>
            <input type="text" onChange={(e) => handleChange(e, "partner.address")} className="w-full mb-3 p-2 border rounded" required />
            <label>Signatory Name</label>
            <input type="text" onChange={(e) => handleChange(e, "partner.signatoryName")} className="w-full mb-3 p-2 border rounded" required />
            <label>Designation</label>
            <input type="text" onChange={(e) => handleChange(e, "partner.signatoryTitle")} className="w-full mb-3 p-2 border rounded" />
            <label>Signature Date</label>
            <input type="date" onChange={(e) => handleChange(e, "partner.signatureDate")} className="w-full p-2 border rounded" />
          </div>

          {/* Product Info */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
            <h2 className="text-xl font-semibold mb-4">Product & Payment Details</h2>
            <label>Product List</label>
            <input type="text" onChange={(e) => handleChange(e, "productInfo.productList")} className="w-full mb-3 p-2 border rounded" />
            <label>Delivery Terms</label>
            <input type="text" onChange={(e) => handleChange(e, "productInfo.deliveryTerms")} className="w-full mb-3 p-2 border rounded" />
            <label>Pricing Terms</label>
            <input type="text" onChange={(e) => handleChange(e, "productInfo.pricingTerms")} className="w-full mb-3 p-2 border rounded" />
            <label>Commission Details</label>
            <input type="text" onChange={(e) => handleChange(e, "productInfo.commissionDetails")} className="w-full mb-3 p-2 border rounded" />
            <label>Payment Schedule</label>
            <input type="text" onChange={(e) => handleChange(e, "paymentTerms.paymentSchedule")} className="w-full mb-3 p-2 border rounded" />
            <label>Payment Due Days</label>
            <input type="text" onChange={(e) => handleChange(e, "paymentTerms.paymentDueDays")} className="w-full mb-3 p-2 border rounded" />
          </div>

          {/* Legal */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Legal Details</h2>
            <label>Jurisdiction State</label>
            <input type="text" onChange={(e) => handleChange(e, "legal.jurisdictionState")} className="w-full mb-3 p-2 border rounded" />
            <label>Dispute Resolution Clause</label>
            <input type="text" onChange={(e) => handleChange(e, "legal.disputeResolution")} className="w-full mb-3 p-2 border rounded" />
            <div className="flex items-center gap-2 mb-2">
              <label className="text-sm">Confidential?</label>
              <input type="checkbox" checked={formData.legal.confidentialityClause} onChange={(e) => handleChange(e, "legal.confidentialityClause")} />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm">Exclusive?</label>
              <input type="checkbox" checked={formData.legal.exclusivityClause} onChange={(e) => handleChange(e, "legal.exclusivityClause")} />
            </div>
          </div>

          {/* Notices */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Emails</h2>
            <label>Company Email</label>
            <input type="email" onChange={(e) => handleChange(e, "notices.companyEmail")} className="w-full mb-3 p-2 border rounded" />
            <label>Partner Email</label>
            <input type="email" onChange={(e) => handleChange(e, "notices.partnerEmail")} className="w-full p-2 border rounded" />
            <label>Agreement Date</label>
            <input type="date" onChange={(e) => handleChange(e, "agreementDate")} className="w-full p-2 border rounded" />
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1e463c] text-white px-6 py-3 rounded-lg hover:bg-green-900 transition font-semibold"
          >
            {isLoading ? "Generating..." : "Generate Partnership Agreement"}
          </button>
        </div>
      </form>
    </>
  );
}