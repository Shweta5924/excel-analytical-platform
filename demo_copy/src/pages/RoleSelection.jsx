// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Nav } from "./Nav";

// export default function RoleSelection() {
//   const navigate = useNavigate();

//   return (
//     <div>
//       <div> <Nav/> </div>
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      
//       <h1 className="text-3xl font-bold mb-6">Select Role</h1>
//       <div className="flex gap-6">
//         <button
//           onClick={() => navigate("/admin-login")}
//           className="bg-red-500 text-black px-6 py-3 rounded hover:bg-red-600 transition"
//         >
//           Admin
//         </button>
//         <button
//           onClick={() => navigate("/user-login")}
//           className="bg-blue-500 text-black px-6 py-3 rounded hover:bg-blue-600 transition"
//         >
//           User
//         </button>
//       </div>
//     </div>
//     </div>
//   );
// }

import { useNavigate } from "react-router-dom";
import { Nav } from "./Nav";

export default function RoleSelection() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 to-green-500 flex flex-col">
      <Nav />

      <div className="flex flex-col items-center justify-center flex-1 px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Choose Your Role</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-xl">
          {/* Admin Card */}
          <div
            onClick={() => navigate("/admin-login")}
            className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center hover:bg-red-50"
          >
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-red-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM6 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">Admin</h2>
            <p className="text-sm text-gray-500 mt-2">Manage users, files, and analytics</p>
          </div>

          {/* User Card */}
          <div
            onClick={() => navigate("/user-login")}
            className="cursor-pointer bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 p-6 flex flex-col items-center text-center hover:bg-blue-50"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-blue-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-700">User</h2>
            <p className="text-sm text-gray-500 mt-2">Upload and analyze your Excel files</p>
          </div>
        </div>
      </div>
    </div>
  );
}
