import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import * as XLSX from "xlsx";
import { Bar, Pie, Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { saveAs } from "file-saver";
import Navbar from "./Navbar";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, PointElement, LineElement, Tooltip, Legend);

const chartTypes = ["Bar", "Pie", "Line"];

const Analyze = () => {
  const location = useLocation();
  const { file } = location.state || {};
  const [columns, setColumns] = useState([]);
  const [dataRows, setDataRows] = useState([]);
  const [xAxis, setXAxis] = useState("");
  const [yAxis, setYAxis] = useState("");
  const [chartType, setChartType] = useState("Bar");
  const [chartData, setChartData] = useState(null);

  const colorPalette = [
    "#4dc9f6", "#f67019", "#f53794", "#537bc4",
    "#acc236", "#166a8f", "#00a950", "#58595b",
    "#8549ba", "#e6194b", "#3cb44b", "#ffe119",
    "#4363d8", "#f58231", "#911eb4", "#46f0f0",
  ];
  
  useEffect(() => {
    if (!file) return;

    const fetchAndParseFile = async () => {
      try {
        const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
        const response = await fetch(`http://localhost:5000/api/files/download/${file._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        // const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const workbook = XLSX.read(arrayBuffer, { type: "buffer" });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        if (jsonData.length > 0) {
          setColumns(Object.keys(jsonData[0]));
          setDataRows(jsonData);
        }
      } catch (err) {
        console.error("Error parsing file", err);
      }
    };

    fetchAndParseFile();
  }, [file]);

  useEffect(() => {
    if (!xAxis || !yAxis || dataRows.length === 0) return;

    const labels = dataRows.map((row) => row[xAxis]);
    const values = dataRows.map((row) => parseFloat(row[yAxis]) || 0);

    // const data = {
    //   labels,
    //   datasets: [
    //     {
    //       label: `${yAxis} by ${xAxis}`,
    //       data: values,
    //       // backgroundColor: "rgba(54, 162, 235, 0.6)",
    //       backgroundColor: labels.map((_, i) => colorPalette[i % colorPalette.length]),
          
    //       borderColor: "rgba(54, 162, 235, 1)",
    //       borderWidth: 1,
    //     },
    //   ],
    // };
    const data = {
      labels,
      datasets: [
        {
          label: `${yAxis} by ${xAxis}`,
          data: values,
          backgroundColor: labels.map((_, i) => colorPalette[i % colorPalette.length]),
          borderColor: "rgba(0,0,0,0.1)",
          borderWidth: 1,
        },
      ],
    };

    setChartData(data);
  }, [xAxis, yAxis, chartType, dataRows]);

  const downloadChart = () => {
    const canvas = document.getElementById("chart-canvas");
    canvas.toBlob((blob) => {
      saveAs(blob, `${chartType}_chart.png`);
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <Navbar />
      <h1 className="text-3xl font-bold text-blue-700 mb-6">Analyze File</h1>

      {!file ? (
        <p className="text-red-500">No file selected for analysis.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">X-Axis</label>
              <select
                value={xAxis}
                onChange={(e) => setXAxis(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select column</option>
                {columns.map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Y-Axis</label>
              <select
                value={yAxis}
                onChange={(e) => setYAxis(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Select column</option>
                {columns.map((col) => (
                  <option key={col} value={col}>{col}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Chart Type</label>
              <select
                value={chartType}
                onChange={(e) => setChartType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                {chartTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="bg-white p-6 rounded shadow-md">
            {chartData ? (
              <>
                <div className="mb-4">
                  {chartType === "Bar" && <Bar data={chartData} id="chart-canvas" />}
                  {chartType === "Pie" && <Pie data={chartData} id="chart-canvas" />}
                  {chartType === "Line" && <Line data={chartData} id="chart-canvas" />}
                </div>
                <button
                  onClick={downloadChart}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Download Chart
                </button>
              </>
            ) : (
              <p className="text-gray-500">Select axes and chart type to view visualization.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Analyze;
