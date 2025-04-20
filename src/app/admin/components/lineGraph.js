"use client";
import React, { useState } from "react";
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

// Register necessary components for Chart.js
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
  const monthlyData = {
    2024: {
      January: [10, 20, 30, 40, 50],
      February: [15, 25, 35, 45, 30],
      March: [12, 22, 32, 42, 40],
      April: [18, 28, 38, 48, 28],
      May: [14, 24, 34, 44, 50],
    },
    2023: {
      January: [8, 18, 28, 38, 48],
      February: [13, 23, 33, 43, 28],
      March: [10, 20, 30, 40, 35],
      April: [16, 26, 36, 46, 25],
    },
    2022: {
      January: [9, 19, 29, 39, 49],
      February: [14, 24, 34, 44, 29],
      March: [11, 21, 31, 41, 36],
    },
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, index) => currentYear - index);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState("January");

  const handleYearChange = (newYear) => {
    if (!monthlyData[newYear]) {
      console.log(`Data for the year ${newYear} is not available.`);
      return;
    }

    const availableMonths = Object.keys(monthlyData[newYear]);
    if (!availableMonths.includes(selectedMonth)) {
      setSelectedMonth(availableMonths[0]);
    }
    setSelectedYear(newYear);
  };

  const availableMonths = monthlyData[selectedYear]
    ? Object.keys(monthlyData[selectedYear])
    : [];

  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5"],
    datasets: [
      {
        label: `${selectedMonth} Data (${selectedYear})`,
        data: monthlyData[selectedYear]?.[selectedMonth] || [],
        borderColor: "#9866C7",
        backgroundColor: "#9866C7",
        borderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
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
          text: "Weeks",
        },
      },
      y: {
        title: {
          display: true,
          text: "Values",
        },
      },
    },
  };

  return (
    <div className="my-8 p-3">
      <div className="flex justify-between">
        <label>
          Select Year:{" "}
          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            style={{
              borderColor: "purple",
              borderRadius: "8px",
              outline: "none",
            }}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </label>

        <label>
          Select Month:{" "}
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{
              borderColor: "purple",
              borderRadius: "8px",
              outline: "none",
            }}
          >
            {availableMonths.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Line data={data} options={options} />
    </div>
  );
};

export default App;
