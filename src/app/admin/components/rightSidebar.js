"use client";
import App from "./lineGraph";
import Header from "./header";
import { useState, useEffect, useRef } from "react";
import { LuUsers } from "react-icons/lu";
import { MdOutlineAccountBalance } from "react-icons/md";
import { BsPercent } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiMoneyPoundCircleLine } from "react-icons/ri";
import { BsBullseye } from "react-icons/bs";
import axios from "axios";
import Cookies from "js-cookie";
import LeftSideBar from "./sidebar";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RightSide = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalQueries, setTotalQueries] = useState(0);
  const [totalUsersWithCvs, setTotalUsersWithCvs] = useState(0);
  const [totalCvs, setTotalCvs] = useState(0);
  const [totalCvTemplates, setTotalCvTemplates] = useState(0);
  const [totalCvCreators, setTotalCvCreators] = useState(0);
  const [totalCvMatchers, setTotalCvMatchers] = useState(0);
  const [statsLoading, setStatsLoading] = useState(false);
  const [monthlyStatsLoading, setMonthlyStatsLoading] = useState(false);
  const token = Cookies.get("token");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const fetchStats = async () => {
      setStatsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response stats: ", response);
        const data = response.data?.data || [];

        if (!data) {
          toast.error(response.data.message || "Failed to fetch stats. Please try again later.");
          return;
        }

        setTotalJobs(data.totalJobs);
        setTotalUsers(data.totalUsers);
        setTotalQueries(data.totalQueries);
        setTotalCvMatchers(data.totalCvMatchers);
        setTotalCvCreators(data.totalCvCreators);
        setTotalCvTemplates(data.totalCvTemplates);
        console.log("stats: ", data);
      } catch (error) {
        console.log("Error fetching monthly user data:", error);
        toast.error(error.response?.data?.message || "Failed to fetch stats. Please try again later.");
      } finally {
        setStatsLoading(false);
      }
    };

    const fetchMonthlyUsers = async () => {
      setMonthlyStatsLoading(true);
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/dashboard/users-monthly`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data?.data?.monthlyData || [];

        if (!data) {
          toast.error(response.data.message || "Failed to fetch monthly user data. Please try again later.");
          return;
        }

        setMonthlyData(data);

        // Calculate total users in the year
        const total = data.reduce((acc, item) => acc + item.usersCreated, 0);
        setTotalUsers(total);
      } catch (error) {
        console.log("Error fetching monthly user data:", error);
        toast.error(error.response?.data?.message || "Failed to fetch monthly user data. Please try again later.");
      } finally {
        setMonthlyStatsLoading(false);
      }

    };

    fetchMonthlyUsers();
    fetchStats();
  }, []);
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };
  const section = "Dashboard";

  // const incrementCount = () => setCount(count + 1);

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="sm:ml-64 rounded-lg max-w-full lg:max-w-[1200px]">
        <div className="p-2">
          {/* Header */}
          <div className="p-2 w-full">
            <div className="flex items-center justify-between">
              {/* Mobile: Show sidebar toggle */}
              <LeftSideBar />

              {/* Title */}
              <p className="text-[12px] md:text-2xl md:font-semibold ml-3 ">
                Welcome Back!
              </p>

              {/* Header component */}
              <div className="ml-auto">
                <Header appear={true} />
              </div>
            </div>
          </div>
          {(statsLoading || monthlyStatsLoading) && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
              <div className="flex flex-col items-center justify-center text-lg">
                <svg
                  aria-hidden="true"
                  role="status"
                  className="inline w-8 h-8 text-purple-600 animate-spin "
                  viewBox="0 0 100 101"
                  fill="#7D0A0A"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051..."
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.39 38.4038 97.8624 35.9116 97.0079 33.5539..."
                    fill="CurrentColor"
                  />
                </svg>
                <p className="mt-4 text-lg text-purple-600">Loading...</p>
              </div>
            </div>
          )}

          {/* Body */}
          <div className="mt-10 rounded-xl p-4">
            <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  label: "Total Jobs",
                  icon: <LuUsers color="purple" size={20} />,
                  color: "#E3F5FF",
                  value: totalJobs,
                },
                {
                  label: "Total Users",
                  icon: <MdOutlineAccountBalance color="purple" size={20} />,
                  color: "#fefae0",
                  value: totalUsers,
                },
                {
                  label: "Total Queries",
                  icon: <BiMoneyWithdraw color="purple" size={20} />,
                  color: "#d9dcd6",
                  value: totalQueries,
                },
                {
                  label: "Total Cv Matchers",
                  icon: <BsPercent color="purple" size={18} />,
                  color: "#faedcd",
                  value: totalCvMatchers,
                },
                {
                  label: "Total Cv Creators",
                  icon: <RiMoneyPoundCircleLine color="purple" size={20} />,
                  color: "#ffe5ec",
                  value: totalCvCreators,
                },
                {
                  label: "Total Cv Templates",
                  icon: <BsBullseye color="purple" size={20} />,
                  color: "#d5f2e3",
                  value: totalCvTemplates,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-6 border w-full max-w-[350px] md:max-w-full lg:max-w-[400px] border-gray-200 rounded-lg shadow-lg`}
                  style={{ backgroundColor: item.color }}
                >
                  <div className="flex justify-between">
                    <div>
                      <h5 className="mb-2 text-xl md:text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
                        {item.value}
                      </h5>
                      <p className="mb-3 text-sm md:text-base font-normal text-gray-500 dark:text-gray-400">
                        {item.label}
                      </p>
                    </div>
                    <div className="p-1 bg-white w-10 h-10 rounded-xl flex justify-center items-center">
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Graph */}
          <App />
        </div>
      </div>
    </>
  );
};

export default RightSide;
