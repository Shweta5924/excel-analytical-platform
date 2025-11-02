import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import DashboardNavbar from "./DashboardNavbar";
import DashboardNavAdmin from "./DashboardNavAdmin";

export default function AllFilesPage() {
  const [files, setFiles] = useState([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (err) {
        console.error("Error fetching files", err);
      }
    };
    fetchFiles();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this file?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/files/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFiles((prev) => prev.filter((f) => f._id !== id));
    } catch (err) {
      alert("Failed to delete file");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <DashboardNavAdmin/>
      <h1 className="text-2xl font-bold text-blue-800 mb-6">All Uploaded Files</h1>
      <table className="w-full bg-white rounded-xl shadow border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left border-b">
            <th className="p-3">Filename</th>
            <th className="p-3">Uploader</th>
            <th className="p-3">Date</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <tr key={file._id} className="border-b hover:bg-gray-50">
              <td className="p-3">{file.filename}</td>
              <td className="p-3">{file.uploadedBy?.email || "Unknown"}</td>
              <td className="p-3">{new Date(file.uploadedAt).toLocaleDateString()}</td>
              <td className="p-3 space-x-2">
                {/* <Link to={`/analysis?id=${file._id}`} className="text-blue-600 hover:underline">View</Link> */}
                <button onClick={() => handleDelete(file._id)} 
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
