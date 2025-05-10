import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import FileUpload from "../components/Admin/FileUpload";
import DocumentList from "../components/Admin/DocumentList";
import api from "../services/api";
import Header from "../components/Layout/Header";
import Sidebar from "../components/Layout/Sidebar";

const Admin = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await api.get("/documents");
        setDocuments(response.data);
      } catch (err) {
        setError(err.response?.data?.error || "Failed to fetch documents");
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handleUploadSuccess = (newDocument) => {
    setDocuments([newDocument, ...documents]);
  };

  const handleDelete = (id) => {
    setDocuments(documents.filter((doc) => doc._id !== id));
  };

  if (user?.role !== "admin") {
    return <div>Unauthorized</div>;
  }

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Admin Panel
            </h2>

            <div className="bg-white shadow rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Upload New Document
              </h3>
              <FileUpload onUpload={handleUploadSuccess} />
            </div>

            <div className="bg-white shadow rounded-lg p-6">
              {loading ? (
                <p>Loading documents...</p>
              ) : error ? (
                <p className="text-red-500">{error}</p>
              ) : (
                <DocumentList documents={documents} onDelete={handleDelete} />
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Admin;
