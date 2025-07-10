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
// import Cookies from "js-cookie";

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
  // const token = Cookies.get("genx_access_token");
  const token = localStorage.getItem("genx_access_token");

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users-monthly`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200) {
          console.log("Error fetching monthly data:", response.data.message);
          toast.error(
            response.data.message ||
              "Failed to fetch monthly data. Please try again later."
          );
          return;
        }

        const data = response.data?.data?.monthlyData || [];
        setMonthlyData(data);
      } catch (err) {
        console.log("Error fetching monthly data:", err.message);
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
          Registration Activity Throughout {currentYear}
        </button>
      </div>
      <div className="mt-6 w-full h-64 sm:h-80 md:h-96">
        <Line
          data={data}
          options={{
            ...options,
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default App;
