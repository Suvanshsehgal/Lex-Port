import React, { useEffect, useState } from "react";
import API from "../api";

const History = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await API.get("documents/history");

      setDocuments(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching document history:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Your Document History</h1>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : documents.length === 0 ? (
        <p className="text-gray-600">No documents found.</p>
      ) : (
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <div
              key={doc._id || idx}
              className="bg-white p-4 rounded-lg shadow-md border border-gray-200"
            >
              <p><strong> Type:</strong> {doc.DocumentType || "N/A"}</p>
              <p><strong> Date:</strong> {new Date(doc.createdAt).toLocaleString()}</p>           
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default History;