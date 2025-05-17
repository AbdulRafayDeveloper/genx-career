"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faMailForward,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/footer/Footer";
import Cookies from "js-cookie";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }

    setErrors({});

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact-us`,
        formData
      );

      console.log("response: ", response);
      console.log("response.status: ", response.status);
      console.log("response.data.status: ", response.data.status);

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
        });
        e.target.reset();
      }
    } catch (error) {
      console.log("error: ", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, []);

  const validateForm = (formData) => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Please enter a valid name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    } else if (formData.name.trim().length > 30) {
      newErrors.name = "Name must be at most 30 characters.";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email format.";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Please enter a message.";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters.";
    } else if (formData.message.trim().length > 200) {
      newErrors.message = "Message must be less than 200 characters.";
    }

    return newErrors;
  };



  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/design.png')" }}
      ></div>
      <div className="relative z-10">
        <Header
          token={token}
          isCheckingAuth={isCheckingAuth}
          setIsCheckingAuth={setIsCheckingAuth}
        />
        <div className="flex flex-col justify-center items-center min-h-screen mt-14 p-5 mb-10">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-purple-900 pb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-700 text-lg">
                  Have questions or feedback? We are here to help! Our dedicated
                  support team is just a click away, ready to assist you on your
                  journey.
                </p>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faPhone} className="text-purple-700 size-4" />
                  <p className="text-gray-700 text-lg font-semibold">
                    111-222-333
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon
                    icon={faMailForward}
                    className="text-purple-700 size-4"
                  />
                  <p className="text-gray-700 text-lg font-semibold">
                    genxcareer@gmail.com
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-10">
                  Contact Us
                </h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Name
                    </label>
                    <div className="relative">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5"
                      >
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
                      </svg>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Arooba Zaman"
                        className="mt-1 pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 outline-none"
                        required
                      />

                    </div>
                    {errors.name && (
                      <span className="text-red-500 text-sm">{errors.name}</span>
                    )}
                  </div>


                  {/* Email Field */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <div className="relative">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="absolute left-3 top-1/2 transform -translate-y-1/2 fill-gray-400 w-4 h-5">
                        <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" /></svg>
                      <input
                        type="email"
                        id="email"
                        name="genxcareer@gmail.com"
                        placeholder="genxcareer@gmail.com"
                        className="mt-1 pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 outline-none"
                        required
                      />
                    </div>
                    {errors.email && (
                      <span className="text-red-500 text-sm">{errors.email}</span>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Write a message here..."
                      rows="4"
                      className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring-1 focus:ring-purple-500 p-2 outline-none"
                      required
                    ></textarea>
                    {errors.message && (
                      <span className="text-red-500 text-sm">{errors.message}</span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className={`w-full bg-purple-500 text-white py-2 px-4 rounded-md transition ${loading ? "cursor-not-allowed bg-purple-300" : "hover:bg-purple-800"
                      }`}
                    disabled={loading}
                  >
                    <div className="flex items-center justify-center space-x-4">
                      {loading ? (
                        <>
                          <p className="text-white text-lg font-semibold">Please wait</p>
                          <span className="animate-spin inline-block w-4 h-4 border-2 border-t-transparent border-white rounded-full"></span>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon icon={faPaperPlane} className="text-white size-4" />
                          <p className="text-white text-lg font-semibold">Send Message</p>
                        </>
                      )}
                    </div>
                  </button>


                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
