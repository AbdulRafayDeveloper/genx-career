"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validateForm = (data) => {
    const newErrors = {};

    if (!data.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newErrors.email = "Please enter a valid email format.";
    }

    if (!data.password) {
      newErrors.password = "Please enter your password.";
    } else if (data.password.length < 8) {
      newErrors.password = "Password must have at least 8 characters.";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate before sending
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        Cookies.set("token", response.data.data.token);
        Cookies.set("userId", response.data.data.user._id);

        if (response.data.data.user.role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/jobs");
        }
      } else {
        toast.error(response.data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong."
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

      <div className="relative">
        <div className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"></div>
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
              <div className="relative mt-8 w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-md overflow-hidden md:block lg:block xl:block hidden">
                <Image
                  src="/images/logo.png"
                  alt="GenX Career Logo"
                  fill
                  className="object-fit object-center ml-3"
                  priority
                />
              </div>
              <form
                onSubmit={handleSubmit}
                className="max-w-md md:ml-auto w-full  p-4"
              >
                <h3 className="text-purple-900 font-calibri text-5xl font-extrabold mb-8 text-center">
                  Login<br></br>
                  <span className="text-sm text-center font-medium">
                    Continue to your account!
                  </span>
                </h3>

                <div className="space-y-4">
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-purple-400 w-4 h-5"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className=" w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md border-2 border-purple-300 outline-none focus:bg-transparent"
                      placeholder="Email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-red-600 text-sm">
                      {errors.email}
                    </p>
                  )}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute left-3 top-1/2 tranform -translate-y-1/2 fill-purple-400 w-4 h-5"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className=" w-full text-sm text-gray-800 px-4 py-3.5 pl-9 rounded-md border-2 border-purple-300 outline-none focus:bg-transparent"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="size-5 fill-purple-400 ">
                          <path d="M0 208C0 104.4 75.7 18.5 174.9 2.6C184 1.2 192 8.6 192 17.9l0 63.3c0 8.4 6.5 15.3 14.7 16.5C307 112.5 384 199 384 303.4c0 103.6-75.7 189.5-174.9 205.4c-9.2 1.5-17.1-5.9-17.1-15.2l0-63.3c0-8.4-6.5-15.3-14.7-16.5C77 398.9 0 312.4 0 208zm288 48A96 96 0 1 0 96 256a96 96 0 1 0 192 0zm-96-32a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"/></svg>
                       ): (
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" className="size-5 fill-purple-400 ">
                          <path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223 149.5c48.6-44.3 123-50.8 179.3-11.7c60.8 42.4 78.9 123.2 44.2 186.9L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3L223 149.5zm223.1 298L83.1 161.5c-11 14.4-20.5 28.7-28.4 42.2l339 265.7c18.7-5.5 36.2-13 52.6-21.8zM34.5 268.3c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c3.1 0 6.1-.1 9.2-.2L33.1 247.8c-1.8 6.8-1.3 14 1.4 20.5z"/></svg>
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-red-600 text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Forget Password Link */}
                <div className="text-right mt-2">
                  <Link
                    href="/auth/forget-password/verify-email"
                    className="text-sm text-purple-600 font-semibold hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md transition ${loading
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
                          Login
                        </p>
                      </>
                    )}

                  </div>
                </button>
                <p className="text-sm mt-4 text-gray-800 ">
                  If you don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-purple-600 font-semibold hover:underline ml-1"
                  >
                    Register here
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
