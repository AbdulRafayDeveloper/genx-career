"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LuLayoutDashboard } from "react-icons/lu";
import { GoChecklist } from "react-icons/go";
import { LuUsers } from "react-icons/lu";
import { GoQuestion } from "react-icons/go";
import { VscVerified } from "react-icons/vsc";
import { LuLayoutTemplate } from "react-icons/lu";
import { BsPersonWorkspace } from "react-icons/bs";
import Link from "next/link";
import { usePathname } from "next/navigation";


const LeftSideBar = () => {
  const [menu, setMenu] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const pathname = usePathname();


  // Run once on the client-side after the component is mounted
  useEffect(() => {
    setIsClient(true); // Ensures that the code runs on the client-side
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Attach resize event listener
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial window width

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener
    };
  }, []);

  // Toggle menu for small screens
  const handleChange = () => {
    setMenu(!menu);
  };

  if (!isClient) {
    return null; // Prevent rendering on server side
  }

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
        className={`fixed top-0 left-0 z-40 w-64 h-screen bg-gray-50 ${menu || windowWidth >= 640 ? "block" : "hidden"
          }`}
      >
        <div className="mt-3 px-5">
          <Image
            src="/bg/GENX.png"
            alt="Genx Career Logo"
            width={110}
            height={40}
          />
        </div>
        <div className="h-full px-3 py-4 overflow-y-auto mt-6">
          {/* <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <LuLayoutDashboard color="purple" size={20} />
                <span className="ms-3 text-gray-700">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/jobs"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <GoChecklist color="purple" size={20} />
                <span className="ms-3 text-gray-700">Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <LuUsers color="purple" size={20} />
                <span className="ms-3 text-gray-700">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/user-queries"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <GoQuestion color="purple" size={20} />
                <span className="ms-3 text-gray-700">User Queries</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cv-matchers"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <VscVerified color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Matchers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cv-templates"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <LuLayoutTemplate color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Templates</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cv-creators"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <BsPersonWorkspace color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Creators</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/website-seo"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="purple"
                  stroke="purple"
                  className="size-4"
                >
                  <path d="M372.2 52c0 20.9-12.4 39-30.2 47.2L448 192l104.4-20.9c-5.3-7.7-8.4-17.1-8.4-27.1c0-26.5 21.5-48 48-48s48 21.5 48 48c0 26-20.6 47.1-46.4 48L481 442.3c-10.3 23-33.2 37.7-58.4 37.7l-205.2 0c-25.2 0-48-14.8-58.4-37.7L46.4 192C20.6 191.1 0 170 0 144c0-26.5 21.5-48 48-48s48 21.5 48 48c0 10.1-3.1 19.4-8.4 27.1L192 192 298.1 99.1c-17.7-8.3-30-26.3-30-47.1c0-28.7 23.3-52 52-52s52 23.3 52 52z" />
                </svg>
                <span className="ms-3 text-gray-700">Website Seo</span>
              </Link>
            </li>
          </ul> */}
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                href="/admin/dashboard"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/dashboard" ? "bg-purple-100" : ""
                  }`}
              >
                <LuLayoutDashboard color="purple" size={20} />
                <span className="ms-3 text-gray-700">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/jobs"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/jobs" ? "bg-purple-100" : ""
                  }`}
              >
                <GoChecklist color="purple" size={20} />
                <span className="ms-3 text-gray-700">Jobs</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/users"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/users" ? "bg-purple-100" : ""
                  }`}
              >
                <LuUsers color="purple" size={20} />
                <span className="ms-3 text-gray-700">Users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/user-queries"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/user-queries" ? "bg-purple-100" : ""
                  }`}
              >
                <GoQuestion color="purple" size={20} />
                <span className="ms-3 text-gray-700">User Queries</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cv-matchers"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/cv-matchers" ? "bg-purple-100" : ""
                  }`}
              >
                <VscVerified color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Matchers</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cv-templates"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/cv-templates" ? "bg-purple-100" : ""
                  }`}
              >
                <LuLayoutTemplate color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Templates</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/cv-creators"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/cv-creators" ? "bg-purple-100" : ""
                  }`}
              >
                <BsPersonWorkspace color="purple" size={20} />
                <span className="ms-3 text-gray-700">CV Creators</span>
              </Link>
            </li>
            <li>
              <Link
                href="/admin/website-seo"
                className={`flex items-center p-2 rounded-lg hover:bg-gray-100 group ${pathname === "/admin/website-seo" ? "bg-purple-100" : ""
                  }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 512"
                  fill="purple"
                  stroke="purple"
                  className="size-4"
                >
                  <path d="M372.2 52c0 20.9-12.4 39-30.2 47.2L448 192l104.4-20.9c-5.3-7.7-8.4-17.1-8.4-27.1c0-26.5 21.5-48 48-48s48 21.5 48 48c0 26-20.6 47.1-46.4 48L481 442.3c-10.3 23-33.2 37.7-58.4 37.7l-205.2 0c-25.2 0-48-14.8-58.4-37.7L46.4 192C20.6 191.1 0 170 0 144c0-26.5 21.5-48 48-48s48 21.5 48 48c0 10.1-3.1 19.4-8.4 27.1L192 192 298.1 99.1c-17.7-8.3-30-26.3-30-47.1c0-28.7 23.3-52 52-52s52 23.3 52 52z" />
                </svg>
                <span className="ms-3 text-gray-700">Website Seo</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Overlay for Small Screens */}
      {menu && windowWidth < 640 && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 sm:hidden"
          onClick={handleChange}
        ></div>
      )}
    </>
  );
};

export default LeftSideBar;
