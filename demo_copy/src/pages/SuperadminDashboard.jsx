// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function SuperadminDashboard() {
//   const [stats, setStats] = useState({ userCount: 0, adminCount: 0, fileCount: 0 });
//   const [users, setUsers] = useState([]);
//   const [files, setFiles] = useState([]);
//   const navigate = useNavigate();
//   const token = localStorage.getItem("superadminToken");

//   useEffect(() => {
//     if (!token) {
//       navigate("/superadmin-login");
//       return;
//     }

//     const config = { headers: { Authorization: `Bearer ${token}` } };

//     const fetchData = async () => {
//       try {
//         const [statsRes, usersRes, filesRes] = await Promise.all([
//           axios.get("http://localhost:5000/api/superadmin/stats", config),
//           axios.get("http://localhost:5000/api/superadmin/users", config),
//           axios.get("http://localhost:5000/api/superadmin/files", config),
//         ]);
//         setStats(statsRes.data);
//         setUsers(usersRes.data);
//         setFiles(filesRes.data);
//       } catch (err) {
//         alert("Failed to load dashboard");
//       }
//     };

//     fetchData();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("superadminToken");
//     navigate("/superadmin-login");
//   };

//   return (
//     <div className="flex min-h-screen bg-gradient-to-br from-gray-100 to-blue-200">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-2xl p-6 flex flex-col justify-between fixed h-full">
//         <div>
//           <h2 className="text-2xl font-bold text-blue-700 mb-8">Superadmin</h2>
//           <nav className="space-y-4">
//             <button
//               onClick={() => navigate("/superadmin")}
//               className="w-full text-left px-4 py-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium transition"
//             >
//               📊 Dashboard
//             </button>
//             <button onClick={() => navigate("/superadmin/users")} className="w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition"
//          >👥 Users</button>
//   <button onClick={() => navigate("/superadmin/admins")}  className="w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition"
//         >🛡️ Admins</button>
//   <button onClick={() => navigate("/superadmin/files")}  className="w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition"
//         >📁 Files</button>
//             <button
//               onClick={() => navigate("/register-admin")}
//               className="w-full text-left px-4 py-2 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 font-medium transition"
//             >
//               ➕ Register Admin
//             </button>
//           </nav>
//         </div>
//         <button
//           onClick={handleLogout}
//           className="w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition"
//         >
//           🚪 Logout
//         </button>
//       </aside>

//       {/* Main Content */}
//       <main className="ml-64 p-8 w-full">
//         <h1 className="text-3xl font-bold text-blue-800 mb-6">Superadmin Dashboard</h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-blue-300 transition">
//             <h2 className="text-sm text-gray-500">Total Users</h2>
//             <p className="text-3xl font-bold text-blue-600">{stats.userCount}</p>
//           </div>
//           <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-green-300 transition">
//             <h2 className="text-sm text-gray-500">Total Admins</h2>
//             <p className="text-3xl font-bold text-green-600">{stats.adminCount}</p>
//           </div>
//           <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-purple-300 transition">
//             <h2 className="text-sm text-gray-500">Uploaded Files</h2>
//             <p className="text-3xl font-bold text-purple-600">{stats.fileCount}</p>
//           </div>
//         </div>

//         {/* Recent Users */}
//         <div className="bg-white p-6 rounded-xl shadow mb-6">
//           <h2 className="text-xl font-semibold mb-4">Recent Users</h2>
//           <ul className="space-y-2">
//             {users.slice(0, 5).map((user) => (
//               <li key={user._id} className="text-gray-700">
//                 {user.name} — {user.email}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Recent Files */}
//         <div className="bg-white p-6 rounded-xl shadow">
//           <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
//           <ul className="space-y-2">
//             {files.slice(0, 5).map((file) => (
//               <li key={file._id} className="text-gray-700">
//                 {file.filename}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import DashboardNavbar from "./DashboardNavbar";


export default function SuperadminDashboard() {
  const [stats, setStats] = useState({ userCount: 0, adminCount: 0, fileCount: 0 });
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("superadminToken");

  useEffect(() => {
    if (!token) {
      navigate("/superadmin-login");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    const fetchData = async () => {
      try {
        const [statsRes, usersRes, filesRes] = await Promise.all([
          axios.get("http://localhost:5000/api/superadmin/stats", config),
          axios.get("http://localhost:5000/api/superadmin/users", config),
          axios.get("http://localhost:5000/api/superadmin/files", config),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setFiles(filesRes.data);
      } catch (err) {
        alert("Failed to load dashboard");
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("superadminToken");
    navigate("/superadmin-login");
  };

  const navItems = [
    { label: "Dashboard", icon: "📊", path: "/superadmin" },
    { label: "Users", icon: "👥", path: "/superadmin/users" },
    { label: "Admins", icon: "🛡️", path: "/superadmin/admins" },
    { label: "Files", icon: "📁", path: "/superadmin/files" },
    { label: "Register Admin", icon: "➕", path: "/register-admin" },
  ];

  return (
    
    <div className="flex min-h-screen bg-gradient-to-br from-sky-100 to-indigo-200">
      {/* Sidebar */}
      <DashboardNavbar />

      <aside className="w-64 bg-white shadow-xl p-6 flex flex-col justify-between fixed h-full">
        <div>
          <h2 className="text-2xl font-bold text-indigo-700 mb-8">Superadmin Panel</h2>
          <nav className="space-y-3">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`w-full text-left px-4 py-2 rounded-lg transition font-medium ${
                  location.pathname === item.path
                    ? "bg-indigo-100 text-indigo-700"
                    : "bg-gray-50 hover:bg-indigo-50 text-gray-700"
                }`}
              >
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
        </div>
        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-semibold transition"
        >
          🚪 Logout
        </button>
      </aside>
<DashboardNavbar />
      {/* Main Content */}
      <main className="ml-64 pt-20 p-8 w-full">
        <h1 className="text-4xl font-bold text-indigo-800 mb-10">Welcome, Superadmin 👋</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-indigo-300 transition transform hover:-translate-y-1">
            <h2 className="text-sm text-gray-500">Total Users</h2>
            <p className="text-4xl font-bold text-indigo-600">{stats.userCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-green-300 transition transform hover:-translate-y-1">
            <h2 className="text-sm text-gray-500">Total Admins</h2>
            <p className="text-4xl font-bold text-green-600">{stats.adminCount}</p>
          </div>
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-purple-300 transition transform hover:-translate-y-1">
            <h2 className="text-sm text-gray-500">Uploaded Files</h2>
            <p className="text-4xl font-bold text-purple-600">{stats.fileCount}</p>
          </div>
        </div>

        {/* Recent Users */}
        <div className="bg-white p-6 rounded-xl shadow mb-8">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Recent Users</h2>
          <ul className="divide-y divide-gray-200">
            {users.slice(0, 5).map((user) => (
              <li key={user._id} className="py-2 text-gray-700">
                <span className="font-medium">{user.name}</span> — {user.email}
              </li>
            ))}
          </ul>
        </div>

        {/* Recent Files */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-2xl font-semibold text-indigo-700 mb-4">Recent Files</h2>
          <ul className="divide-y divide-gray-200">
            {files.slice(0, 5).map((file) => (
              <li key={file._id} className="py-2 text-gray-700">
                {file.filename}
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
