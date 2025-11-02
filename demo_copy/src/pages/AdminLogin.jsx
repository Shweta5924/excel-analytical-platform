import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Nav } from "./Nav";


export default function AdminLogin() {

// const handleLogin = async (e) => {
//   e.preventDefault();

//   try {
//     const res = await axios.post("http://localhost:5000/api/auth/login", {
//       email,
//       password,
//     });

//     localStorage.setItem("token", res.data.token);
//     alert("Login Successful");
//     navigate("/dashboard");
//   } catch (err) {
//     alert(err.response.data.message);
//   }
// };

const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });

      // Save token
      localStorage.setItem("adminToken", res.data.token);

      alert("Login successful!");
      navigate("/admin-dashboard");
      
//       if (res.data.role === "admin") {
//   navigate("/admin-dashboard");
// } else {
//   navigate("/user-dashboard");
// }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };


  return (
    <div>
    <div> <Nav/> </div>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-150 to-blue-300">
      
      <div className="bg-green shadow-xl rounded-xl p-8 w-full max-w-md">
        {/* Logo or App Name */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-blue-600">Excel Analytics</h1>
          <p className="text-gray-500 mt-1">Sign in to continue</p>
        </div>

        {/* Login Form */}
 <form onSubmit={handleLogin} className="space-y-5">
<label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email 
            </label>
<input
        type="email"
        placeholder="ex@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"

      />

{/* <select
  value={role}
  onChange={(e) => setRole(e.target.value)}
  className="border p-2 w-full mb-3"
>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select> */}


      <button type="submit" className="bg-green-200 text-black px-4 py-2 rounded hover:bg-green-400" >Login</button>
       {/* <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-500" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div> */}

          {/* Submit Button */}
          {/* <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </button> */}


        {/* <form className="space-y-5"> */}
          {/* Email */}
          {/* <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email 
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

         
          {/* <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              className="mt-1 w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

           */}
          {/* <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input type="checkbox" className="h-4 w-4 text-blue-500" />
              <span className="ml-2 text-gray-600">Remember me</span>
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot password?
            </a>
          </div>

         
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Sign In
          </button> */}
        </form>

        {/* Divider */}
        {/* <div className="my-6 flex items-center">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div> */}

        {/* Social Login (Optional) */}
        {/* <button
          className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
        >
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
          <span>Sign in with Google</span>
        </button> */}

        {/* Register Link */}
        {/* <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline font-medium">
            Create one
          </a>
        </p> */}
      </div>
    </div>
    </div>
  );
}




// export default function Login() {
  

//   return (
//     <form onSubmit={handleLogin}>
//       <input
//         type="email"
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />
//       <button type="submit">Login</button>
//     </form>
//   );
// }
