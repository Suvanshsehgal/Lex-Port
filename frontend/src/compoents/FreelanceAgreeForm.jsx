import { useState } from "react";
import axios from "axios";
import loader from "../assets/Loader1.gif";
import API from "../api";

export default function FreelanceAgreementForm() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    DocumentType: "FreelanceAgreement",
    AgreementLocation: { city: "", state: "" },
    EffectiveDate: "",
    Client: {
      CompanyName: "",
      RegisteredAddress: "",
      SignatoryName: "",
      SignatoryDesignation: "Director",
    },
    Freelancer: {
      CompanyName: "",
      RegisteredAddress: "",
      SignatoryName: "",
      SignatoryDesignation: "Freelancer",
    },
    AssignmentDetails: "",
    ContractPeriod: {
      StartDate: "",
      EndCondition: "Until completion or mutual termination",
    },
    Compensation: {
      AmountNumeric: "",
      PaymentBasis: "Flat Fee",
      PaymentFrequency: "On Completion",
    },
    Jurisdiction: {
      CityDistrict: "",
      Country: "India",
    },
    SigningDetails: {
      Place: "",
      Date: "",
    },
  });

  const handleChange = (e, path) => {
    const value = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.replaceAll("[", ".").replaceAll("]", "").split(".");

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
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          flatten(obj[key], path);
        } else {
          form.append(path, obj[key]);
        }
      }
    };

    flatten(formData);

    try {
      const response = await API.post(
        "https://lex-port.onrender.com/api/v1/user/documents",
        form,
        { responseType: "blob" }
      );
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
      alert("Failed to submit Freelance Agreement form.");
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
          Freelance Agreement Form
        </h1>
        <p className="text-center mb-10 text-gray-700">Please fill in the details to generate the agreement.</p>

        {showDownloadBtn && pdfUrl && (
          <div className="flex item-center justify-center my-8">
            <a
              href={pdfUrl}
              download="FreelanceAgreement.pdf"
              className="bg-[#1e463c] text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-950 transition w-96 text-center"
            >
              Download PDF
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Client Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Client Information</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Company Name:</label>
                <input type="text" onChange={(e) => handleChange(e, "Client.CompanyName")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Address:</label>
                <input type="text" onChange={(e) => handleChange(e, "Client.RegisteredAddress")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Signatory Name:</label>
                <input type="text" onChange={(e) => handleChange(e, "Client.SignatoryName")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
            </ul>
          </div>

          {/* Freelancer Information */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Freelancer Information</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Company Name:</label>
                <input type="text" onChange={(e) => handleChange(e, "Freelancer.CompanyName")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Address:</label>
                <input type="text" onChange={(e) => handleChange(e, "Freelancer.RegisteredAddress")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Signatory Name:</label>
                <input type="text" onChange={(e) => handleChange(e, "Freelancer.SignatoryName")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
            </ul>
          </div>

          {/* Assignment & Contract Period */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Project & Contract</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Assignment Details:</label>
                <input type="text" onChange={(e) => handleChange(e, "AssignmentDetails")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Start Date:</label>
                <input type="date" onChange={(e) => handleChange(e, "ContractPeriod.StartDate")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
            </ul>
          </div>

          {/* Compensation */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Compensation</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="font-medium text-gray-700 mb-1 md:mb-0">Amount (₹):</label>
                <input type="number" onChange={(e) => handleChange(e, "Compensation.AmountNumeric")} className="flex-1 border border-gray-300 rounded px-4 py-2 w-full" />
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            type="submit"
            className="bg-[#1e463c] text-white px-6 py-3 rounded-lg hover:bg-green-900 transition font-semibold"
          >
            Generate Agreement
          </button>
        </div>
      </form>
    </>
  );
}