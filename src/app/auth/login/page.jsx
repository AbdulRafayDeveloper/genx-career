"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    setLoading(true);

    // validate before sending
    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length) {
      setErrors(formErrors);
      toast.error("Please fix the errors in the form.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/login`,
        formData
      );

      if (response.status === 200) {
        toast.success(response.data.message || "Login successful!");
        const token = response.data.data.token;
        // Cookies.set("genx_access_token", token);
        // Cookies.set("userId", response.data.data.user._id);
        // Cookies.set("role", response.data.data.user.role);
        Cookies.set("genx_access_token", token, { expires: 9999, sameSite: 'Strict' });
        Cookies.set("userId", response.data.data.user._id, { expires: 9999, sameSite: 'Strict' });
        Cookies.set("role", response.data.data.user.role, { expires: 9999, sameSite: 'Strict' });

        console.log("token is :", response.data.data.token);

        console.log("role is :", response.data.data.user.role);

        setTimeout(() => {
          if (response.data.data.user.role === "admin") {
            router.push("/admin/dashboard");
          } else {
            router.push("/");
          }
        }, 300);
      } else {
        toast.error(response.data.message || "Something went wrong.");
        setLoading(false);
      }
    } catch (error) {
      console.log("Login error:", error);
      toast.error(error.response?.data?.message || "Something went wrong.");
      setLoading(false);
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
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center z-0"
          style={{
            backgroundImage: "url('/bg/benefits.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        ></div>

        <div className="font-calibri relative z-10">
          <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
            <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
              <button
                onClick={() => router.push("/")}
                className="absolute top-6 left-6 p-3  bg-opacity-80 rounded-[300px] text-purple-600 font-semibold hover:underline"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="w-8 h-8"
                ></FontAwesomeIcon>
              </button>
              <div className="relative mt-8 w-full h-48 sm:h-64 md:h-80 lg:h-96 rounded-md overflow-hidden md:block lg:block xl:block hidden"></div>
              <form
                onSubmit={handleSubmit}
                className="max-w-md md:ml-auto w-full  p-4"
              >
                <h3 className="text-purple-50 font-calibri text-5xl  font-extrabold mb-8 text-center">
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
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-white w-4 h-5"
                    >
                      <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                    </svg>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full text-sm text-white px-4 py-3.5 pl-9 rounded-md border-2 border-purple-300 bg-transparent outline-none focus:bg-gray-400 focus:bg-opacity-50 placeholder-white"
                      placeholder="Email address"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
                  )}
                  <div className="relative">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                      className="absolute inset-x-0 left-3 top-1/2 transform -translate-y-1/2 fill-white w-4 h-4"
                    >
                      <path d="M144 144l0 48 160 0 0-48c0-44.2-35.8-80-80-80s-80 35.8-80 80zM80 192l0-48C80 64.5 144.5 0 224 0s144 64.5 144 144l0 48 16 0c35.3 0 64 28.7 64 64l0 192c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 256c0-35.3 28.7-64 64-64l16 0z" />
                    </svg>
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="w-full text-sm text-white px-4 py-3.5 pl-9 rounded-md border-2 border-purple-300 bg-transparent outline-none focus:bg-gray-400 focus:bg-opacity-50 placeholder-white"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-5"
                      onClick={() => setShowPassword(!showPassword)}
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
                    <p className="mt-1 text-red-600 text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Forget Password Link */}
                <div className="text-right my-3">
                  <Link
                    href="/auth/forget-password/verify-email"
                    className="text-sm text-purple-50 font-semibold hover:underline"
                  >
                    Forget Password?
                  </Link>
                </div>

                <button
                  type="submit"
                  className={`w-full bg-purple-800 text-white py-2 px-4 rounded-md transition ${loading
                      ? "cursor-not-allowed bg-purple-300"
                      : "hover:bg-purple-500"
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
                          Login
                        </p>
                      </>
                    )}
                  </div>
                </button>
                <p className="text-sm mt-4 text-white ">
                  If you don&apos;t have an account?{" "}
                  <Link
                    href="/auth/register"
                    className="text-white font-semibold hover:underline ml-1"
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
