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
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = ({ token, isCheckingAuth, setIsCheckingAuth }) => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [showData, setShowData] = useState(false);
  const [image, setImage] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "" });
  const dropdownRefDesktop = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get("access_token");
        const userId = Cookies.get("userId");

        if (!token) return;

        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { name, profileImage } = response.data.data || {};
        setFormData({ name: name || "" });
        if (profileImage) setImage(profileImage);
      } catch (error) {
        toast.error("Failed to fetch user data");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = () => setShowData(!showData);

  const handleClickOutside = useCallback((event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      dropdownRefDesktop.current &&
      !dropdownRefDesktop.current.contains(event.target)
    ) {
      setShowData(false);
    }
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = (e) => {
    e.stopPropagation();
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
        Cookies.remove("access_token");
        router.push("/auth/login");
      }
    });
  };

  return (
    <div className="pt-6">
      <nav className="bg-transparent sm:bg-transparent md:bg-white md:bg-opacity-70 lg:bg-white lg:bg-opacity-70 fixed w-full max-w-[1200px] z-20 top-0 left-1/2 transform -translate-x-1/2 border-b border-gray-200 md:mt-6 lg:mt-6 mt-0 md:rounded-full md:shadow-2xl lg:rounded-full lg:shadow-2xl sm:fixed">
        <div className="flex items-center justify-between w-full p-4 text-center ">
          {/* Brand */}
          <div className="lg:flex flex items-center h-2 pl-4 md:hidden">
            <Link href="/" className="flex items-center">
              <div className="relative h-12 w-12">
                <Image
                  src="/bg/GENX.png"
                  alt="GenX Career Logo"
                  layout="fill"
                  objectFit="contain"
                  className="scale-125"
                />
              </div>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <HiX className="w-8 h-8 text-[#9866C7]" />
              ) : (
                <HiMenuAlt3 className="w-8 h-8 text-[#9866C7]" />
              )}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center md:w-auto md:order-1">
            <ul className="flex flex-row space-x-8 font-medium text-gray-900 items-center">
              {/* your existing desktop code stays exactly same */}
              <li>
                <Link
                  href="/"
                  className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] whitespace-nowrap"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] whitespace-nowrap"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] whitespace-nowrap"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="/cv-creation"
                  className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] whitespace-nowrap"
                >
                  Cv Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7] whitespace-nowrap"
                >
                  Contact us
                </Link>
              </li>

              {isCheckingAuth ? (
                <li>
                  <span className="py-2 px-3 text-gray-400">Loading...</span>
                </li>
              ) : token ? (
                <li className="flex gap-2 relative" ref={dropdownRefDesktop}>
                  <button type="button" onClick={handleChange}>
                    <Image
                      src={image ? image : "/images/profile_placeholder.jpg"}
                      alt="user profile"
                      width={30}
                      height={30}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  </button>
                  {showData && (
                    <div className="absolute w-44 right-0 mt-8 p-4 bg-gray-200  rounded-lg shadow-lg z-50">
                      <button
                        onClick={() => router.push("/user/profile-update")}
                        className="flex items-center gap-2 w-full px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                      >
                        <MdOutlineTipsAndUpdates color="purple" /> Update
                        Profile
                      </button>
                      <button
                        onClick={() => router.push("/user/password-update")}
                        className="flex items-center gap-2 w-full mt-2 px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                      >
                        <IoSettingsOutline color="purple" /> Change Password
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full mt-2 px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                      >
                        <IoLogOutOutline color="purple" /> Logout
                      </button>
                    </div>
                  )}
                </li>
              ) : (
                <li className="flex items-center">
                  <Link
                    href="/auth/register"
                    className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7]"
                  >
                    Register
                  </Link>
                  <span className="mx-2 text-gray-500">/</span>
                  <Link
                    href="/auth/login"
                    className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7]"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white  shadow-lg transform transition-transform duration-300 ease-in-out md:hidden lg:hidden z-[9999] ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <span className="font-semibold text-[#9866C7] text-lg">Menu</span>
          <HiX
            className="w-6 h-6 text-[#9866C7]"
            onClick={() => setIsMenuOpen(false)}
          />
        </div>

        <ul className="flex flex-col p-4 space-y-4 font-medium text-gray-900">
          <li>
            <Link
              href="/"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-gray-100"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-gray-100"
            >
              About us
            </Link>
          </li>
          <li>
            <Link
              href="/jobs"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-gray-100"
            >
              Find Jobs
            </Link>
          </li>
          <li>
            <Link
              href="/cv-creation"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-gray-100"
            >
              Cv Creation
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              onClick={() => setIsMenuOpen(false)}
              className="py-2 px-3 rounded hover:bg-gray-100"
            >
              Contact us
            </Link>
          </li>
          {isCheckingAuth ? (
            <li>
              <span className="py-2 px-3 text-gray-400">Loading...</span>
            </li>
          ) : token ? (
            <li className="flex gap-2 relative pl-4" ref={dropdownRef}>
              <button type="button" onClick={handleChange}>
                <Image
                  src={image ? image : "/images/profile_placeholder.jpg"}
                  alt="user profile"
                  width={30}
                  height={30}
                  className="w-8 h-8 rounded-full object-cover"
                />
              </button>
              {showData && (
                <div className="absolute w-44 right-0 mt-2 p-4 bg-white border border-gray-400 rounded-lg shadow-lg z-50">
                  <button
                    onClick={() => router.push("/user/profile-update")}
                    className="flex items-center gap-2 w-full px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                  >
                    <MdOutlineTipsAndUpdates color="purple" /> Update Profile
                  </button>
                  <button
                    onClick={() => router.push("/user/password-update")}
                    className="flex items-center gap-2 w-full mt-2 px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                  >
                    <IoSettingsOutline color="purple" /> Change Password
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full mt-2 px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
                  >
                    <IoLogOutOutline color="purple" /> Logout
                  </button>
                </div>
              )}
            </li>
          ) : (
            <li className="flex items-center">
              <Link
                href="/auth/register"
                className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7]"
              >
                Register
              </Link>
              <span className="mx-2 text-gray-500">/</span>
              <Link
                href="/auth/login"
                className="py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#9866C7]"
              >
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
