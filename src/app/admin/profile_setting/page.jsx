"use client";

import { useState, useRef } from "react";
import LeftSideBar from "../components/sidebar";
import Header from "../components/header";

export default function SettingForm() {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "genX@gamil.com",
    password: "*****",
  });

  // Function to handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [image, setImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="overflow-y-auto scrollbar-hidden">
      <button
        ref={buttonRef}
        onClick={handleSidebarToggle}
        aria-controls="separator-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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

      <aside
        ref={sidebarRef}
        id="separator-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <LeftSideBar section="Settings" />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
        {/* Header */}
        <Header title={"Profile Setting"} toggleSidebar={handleSidebarToggle} buttonRef={buttonRef} />

        {/* Scrollable Content Area */}
        <div className="container">
          <div className="flex justify-center items-center mt-5">
            <div className="p-2 rounded-xl bg-[white] shadow-xl border shadow-gray-300 p-2">
              <div className="flex flex-col items-center space-y-2">
                {/* Profile Picture Container */}
                <div className="relative w-24 h-24">
                  <img
                    src={image || "/icons/user.png"}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full border bg-gray-200 p-2"
                  />

                  {/* Camera Icon (Overlay) */}
                  <label htmlFor="imageUpload" className="absolute bottom-0 right-0  bg-purple-500 border border-gray-500 p-1 rounded-full cursor-pointer">
                    <img src="/icons/camera.png" alt="Upload" className="w-6 h-6 " />
                  </label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <div><p className="text-md font-bold">Update Profile</p></div>
              </div>

              {/* Form */}
              <div className="mt-5 p-4 mb-5 max-w-4xl ">
                <form>
                  <div className="flex flex-col gap-3">
                    <div className="relative flex flex-col ">
                      <label className="text-sm font-semibold mb-1">Username </label>
                      <div className="relative">
                        <input
                          placeholder="Username"
                          className="p-2 text-sm rounded-lg border border-gray-300 max-w-[600px] md:w-[460px] lg:w-[600px] pl-8"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-300 w-5 h-4">
                          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="flex flex-col relative" >
                      <label className="text-sm font-semibold mb-1">Email</label>
                      <div className="relative">
                        <input
                          placeholder="Email" disabled
                          className="p-2 text-sm rounded-lg border border-gray-300 max-w-[600px] md:w-[460px] lg:w-[600px] pl-8"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        <img src="/icons/email.png" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-300 w-4 h-3" />
                      </div>
                    </div>
                    <div className="flex flex-col ">
                      <div className="relative flex flex-col">
                        <label className="text-sm font-semibold mb-1">Password</label>
                        <div className="relative">
                          <input
                            placeholder="Password"
                            disabled
                            className="p-2 text-sm rounded-lg border border-gray-300 w-full pl-8"
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                          />
                          <img src="/icons/pass.png" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-300 w-4 h-3" />

                        </div>
                      </div>
                    </div>
                    <div className="flex flex-row justify-end gap-3 mt-4">

                      <button className="btn bg-purple-500 p-1 rounded-xl w-[150px] text-white"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent any accidental form submission
                          console.log("Form Data:", formData); // Log the complete form data
                        }}
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
