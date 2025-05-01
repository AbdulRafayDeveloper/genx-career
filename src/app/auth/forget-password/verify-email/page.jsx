"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import Link from "next/link";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email is required.");
      return;
    }

    setLoading(true);

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
        setLoading(false);
        router.push(`/auth/forget-password/verify-otp?token=${token}`);
      } else {
        toast.error(response.data.message || "Failed to send email. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error sending email:", error);
      toast.error(
        error.response?.data?.message ||
        "An error occurred. Please try again."
      );
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
      <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gray-100">
        {/* Background Image */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: "url('/images/design.png')" }}
        ></div>

        {/* Main Form Card */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
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
        </div>
        <main
          id="content"
          role="main"
          className="w-full max-w-lg p-8  relative z-10"
        >
          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-extrabold text-purple-900 font-serif ">
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
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-3 rounded-md shadow-sm border border-gray-300 focus:ring-purple-500 focus:border-purple-500 text-sm bg-gray-50"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 px-4 rounded-md text-white font-semibold transition ${loading
                ? "bg-purple-400 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
                }`}
            >
              {loading ? "Please Wait..." : "Submit"}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                href="../login"
                className="text-purple-700 hover:underline font-medium"
              >
                Login here
              </Link>
            </p>
          </div>
        </main>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-0">
          <svg
            viewBox="0 0 1440 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="block w-full h-[50vh]" // Make the wave take 50% of screen height
            style={{ transform: "translateY(30%)" }} // Shift wave upward to cover half the form
          >
            <path
              fill="white"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,192C1120,181,1280,107,1360,69.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
};

export default Page;
