"use client";
import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faMailForward, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/footer/Footer";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/contactus`, formData);

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
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: "url('/images/design.png')" }}
      ></div>
      <div className="relative z-10">
        <Header />
        <div className="flex flex-col justify-center items-center min-h-screen mt-8">
          <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Left Column */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-purple-900 pb-6">Get in Touch</h2>
                <p className="text-gray-700 text-lg">
                  Have questions or feedback? We are here to help! Our dedicated support team is just a click away, ready to assist you on your journey.
                </p>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faPhone} className="text-purple-700" />
                  <p className="text-gray-700 text-lg font-semibold">111-222-333</p>
                </div>
                <div className="flex items-center space-x-4">
                  <FontAwesomeIcon icon={faMailForward} className="text-purple-700" />
                  <p className="text-gray-700 text-lg font-semibold">genx@gmail.com</p>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-2xl font-bold text-purple-900 mb-10">Contact Us</h3>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {/* Name Field */}
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      required
                    />
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-lg font-medium text-gray-700">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      placeholder="Your Message"
                      rows="4"
                      className="mt-1 block w-full rounded-md border-purple-300 shadow-sm focus:ring-purple-500 focus:border-purple-500"
                      required
                    ></textarea>
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
                        <span className="spinner-border animate-spin inline-block w-4 h-4 border-4 border-purple-600 rounded-full"></span>
                      ) : (
                        <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
                      )}
                      <p className="text-white text-lg font-semibold">Send Message</p>
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

export default Home;
