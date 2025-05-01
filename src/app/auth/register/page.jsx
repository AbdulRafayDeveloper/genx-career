"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
      });
      setLoading(false);
      return;
    }

    const submissionData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/register`,
        submissionData
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: response.data.message,
        }).then(() => {
          router.push("/auth/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Registration Error!",
          text: response.data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Error!",
        text: error.response?.data?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
      // style={{ backgroundImage: "url('/images/design.png')" }}
      ></div>
      <div className="font-calibri relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
            <button
              onClick={() => router.push("/")}
              className="absolute top-6 left-6 p-3 bg-purple-200 bg-opacity-80 rounded-[300px] text-purple-600 font-semibold hover:underline"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="w-5 h-5"
              ></FontAwesomeIcon>
            </button>
            <div
              style={{ backgroundImage: "url('/images/logoreg.jpg')" }}
              className="flex justify-center p-4 object-fit bg-cover h-[400px]"
            ></div>
            <form
              onSubmit={handleSubmit}
              className="max-w-md md:ml-auto w-full p-5 "
            >
              <h3 className="text-purple-900 font-calibri text-5xl font-extrabold mb-8 text-center">
                Register<br></br>
                <span className="text-sm text-center font-medium">
                  Create new account to continue
                </span>
              </h3>

              <div className="space-y-4">
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    fill="currentColor"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400  w-5 h-4"
                  >
                    <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                  </svg>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Username"
                  />
                </div>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                  >
                    <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                  </svg>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Email address"
                  />
                </div>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-5"
                  >
                    <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                  </svg>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "👁️" : "👁‍🗨"}
                  </button>
                </div>
                <div className="relative">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-gray-400 w-4 h-5"
                  >
                    <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                  </svg>
                  <input
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-gray-50 w-full text-sm text-gray-800 px-4 py-3.5 pl-8 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Confirm Password"
                  />
                  <button
                    type="button"
                    className="absolute top-1/2 right-3 transform -translate-y-1/2 w-4 h-5 "
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? "👁️" : "👁‍🗨"}
                  </button>
                </div>
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded bg-purple-600 text-white hover:text-purple-500 focus:outline-none"
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Register"}
                </button>
              </div>
              <p className="text-sm mt-4 text-gray-800 ">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="text-purple-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
