"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";
import defaultProfile from "../../../../public/images/profile.jpg";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ProfileUpdatePage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [image, setImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

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
  };

  useEffect(() => {
    const fetchUserData = async () => {
      // setLoading(true);
      try {
        const token = Cookies.get("access_token");
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
          toast.error(
            response.data.message ||
              "Profile Information not found currently. Please try again later"
          );
          return;
        }

        const { name, email, password, profileImage } =
          response.data.data || {};

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
        toast.error(
          error.message ||
            "Profile Information not found currently. Please try again later"
        );
      }
    };

    fetchUserData();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Create a URL for the selected file
      const fileUrl = URL.createObjectURL(file);

      // Set the image and the image file for further submission
      setImage(fileUrl);
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
      const token = Cookies.get("access_token");
      const userId = Cookies.get("userId");
      if (!token) return toast.error("Token not found");

      const updateData = new FormData();
      updateData.append("name", formData.name);
      if (imageFile) updateData.append("profileImage", imageFile);

      // console.log("Update data:", updateData);
      // console.log("Update data name:", formData.name);
      // console.log("Update data image:", imageFile);

      // console.log("Profile Token:", token);
      // console.log("Profile User ID:", userId);

      for (let [key, value] of updateData.entries()) {
        console.log(`${key}:`, value);
      }

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
      } else {
        toast.error(response.data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log("Update error:", error);
      toast.error(
        error.response.data.message ||
          "Something went wrong while updating the profile."
      );
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
      <div className="min-h-screen flex flex-col items-center justify-center p-5  ">
        {/* Background */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/bg/benefits.jpg')" }}
        ></div>

        <main className="relative z-10 w-full max-w-lg p-8 shadow-xl mb-4 shadow-purple-300 bg-black bg-opacity-50 rounded-lg">
          {/* Avatar Upload */}
          <div className="flex justify-center items-center text-center m-7 ">
            <p className="text-xl xl:text-4xl md:text-2xl lg:text-3xl font-bold text-purple-50 ">
              Update Profile
            </p>
          </div>
          <button
            onClick={() => router.push("/")}
            className="fixed top-4 left-4 p-2   text-purple-600 hover:bg-opacity-100 transition z-50"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="w-8 h-8"
            ></FontAwesomeIcon>
          </button>

          <div className="flex flex-col items-center relative">
            <div className="relative w-28 h-28">
              <Image
                src={
                  imageFile
                    ? image // Temporary preview for newly uploaded image
                    : image
                    ? `${image}`
                    : defaultProfile
                }
                alt="Avatar"
                width={40}
                height={40}
                unoptimized
                className="w-full h-full object-cover rounded-full border bg-purple-700 "
              />
              <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 bg-purple-700 text-white rounded-full p-2 cursor-pointer hover:bg-purple-700 transition"
                title="Change Avatar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="size-6"
                >
                  <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                </svg>
              </label>
              <input
                type="file"
                id="avatar-upload"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className=" space-y-2">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-white">
                Name
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="absolute left-3 top-1/3 transition-translate-y-1/3 h-5 w-4 fill-gray-300"
                >
                  <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                </svg>
                <input
                  name="name"
                  placeholder="Enter your name"
                  type="text"
                  value={formData.name}
                  // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onChange={handleChange}
                  className="mt-1 pl-10 block w-full px-4 py-3 rounded-md shadow-md border border-purple-700 outline-none text-sm"
                  required
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name}</p>
              )}
            </div>

            {/* Email Field (non-editable) */}
            <div>
              <label className="block text-sm font-medium text-white">
                Email Address
              </label>
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="absolute left-3 top-1/3 transition-translate-y-1/3 h-5 w-4 fill-gray-300"
                >
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="abcd@gmail.com"
                  disabled
                  className="mt-1 pl-10 block w-full px-4 py-3 rounded-md shadow-sm border border-purple-700 text-sm bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md transition ${
                loading
                  ? "cursor-not-allowed bg-purple-300"
                  : "hover:bg-purple-800"
              }`}
              disabled={loading}
            >
              <div className="flex items-center justify-center space-x-2">
                {loading ? (
                  <>
                    <p className="text-white text-sm">Please wait</p>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className="text-white size-4"
                    />
                    <p className="text-white text-lg font-semibold">
                      Update Profile
                    </p>
                  </>
                )}
              </div>
            </button>
          </form>
        </main>
        {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-[50vh] translate-y-[40%] lg:translate-y-[30%]"
          >
            <path
              fill="white"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,192C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div> */}
      </div>
    </>
  );
};

export default ProfileUpdatePage;
