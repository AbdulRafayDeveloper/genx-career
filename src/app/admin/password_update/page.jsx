"use client";

import { useState, useEffect, useRef } from "react";
import LeftSideBar from "../components/sidebar";
import { useRouter } from "next/navigation";
import Header from "../components/header";
// import Sidebar from "@/app/owner/components/sidebar/SideBar";
// import Header from "@/app/owner/components/header/Header";
// import Link from "next/link";

export default function ApplianceForm() {
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null); // Ref for toggle button
  const dropdownRef=useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [showConfirmPassword,setShowConfirmPassword]=useState(false);
  const [formData, setFormData] = useState({
    currentPassword:"",
    password: "",
    confirmPassword: "",
  });
  const initialFormData={
    currentPassword:"",
    password: "",
    confirmPassword: "",
  };

  const [errors, setErrors] = useState({});
  const router = useRouter();


  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    if (!/[A-Z]/.test(password))
      return "Password must contain at least one uppercase letter";
    if (!/[a-z]/.test(password))
      return "Password must contain at least one lowercase letter";
    if (!/[0-9]/.test(password))
      return "Password must contain at least one number";
    if (!/[!@#$%^&*]/.test(password))
      return "Password must contain at least one special character";
    return "";
  };
  //   confirm Password
  const validateConfirmPassword = (confirmPassword, password) => {
    if (!confirmPassword) return "Confirm password is required";
    if (confirmPassword !== password) return "Passwords do not match";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let tempErrors = { ...errors };

    // if (name === "username") {
    //   tempErrors.username = validateUsername(value);
    // }
    if (name === "password") {
      tempErrors.password = validatePassword(value);
    }

    if (name === "confirmPassword") {
      tempErrors.confirmPassword = validateConfirmPassword(value, formData.password);
    }
    setErrors(tempErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let tempErrors = {
      // username: validateUsername(formData.username),
      password: validatePassword(formData.password),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.password),
    };
    setErrors(tempErrors);

    if (
      // !tempErrors.username && 
      !tempErrors.password ) {
      console.log("Form Submitted", formData);

      router.push("/admin/dashboard");
    }
  };
  const handleCancel=()=>{
    setFormData(initialFormData);
  }
  const handleClickOutside = (event) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target)
    ) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);



  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
        <LeftSideBar section="Password Update" />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
        {/* header */}
        <Header/>

        {/* Scrollable Content Area */}
        <main className="p-3 flex-grow">
          <div className="max-h-screen p-4 ">
          <section className="p-2 ">
      <div className="flex flex-col items-center justify-center p-4">
        
        {/* <p className="lg:text-[25px] text-[20px] text-black font-normal lg:pb-2">
          to get started
        </p> */}
        <div className="w-[560px] bg-gray-100 rounded-lg shadow-lg md:mt-0 xl:p-0 max-h-screen">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex justify-center items-center">
            <h1 className="text-gray-600 font-bold text-[30px] m-3">
                Update Password
            </h1>
            </div>
            <form
              className="space-y-4 md:space-y-6 lg:space-y-4"
              onSubmit={handleSubmit}
            >
              {/* password */}
              <div className="relative w-full flex flex-col gap-4">
              <div>
                <label className="font-semibold text-lg">Current Password:</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text': "password"}
                      name="currentPassword"
                      id="password"
                      className="bg-white text-gray-900 text-xs placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                      placeholder="Current Password"
                      value={formData.currentPassword}
                      onChange={handleChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? "👁️" : "👁‍🗨"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}


                  {/* <div className="text-right mt-1">
                  <Link href="#" className="text-[12px] text-[#A0A0A0CC]">
                    Forget password?
                  </Link>
                </div> */}
                </div>
                {/* new Password */}
                <div>
                    <label className="font-semibold text-lg">New Password:</label>
                  <div className="relative w-full">
                    <input
                      type={showPassword ? 'text': "password"}
                      name="password"
                      id="password"
                      className="bg-white text-gray-900 text-xs placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                      placeholder="New Password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showPassword ? "👁️" : "👁‍🗨"}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">{errors.password}</p>
                  )}


                  {/* <div className="text-right mt-1">
                  <Link href="#" className="text-[12px] text-[#A0A0A0CC]">
                    Forget password?
                  </Link>
                </div> */}
                </div>
                {/* confirm password */}
                <div >
                <label className="font-semibold text-lg">Confirm Password:</label>
                  <div className="relative w-full">
                    <input
                      type={showConfirmPassword? "text":"password"}
                      name="confirmPassword"
                      id="confirmPassword"
                      className="bg-white text-gray-900 text-xs placeholder-gray-400 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 pl-12"
                      placeholder="confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    >
                      {showConfirmPassword ? "👁️" : "👁‍🗨"}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
                  )}
                  {/* <div className="text-right mt-1">
                    <Link href="#" className="text-[12px] text-[#A0A0A0CC]">
                      Forget password?
                    </Link>
                  </div> */}
                </div>
              </div>

              <div className="flex flex-row justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={() => setFormData(initialFormData)}
                className="text-white border border-gray-300 bg-gray-400 hover:bg-gray-500 transition-all duration-300 font-medium rounded-lg text-md px-5 py-2.5 text-center shadow-md"
            >
                Cancel
            </button>

                <button
                    type="submit"
                    className=" text-white border bg-purple-600   font-medium rounded-lg text-md px-5 py-2.5 text-center"
                >
                    Update Password
                </button>
              </div>

              {/* <p className="text-sm font-light text-gray-500 mt-4">
                Already have an account? {" "}
                <Link href="/auth/signin" className="text-[14px] font-semibold text-[#A0A0A0CC]">
                  Sign In
                </Link>
              </p> */}
            </form>
          </div>
        </div>
      </div>
    </section>
          </div>
        </main>
      </div>
    </div>
  );
}

