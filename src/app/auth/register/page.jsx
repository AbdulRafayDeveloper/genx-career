"use client";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
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
        style={{ backgroundImage: "url('/images/design.png')" }}
      ></div>
      <div className="font-[sans-serif] relative z-10">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-5xl w-full">
            <button
              onClick={() => router.push("/")}
              className="absolute top-6 left-6 p-4 bg-white bg-opacity-80 rounded-full text-purple-600 font-semibold hover:underline"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="w-6 h-6"
              ></FontAwesomeIcon>
            </button>
            <div>
              <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px] text-purple-900 font-serif">
                Seamless Register For Exclusive Access
              </h2>
              <p className="text-sm mt-6 text-gray-800">
                Immerse yourself in a hassle-free login journey with our
                intuitively designed login form. Effortlessly access your
                account.
              </p>
              <p className="text-sm mt-12 text-gray-800">
                Already have an account?{" "}
                <a
                  href="/auth/login"
                  className="text-purple-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </a>
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="max-w-md md:ml-auto w-full"
            >
              <h3 className="text-purple-900 font-serif text-3xl font-extrabold mb-8">
                Register
              </h3>

              <div className="space-y-4">
                <div>
                  <input
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Name"
                  />
                </div>
                <div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Email address"
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Password"
                  />
                </div>
                <div>
                  <input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 bg-opacity-40 w-full text-sm text-gray-800 px-4 py-3.5 rounded-md outline-purple-600 focus:bg-transparent"
                    placeholder="Confirm Password"
                  />
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
