"use client";
import { useState, useRef, useEffect } from "react";
import LeftSideBar from "../components/sidebar";
import Header from "../components/header";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import defaultProfile from "../../../../public/images/profile avatar.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SettingForm() {
  const router = useRouter();
  const sidebarRef = useRef(null);
  const buttonRef = useRef(null);
  // const { id } = useParams();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    // password: "",
  });

  const validateForm = () => {
    const newError = {};
    if (formData.name.trim() === "") {
      newError.name = "Name is required";
    } else if (formData.name.length < 2) {
      newError.name = "Name must be at least 2 characters";
    } else if (formData.name.length > 35) {
      newError.name = "Name must be less than 35 characters";
    }
    return newError;
  }

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
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

        const { name, email, profileImage } = response.data.data || {};

        setFormData({
          name: name || "",
          email: email || "",
          // password: password || "",
        });

        if (profileImage) {
          setImage(profileImage);
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
        toast.error(error.response.data.message || "Profile Information not found currently. Please try again later");
      } finally {
        setLoading(false);
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
    setErrors(prev => ({ ...prev, [name]: undefined }));
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
    setLoading(true);

    const isValid = validateForm();
    if (Object.keys(isValid).length > 0) {
      setErrors(isValid);
      setLoading(false);
      return;
    }

    try {
      const token = Cookies.get("token");
      const userId = Cookies.get("userId");
      if (!token) {
        console.log("Token not found");
        toast.error("You are not authorized to perform this action.");
        setLoading(false);
        setTimeout(() => {
          router.push("/auth/login");
        }, 500);
        return;
      }

      const updateData = new FormData();
      updateData.append("name", formData.name);
      if (imageFile) updateData.append("profileImage", imageFile);

      console.log("Update data:", updateData);
      console.log("Update data name:", formData.name);
      console.log("Update data image:", imageFile);

      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user-profile-update/${userId}`,
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
        toast.success(response.data.message || "Profile updated successfully!");
        setLoading(false);
      } else {
        toast.error(response.data.message || "Failed to update profile.");
        setLoading(false);
      }
    } catch (error) {
      console.log("Update error:", error);
      setLoading(false);
      toast.error(error.response.data.message || "Something went wrong while updating the profile.");
    } finally {
      setLoading(false);
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
      <div className="overflow-y-auto bg-white min-h-screen">
        {/* Mobile Sidebar Toggle Button */}
        <div className="p-2 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile: Show sidebar toggle */}
            <LeftSideBar />

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
        <div className="sm:ml-64 p-2">
          {/* <Header title="Profile Setting" toggleSidebar={handleSidebarToggle} buttonRef={buttonRef} /> */}

          <div className="flex justify-center items-center mt-12 p-2">
            <div className="bg-gray-100 rounded-2xl shadow-xl shadow-purple-400  p-6 w-full max-w-2xl">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative w-24 h-24">
                  <Image
                    src={
                      imageFile
                        ? image // Temporary preview for newly uploaded image
                        : image
                          ? `${image}`
                          : defaultProfile
                    }
                    alt="User Profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover rounded-full border bg-gray-200 p-1"
                  />
                  <label
                    htmlFor="imageUpload"
                    className="absolute bottom-0 right-0 bg-purple-600 border border-white p-1 rounded-full cursor-pointer shadow-md"
                  >
                    <img src="/icons/camera.png" alt="Camera Icon" className="w-5 h-5" />
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </div>
                <p className="mt-3 text-lg font-bold">Update Profile</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Username */}
                <div>
                  <label className="block text-lg font-bold mb-1">Username</label>
                  <div className="relative">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Username"
                      className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 fill-gray-400"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                    </svg>
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-lg font-bold mb-1">Email</label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      disabled
                      placeholder="Email"
                      className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                  </div>
                </div>

                {/* Password */}
                {/* <div>
                  <label className="block text-lg font-bold mb-1">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      disabled
                      placeholder="Password"
                      className="pl-10 pr-4 py-2 w-full text-sm rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-4"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                  </div>
                </div> */}

                {/* Save Button */}
                <div className="flex justify-end">
                  <div className="!mt-8">
                    <button
                      type="submit"
                      className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md transition ${loading
                        ? "cursor-not-allowed bg-purple-600"
                        : "hover:bg-purple-800"
                        }`}
                      disabled={loading}
                    >
                      <div className="flex items-center justify-center space-x-4">
                        {loading ? (
                          <>
                            <p className="text-white text-lg font-semibold">Please wait</p>
                            <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                          </>
                        ) : (
                          <>

                            <p className="text-white text-lg font-semibold">
                              Submit
                            </p>
                          </>
                        )}

                      </div>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
