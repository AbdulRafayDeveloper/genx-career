"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from "next/navigation";
import defaultProfile from "../../../../public/images/profile avatar.png";

const Header = () => {
  const router = useRouter();
  const dropdownRef = useRef(null);
  const [showData, setShowData] = useState(false);
  const [image, setImage] = useState(null);
  const [formData, setFormData] = useState({
    name: ""
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
          toast.error(response.data.message || "Profile Information not found currently. Please try again later");
          return;
        }

        const { name, profileImage } = response.data.data || {};

        setFormData({
          name: name || ""
        });

        if (profileImage) {
          setImage(profileImage);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error(error.message || "Profile Information not found currently. Please try again later");
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
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#8e44ad',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        router.push('/auth/login');
      }
    });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="ml-3 mt-3">
        <h1 className="lg:text-3xl md:text-2xl font-bold text-lg">
          Welcome Back!
        </h1>
        <p className="text-sm md:text-lg">Here is all information.</p>
      </div>
      <div className="flex items-center justify-end">
        <div className="relative">
          <button
            type="button"
            className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
            aria-expanded={showData}
            onClick={handleChange}
            ref={dropdownRef}
          >
            <span className="sr-only">Open user menu</span>
            <Image
              src={
                image
                  ? `${image}`
                  : defaultProfile
              }
              alt="user profile"
              width={40}
              height={40}
              className="w-10 h-10 rounded-full object-cover"
            />
          </button>
          {showData && (
            <div className="absolute w-44 right-0 mt-2 p-4 bg-white border border-gray-400 rounded-lg shadow-lg z-50">
              <button
                type="button"
                onClick={() => router.push('/admin/profile-update')}
                className="flex items-center gap-2 w-full px-2 py-2 text-sm text-left hover:bg-gray-100 rounded"
              >
                <MdOutlineTipsAndUpdates color="purple" />
                Update Profile
              </button>
              <button
                type="button"
                onClick={() => router.push('/admin/password-update')}
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
        <span className="mr-4 p-2 text-sm md:text-base">{formData.name || "User Name"}</span>
      </div>
    </div>
  );
};

export default Header;
