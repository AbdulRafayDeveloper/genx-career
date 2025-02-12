"use client";
import Link from "next/link";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { IoSettingsOutline, IoLogOutOutline } from "react-icons/io5";
import { MdOutlineTipsAndUpdates } from "react-icons/md";

const Header = ({ token, isCheckingAuth, setIsCheckingAuth }) => {
  console.log("Header Props:", { isCheckingAuth, setIsCheckingAuth });

  //const [token, setToken] = useState(null);
  const [showData, setShowData] = useState(false);
  //const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  /*useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, [setIsCheckingAuth]);
*/
  const handleChange = () => {
    setShowData(!showData);
  };

  return (
    <div className="pt-6">
      <nav className="bg-white fixed w-full max-w-[1200px] z-20 top-0 left-1/2 transform -translate-x-1/2 border-b border-gray-200 mt-6 rounded-full shadow-2xl bg-opacity-70">
        <div className="flex items-center justify-center w-full p-4">
          <div className="flex justify-center items-center w-full md:w-auto md:order-1">
            <div className="items-center justify-center hidden w-full md:flex md:w-auto md:order-1">
              <ul className="flex space-x-8 font-medium text-gray-900 md:flex-row">
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
                    href="#"
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
                  <li className="flex gap-2">
                    <div className="relative">
                      <button
                        type="button"
                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                        aria-expanded={showData}
                        onClick={handleChange}
                      >
                        <span className="sr-only">Open user menu</span>
                        <img
                          className="w-7 h-7 rounded-full"
                          src="https://i.pravatar.cc/150?img=35"
                          alt="User avatar"
                        />
                      </button>
                      {showData && (
                        <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-44 bg-white rounded-lg shadow-lg whitespace-nowrap">
                          <div className="flex gap-2 p-2 cursor-pointer hover:bg-gray-100">
                            <MdOutlineTipsAndUpdates
                              className="mt-1"
                              color="purple"
                            />
                            <p className="text-sm">Update Profile</p>
                          </div>
                          <div className="flex gap-2 p-2 cursor-pointer hover:bg-gray-100">
                            <IoSettingsOutline
                              className="mt-1"
                              color="purple"
                            />
                            <p className="text-sm">Change Password</p>
                          </div>
                          <div className="flex gap-2 p-2 cursor-pointer hover:bg-gray-100">
                            <IoLogOutOutline className="mt-1" color="purple" />
                            <p className="text-sm">Logout</p>
                          </div>
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
