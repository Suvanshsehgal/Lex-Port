import { useState } from "react";
import axios from "axios";
import loader from "../assets/Loader1.gif";
import API from "../api";

export default function NdaAgreementForm() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    DocumentType: "NdaAgreement",
    Party1: {
      PartyName: "",
      PartyAddress: "",
    },
    Party2: {
      Party2Name: "",
      Party2Address: "",
    },
    proposedtransaction: "",
    BindingAgreement: {
      TerminationYear: "",
      ExpiryYears: "",
    },
    PartySignature: {
      PartySignatory1Name: "",
      PartySignatoryDesignation: "",
      PartySignatoryPlace: "",
      PartySignatureDate: "",
    },
    Party2Signature: {
      Party2Signatory1Name: "",
      Party2SignatoryDesignation: "",
      Party2SignatoryPlace: "",
      Party2SignatureDate: "",
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
        "documents",
        form,
        { 
          responseType: "blob",
          headers: {} // Let Axios set the correct Content-Type for FormData
        }
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
      alert("Failed to submit NDA form.");
    }
  };

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="flex flex-col items-center">
            <img
              src={loader}
              alt="Loading..."
              className="w-16 h-16 animate-pulse"
            />
            <p className="mt-4 text-white text-lg font-medium">
              Generating NDA...
            </p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-[#FAF9F6] p-8 min-h-screen text-green-900"
      >
        <h1
          className="text-3xl font-bold text-center mb-2"
          style={{ fontFamily: "Playfair Display" }}
        >
          NDA Agreement Form
        </h1>
        <p className="text-center mb-10 text-gray-700">
          Please fill in the details carefully.
        </p>

        {showDownloadBtn && pdfUrl && (
          <div className="flex item-center justify-center my-8">
            <a
              href={pdfUrl}
              download="NdaAgreement.pdf"
              className="bg-[#1e463c] text-white px-6 py-3 rounded-md shadow-lg hover:bg-green-950 transition w-96 text-center"
            >
              Download PDF
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Party 1 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Party 1 Information</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Party Name
              </label>
              <input
                type="text"
                onChange={(e) => handleChange(e, "Party1.PartyName")}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Party Address
              </label>
              <input
                type="text"
                onChange={(e) => handleChange(e, "Party1.PartyAddress")}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Party 2 */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Party 2 Information</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Party 2 Name
              </label>
              <input
                type="text"
                onChange={(e) => handleChange(e, "Party2.Party2Name")}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Party 2 Address
              </label>
              <input
                type="text"
                onChange={(e) => handleChange(e, "Party2.Party2Address")}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Transaction Details */}
          <div className="bg-white p-6 rounded-lg shadow-md col-span-full">
            <h2 className="text-xl font-semibold mb-4">
              Transaction & Agreement
            </h2>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Proposed Transaction
              </label>
              <input
                type="text"
                onChange={(e) => handleChange(e, "proposedtransaction")}
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="md-1 md:mb-0 font-medium text-gray-700">
                  Termination Year
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(e, "BindingAgreement.TerminationYear")
                  }
                  className="flex-1 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="md-1 md:mb-0 font-medium text-gray-700">
                  Expiry Years
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(e, "BindingAgreement.ExpiryYears")
                  }
                  className="flex-1 p-2 border border-gray-300 rounded"
                  required
                />
              </div>
            </div>
          </div>

          {/* Party 1 Signature */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Party 1 Signature</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Signatory Name
              </label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange(e, "PartySignature.PartySignatory1Name")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange(e, "PartySignature.PartySignatoryDesignation")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">Place</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange(e, "PartySignature.PartySignatoryPlace")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Signature Date
              </label>
              <input
                type="date"
                onChange={(e) =>
                  handleChange(e, "PartySignature.PartySignatureDate")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>

          {/* Party 2 Signature */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Party 2 Signature</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Signatory Name
              </label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange(e, "Party2Signature.Party2Signatory1Name")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Designation
              </label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange(e, "Party2Signature.Party2SignatoryDesignation")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">Place</label>
              <input
                type="text"
                onChange={(e) =>
                  handleChange(e, "Party2Signature.Party2SignatoryPlace")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
              <label className="md-1 md:mb-0 font-medium text-gray-700">
                Signature Date
              </label>
              <input
                type="date"
                onChange={(e) =>
                  handleChange(e, "Party2Signature.Party2SignatureDate")
                }
                className="flex-1 p-2 border border-gray-300 rounded"
                required
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mt-10">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1e463c] text-white px-6 py-3 rounded-lg hover:bg-green-900 transition font-semibold"
          >
            {isLoading ? "Generating..." : "Generate NDA Agreement"}
          </button>
        </div>
      </form>
    </>
  );
}
