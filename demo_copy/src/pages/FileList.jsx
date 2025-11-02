// import { useState } from "react";
// import { Link } from "react-router-dom";

// export default function FileList() {
//   // Dummy file data
//   const [files, setFiles] = useState([
//     { id: 1, name: "Sales_Q1.xlsx", uploadedBy: "Alice", date: "2025-07-20" },
//     { id: 2, name: "Inventory_Report.xlsx", uploadedBy: "Bob", date: "2025-07-18" },
//     { id: 3, name: "Budget_2025.xlsx", uploadedBy: "Charlie", date: "2025-07-15" },
//   ]);

//   // Handle delete
//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this file?")) {
//       setFiles(files.filter((file) => file.id !== id));
//     }
//   };

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-700 text-white flex flex-col">
//         <div className="px-6 py-4 text-2xl font-bold border-b border-blue-500">
//           Excel Analytics
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           <Link to="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Dashboard
//           </Link>
//           <Link to="/upload" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Upload File
//           </Link>
//           <Link to="/files" className="block px-3 py-2 rounded-lg bg-blue-600">
//             Files
//           </Link>
//           <Link to="/analysis" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Analysis
//           </Link>
//           <Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Profile
//           </Link>
//         </nav>
//         <div className="p-4 border-t border-blue-500 text-sm">
//           <button className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg">
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Uploaded Files</h1>

//         {/* Table */}
//         <div className="bg-white shadow rounded-xl overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-100 text-left text-gray-600">
//                 <th className="p-3">File Name</th>
//                 <th className="p-3">Uploaded By</th>
//                 <th className="p-3">Upload Date</th>
//                 <th className="p-3 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {files.length > 0 ? (
//                 files.map((file) => (
//                   <tr key={file.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3">{file.name}</td>
//                     <td className="p-3">{file.uploadedBy}</td>
//                     <td className="p-3">{file.date}</td>
//                     <td className="p-3 text-center space-x-3">
//                       {/* View File */}
//                       <Link
//                         to={`/analysis?id=${file.id}`}
//                         className="text-blue-600 hover:underline"
//                       >
//                         View
//                       </Link>

//                       {/* Analyze File */}
//                       <Link
//                         to={`/analysis?id=${file.id}`}
//                         className="text-green-600 hover:underline"
//                       >
//                         Analyze
//                       </Link>

//                       {/* Delete File */}
//                       <button
//                         onClick={() => handleDelete(file.id)}
//                         className="text-red-600 hover:underline"
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="4" className="text-center p-4 text-gray-500">
//                     No files uploaded yet.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   );
// }


// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";

// export default function FileList() {
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     const fetchFiles = async () => {
//       const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
//       const res = await axios.get("http://localhost:5000/api/files", {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setFiles(res.data);
//     };
//     fetchFiles();
//   }, []);

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Uploaded Files</h2>
//       <ul>
//         {files.map((file) => (
//           <li key={file._id} className="mb-2">
//             {file.filename} -{" "}
//             <Link to={`/analysis/${file._id}`} className="text-blue-600 underline">
//               Analyze
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import Navbar from "./Navbar";

// const FileList = () => {
//   const [files, setFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const token =
//     localStorage.getItem("token") || localStorage.getItem("adminToken");

//   useEffect(() => {
//     const fetchFiles = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/files", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setFiles(res.data);
//       } catch (error) {
//         console.error("Error fetching files", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFiles();
//   }, []);



//   const handleAnalyze = (file) => {
//     // save selected file info in localStorage or state
//     localStorage.setItem("selectedFile", JSON.stringify(file));
//     navigate("/operations");
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this file?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/files/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setFiles(files.filter((file) => file._id !== id));
//     } catch (error) {
//       console.error("Error deleting file", error);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen text-gray-600">
//         Loading files...
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div>
//         <Navbar></Navbar>
//       </div>
//       <h1 className="text-3xl font-bold text-blue-800 mb-6">Uploaded Files</h1>

//       {files.length === 0 ? (
//         <p className="text-gray-500 text-lg">No files uploaded yet.</p>
//       ) : (
//         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {files.map((file) => (
//             <div
//               key={file._id}
//               className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col"
//             >
//               {/* File Icon */}
//               <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-6 w-6 text-green-600"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M7 7v10M17 7v10M3 3h18v2H3V3z"
//                   />
//                 </svg>
//               </div>

//               {/* File Info */}
//               {/* <h2 className="text-lg font-semibold text-gray-700 truncate">
//                 {file.originalname}
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">
//                 Uploaded: {new Date(file.createdAt).toLocaleDateString()}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Size: {(file.size / 1024).toFixed(2)} KB
//               </p> */}

//               <h2 className="text-lg font-semibold text-gray-700 truncate">
//                 {file.filename || "Untitled File"}
//               </h2>
//               <p className="text-gray-500 text-sm mt-1">
//                 Uploaded:{" "}
//                 {file.uploadedAt
//                   ? new Date(file.uploadedAt).toLocaleDateString()
//                   : "Unknown date"}
//               </p>
//               <p className="text-gray-500 text-sm">
//                 Size: {file.size ? (file.size / 1024).toFixed(2) + " KB" : "Unknown"}
//               </p>

//               {/* Actions */}
//               <div className="mt-4 flex justify-between">
//                 <Link
//                   to={`/analysis/${file._id}`}
//                   className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
//                 >
//                   Analyze
//                 </Link>
//                 <button
//                     onClick={() => handleAnalyze(file)}
//                     className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700"
//                   >
//                     Analyze
//                   </button>
//                 <button
//                   onClick={() => handleDelete(file._id)}
//                   className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileList;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";


const FileList = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const token =
    localStorage.getItem("token") || localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/files", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFiles(res.data);
      } catch (error) {
        console.error("Error fetching files", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, []);

  const navigate = useNavigate();

  const handleDelete = async (fileId) => {
    const confirm = window.confirm("Are you sure you want to delete this file?");
    if (!confirm) return;

    try {
      await axios.delete(`http://localhost:5000/api/files/${fileId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // ✅ Remove file from UI
      setFiles((prevFiles) => prevFiles.filter((file) => file._id !== fileId));
    } catch (error) {
      console.error("Error deleting file", error);
      alert("❌ Failed to delete file");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading files...
      </div>
    );
  }

  return (
    <div >
      <Navbar />
     <div className="min-h-screen bg-gray-100 p-8">
    
      

      <h1 className="text-3xl font-bold text-blue-800 mb-6">Uploaded Files</h1>

      {files.length === 0 ? (
        <p className="text-gray-500 text-lg">No files uploaded yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {files.map((file) => (
            <div
              key={file._id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-5 flex flex-col"
            >
              {/* File Icon */}
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 7v10M17 7v10M3 3h18v2H3V3z"
                  />
                </svg>
              </div>

              {/* File Info */}
              <h2 className="text-lg font-semibold text-gray-700 truncate">
                {file.filename || "Untitled File"}
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                Uploaded:{" "}
                {file.uploadedAt
                  ? new Date(file.uploadedAt).toLocaleDateString()
                  : "Unknown date"}
              </p>
              <p className="text-gray-500 text-sm">
                Size:{" "}
                {file.size
                  ? (file.size / 1024).toFixed(2) + " KB"
                  : "Unknown"}
              </p>

              {/* Actions */}
              <div className="mt-4 flex justify-between">


                <button
                  onClick={() =>
                    navigate("/analyze", { state: { file: file } }) // 👈 send file object, not just name
                  }
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Analyze
                </button>

                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
};

export default FileList;
