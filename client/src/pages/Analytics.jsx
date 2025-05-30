import React, { useState } from "react";
import {
  Plus,
  Edit,
  Trash2,
} from "lucide-react";
import SideBar from "../components/SideBar";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, PointElement, LineElement } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement
);

const Analytics = () => {
  const [activeItem, setActiveItem] = useState("statistics");
  const navigate = useNavigate();

  const onAddNew = () => {
    navigate("/collisions/add");
  };

  const onEdit = (record) => {
    navigate("/collisions/edit", { state: { record } });
  };

 const [statisticsData, setStatisticsData] = useState([
    {
      id: 1,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "-",
      month: "All months",
      unit: "Number",
      value: 360,
    },
    {
      id: 2,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "1",
      month: "January",
      unit: "Number",
      value: 31,
    },
    {
      id: 3,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "2",
      month: "February",
      unit: "Number",
      value: 34,
    },
    {
      id: 4,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "3",
      month: "March",
      unit: "Number",
      value: 23,
    },
    {
      id: 5,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "4",
      month: "April",
      unit: "Number",
      value: 20,
    },
    {
      id: 6,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "5",
      month: "May",
      unit: "Number",
      value: 36,
    },
    {
      id: 7,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "6",
      month: "June",
      unit: "Number",
      value: 20,
    },
    {
      id: 8,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "7",
      month: "July",
      unit: "Number",
      value: 38,
    },
    {
      id: 9,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "8",
      month: "August",
      unit: "Number",
      value: 23,
    },
    {
      id: 10,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "9",
      month: "September",
      unit: "Number",
      value: 29,
    },
    {
      id: 11,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "10",
      month: "October",
      unit: "Number",
      value: 38,
    },
    {
      id: 12,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "11",
      month: "November",
      unit: "Number",
      value: 31,
    },
    {
      id: 13,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2005,
      code: "12",
      month: "December",
      unit: "Number",
      value: 37,
    },
    {
      id: 14,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "-",
      month: "All months",
      unit: "Number",
      value: 321,
    },
    {
      id: 15,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "1",
      month: "January",
      unit: "Number",
      value: 34,
    },
    {
      id: 16,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "2",
      month: "February",
      unit: "Number",
      value: 26,
    },
    {
      id: 17,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "3",
      month: "March",
      unit: "Number",
      value: 28,
    },
    {
      id: 18,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "4",
      month: "April",
      unit: "Number",
      value: 22,
    },
    {
      id: 19,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "5",
      month: "May",
      unit: "Number",
      value: 25,
    },
    {
      id: 20,
      statistic: "ROA17C1",
      label: "Fatal Collisions",
      year: 2006,
      code: "6",
      month: "June",
      unit: "Number",
      value: 27,
    },
 ]);

  // Calculate yearly change and percentage
  const total2005 = statisticsData.find(item => item.year === 2005 && item.code === "-")?.value || 0;
  const total2006 = statisticsData.find(item => item.year === 2006 && item.code === "-")?.value || 0;
  const yearlyChange = total2006 - total2005;
  const percentageChange = total2005 !== 0 ? ((yearlyChange / total2005) * 100).toFixed(1) : 0;

  // Prepare data for charts
  const monthlyData2005 = statisticsData
    .filter(item => item.year === 2005 && item.code !== "-")
    .sort((a, b) => parseInt(a.code) - parseInt(b.code));
  
  const monthlyData2006 = statisticsData
    .filter(item => item.year === 2006 && item.code !== "-")
    .sort((a, b) => parseInt(a.code) - parseInt(b.code));

  const barChartData = {
    labels: monthlyData2005.map(item => item.month),
    datasets: [
      {
        label: '2005 Fatal Collisions',
        data: monthlyData2005.map(item => item.value),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '2006 Fatal Collisions',
        data: monthlyData2006.map(item => item.value),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ]
  };

  const lineChartData = {
    labels: monthlyData2005.map(item => item.month),
    datasets: [
      {
        label: '2005 Monthly Trend',
        data: monthlyData2005.map(item => item.value),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        tension: 0.1
      }
    ]
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Fatal Collisions Comparison (2005 vs 2006)',
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        display: true,
        beginAtZero: true
      }
    }
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: '2005 Monthly Fatal Collisions Trend',
      },
    },
    scales: {
      x: {
        display: true,
        ticks: {
          maxRotation: 45,
          minRotation: 0
        }
      },
      y: {
        display: true,
        beginAtZero: true
      }
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <SideBar activeItem={activeItem} setActiveItem={setActiveItem} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header />

        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-4 sm:mb-6 flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Analytics</h1>
              </div>
            </div>

            {/* Charts Section */}
            <div className="space-y-6 sm:space-y-8">
              {/* Bar Chart */}
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="h-64 sm:h-80 lg:h-96">
                  <Bar options={barOptions} data={barChartData} />
                </div>
              </div>

              {/* Line Chart */}
              <div className="bg-white p-3 sm:p-4 lg:p-6 rounded-lg shadow">
                <div className="h-64 sm:h-80 lg:h-96">
                  <Line options={lineOptions} data={lineChartData} />
                </div>
              </div>

              {/* Summary Statistics Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Total 2005 Collisions</h3>
                  <p className="text-xl sm:text-2xl font-bold text-blue-600 mt-1">
                    {total2005}
                  </p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Total 2006 Collisions</h3>
                  <p className="text-xl sm:text-2xl font-bold text-purple-600 mt-1">
                    {total2006}
                  </p>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow sm:col-span-2 lg:col-span-1">
                  <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Yearly Change</h3>
                  <p className={`text-xl sm:text-2xl font-bold mt-1 ${yearlyChange >= 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {yearlyChange >= 0 ? '+' : ''}{yearlyChange} ({percentageChange}%)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Analytics;