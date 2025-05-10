"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import {
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { password, newPassword, confirmNewPassword } = formData;

    if (!password || !newPassword || !confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Missing Fields",
        text: "All fields are required.",
      });
      return false;
    }

    if (newPassword.length < 8) {
      Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "New password must be at least 8 characters long.",
      });
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "New password and confirm password do not match.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setLoading(true);

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
        toast.error("Error updating password: " + response.data.message);
      } else {
        toast.success("Password updated successfully");
        setTimeout(() => {
          router.push("/jobs");
        }, 2500);
      }
    } catch (error) {
      console.log("Error fetching user data:", error.response.data.message);
      toast.error(error.response.data.message || "An error occurred. Please try again.");
      return;
    } finally {
      setLoading(false)
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
      <div className="relative">
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
        // style={{ backgroundImage: "url('/images/design.png')" }}
        ></div>
        <div className="font-[sans-serif] relative z-10">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
            <button
            onClick={() => router.push("/")}
            className="fixed top-4 left-4 p-2 bg-white bg-opacity-80 rounded-full text-purple-600 shadow-md hover:bg-opacity-100 transition z-50"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="w-8 h-8"
            ></FontAwesomeIcon>
          </button>
              <div className="hidden xl:block md:block lg:block">
                <img src="https://img.freepik.com/free-vector/my-password-concept-illustration_114360-4294.jpg?semt=ais_hybrid&w=740" className="rounded object-cover" />
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-w-md md:ml-auto w-full mt-12"
              >
                <h3 className="flex justify-center text-center items-center text-purple-900 font-serif text-3xl font-extrabold mb-8">
                  Update Password
                </h3>

                <div className="space-y-4">
                  <div>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5">
                        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" /></svg>
                      <input
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                        placeholder="Current Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? "👁️" : "👁‍🗨"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5">
                        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                      </svg>
                      <input
                        name="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 w-full pl-10 text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                        placeholder="New Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showNewPassword ? "👁️" : "👁‍🗨"}
                      </button>
                    </div>
                  </div>
                  <div>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5">
                        <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                      </svg>
                      <input
                        name="confirmNewPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmNewPassword}
                        onChange={handleChange}
                        required
                        className="bg-gray-50 pl-10 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                        placeholder="Confirm New Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showConfirmPassword ? "👁️" : "👁‍🗨"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md transition ${loading ? "cursor-not-allowed bg-purple-300" : "hover:bg-purple-800"
                      }`}
                    disabled={loading}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      {loading ? (
                        <>
                          <p className="text-white text-sm">Please wait...</p>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>

                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="text-white size-4" />
                          <p className="text-white text-lg font-semibold">Update Password</p>
                        </>
                      )}
                    </div>
                  </button>


                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
