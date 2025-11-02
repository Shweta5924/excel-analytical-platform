

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";


// export default function Register() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

  
//   // Handle Register Function
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/register", {
//         name,
//         email,
//         password,
//       });

//       alert(res.data.message); // Show success message
//       navigate("/user-login"); // Redirect to login page
//     } catch (err) {
//       alert(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-150 to-blue-300">
      
//       <div className="bg-green shadow-xl rounded-xl p-8 w-full max-w-md">
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-600">Create Account</h1>
//           <p className="text-gray-500 mt-1">Join Excel Analytics today</p>
//         </div>
//         {/* <h2 className="text-2xl font-bold mb-4 text-center">Register</h2> */}
//         <form onSubmit={handleRegister}>

//           <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//             Name
//           </label>
//           <input
//             type="text"
//             placeholder="Name"
//             className="border p-2 w-full mb-3"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Email"
//             className="border p-2 w-full mb-3"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//             Password
//           </label>
//           <input
//             type="password"
//             placeholder="Password"
//             className="border p-2 w-full mb-3"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />

//           {/* <select
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//             className="border p-2 w-full mb-3"
//           >
//             <option value="user">User</option>
//             <option value="admin">Admin</option>
//           </select> */}


//           <button
//             type="submit"
//             className="bg-blue-500 text-black px-4 py-2 rounded w-full hover:bg-blue-600"
//           >
//             Register
//           </button>
//           <p className="text-center text-sm text-gray-600 mt-6">
//             Already have an account?{" "}
//             <a href="/" className="text-blue-600 hover:underline font-medium">
//               Sign In
//             </a>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
      });
      alert(res.data.message);
      navigate("/user-login");
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1920&q=80')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-blue-300/40 backdrop-blur-sm"></div>

      {/* Centered Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all hover:scale-[1.02] duration-300">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-blue-700 drop-shadow-sm">Create Account</h1>
            <p className="text-gray-600 mt-2">Join Excel Analytics today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A4.992 4.992 0 0112 15c1.657 0 3.156.672 4.121 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full outline-none bg-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m8 0a4 4 0 10-8 0m8 0a4 4 0 01-8 0m8 0v1a4 4 0 01-8 0v-1m8 0v-1a4 4 0 00-8 0v1" />
                </svg>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full outline-none bg-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <svg className="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3zM6 11c0-1.657 1.343-3 3-3s3 1.343 3 3-1.343 3-3 3-3-1.343-3-3z" />
                </svg>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full outline-none bg-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Register
            </button>

            {/* Footer */}
            <p className="text-center text-sm text-gray-600 mt-4">
              Already have an account?{" "}
              <a href="/user-login" className="text-blue-600 hover:underline font-medium">
                Sign In
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
