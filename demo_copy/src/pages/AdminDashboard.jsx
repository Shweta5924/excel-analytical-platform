import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminDashboard() {
    const [files, setFiles] = useState([]);
    const [users, setUsers] = useState([]);
    const token = localStorage.getItem("adminToken");


    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [fileRes, userRes] = await Promise.all([
                    axios.get("http://localhost:5000/api/admin/files", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axios.get("http://localhost:5000/api/admin/users", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);
                setFiles(fileRes.data);
                setUsers(userRes.data);
            } catch (err) {
                console.error("Dashboard load error", err);
            }
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this file?")) return;
        try {
            await axios.delete(`http://localhost:5000/api/files/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setFiles((prev) => prev.filter((f) => f._id !== id));
        } catch (err) {
            alert("Failed to delete file");
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-green-500 text-white flex flex-col">
                <div className="px-6 py-4 text-2xl font-bold border-b border-blue-500">
                    Admin Panel
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/admin" className="block px-3 py-2 rounded-lg bg-blue-900">Dashboard</Link>
                    {/* <Link to="/upload" className="block px-3 py-2 rounded-lg hover:bg-blue-900">Upload File</Link> */}
                    <Link to="/all_files" className="block px-3 py-2 rounded-lg hover:bg-blue-900">All Files</Link>
                    <Link to="/users" className="block px-3 py-2 rounded-lg hover:bg-blue-900">Users</Link>
                </nav>
                <div className="p-4 border-t border-blue-500 text-sm">
                    {/* <button className="w-full py-2 bg-red-500 hover:bg-red-900 rounded-lg">Logout</button> */}
                    <button
                        onClick={() => {
                            localStorage.removeItem("adminToken");
                            navigate("/admin-login");
                        }}
                         className="bg-red-500 hover:bg-red-800 p-2 rounded "

                    >
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-6">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
                    <div className="flex items-center space-x-3">
                        <span className="text-gray-600">Welcome, Admin!</span>
                        <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="avatar" className="w-10 h-10 rounded-full" />
                    </div>
                </header>

                {/* Stats Section */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500 text-sm">Total Files</h2>
                        <p className="text-3xl font-bold text-blue-600">{files.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500 text-sm">Total Users</h2>
                        <p className="text-3xl font-bold text-green-600">{users.length}</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow">
                        <h2 className="text-gray-500 text-sm">Last Upload</h2>
                        <p className="text-lg font-semibold text-gray-700">
                            {files[0]?.uploadedAt ? new Date(files[0].uploadedAt).toLocaleDateString() : "No files"}
                        </p>
                    </div>
                </section>

                {/* Recent Files */}
                <section className="bg-white p-6 rounded-xl shadow">
                    <h2 className="text-xl font-semibold mb-4">Recent Files</h2>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="text-left bg-gray-50 border-b">
                                <th className="p-2">File Name</th>
                                <th className="p-2">Uploader</th>
                                <th className="p-2">Date</th>
                                <th className="p-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {files.map((file) => (
                                <tr key={file._id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{file.filename}</td>
                                    <td className="p-2">{file.uploadedBy?.email || "Unknown"}</td>
                                    <td className="p-2">{new Date(file.uploadedAt).toLocaleDateString()}</td>
                                    <td className="p-2 space-x-2">
                                        {/* <Link to={`/analysis?id=${file._id}`} className="text-blue-600 hover:underline">View</Link> */}
                                        <button onClick={() => handleDelete(file._id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
