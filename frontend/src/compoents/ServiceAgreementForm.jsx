import { useState } from "react";
import axios from "axios";
import loader from "../assets/Loader1.gif";
import API from "../api";

export default function ServiceAgreementForm() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    DocumentType: "ServiceAgreement",
    effectiveDate: "",
    customer: {
      name: "",
      address: "",
    },
    serviceProvider: {
      name: "",
      address: "",
    },
    services: [],
    compensation: {
      totalFee: "",
      totalCost: "",
      dueAtSigning: "",
      dueAtCompletion: "",
    },
    paymentDetails: {
      invoiceEveryDays: "",
      paymentDueInDays: "",
      paymentMethods: [],
    },
    contractTerm: {
      duration: "",
    },
    terminationNoticePeriod: {
      days: "",
    },
    governingLaw: "",
    notices: {
      customerNotice: [],
      serviceProviderNotice: [],
    },
    signatures: {
      customer: {
        name: "",
        date: "",
      },
      serviceProvider: {
        name: "",
        date: "",
      },
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
      const response = await API.post("http://localhost:7000/api/v1/user/documents", form, { responseType: "blob" });
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
      alert("Failed to submit Service Agreement form.");
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
          Service Agreement Form
        </h1>
        <p className="text-center mb-10 text-gray-700">Please fill in the details carefully.</p>

        {showDownloadBtn && pdfUrl && (
          <div className="flex item-center justify-center my-8">
            <a
              href={pdfUrl}
              download="ServiceAgreement.pdf"
              className="bg-[#1e463c] text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-950 transition w-96 text-center"
            >
              Download PDF
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Customer Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Customer Details</h2>
            <label>Name</label>
            <input type="text" onChange={(e) => handleChange(e, "customer.name")} className="w-full mb-3 p-2 border rounded" required />
            <label>Address</label>
            <input type="text" onChange={(e) => handleChange(e, "customer.address")} className="w-full mb-3 p-2 border rounded" required />
          </div>

          {/* Service Provider Info */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Service Provider Details</h2>
            <label>Name</label>
            <input type="text" onChange={(e) => handleChange(e, "serviceProvider.name")} className="w-full mb-3 p-2 border rounded" required />
            <label>Address</label>
            <input type="text" onChange={(e) => handleChange(e, "serviceProvider.address")} className="w-full mb-3 p-2 border rounded" required />
          </div>

          {/* Compensation */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
            <h2 className="text-xl font-semibold mb-4">Compensation</h2>
            <label>Total Fee</label>
            <input type="text" onChange={(e) => handleChange(e, "compensation.totalFee")} className="w-full mb-3 p-2 border rounded" required />
            <label>Total Cost</label>
            <input type="text" onChange={(e) => handleChange(e, "compensation.totalCost")} className="w-full mb-3 p-2 border rounded" required />
            <label>Due At Signing</label>
            <input type="text" onChange={(e) => handleChange(e, "compensation.dueAtSigning")} className="w-full mb-3 p-2 border rounded" required />
            <label>Due At Completion</label>
            <input type="text" onChange={(e) => handleChange(e, "compensation.dueAtCompletion")} className="w-full mb-3 p-2 border rounded" required />
          </div>

          {/* Payment Details */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
            <label>Invoice Every (Days)</label>
            <input type="text" onChange={(e) => handleChange(e, "paymentDetails.invoiceEveryDays")} className="w-full mb-3 p-2 border rounded" required />
            <label>Payment Due In (Days)</label>
            <input type="text" onChange={(e) => handleChange(e, "paymentDetails.paymentDueInDays")} className="w-full mb-3 p-2 border rounded" required />
          </div>

          {/* Contract Term */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contract Term</h2>
            <label>Duration</label>
            <input type="text" onChange={(e) => handleChange(e, "contractTerm.duration")} className="w-full mb-3 p-2 border rounded" required />
            <label>Termination Notice (Days)</label>
            <input type="text" onChange={(e) => handleChange(e, "terminationNoticePeriod.days")} className="w-full p-2 border rounded" required />
          </div>

          {/* Governing Law */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Governing Law</h2>
            <label>Jurisdiction</label>
            <input type="text" onChange={(e) => handleChange(e, "governingLaw")} className="w-full p-2 border rounded" required />
          </div>

          {/* Signatures */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Customer Signature</h2>
            <label>Name</label>
            <input type="text" onChange={(e) => handleChange(e, "signatures.customer.name")} className="w-full mb-3 p-2 border rounded" required />
            <label>Date</label>
            <input type="date" onChange={(e) => handleChange(e, "signatures.customer.date")} className="w-full p-2 border rounded" required />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Service Provider Signature</h2>
            <label>Name</label>
            <input type="text" onChange={(e) => handleChange(e, "signatures.serviceProvider.name")} className="w-full mb-3 p-2 border rounded" required />
            <label>Date</label>
            <input type="date" onChange={(e) => handleChange(e, "signatures.serviceProvider.date")} className="w-full p-2 border rounded" required />
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Effective Date</h2>
            <label>Agreement Effective Date</label>
            <input type="date" onChange={(e) => handleChange(e, "effectiveDate")} className="w-full p-2 border rounded" required />
          </div>
        </div>

        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1e463c] text-white px-6 py-3 rounded-lg hover:bg-green-900 transition font-semibold"
          >
            {isLoading ? "Generating..." : "Generate Service Agreement"}
          </button>
        </div>
      </form>
    </>
  );
}
