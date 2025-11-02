import { useState } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [files] = useState([
    { id: 1, name: "Sales_Q1.xlsx", date: "2025-07-20" },
    { id: 2, name: "Inventory_Report.xlsx", date: "2025-07-18" },
    { id: 3, name: "Budget_2025.xlsx", date: "2025-07-15" },
  ]);

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-500 text-white flex flex-col">
        <div className="px-6 py-4 text-2xl font-bold border-b border-blue-500">
          Excel Analytics
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="block px-3 py-2 rounded-lg bg-blue-900 ">
            Dashboard
          </Link>
          <Link to="/upload" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
            Upload File
          </Link>
          <Link to="/files" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
            Files
          </Link>
          <Link to="/analysis" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
            Analysis
          </Link>
          <Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-blue-900">
            Profile
          </Link>
        </nav>
        <div className="p-4 border-t border-blue-500 text-sm">
          <button className="w-full py-2 bg-red-500 hover:bg-red-900 rounded-lg">
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center space-x-3">
            <span className="text-gray-600">Welcome, User!</span>
            <img
              src="https://ui-avatars.com/api/?name=User&background=0D8ABC&color=fff"
              alt="avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </header>

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Total Files</h2>
            <p className="text-3xl font-bold text-blue-600">{files.length}</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Active Users</h2>
            <p className="text-3xl font-bold text-green-600">7</p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow">
            <h2 className="text-gray-500 text-sm">Last Upload</h2>
            <p className="text-lg font-semibold text-gray-700">
              {files[0]?.date || "No files"}
            </p>
          </div>
        </section>

        {/* Recent Files */}
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left bg-gray-50 border-b">
                <th className="p-2">File Name</th>
                <th className="p-2">Upload Date</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{file.name}</td>
                  <td className="p-2">{file.date}</td>
                  <td className="p-2">
                    <Link
                      to={`/analysis?id=${file.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}
