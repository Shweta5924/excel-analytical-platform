// import { Link } from "react-router-dom";
// import Logo from "./Logo";

// export default function Navbar() {
//   return (
//     <nav className="p-4 bg-white-800 text-white flex gap-4">
//        <Logo />
//       <Link to="/dashboard">Dashboard</Link>
//       <Link to="/upload">Upload</Link>
//       <Link to="/files">Files</Link>
//       <Link to="/analysis">Analysis</Link>
//       <Link to="/profile">Profile</Link>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import Logo from "./Logo";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Navigation Links */}
        <div className="flex space-x-6 text-gray-700 font-medium">
          {/* <Link
            to="/dashboard"
            className="hover:text-green-600 transition-colors"
          >
            Dashboard
          </Link> */}
          <Link to="/files" className="hover:text-green-600 transition-colors">
            Files
          </Link>
          <Link
            to="/upload"
            className="hover:text-green-600 transition-colors"
          >
            Upload
          </Link>
          <Link
            to="/profile"
            className="hover:text-green-600 transition-colors"
          >
            Profile
          </Link>
          <Link
            to="/"
            className="hover:text-green-600 transition-colors"
          >
            Logout
          </Link>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("adminToken");
            window.location.href = "/";
          }}
          className="hidden md:block bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          Logout
        </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button className="text-gray-700 hover:text-green-600 focus:outline-none">
            {/* Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};


export default Navbar;
