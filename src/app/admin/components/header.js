"use client";
import React, { useState } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const Header = () => {
  const [showData, setShowData] = useState(false);
  const handleChange = () => {
    setShowData(!showData);
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
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://i.pravatar.cc/150?img=35"
              alt="User avatar"
            />
          </button>
          {showData && (
            <div className="absolute w-44 right-0 mt-2 p-4 bg-white border border-gray-400 rounded-lg shadow-lg">
              <div className="flex gap-2">
                <MdOutlineTipsAndUpdates className="mt-1" color="purple" />
                <p className="cursor-pointer text-sm">Update Profile</p>
              </div>
              <div className="flex gap-2">
                <IoSettingsOutline className="mt-1" color="purple" />
                <p className="cursor-pointer text-sm">Change Password</p>
              </div>
              <div className="flex gap-2">
                <IoLogOutOutline className="mt-1" color="purple" />
                <p className="cursor-pointer text-sm">Logout</p>
              </div>
            </div>
          )}
        </div>
        <span className="mr-4 p-2 text-sm md:text-base">George Herry</span>
      </div>
    </div>
  );
};

export default Header;
