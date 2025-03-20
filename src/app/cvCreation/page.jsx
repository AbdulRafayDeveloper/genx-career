"use client";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import Link from "next/link";
import Footer from "../components/footer/Footer";

const Page = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, []);

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/design.png')",
        }}
      ></div>
      <div className="relative z-10 scrollbar-hidden">
        <Header
          token={token}
          isCheckingAuth={isCheckingAuth}
          setIsCheckingAuth={setIsCheckingAuth}
        />

        <div className="flex h-screen w-screen flex-col">
          <div className="flex flex-col lg:flex-row px-4 w-full bg-opacity-50 justify-center pl-12 pr-12">
            {/* Left Column (Rating) */}
            <div className="flex-grow lg:w-[700px] max-h-screen overflow-y-auto p-4 pr-12 pb-12 scrollbar-hidden pl-12 mt-28">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-2 items-center">
                  <div className="w-2 h-2 bg-purple-900 rounded-full animate-ping">
                    {" "}
                  </div>
                  <p className="font-light">10 cvs created today</p>
                </div>

                <h1 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500 text-stroke-black">
                  Professional cv builder
                </h1>

                <p className="text-purple-950 text-xl font-normal pt-8">
                  Only 2% of resumes win. Yours will be one of them. Let´s build
                  you a resume that works.
                </p>

                <div className="scoped-container  bg-opacity-40 rounded-2xl w-fit p-4">
                  <button className="px-8 py-1 border bg-white bg-opacity-70 text-[#7c53a3] hover:bg-[#a67ccd] hover:text-white">
                    Build my cv
                  </button>
                </div>
              </div>
            </div>
            <div className="flex-grow lg:w-[850px] max-h-screen overflow-hidden p-4 pr-12 pb-12 scrollbar-hidden pl-12 relative mt-12">
              <img
                src="/images/B.png"
                className="w-[1000px] h-100 object-cover right-40 scale-110"
                alt=""
              />
            </div>
          </div>
          {/*Next section */}
          <div className="w-full h-8">
            {/* Section with Background Image */}
            <div
              className=" bg-cover bg-center flex flex-col text-white"
              style={{ backgroundImage: "url('/images/bg.png')" }}
            >
              {/* Section Content */}
              <div className="flex flex-col pt-12 items-center h-full bg-black bg-opacity-30 pb-12">
                <p className="text-5xl font-bold text-purple-100 text-center">
                  CV TEMPLATES FOR <br />
                  LANDING A PERFECT JOB
                </p>
                <p className="text-center text-lg font-normal pt-6">
                  Just pick a template and enter your data. It's THAT easy to
                  use, <br />
                  even if you've never made a resume in your life before!
                </p>

                {/* Cards Section */}
                <div className="flex flex-row justify-center gap-6 mt-10">
                  {/* Card 1 */}
                  <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm relative">
                    {/* Image */}
                    <img
                      className="rounded-t-lg w-full h-[450px] object-cover"
                      src="/images/resume_1.png"
                      alt="Resume Template"
                    />

                    {/* Button Overlay */}
                    <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-8 py-2 border  bg-opacity-70  bg-[#a67ccd] text-white rounded-lg shadow-md hover:bg-opacity-100">
                      Build My CV
                    </button>
                  </div>

                  {/* Card 2 */}
                  <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm relative">
                    {/* Image */}
                    <img
                      className="rounded-t-lg w-full h-[450px] object-cover"
                      src="/images/resume_2.jpeg"
                      alt="Resume Template"
                    />

                    {/* Button Overlay */}
                    <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-8 py-2 border  bg-opacity-70  bg-[#a67ccd] text-white rounded-lg shadow-md hover:bg-opacity-100">
                      Build My CV
                    </button>
                  </div>

                  {/* Card 3 */}
                  <div className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm relative">
                    {/* Image */}
                    <img
                      className="rounded-t-lg w-full h-[450px] object-cover"
                      src="/images/resume_3.jpg"
                      alt="Resume Template"
                    />

                    {/* Button Overlay */}
                    <button className="absolute bottom-5 left-1/2 transform -translate-x-1/2 px-8 py-2 border  bg-opacity-70  bg-[#a67ccd] text-white rounded-lg shadow-md hover:bg-opacity-100">
                      Build My CV
                    </button>
                  </div>
                </div>
                <div class="w-full h-8 mt-6">
                  <svg
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                      class="fill-current text-gray-50"
                    ></path>
                  </svg>
                  <div className="bg-gray-50 pt-6 pb-20 flex flex-col items-center justify-center">
                    <p className="text-5xl font-bold text-purple-950 text-center pb-6">
                      WHY CHOOSE US?
                    </p>
                    <div className="flex justify-center items-start gap-12 mt-10">
                      <div className="flex flex-col items-center">
                        <img
                          className="w-24 h-24
                           object-cover"
                          src="/images/kite.png"
                          alt="Free"
                        />
                        <p className="text-2xl font-light text-purple-950 text-center mt-4">
                          Free and premium
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          className="w-24 h-24 object-cover"
                          src="/images/creative.png"
                          alt="Creative"
                        />
                        <p className="text-2xl font-light text-purple-950 text-center mt-4">
                          Creative and stylish <br /> templates
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          className="w-24 h-24 object-cover"
                          src="/images/fee.png"
                          alt="Fee"
                        />
                        <p className="text-2xl font-light text-purple-950 text-center mt-4">
                          No hidden fees
                        </p>
                      </div>
                    </div>
                  </div>
                  <Footer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
