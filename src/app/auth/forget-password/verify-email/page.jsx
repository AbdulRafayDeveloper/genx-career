"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newError = {};
    if (email.trim() === "") {
      newError.email = "Please provide an email. Email is not empty";
    }
    else if (typeof email !== "string") {
      newError.email = "Please provide an email that must be in a valid format";
    }
    else if (!email.includes("@")) {
      newError.email = "Please provide an email that must be in a valid format";
    }
    return newError;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const isValid = validateForm();
    if (Object.keys(isValid).length > 0) {
      setErrors(isValid);
      setLoading(false);
      return;
    }

    if (!email) {
      toast.error("Email is required.");
      setLoading(false);
      return;
    }    

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/forget-password`,
        { email }
      );

      console.log("Response:", response);
      console.log("Response Data:", response.data.data);
      const token = response.data.data;
      console.log("Status:", response.status);

      if (response.status === 200) {
        toast.success(response.data.message || "Email sent successfully.");
        // setLoading(false);
        router.push(`/auth/forget-password/verify-otp?token=${token}`);
      } else {
        toast.error(response.data.message || "Failed to send email. Please try again.");
        // setLoading(false);
      }
    } catch (error) {
      // setLoading(false);
      console.log("Error sending email:", error);
      toast.error(
        error.response?.data?.message ||
        "An error occurred. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

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
      <div className="min-h-screen flex flex-col items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBsicscfPq6Fw86u6OmNdPhhRt5WV8o-gS1A&s')" }}
        ></div>

        {/* Main Form Card */}
        {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full lg:h-[50vh] h-[200hv] " // Make the wave take 50% of screen height
            style={{ transform: "translateY(10%)" }} // Shift wave upward to cover half the form
          >
            <path
              fill="white"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,192C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div> */}
        <main

          className=" max-w-lg p-8  relative z-10 bg-white bg-opacity-50"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="xl:text-4xl lg:text-3xl md:text-2xl text-xl font-extrabold text-purple-900 font-serif ">
              Forget Password?
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address to reset your password.
            </p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute left-3 top-1/4 transition-translate-y-1/3 h-5 w-4 fill-gray-300">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
                </svg>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Enter the email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 pl-10 block w-full px-4 py-3 rounded-md shadow-sm border border-purple-700 outline-none text-sm bg-gray-50"
                  required
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${loading
                ? "bg-purple-900 cursor-not-allowed"
                : "bg-purple-900 hover:bg-purple-900"
                }`}
            >
              {loading ? (<>
                <div className="flex justify-center items-center gap-3">
                  <p className="text-white xl:text-lg lg:text-lg md:text-md text-sm">Please wait</p>
                  <span className="animate-spin inline-block w-4 h-4 border-2 border-t-2 border-white rounded-full"></span>
                </div>
              </>) : (
                <>
                  <p className="text-white xl:text-lg lg:text-lg md:text-md text-sm font-semibold">Submit</p>
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="../login"
                className="text-purple-900 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </main>


      </div>
    </>
  );
};

export default Page;
