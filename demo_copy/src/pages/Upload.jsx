// import { useState } from "react";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [previewName, setPreviewName] = useState("");

//   // Handle file select
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     if (selectedFile && selectedFile.name.endsWith(".xlsx")) {
//       setFile(selectedFile);
//       setPreviewName(selectedFile.name);
//     } else {
//       alert("Please upload a valid .xlsx file");
//     }
//   };

//   // Handle file upload (dummy)
//   const handleUpload = (e) => {
//     e.preventDefault();
//     if (!file) {
//       alert("No file selected!");
//       return;
//     }
//     // Here you will integrate backend API for upload
//     alert(`File "${file.name}" uploaded successfully!`);
//     setFile(null);
//     setPreviewName("");
//   };

//   return (
//     <div class="overflow-x-hidden">
//     <div className="w-screen h-screen flex bg-gray-200">
//       {/* Sidebar */}
//       <aside className="w-64 bg-green-500 text-white flex flex-col">
//         <div className="px-6 py-4 text-2xl font-bold border-b border-blue-500">
//           Excel Analytics
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           <a href="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
//             Dashboard
//           </a>
//           <a href="/upload" className="block px-3 py-2 rounded-lg bg-blue-900">
//             Upload File
//           </a>
//           <a href="/files" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
//             Files
//           </a>
//           <a href="/analysis" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
//             Analysis
//           </a>
//           <a href="/profile" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
//             Profile
//           </a>
//         </nav>
//         <div className="p-4 border-t border-blue-500 text-sm">
//           <button className="w-full py-2 bg-red-500 hover:bg-red-900 rounded-lg">
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">Upload Excel File</h1>

//         <form
//           onSubmit={handleUpload}
//           className="bg-white p-8 rounded-xl shadow-lg max-w-xl mx-auto"
//         >
//           {/* Drag-and-Drop Style */}
//           <label
//             htmlFor="fileInput"
//             className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 transition"
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-12 w-12 text-gray-400 mb-2"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M7 16a4 4 0 01-.88-7.903A5.002 5.002 0 0115.9 6H17a5 5 0 010 10h-1"
//               />
//             </svg>
//             <p className="text-gray-500">Drag & Drop or Click to Select File</p>
//             <p className="text-xs text-gray-400 mt-1">Only .xlsx files supported</p>
//             <input
//               id="fileInput"
//               type="file"
//               accept=".xlsx"
//               onChange={handleFileChange}
//               className="hidden"
//             />
//           </label>

//           {/* Preview */}
//           {previewName && (
//             <div className="mt-4 text-sm text-gray-700">
//               <span className="font-medium">Selected File:</span> {previewName}
//             </div>
//           )}

//           {/* Upload Button */}
//           <button
//             type="submit"
//             className="mt-6 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
//           >
//             Upload
//           </button>
//         </form>
//       </main>
//     </div>
//      </div>

//   );
// }

// import { useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   const handleFileChange = (e) => {
//          const uploadedFiles = Array.from(e.target.files); // File objects
//          setFiles(uploadedFiles);
//        };
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return setMessage("Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
//       const res = await axios.post("http://localhost:5000/api/files/upload", formData, {
//         headers: { Authorization: `Bearer ${token}` }
//       });

//       setMessage("File uploaded successfully!");
//     } catch (err) {
//       setMessage("Upload failed");
//     }
//   };

//   return (
//       <div class="overflow-x-hidden">
//         <div>
//     <Navbar></Navbar>
//   </div>
//             <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
//       <form onSubmit={handleUpload} className="bg-white p-6 rounded shadow-md">
//         <h2 className="text-xl mb-4 font-bold">Upload Excel File</h2>
//         {/* <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" /> */}
//         <input type="file" multiple onChange={handleFileChange} className="mb-4" />

//         <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Upload</button>
//         {message && <p className="mt-3 text-green-600">{message}</p>}
//       </form>
//     </div>
//     </div>

//   );
// }

// import React from "react";

// function Upload({ setFiles }) {
//   const handleFileChange = (e) => {
//     const uploadedFiles = Array.from(e.target.files); // File objects
//     setFiles(uploadedFiles);
//   };

//   return (
//     <div className="p-6 border rounded-lg shadow-md bg-white">
//       <h2 className="text-xl font-semibold mb-4">Upload Files</h2>
//       <input
//         type="file"
//         multiple
//         onChange={handleFileChange}
//         className="block w-full text-sm text-gray-500
//                    file:mr-4 file:py-2 file:px-4
//                    file:rounded-full file:border-0
//                    file:text-sm file:font-semibold
//                    file:bg-blue-50 file:text-blue-600
//                    hover:file:bg-blue-100"
//       />
//     </div>
//   );
// }

// export default Upload;
// import { useState } from "react";
// import axios from "axios";
// import Navbar from "./Navbar";

// export default function Upload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState("");

//   // Handle file change
//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0]; // Only take the first file
//     setFile(selectedFile);
//   };

//   // Handle file upload
//   const handleUpload = async (e) => {
//     e.preventDefault();
//     if (!file) return setMessage("⚠️ Please select a file");

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const token =
//         localStorage.getItem("token") || localStorage.getItem("adminToken");

//       await axios.post("http://localhost:5000/api/files/upload", formData, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
      
//       setMessage("✅ File uploaded successfully!");
//       setFile(null);
//     } catch (err) {
//       console.error(err);
//       setMessage("❌ Upload failed. Try again.");
//     }
//   };

//   return (
//     <div className="overflow-x-hidden">
//       <Navbar />

//       <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-100">
//         <form
//           onSubmit={handleUpload}
//           className="bg-white p-8 rounded-2xl shadow-lg w-96"
//         >
//           <h2 className="text-2xl mb-6 font-bold text-center text-gray-800">
//             Upload File
//           </h2>

//           <input
//             type="file"
//             accept=".csv, .xlsx"
//             onChange={handleFileChange}
//             className="mb-4 block w-full text-sm text-gray-600 file:mr-4 file:py-2 
//                        file:px-4 file:rounded-full file:border-0 
//                        file:text-sm file:font-semibold 
//                        file:bg-blue-50 file:text-blue-600 
//                        hover:file:bg-blue-100"
//           />

//           <button
//             type="submit"
//             className="bg-blue-500 w-full text-white py-2 rounded-lg hover:bg-blue-600 transition"
//           >
//             Upload
//           </button>

//           {message && (
//             <p
//               className={`mt-4 text-center ${
//                 message.includes("✅") ? "text-green-600" : "text-red-600"
//               }`}
//             >
//               {message}
//             </p>
//           )}
//         </form>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setMessage(""); // Clear message on new selection
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return setMessage("⚠️ Please select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("adminToken");

      await axios.post("http://localhost:5000/api/files/upload", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage("✅ File uploaded successfully!");
      setFile(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Upload failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 overflow-x-hidden">
      <Navbar />

      <div className="flex flex-col items-center justify-center pt-20 px-4">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-2">📤</div>
          <h1 className="text-3xl font-bold text-indigo-700">Upload Your File</h1>
          <p className="text-gray-600 mt-2">Supported formats: .csv, .xlsx</p>
        </div>

        {/* Upload Form */}
        <form
          onSubmit={handleUpload}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md transition hover:shadow-indigo-300"
        >
          {/* File Preview */}
          {file && (
            <div className="mb-4 flex items-center justify-between bg-indigo-50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <span className="text-indigo-600 text-xl">📄</span>
                <span className="text-sm text-gray-700">{file.name}</span>
              </div>
              <button
                onClick={() => setFile(null)}
                type="button"
                className="text-red-500 hover:text-red-700 text-sm"
              >
                ✖ Remove
              </button>
            </div>
          )}

          {/* File Input */}
          <input
            type="file"
            accept=".csv, .xlsx"
            onChange={handleFileChange}
            className="mb-6 block w-full text-sm text-gray-600 file:mr-4 file:py-2 
                       file:px-4 file:rounded-full file:border-0 
                       file:text-sm file:font-semibold 
                       file:bg-indigo-50 file:text-indigo-600 
                       hover:file:bg-indigo-100"
          />

          {/* Upload Button */}
          <button
            type="submit"
            className="bg-indigo-600 w-full text-white py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
          >
            🚀 Upload
          </button>

          {/* Message Feedback */}
          {message && (
            <p
              className={`mt-4 text-center font-medium ${
                message.includes("✅")
                  ? "text-green-600 animate-pulse"
                  : "text-red-600"
              }`}
            >
              {message}
            </p>
          )}
        </form>

        {/* Decorative Image */}
        <div className="mt-10">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
            alt="Upload Illustration"
            className="w-40 opacity-80 hover:opacity-100 transition"
          />
        </div>
      </div>
    </div>
  );
}
