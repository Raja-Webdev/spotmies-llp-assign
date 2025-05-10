import { useEffect, useState } from "react";
import { TrashIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import api from "../../services/api";

const DocumentList = ({ documents, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await api.delete(`/documents/${id}`);
      onDelete(id);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to delete document");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">
        Uploaded Documents
      </h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {documents.length === 0 ? (
        <p className="text-gray-500">No documents uploaded yet.</p>
      ) : (
        <ul className="divide-y divide-gray-200">
          {documents.map((doc) => (
            <li
              key={doc._id}
              className="py-4 flex justify-between items-center"
            >
              <div className="flex items-center">
                <DocumentTextIcon className="h-5 w-5 text-gray-400 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  {doc.originalname}
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  {new Date(doc.uploadDate).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => handleDelete(doc._id)}
                disabled={loading}
                className="text-red-500 hover:text-red-700 disabled:opacity-50"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentList;
