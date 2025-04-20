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

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/userPasswordUpdate/${userId}`,
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
          style={{ backgroundImage: "url('/images/design.png')" }}
        ></div>
        <div className="font-[sans-serif] relative z-10">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
              <button
                onClick={() => router.push("/")}
                className="absolute top-6 left-6 p-4 bg-white bg-opacity-80 rounded-full text-purple-600 font-semibold hover:underline"
              >
                <FontAwesomeIcon icon={faArrowLeft} className="w-6 h-6" />
              </button>
              <div>
                <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-purple-900 font-serif">
                  Seamless Update: Secure Your Password
                </h2>
                <p className="text-sm mt-6 text-gray-800">
                  Immerse yourself in a hassle-free security update with our
                  intuitively designed password reset form. Effortlessly update
                  your password and secure your account.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="max-w-md md:ml-auto w-full"
              >
                <h3 className="text-purple-900 font-serif text-3xl font-extrabold mb-8">
                  Update Password
                </h3>

                <div className="space-y-4">
                  <div>
                    <input
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="Current Password"
                    />
                  </div>
                  <div>
                    <input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="New Password"
                    />
                  </div>
                  <div>
                    <input
                      name="confirmNewPassword"
                      type="password"
                      value={formData.confirmNewPassword}
                      onChange={handleChange}
                      required
                      className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                      placeholder="Confirm New Password"
                    />
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-purple-600 text-white hover:text-purple-500 focus:outline-none"
                    disabled={loading}
                  >
                    {loading ? "Please Wait..." : "Update Password"}
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
