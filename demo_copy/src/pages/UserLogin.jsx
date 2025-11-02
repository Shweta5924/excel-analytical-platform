// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Nav } from "./Nav";
// export default function UserLogin() {



// const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();


  

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://localhost:5000/api/auth/login", {
//         email,
//         password,
//       });

//       // Save token
//       localStorage.setItem("token", res.data.token);

//       alert("Login successful!");
//       navigate("/profile");
      
// //       if (res.data.role === "admin") {
// //   navigate("/admin-dashboard");
// // } else {
// //   navigate("/user-dashboard");
// // }

//     } catch (err) {
//       alert(err.response?.data?.message || "Login failed");
//     }
//   };


//   return (
//     <div>
//       <div><Nav/></div>
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-150 to-blue-300">
     
//       <div className="bg-green shadow-xl rounded-xl p-8 w-full max-w-md">
//         {/* Logo or App Name */}
//         <div className="text-center mb-6">
//           <h1 className="text-3xl font-bold text-blue-600">Excel Analytics</h1>
//           <p className="text-gray-500 mt-1">Sign in to continue</p>
//         </div>

//         {/* Login Form */}
//  <form onSubmit={handleLogin} className="space-y-5">
// <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//               Email 
//             </label>
// <input
//         type="email"
//         placeholder="ex@gmail.com"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//       <label htmlFor="password" className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"

//       />




//       <button type="submit" className="bg-green-600 text-black px-4 py-2 rounded hover:bg-green-800" >Login</button>
      
            
//         </form>

//         {/* Divider */}
//         <div className="my-6 flex items-center">
//           <div className="flex-grow border-t border-gray-300"></div>
//           <span className="mx-3 text-gray-500 text-sm">or</span>
//           <div className="flex-grow border-t border-gray-300"></div>
//         </div>

        

//         {/* Register Link */}
//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don’t have an account?{" "}
//           <a href="/register" className="text-blue-600 hover:underline font-medium">
//             Create one
//           </a>
//         </p>
//       </div>
//     </div>
//     </div>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nav } from "./Nav";

export default function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      alert("Login successful!");
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&w=1920&q=80')" }}>
      <Nav />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-blue-300/40 backdrop-blur-sm"></div>

      {/* Centered Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md transition-all hover:scale-[1.02] duration-300">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-blue-700 drop-shadow-sm">Excel Analytics</h1>
            <p className="text-gray-600 mt-2">Sign in to continue</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
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
              className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Login
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-500 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline font-medium">
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
