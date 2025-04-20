"use client";

import { useState, useRef, useEffect } from "react";
import LeftSideBar from "../components/sidebar";
import Header from "../components/header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { useParams } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';
import defaultProfile from "../../../../public/images/profile avatar.png";
import Image from "next/image";

export default function SettingForm() {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  // const { id } = useParams();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
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
          toast.error("{Profile Information not found currently. Please try again later}");
          return;
        }

        const { name, email, password, profileImage } = response.data.data || {};

        setFormData({
          name: name || "",
          email: email || "",
          password: password || "",
        });

        if (profileImage) {
          setImage(profileImage);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error("{Profile Information not found currently. Please try again later}");
      }
    };

    fetchUserData();
  }, []);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      if (!token) return toast.error("Token not found");

      const updateData = new FormData();
      updateData.append("name", formData.name);
      if (imageFile) updateData.append("profileImage", imageFile);

      console.log("Update data:", updateData);
      console.log("Update data name:", formData.name);
      console.log("Update data image:", imageFile);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/userProfileUpdate/${userId}`,
        updateData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Update response:", response);

      if (response.status === 200) {
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error("Something went wrong while updating the profile.");
    }
  };

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
      <div className="overflow-y-auto bg-gray-100 min-h-screen">
        {/* Mobile Sidebar Toggle Button */}
        <button
          ref={buttonRef}
          onClick={handleSidebarToggle}
          aria-controls="separator-sidebar"
          type="button"
          className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-700 rounded-lg sm:hidden hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
        >
          <span className="sr-only">Open sidebar</span>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
            ></path>
          </svg>
        </button>

        {/* Sidebar */}
        <aside
          ref={sidebarRef}
          id="separator-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-white shadow-lg ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0`}
          aria-label="Sidebar"
        >
          <LeftSideBar section="Settings" />
        </aside>

        {/* Main Content */}
        <div className="sm:ml-64 p-2">
          <Header title="Profile Setting" toggleSidebar={handleSidebarToggle} buttonRef={buttonRef} />

          <div className="flex justify-center items-center mt-12">
            <div className="bg-white rounded-2xl shadow-xl border p-6 w-full max-w-2xl">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24">
                  {/* <Image
                    src={
                      image
                        ? `${process.env.NEXT_PUBLIC_BASE_URL}/public/profileImages/${image}`
                        : defaultProfile // Put this image inside your `/public` folder
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full border bg-gray-200 p-1"
                  /> */}
                  <Image
                    src={
                      imageFile
                        ? image // Temporary preview for newly uploaded image
                        : image
                          ? `${process.env.NEXT_PUBLIC_BASE_URL}/public/profileImages/${image}`
                          : defaultProfile
                    }
                    alt="Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full border bg-gray-200 p-1"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-0 right-0 bg-purple-600 border border-white p-1 rounded-full cursor-pointer shadow-md"
                  >
                    <img src="/icons/camera.png" alt="Upload" className="w-5 h-5" />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="mt-3 text-lg font-semibold text-gray-700">Update Profile</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Username"
                      className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      placeholder="Email"
                      className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                    />
                    <img
                      src="/icons/email.png"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      disabled
                      placeholder="Password"
                      className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                    />
                    <img
                      src="/icons/pass.png"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 transition-all text-white font-medium py-2 px-6 rounded-xl"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
