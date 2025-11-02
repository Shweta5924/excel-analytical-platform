import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import DashboardNavbar from "./DashboardNavbar";
import DashboardNavAdmin from "./DashboardNavAdmin";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  // const token = localStorage.getItem("adminToken");
  const token = localStorage.getItem("adminToken") || localStorage.getItem("superadminToken");
const role = localStorage.getItem("adminToken") ? "admin" : "superadmin";


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const res = await axios.get("http://localhost:5000/api/admin/users", {
        //   headers: { Authorization: `Bearer ${token}` },
        // });
        const endpoint = role === "admin"
  ? "http://localhost:5000/api/admin/users"
  : "http://localhost:5000/api/superadmin/users";

const res = await axios.get(endpoint, {
  headers: { Authorization: `Bearer ${token}` },
});
        setUsers(res.data);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };
    fetchUsers();
  }, []);

//   const handleDeleteUser = async (userId) => {
//   if (!window.confirm("Are you sure you want to delete this user?")) return;

//   try {
//     await axios.delete(`http://localhost:5000/api/admin/users/${userId}`, {
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     setUsers((prev) => prev.filter((user) => user._id !== userId));
//   } catch (err) {
//     alert("❌ Failed to delete user");
//     console.error("Delete user error", err);
//   }
// };

const handleDeleteUser = async (userId) => {
  if (!window.confirm("Are you sure you want to delete this user?")) return;

  const deleteEndpoint = role === "admin"
    ? `http://localhost:5000/api/admin/users/${userId}`
    : `http://localhost:5000/api/superadmin/users/${userId}`;

  try {
    await axios.delete(deleteEndpoint, {
      headers: { Authorization: `Bearer ${token}` },
    });

    setUsers((prev) => prev.filter((user) => user._id !== userId));
  } catch (err) {
    alert("❌ Failed to delete user");
    console.error("Delete user error", err);
  }
};

  return (
    <div className="min-h-screen bg-gray-100 p-8">
     <DashboardNavAdmin/>
      <h1 className="text-2xl font-bold text-blue-800 mb-6">All Users</h1>
      <table className="w-full bg-white rounded-xl shadow border-collapse">
        <thead>
          <tr className="bg-gray-50 text-left border-b">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Registered</th>
            <th className="p-3">Actions</th>

          </tr>
        </thead>
        
        <tbody>
  {users.map((user) => (
    <tr key={user._id} className="border-b hover:bg-gray-50">
      <td className="p-3">{user.name}</td>
      <td className="p-3">{user.email}</td>
      <td className="p-3">{new Date(user.createdAt).toLocaleDateString()}</td>
      {/* <td className="p-3">
        <button
          onClick={() => handleDeleteUser(user._id)}
        //   className="text-red-600 hover:underline"
        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
        >
          Delete
        </button>
      </td> */}
      {/* {role === "superadmin" && ( */}
  <td className="p-3">
    <button
      onClick={() => handleDeleteUser(user._id)}
      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
    >
      Delete
    </button>
  </td>
{/* )} */}
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}
