// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function RegisterAdmin() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const token = localStorage.getItem("superadminToken");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post("http://localhost:5000/api/superadmin/register-admin", {
//         name, email, password
//       }, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       alert("Admin registered");
//       navigate("/superadmin");
//     } catch (err) {
//       alert("Failed to register admin");
//     }
//   };

//   return (
//     <div style={{ padding: "2rem" }}>
//       <h2>Register New Admin</h2>
//       <form onSubmit={handleSubmit}>
//         <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required /><br />
//         <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required /><br />
//         <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required /><br />
//         <button type="submit">Create Admin</button>
//       </form>
//     </div>
//   );
// }


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterAdmin() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("superadminToken");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/superadmin/register-admin", {
        name,
        email,
        password,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      alert("✅ Admin registered successfully");
      navigate("/superadmin");
    } catch (err) {
      alert("❌ Failed to register admin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all duration-300 hover:shadow-blue-400">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-700">Register New Admin</h1>
          <p className="text-gray-600 mt-2">Create a new admin account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="admin@example.com"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-md hover:shadow-lg"
          >
            ➕ Create Admin
          </button>
        </form>
      </div>
    </div>
  );
}
