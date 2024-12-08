"use client";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative w-full bg-purple-700 bg-opacity-50 text-gray-600 py-10">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          {/* Left Section */}
          <div className="md:col-span-3">
            <h5 className="text-2xl font-bold text-white">GenX Career</h5>
            <p className="mt-4 text-white text-xl">
              Empowering your career journey with seamless job finding, advanced
              CV matching, and professional CV generation tools. Discover
              opportunities, match your skills, and create resumes effortlessly.
            </p>
          </div>

          <div className="md:col-span-1"></div>

          {/* Middle Section */}
          <div className="md:col-span-1">
            <h6 className="text-2xl font-semibold text-white mb-4">
              Navigate To
            </h6>
            <ul>
              <li>
                <Link
                  href="/about"
                  className="text-white text-xl hover:text-purple-700 transition"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-white text-xl hover:text-purple-700 transition"
                >
                  Find Jobs
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white text-xl hover:text-purple-700 transition"
                >
                  CV Creation
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white text-xl hover:text-purple-700 transition"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="md:col-span-1">
            <h6 className="text-xl font-semibold text-white hover:text-purple-700 mb-4">
              Follow Us
            </h6>
            <div className="flex space-x-4">
              <Link
                href="#"
                className="text-white text-xl hover:text-purple-700 transition"
                aria-label="Facebook"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
