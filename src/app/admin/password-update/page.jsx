"use client";

import { useState, useEffect, useRef } from "react";
import LeftSideBar from "../components/sidebar";
import Header from "../components/header";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import axios from "axios";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

export default function ApplianceForm() {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null); // Ref for toggle button
  const dropdownRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const initialFormData = {
    password: "",
    newPassword: "",
    confirmPassword: "",
  };

  const [errors, setErrors] = useState({});

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 8) return "Password must be at least 8 characters";
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
  const validateConfirmPassword = (confirmPassword, newPassword) => {
    if (!confirmPassword) return "Confirm password is required";
    if (confirmPassword !== newPassword) return "Passwords do not match";
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let tempErrors = { ...errors };

    if (name === "newPassword") {
      tempErrors.newPassword = validatePassword(value);
    }

    if (name === "confirmPassword") {
      tempErrors.confirmPassword = validateConfirmPassword(
        value,
        formData.newPassword
      );
    }
    setErrors(tempErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    let tempErrors = {
      newPassword: validatePassword(formData.newPassword),
      confirmPassword: validateConfirmPassword(
        formData.confirmPassword,
        formData.newPassword
      ),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).some((error) => error)) {
      toast.error("Please fix the errors before submitting.");
      setLoading(false);
      return;
    }

    const token = Cookies.get("genx_access_token");
    const userId = Cookies.get("userId");

    if (!token) {
      console.log("Token not found");
      toast.error("Token not found. Please log in again.");
      router.push("/auth/login");
      setLoading(false);
      return;
    }

    try {
      const updateData = {
        password: formData.password,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmPassword,
      };

      console.log("Form data:", updateData);
      console.log("Token:", token);
      console.log("User ID:", userId);
      // console.log("Form data:", updateData.get("password"));
      // console.log("Form data:", updateData.get("newPassword"));

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-password-update/${userId}`,
        updateData,
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
          response.data.message || "An error occurred. Please try again."
        );
        return;
      } else {
        toast.success(response.data.message || "Password updated successfully");
        setFormData(initialFormData);
        setErrors({});
        setShowPassword(false);
        setShowNewPassword(false);
        setShowConfirmPassword(false);
        setTimeout(() => {
          router.push("/admin/dashboard");
        }, 2500);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.response.data.message);
      toast.error(
        error.response.data.message || "An error occurred. Please try again."
      );
      return;
    } finally {
      setLoading(false);
    }
  };

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
      <div className="overflow-y-auto scrollbar-hidden">
        <div className="p-2 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile: Show sidebar toggle */}
            <LeftSideBar />

            {/* Title */}
            {/* <p className="text-[12px] md:text-2xl md:font-semibold ml-3 md:ml-64">
              Welcome Back!
            </p> */}
            <p className="flex items-center text-[12px] md:text-2xl md:font-semibold ml-3 md:ml-64">
              <HiArrowLeft
                className="cursor-pointer mr-2"
                onClick={() => router.back()}
              />
              Welcome Back
            </p>

            {/* Header component */}
            <div className="ml-auto">
              <Header appear={true} />
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:ml-64 md:ml-64 sm:ml-0 flex flex-col flex-grow h-screen overflow-hidden">
          {/* header */}
          {/* <Header /> */}
          {/* Scrollable Content Area */}
          <main className="flex items-center justify-center min-h-screen bg-white p-4">
            <div className="w-full max-w-lg bg-gray-50 rounded-xl shadow-lg overflow-hidden">
              <div className="p-2 sm:p-6 lg:p-8">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-600 mb-6">
                  Update Password
                </h1>
                <form className="space-y-6" onSubmit={handleSubmit}>
                  {/* Current Password */}
                  <div className="relative">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Current Password
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute inset-x-0 left-3 mt-5 transform -translate-y-1/2 fill-gray-400 w-4 h-4"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="w-full pl-10 px-12 p-2 text-sm rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-3 top-1/3 flex items-center text-gray-500"
                    >
                      {showPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-gray-400"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}

                  {/* New Password */}
                  <div className="relative">
                    <label
                      htmlFor="newPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      New Password
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute inset-x-0 left-3 mt-5 transform -translate-y-1/2 fill-gray-400 w-4 h-4"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                    <input
                      id="newPassword"
                      name="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      className="w-full pl-10  px-12 p-2 text-sm rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
                      value={formData.newPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute inset-y-0 right-3 top-1/3 flex items-center text-gray-500"
                    >
                      {showNewPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-gray-400"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-red-500">{errors.newPassword}</p>
                  )}
                  {/* Confirm Password */}
                  <div className="relative">
                    <label
                      htmlFor="confirmPassword"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute inset-x-0 left-3 mt-5 transform -translate-y-1/2 fill-gray-400 w-4 h-4"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      className="w-full pl-10 px-12 p-2 text-sm rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-3 top-1/3 flex items-center text-gray-500"
                    >
                      {showConfirmPassword ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 text-gray-400"
                        >
                          <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                          <path
                            fillRule="evenodd"
                            d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="size-5"
                        >
                          <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                          <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                          <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-red-500">
                      {errors.confirmPassword}
                    </p>
                  )}
                  {/* Submit */}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className={`inline-flex items-center justify-center
                          px-6 py-2 text-sm font-medium rounded-lg
                          bg-purple-600 text-white ${loading
                          ? "cursor-not-allowed bg-purple-300"
                          : "hover:bg-purple-800"
                        }`}
                      disabled={loading}
                    >
                      <div className="flex items-center justify-center space-x-4">
                        {loading ? (
                          <>
                            <p className="text-white text-lg font-semibold">
                              Please wait
                            </p>
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                          </>
                        ) : (
                          <>
                            <p className="text-white text-lg font-semibold">
                              Update Password
                            </p>
                          </>
                        )}
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
