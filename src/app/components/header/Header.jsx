"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";
import Image from "next/image";
import defaultProfile from "../../../../public/images/profile avatar.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ token, isCheckingAuth, setIsCheckingAuth }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [showData, setShowData] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("token");
        const userId = Cookies.get("userId");

        if (!token) {
          console.log("Token not found");
          return;
        }

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("User data response:", response);

        if (response.status !== 200) {
          console.log("Error fetching user data:", response.data.message);
          toast.error(
            response.data.message ||
              "Profile Information not found currently. Please try again later"
          );
          return;
        }

        const { name, profileImage } = response.data.data || {};

        setFormData({
          name: name || "",
        });

        if (profileImage) {
          setImage(profileImage);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error(
          error.message ||
            "Profile Information not found currently. Please try again later"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleChange = () => {
    setShowData(!showData);
  };

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowData(false);
    }
  }, []);

  useEffect(() => {
    // Changed from "mousedown" to "click"
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = (e) => {
    // Prevent any parent click events from interfering
    e.stopPropagation();
    console.log("Call logout API here");
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#8e44ad",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove("token");
        router.push("/auth/login");
      }
    });
  };

  return (
    <div className="pt-6">
      <nav className="bg-white fixed w-full max-w-[1200px] z-20 top-0 left-1/2 transform -translate-x-1/2 border-b border-gray-200 mt-6 rounded-full shadow-2xl bg-opacity-70">
        <div className="flex items-center justify-center w-full p-4">
          <div className="flex justify-center items-center w-full md:w-auto md:order-1">
            <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1 ">
              <ul className="flex space-x-8 font-medium text-gray-900 md:flex-row items-center">
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 text-white bg-[#8b5eb4] rounded md:bg-transparent md:text-[#9866C7] md:p-0"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    About us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/jobs"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Find Jobs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cv-creation"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Cv Creation
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                  >
                    Contact us
                  </Link>
                </li>

                {/* Show loading placeholder while checking auth */}
                {isCheckingAuth ? (
                  <li className="flex items-center">
                    <span className="block py-2 px-3 text-gray-400"></span>
                  </li>
                ) : token ? (
                  <li className="flex gap-2 ">
                    <div className="relative">
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                        aria-expanded={showData}
                        onClick={handleChange}
                      >
                        <span className="sr-only">Open user menu</span>
                        <Image
                          src={
                            image
                              ? `${image}`
                              : "/images/profile_placeholder.jpg"
                          }
                          alt="user profile"
                          width={30}
                          height={30}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      </button>
                      {showData && (
                        <div className="absolute w-44 right-0 mt-2 p-4 bg-white border border-gray-400 rounded-lg shadow-lg z-50">
                          <button
                            type="button"
                            onClick={() => router.push("/user/profile-update")}
                            className="flex items-center gap-2 w-full px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                          >
                            <MdOutlineTipsAndUpdates color="purple" />
                            Update Profile
                          </button>
                          <button
                            type="button"
                            onClick={() => router.push("/user/password-update")}
                            className="flex items-center gap-2 w-full mt-2 px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                          >
                            <IoSettingsOutline color="purple" />
                            Change Password
                          </button>
                          <button
                            type="button"
                            onClick={handleLogout}
                            className="flex items-center gap-2 w-full mt-2 px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                          >
                            <IoLogOutOutline color="purple" />
                            Logout
                          </button>
                        </div>
                      )}
                    </div>
                  </li>
                ) : (
                  <li className="flex items-center">
                    <Link
                      href="/auth/register"
                      className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                    >
                      Register
                    </Link>
                    <span className="mx-2 text-gray-500">/</span>
                    <Link
                      href="/auth/login"
                      className="block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] md:p-0"
                    >
                      Login
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
