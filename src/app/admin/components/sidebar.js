"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { BiSolidUserDetail } from "react-icons/bi";
import { LuUsers } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import { VscVerified } from "react-icons/vsc";
import { LuLayoutTemplate } from "react-icons/lu";
import { BsPersonWorkspace } from "react-icons/bs";

const LeftSideBar = () => {
  const [menu, setMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 640) {
        setMenu(true); // Always show menu on larger screens
      } else {
        setMenu(false); // Hide menu on smaller screens
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Run on initial load
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Toggle menu for small screens
  const handleChange = () => {
    setMenu(!menu);
  };

  return (
    <>
      {/* Toggle Button for Small Screens */}
      <button
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
        onClick={handleChange}
        aria-label="Toggle Sidebar"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 ${
          menu || window.innerWidth >= 640 ? "block" : "hidden"
        }`}
      >
        <div className="mt-3 px-5">
          <Image src="/logo1.png" alt="Logo" width={110} height={40} />
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto mt-6">
          <ul className="space-y-2 font-medium">
            {/* Menu Items */}
            <li>
              <a
                href="/admin/dashboard"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <LuLayoutDashboard color="purple" size={20} />
                <span className="ms-3 text-gray-700">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/jobs"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <GoChecklist color="purple" size={20} />
                <span className="ms-3 text-gray-700">Jobs</span>
              </a>
            </li>

            <li>
              <a
                href="/admin/users"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <LuUsers color="purple" size={20} />
                <span className="ms-3 text-gray-700">Users</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/user_queries"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <GoQuestion color="purple" size={20} />
                <span className="ms-3 text-gray-700">User Queries</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/cv-matchers"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <VscVerified color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Matchers</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/cv-templates"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <LuLayoutTemplate color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Templates</span>
              </a>
            </li>
            <li>
              <a
                href="/admin/cv-creators"
                className="flex items-center p-2 rounded-lg hover:bg-gray-100 group"
              >
                <BsPersonWorkspace color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Creators</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {menu && window.innerWidth < 640 && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
          onClick={handleChange}
        ></div>
      )}
    </>
  );
};

export default LeftSideBar;
