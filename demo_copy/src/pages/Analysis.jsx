// import { useEffect, useState } from "react";
// import { Link, useSearchParams } from "react-router-dom";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// export default function Analysis() {
//   const [searchParams] = useSearchParams();
//   const fileId = searchParams.get("id");

//   // Dummy data (later replace with API data)
//   const [chartData, setChartData] = useState([
//     { name: "Jan", sales: 4000, profit: 2400 },
//     { name: "Feb", sales: 3000, profit: 1398 },
//     { name: "Mar", sales: 2000, profit: 9800 },
//     { name: "Apr", sales: 2780, profit: 3908 },
//     { name: "May", sales: 1890, profit: 4800 },
//     { name: "Jun", sales: 2390, profit: 3800 },
//     { name: "Jul", sales: 3490, profit: 4300 },
//   ]);

//   useEffect(() => {
//     // Later: fetch file data based on fileId
//     console.log("Analyzing file ID:", fileId);
//   }, [fileId]);

//   return (
//     <div className="min-h-screen flex bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-blue-700 text-white flex flex-col">
//         <div className="px-6 py-4 text-2xl font-bold border-b border-blue-500">
//           Excel Analytics
//         </div>
//         <nav className="flex-1 p-4 space-y-2">
//           <Link to="/dashboard" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Dashboard
//           </Link>
//           <Link to="/upload" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Upload File
//           </Link>
//           <Link to="/files" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Files
//           </Link>
//           <Link to="/analysis" className="block px-3 py-2 rounded-lg bg-blue-600">
//             Analysis
//           </Link>
//           <Link to="/profile" className="block px-3 py-2 rounded-lg hover:bg-blue-600">
//             Profile
//           </Link>
//         </nav>
//         <div className="p-4 border-t border-blue-500 text-sm">
//           <button className="w-full py-2 bg-red-500 hover:bg-red-600 rounded-lg">
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold text-gray-800 mb-6">
//           File Analysis {fileId && `- ID: ${fileId}`}
//         </h1>

//         {/* File Info */}
//         <div className="bg-white p-4 rounded-lg shadow mb-6">
//           <h2 className="text-lg font-semibold text-gray-700 mb-2">File Details</h2>
//           <p className="text-gray-600">Filename: <span className="font-medium">Sales_Q1.xlsx</span></p>
//           <p className="text-gray-600">Uploaded By: <span className="font-medium">Alice</span></p>
//           <p className="text-gray-600">Date: <span className="font-medium">2025-07-20</span></p>
//         </div>

//         {/* Chart Section */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {/* Line Chart */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Sales Over Time</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <LineChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Line type="monotone" dataKey="sales" stroke="#8884d8" activeDot={{ r: 8 }} />
//                 <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Bar Chart */}
//           <div className="bg-white p-4 rounded-lg shadow">
//             <h2 className="text-lg font-semibold text-gray-700 mb-4">Profit Comparison</h2>
//             <ResponsiveContainer width="100%" height={250}>
//               <BarChart data={chartData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="sales" fill="#8884d8" />
//                 <Bar dataKey="profit" fill="#82ca9d" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }


import { useEffect, useState,useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";

import Chart from "chart.js/auto";
import Navbar from "./Navbar";

export default function Analysis() {


  
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
      const res = await axios.get(`http://localhost:5000/api/files/${id}/parse`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setData(res.data.data);
    };
    fetchData();
  }, [id]);

  if (!data.length) return <p>Loading...</p>;

  // Example: Show first column values in chart
  const labels = data.map((row, i) => `Row ${i + 1}`);
  const values = data.map((row) => Object.values(row)[0]); // First column

  const chartData = {
    labels,
    datasets: [
      {
        label: "First Column Values",
        data: values,
        backgroundColor: "rgba(54, 162, 235, 0.6)"
      }
    ]
  };


  return (
    <div className="p-6">
      <div>
    <Navbar></Navbar>
  </div>
      {/* <h2 className="text-2xl font-bold mb-4">Analysis</h2> */}
      <h2 >Analysis for File {id}</h2>
      <Bar data={chartData} />
       <Line
        key={id}                // Forces re-render when file id changes
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Data Analysis' }
          }
        }}
      />
    </div>
  );
}
