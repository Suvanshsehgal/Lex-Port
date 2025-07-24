import { useState } from "react";
import axios from "axios";
import loader from "../assets/Loader1.gif";
import API from "../api";

export default function RentAgreementForm() {
  const [pdfUrl, setPdfUrl] = useState("");
  const [showDownloadBtn, setShowDownloadBtn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    DocumentType: "RentAgreement",

    Landlord: {
      FullName: "",
      FathersName: "",
      Address: "",
    },
    Tenant: {
      Name: "",
      FatherName: "",
      Wprking: "",
      RegisteredAddress: "",
    },
    PropertyDetails: {
      PropertyNumber: "",
      NumberofBedrooms: "",
      Inventory: [
        {
          NumberofFans: "",
          NumberOfCFLLights: "",
          NumberOfGeyser: "",
          NumberOfMirrors: "",
        },
      ],
    },
    RentDetails: {
      MonthlyRent: "",
      MaintenanceCharge: "",
      SecurityDeposit: "",
      Currency: "INR",
      PaymentTerms: "Monthly, excluding electricity and water charges",
    },
    LeaseTerms: {
      LeaseStartDate: "",
      LeaseDurationMonths: 11,
      IsRenewable: true,
      UseOfPremises: "Official Purpose Only",
    },
    SignatureSection: {
      SignedAt: "",
      SignedDate: "",
      Witnesses: [{ FullName: "", SignedDate: "" }],
    },
  });

  const handleChange = (e, path) => {
    const value = e.target.value;
    setFormData((prev) => {
      const updated = { ...prev };
      const keys = path.replaceAll("[", ".").replaceAll("]", "").split(".");

      let obj = updated;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!obj[keys[i]]) {
          // Create an object or array depending on next key
          const nextKey = keys[i + 1];
          obj[keys[i]] = isNaN(Number(nextKey)) ? {} : [];
        }
        obj = obj[keys[i]];
      }

      obj[keys[keys.length - 1]] = value;
      return updated;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    setIsLoading(true);
    const stime = Date.now();

    const flatten = (obj, prefix = "") => {
      for (const key in obj) {
        const path = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
          flatten(obj[key], path);
        } else if (Array.isArray(obj[key])) {
          obj[key].forEach((val, i) => {
            if (typeof val === "object") {
              flatten(val, `${path}[${i}]`);
            } else {
              form.append(`${path}[${i}]`, val);
            }
          });
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
        {
          responseType: "blob", // PDF as blob
        }
      );
      const blobUrl = window.URL.createObjectURL(new Blob([response.data]));
      setPdfUrl(blobUrl);
      setShowDownloadBtn(true); 

      const eTime = Date.now() - stime;
    const reTime = Math.max(2000 - eTime, 0);
    setTimeout(() => setIsLoading(false), reTime);

    setTimeout(() => {
      setIsLoading(false);
       window.scrollTo({ top: 0, behavior: "smooth" });
    }, reTime);
      
    } catch (error) {
      setIsLoading(false);
      console.error(" Submission failed", error);
      alert("Failed to submit form or generate PDF.");
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
              Submitting the form....
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
          Rent Agreement Form
        </h1>
        <p className="text-center mb-10 text-gray-700">
          Please fill in the details to generate the agreement.
        </p>

        {showDownloadBtn && pdfUrl && (
          <div className="flex item-center justify-center my-8 ">
            <a
              href={pdfUrl}
              download="RentAgreement.pdf"
              className="bg-[#1e463c] text-white px-6 py-3 rounded-md shadow-lg  hover:bg-green-950 transition w-96 text-center"
            >
              Download PDF
            </a>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Landlord Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Landlord Information</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Full Name:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Landlord.FullName")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Father's Name:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Landlord.FathersName")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Address:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Landlord.Address")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
            </ul>
          </div>

          {/* Tenant Info */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Tenant Information</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Tenant Name:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Tenant.Name")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Father Name:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Tenant.FatherName")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Working:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Tenant.Working")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Registered Address:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "Tenant.RegisteredAddress")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
            </ul>
          </div>

          {/* Property Details */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Property Details</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Property Number:
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(e, "PropertyDetails.PropertyNumber")
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Rooms Included:
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(e, "PropertyDetails.NumberofBedrooms")
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Number of fans:
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(e, "PropertyDetails.Inventory.NumberofFans")
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  CFL Lights:
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(
                      e,
                      "PropertyDetails.Inventory.NumberofCFLLIGHTS"
                    )
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
            </ul>
          </div>

          {/* Rent Details */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Rent Details</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Monthly Rent:
                </label>
                <input
                  type="number"
                  onChange={(e) => handleChange(e, "RentDetails.MonthlyRent")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Maintanance Charge:
                </label>
                <input
                  type="number"
                  onChange={(e) =>
                    handleChange(e, "RentDetails.MaintenanceCharge")
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  SecurityDeposit:
                </label>
                <input
                  type="text"
                  onChange={(e) =>
                    handleChange(e, "RentDetails.SecurityDeposit")
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
            </ul>
          </div>

          {/* Lease Terms */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <h2 className="text-xl font-semibold mb-4">Lease Terms</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Lease Start Date:
                </label>
                <input
                  type="date"
                  onChange={(e) => handleChange(e, "LeaseTerms.LeaseStartDate")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
            </ul>
          </div>

          {/* Signature Section */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8 col-span-full">
            <h2 className="text-xl font-semibold mb-4">Signature Section</h2>
            <ul>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Signed At:
                </label>
                <input
                  type="text"
                  onChange={(e) => handleChange(e, "SignatureSection.SignedAt")}
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
              <li className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 mb-4">
                <label className="mb-1 md:mb:0 font-medium text-gray-700">
                  Signed Date:
                </label>
                <input
                  type="date"
                  onChange={(e) =>
                    handleChange(e, "SignatureSection.SignedDate")
                  }
                  className="flex-1 border border-gray-300 rounded px-4 py-2 w-full"
                />
              </li>
            </ul>
          </div>

          {/* Tenant Contact Info */}
        </div>

        {/* Submit Button */}
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
