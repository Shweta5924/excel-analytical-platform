import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token =
    localStorage.getItem("token") || localStorage.getItem("adminToken");

  // Fetch profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    navigate("/"); // Redirect to login
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load profile
      </div>
    );
  }

  return (
    
     <div class="overflow-x-hidden">
      <div>
    <Navbar></Navbar>
  </div>
    <div className="w-screen h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-green-600 text-white flex flex-col p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center">Menu</h2>
        <nav className="flex flex-col space-y-3">
          <Link to="/files" className=" bg-blue-500  hover:bg-blue-800 p-2 rounded">
            Files
          </Link>
          <Link to="/upload" className="bg-blue-500  hover:bg-blue-800 p-2 rounded">
            Upload
          </Link>
          <Link to="/profile" className="bg-blue-500  hover:bg-blue-800 p-2 rounded">
            Profile
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-800 p-2 rounded "
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col items-center">
            {/* Avatar */}
            <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white text-3xl font-bold">
              {user.name?.charAt(0).toUpperCase()}
            </div>

            {/* Name and email */}
            <h2 className="text-2xl font-semibold mt-4">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>

            {/* Role Badge */}
            <span className="mt-2 px-3 py-1 text-sm bg-green-100 text-green-600 rounded-full">
              {user.role === "admin" ? "Admin" : "User"}
            </span>
          </div>

          {/* Details */}
          <div className="mt-6 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-800">
              Account Details
            </h3>
            <div className="mt-3 space-y-2 text-gray-700">
              <p>
                <span className="font-semibold">Name:</span> {user.name}
              </p>
              <p>
                <span className="font-semibold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-semibold">Joined:</span>{" "}
                {new Date(user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
    </div>
  );
};

export default Profile;
