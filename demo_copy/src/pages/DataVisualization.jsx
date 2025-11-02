import React, { useState } from "react";
import Papa from "papaparse";
import {
  BarChart, Bar, LineChart, Line, CartesianGrid,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export default function DataVisualization() {
  const [rawData, setRawData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [subject, setSubject] = useState("");

  // 🔹 STEP 1: Handle File Upload & Parse
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        setRawData(result.data);
        setFilteredData(result.data); // default load
      },
    });
  };

  // 🔹 STEP 2: Filtering
  const applyFilter = () => {
    let filtered = rawData;
    if (subject) {
      filtered = rawData.filter((row) => row.Subject === subject);
    }
    setFilteredData(filtered);
  };

  // 🔹 STEP 3: Aggregation (Average by Subject)
  const aggregateBySubject = (data) => {
    const grouped = {};
    data.forEach((row) => {
      if (!row.Subject || isNaN(row.Marks)) return;
      if (!grouped[row.Subject]) grouped[row.Subject] = [];
      grouped[row.Subject].push(row.Marks);
    });

    return Object.entries(grouped).map(([subject, marks]) => ({
      subject,
      avg: (marks.reduce((a, b) => a + b, 0) / marks.length).toFixed(2),
    }));
  };

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">
        📊 Data Upload, Filtering & Visualization
      </h1>

      {/* 🔹 STEP 1: File Upload */}
      <div className="bg-white p-6 rounded-2xl shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">1️⃣ Upload CSV File</h2>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="border rounded p-2 w-full"
        />
      </div>

      {/* 🔹 STEP 2: Filter Section */}
      {rawData.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow mb-6">
          <h2 className="text-lg font-semibold mb-2">2️⃣ Filter Data</h2>
          <div className="flex items-center gap-4">
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="">All Subjects</option>
              {[...new Set(rawData.map((d) => d.Subject))].map((sub, i) => (
                <option key={i} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
            <button
              onClick={applyFilter}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {/* 🔹 STEP 3: Charts */}
      {filteredData.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow">
          <h2 className="text-lg font-semibold mb-4">3️⃣ Data Visualization</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bar Chart */}
            <div className="h-80">
              <h3 className="text-md font-bold mb-2">📌 Avg Marks by Subject (Bar)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={aggregateBySubject(filteredData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="avg" fill="#4f46e5" name="Avg Marks" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Line Chart */}
            <div className="h-80">
              <h3 className="text-md font-bold mb-2">📌 Avg Marks by Subject (Line)</h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={aggregateBySubject(filteredData)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="subject" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avg" stroke="#ef4444" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
