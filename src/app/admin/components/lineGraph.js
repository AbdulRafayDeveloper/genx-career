// "use client";
// import React, { useState } from "react";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { Line } from "react-chartjs-2";

// // Register necessary components for Chart.js
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const App = () => {
//   const monthlyData = {
//     2024: {
//       January: [10, 20, 30, 40, 50],
//       February: [15, 25, 35, 45, 30],
//       March: [12, 22, 32, 42, 40],
//       April: [18, 28, 38, 48, 28],
//       May: [14, 24, 34, 44, 50],
//     },
//     2023: {
//       January: [8, 18, 28, 38, 48],
//       February: [13, 23, 33, 43, 28],
//       March: [10, 20, 30, 40, 35],
//       April: [16, 26, 36, 46, 25],
//     },
//     2022: {
//       January: [9, 19, 29, 39, 49],
//       February: [14, 24, 34, 44, 29],
//       March: [11, 21, 31, 41, 36],
//     },
//   };

//   const currentYear = new Date().getFullYear();
//   const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

//   const [selectedYear, setSelectedYear] = useState(currentYear);
//   const [selectedMonth, setSelectedMonth] = useState("January");

//   const handleYearChange = (newYear) => {
//     if (!monthlyData[newYear]) {
//       console.log(`Data for the year ${newYear} is not available.`);
//       return;
//     }

//     const availableMonths = Object.keys(monthlyData[newYear]);
//     if (!availableMonths.includes(selectedMonth)) {
//       setSelectedMonth(availableMonths[0]);
//     }
//     setSelectedYear(newYear);
//   };

//   const availableMonths = monthlyData[selectedYear]
//     ? Object.keys(monthlyData[selectedYear])
//     : [];

//   const data = {
//     labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
//     datasets: [
//       {
//         label: `${selectedMonth} Data (${selectedYear})`,
//         data: monthlyData[selectedYear]?.[selectedMonth] || [],
//         borderColor: "#9866C7",
//         backgroundColor: "#9866C7",
//         borderWidth: 2,
//         pointRadius: 5,
//         pointHoverRadius: 8,
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         display: true,
//         position: "top",
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },
//     scales: {
//       x: {
//         title: {
//           display: true,
//           text: "Weeks",
//         },
//       },
//       y: {
//         title: {
//           display: true,
//           text: "Values",
//         },
//       },
//     },
//   };

//   return (
//     <div className="my-8 p-3">
//       <div className="flex justify-between">
//         <label>
//           Select Year:{" "}
//           <select
//             value={selectedYear}
//             onChange={(e) => handleYearChange(Number(e.target.value))}
//             style={{
//               borderColor: "purple",
//               borderRadius: "8px",
//               outline: "none",
//             }}
//           >
//             {years.map((year) => (
//               <option key={year} value={year}>
//                 {year}
//               </option>
//             ))}
//           </select>
//         </label>

//         <label>
//           Select Month:{" "}
//           <select
//             value={selectedMonth}
//             onChange={(e) => setSelectedMonth(e.target.value)}
//             style={{
//               borderColor: "purple",
//               borderRadius: "8px",
//               outline: "none",
//             }}
//           >
//             {availableMonths.map((month) => (
//               <option key={month} value={month}>
//                 {month}
//               </option>
//             ))}
//           </select>
//         </label>
//       </div>

//       <Line data={data} options={options} />
//     </div>
//   );
// };

// export default App;
"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Cookies from "js-cookie";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const currentYear = new Date().getFullYear();
  const [monthlyData, setMonthlyData] = useState([]);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users-monthly`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          console.error("Error fetching monthly data:", response.data.message);
          toast.error(response.data.message || "Failed to fetch monthly data. Please try again later.");
          return;
        }

        const data = response.data?.data?.monthlyData || [];
        setMonthlyData(data);
      } catch (err) {
        console.error("Error fetching monthly data:", err.message);
      }
    };
    fetchMonthlyData();
  }, []);

  const labels = monthlyData.map((item) => item.monthName);
  const values = monthlyData.map((item) => item.usersCreated);

  const data = {
    labels,
    datasets: [
      {
        label: `Users Created (${currentYear})`,
        data: values,
        borderColor: "#9866C7",
        backgroundColor: "#9866C7",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Users Created",
        },
        ticks: {
          stepSize: 1,
          precision: 0,
        },
      },
    },
  };

  return (
    <div className="my-8 p-4">
      <div className="flex justify-center items-center text-center">
        <button className="flex w-full justify-center text-center items-center text-sm xl:text-2xl md:text-xl  bg-purple-200 p-2 rounded-full  font-bold text-purple-900 mb-4">
          Registration Activity Throughout  {currentYear}
        </button>
      </div>
      <div className="mt-6 w-full h-64 sm:h-80 md:h-96">
        <Line data={data} options={{
          ...options,
          maintainAspectRatio: false
        }} />
      </div>

    </div>
  );
};

export default App;
