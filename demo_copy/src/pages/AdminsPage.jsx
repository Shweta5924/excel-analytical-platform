// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function AdminsPage() {
//   const [admins, setAdmins] = useState([]);
//   const token = localStorage.getItem("superadminToken");

//   useEffect(() => {
//     const fetchAdmins = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/superadmin/admins", {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         setAdmins(res.data);
//       } catch (err) {
//         alert("Failed to load admins");
//       }
//     };
//     fetchAdmins();
//   }, []);

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this admin?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/superadmin/admins/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setAdmins(admins.filter((admin) => admin._id !== id));
//     } catch (err) {
//       alert("Failed to delete admin");
//     }
//   };

//   return (
//     <div className="p-8 bg-gradient-to-br from-gray-100 to-blue-200 min-h-screen">
//       <h1 className="text-3xl font-bold text-blue-800 mb-6">All Admins</h1>
//       <div className="bg-white p-6 rounded-xl shadow">
//         <ul className="space-y-4">
//           {admins.map((admin) => (
//             <li key={admin._id} className="flex justify-between items-center text-gray-700">
//               <span>{admin.name} — {admin.email}</span>
//               <button
//                 onClick={() => handleDelete(admin._id)}
//                 className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
//               >
//                 Delete
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import axios from "axios";
import DashboardNavbar from "./DashboardNavbar";

export default function AdminsPage() {
  const [admins, setAdmins] = useState([]);
  const token = localStorage.getItem("superadminToken");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/superadmin/admins", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdmins(res.data);
      } catch (err) {
        alert("❌ Failed to load admins");
      }
    };
    fetchAdmins();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/superadmin/admins/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdmins(admins.filter((admin) => admin._id !== id));
    } catch (err) {
      alert("❌ Failed to delete admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-8">
        <DashboardNavbar />
      <h1 className="text-4xl font-bold text-blue-800 mb-8">🛡️ Admin Management</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow-lg p-6">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-blue-50 text-blue-700 text-left text-sm uppercase tracking-wider">
              <th className="px-4 py-3 border-b">Name</th>
              <th className="px-4 py-3 border-b">Email</th>
              <th className="px-4 py-3 border-b">Created At</th>
              <th className="px-4 py-3 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="hover:bg-blue-50 transition">
                <td className="px-4 py-3 border-b text-gray-700">{admin.name}</td>
                <td className="px-4 py-3 border-b text-gray-700">{admin.email}</td>
                <td className="px-4 py-3 border-b text-gray-600">
                  {new Date(admin.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 border-b text-center">
                  <button
                    onClick={() => handleDelete(admin._id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {admins.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No admins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
