"use client";

import { useState, useEffect, useRef } from "react";
import LeftSideBar from "../components/sidebar";
import { useRouter } from "next/navigation";
import Header from "../components/header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';

export default function ApplianceForm() {
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
      tempErrors.confirmPassword = validateConfirmPassword(value, formData.newPassword);
    }
    setErrors(tempErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let tempErrors = {
      newPassword: validatePassword(formData.newPassword),
      confirmPassword: validateConfirmPassword(formData.confirmPassword, formData.newPassword),
    };
    setErrors(tempErrors);

    if (Object.values(tempErrors).some((error) => error)) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    const token = Cookies.get("token");
    const userId = Cookies.get("userId");

    if (!token) {
      console.log("Token not found");
      return;
    }

    try {
      // const updateData = new FormData();
      // updateData.append("password", formData.password);
      // updateData.append("newPassword", formData.newPassword);

      const updateData = {
        password: formData.password,
        newPassword: formData.newPassword,
        confirmNewPassword: formData.confirmPassword
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
        toast.error(response.data.message || "An error occurred. Please try again.");
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
      toast.error(error.response.data.message || "An error occurred. Please try again.");
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
            <LeftSideBar/>

            {/* Title */}
            <p className="text-[12px] md:text-2xl md:font-semibold ml-3 md:ml-64">
             Welcome Back!
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
  <div className="w-full max-w-md bg-gray-50 rounded-xl shadow-lg overflow-hidden">
    <div className="p-2 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-600 mb-6">
        Update Password
      </h1>
      <form
        className="space-y-6"
        onSubmit={handleSubmit}
      >
        {/* Current Password */}
        <div className="relative">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
            Current Password
          </label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 top-1/3 flex items-center text-gray-500"
          >
            {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-purple-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-purple-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
          </button>
          {errors.password && (
            <p className="mt-1 text-xs text-red-500">{errors.password}</p>
          )}
        </div>

        {/* New Password */}
        <div className="relative">
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
            New Password
          </label>
          <input
            id="newPassword"
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            placeholder="••••••••"
            value={formData.newPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowNewPassword(!showNewPassword)}
            className="absolute inset-y-0 right-3 top-1/3 flex items-center text-gray-500"
          >
            {showNewPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-purple-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-purple-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
          </button>
          {errors.newPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border-2 border-purple-300 focus:border-purple-500 focus:outline-none"
            placeholder="••••••••"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-3 top-1/3 flex items-center text-gray-500"
          >
            {showConfirmPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-purple-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-purple-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
          </button>
          {errors.confirmPassword && (
            <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>
          )}
        </div>

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

                        <p className="text-white text-lg font-semibold">Please wait</p>
                        <svg
                          aria-hidden="true"
                          role="status"
                          className="inline size-4 text-purple-600 animate-spin "
                          viewBox="0 0 100 101"
                          fill="#7D0A0A"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051..."
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.39 38.4038 97.8624 35.9116 97.0079 33.5539..."
                            fill="CurrentColor"
                          />
                        </svg>

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

