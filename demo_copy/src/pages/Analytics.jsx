import { Line } from "react-chartjs-2";

export default function Analytics() {
  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [{
      label: "Uploads",
      data: [12, 19, 3, 5, 2],
      backgroundColor: "rgba(54, 162, 235, 0.5)",
    }]
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">System Analytics</h1>
      <div className="bg-white p-6 rounded-xl shadow">
        <Line data={data} />
      </div>
    </div>
  );
}
