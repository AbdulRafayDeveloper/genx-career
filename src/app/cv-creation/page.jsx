"use client";
import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Cookies from "js-cookie";
import axios from "axios";
import Link from "next/link";
import Footer from "../components/footer/Footer";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Image from "next/image";

const Page = () => {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();
  const [templates, setTemplates] = useState([]);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedToken = Cookies.get("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-templates`
        );

        console.log("Data response:", response);

        if (response.status !== 200) {
          console.log("Error fetching tendata:", response.data.message);
          toast.error(
            response.data.message ||
              "Some Issue in Loading the templates right now. Please try again later"
          );
          return;
        }

        setTemplates(response.data.data || []);
      } catch (error) {
        console.log("Error fetching template data:", error);
        toast.error(
          error.message ||
            "Some Issue in Loading the templates right now. Please try again later"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative">
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/bg/bg.jpg')",
        }}
      ></div>
      <div className="relative z-10 scrollbar-hidden">
        <Header
          token={token}
          isCheckingAuth={isCheckingAuth}
          setIsCheckingAuth={setIsCheckingAuth}
        />
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col text-lg justify-center items-center">
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-8 h-8 text-purple-600 animate-spin "
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
              <p className="mt-4 text-lg text-purple-600">Loading...</p>
            </div>
          </div>
        )}

        <div className="flex  w-screen flex-col">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-[1200px] mx-auto px-6 py-6 lg:mt-2 gap-10 sm:mt-20">
            {/* Left Column */}
            <div className="flex flex-col justify-center items-center text-center lg:w-1/2 space-y-6">
              <h1 className="xl:text-7xl lg:text-6xl md:text-4xl text-3xl font-sans font-extrabold  bg-clip-text text-white">
                Professional CV Builder
              </h1>

              <p className="text-white text-lg md:text-xl font-sans leading-relaxed px-2">
                Only 2% of resumes win. Yours will be one of them. Let’s build
                you a resume that works.
              </p>

              <div className=" bg-opacity-40 rounded-2xl w-fit p-4">
                <button
                  onClick={() => {
                    const section =
                      document.getElementById("cvCreationSection");
                    section?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="px-8 py-1 bg-black rounded-lg text-white hover:bg-white hover:text-black"
                >
                  Build my CV
                </button>
              </div>
            </div>

            {/* Right Column (Image) */}
            <div className="lg:w-1/2 w-full flex justify-center items-center">
              <img
                src="/images/B.png"
                alt="Decorative background"
                className="max-w-full h-auto object-contain"
              />
            </div>
          </div>

          {/*Next section */}
          <div className="w-full h-8" id="cvCreationSection">
            {/* Section with Background Image */}
            <div
              className=" bg-cover bg-center flex flex-col text-white"
              style={{ backgroundImage: "url('/images/bg.png')" }}
            >
              {/* Section Content */}
              <div className="flex flex-col pt-12 items-center h-full bg-black bg-opacity-30 pb-12">
                <p className="xl:text-5xl lg:text-4xl md:text-3xl text-lg font-bold font-sans text-purple-100 text-center">
                  CV TEMPLATES FOR <br />
                  LANDING A PERFECT JOB
                </p>
                <p className="text-center xl:text-lg md:text-lg text-[11px] font-sans pt-6">
                  Just pick a template and enter your data. It&apos;s THAT easy
                  to use, <br />
                  even if you&apos;ve never made a resume in your life before!
                </p>

                {/* Cards Section */}
                <div className="flex flex-row justify-center ">
                  <div className="flex flex-wrap justify-center gap-6 mt-10">
                    {templates?.records && templates.records.length > 0 ? (
                      templates.records.map((template, index) => (
                        <>
                          <div className="">
                            <div
                              key={index}
                              className="w-80 bg-white border border-gray-200 rounded-lg shadow-sm relative p-4"
                            >
                              <Image
                                className="rounded-t-lg w-full h-[450px] object-cover"
                                width={400}
                                height={450}
                                src={
                                  template.imageUrl
                                    ? `${template.imageUrl}`
                                    : "/images/resume1.png"
                                }
                                alt={template.name}
                              />
                              <Link
                                href={`/cv-creation/${template.name}`}
                                className="absolute bottom-5 left-1/2 font-sans transform -translate-x-1/2 px-8 py-2 border bg-opacity-70 bg-[#a67ccd] text-white rounded-lg shadow-md hover:bg-opacity-100"
                              >
                                Build My CV
                              </Link>
                            </div>
                          </div>
                        </>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center bg-white bg-opacity-70 rounded-lg p-8 w-[500px] shadow-lg mt-10">
                        <img
                          src="/images/B.png"
                          alt="No templates available image"
                          className="w-52 h-64 mb-4"
                        />
                        <h2 className="text-2xl font-semibold text-purple-900">
                          No CV Templates Available
                        </h2>
                        <p className="text-gray-600 mt-2 text-center font-sans">
                          Currently, there are no resume templates available.{" "}
                          <br /> Please check back later or contact support if
                          you think this is an error.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="w-full h-8 mt-6">
                  <svg
                    viewBox="0 0 1440 100"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                      className="fill-current text-gray-50"
                    ></path>
                  </svg>
                  <div className="bg-gray-50 pt-6 pb-20 flex flex-col justify-center items-center">
                    <p className="xl:text-5xl lg:text-4xl font-sans  md:text-3xl text-3xl font-bold text-purple-950 text-center pb-6">
                      WHY CHOOSE US?
                    </p>
                    <div className="flex xl:flex-row lg:flex-row md:flex-row flex-col justify-center items-center gap-12 mt-10">
                      <div className="flex flex-col items-center ">
                        <img
                          className="w-24 h-24
                           object-cover"
                          src="/images/kite.png"
                          alt="Kite Logo"
                        />
                        <p className="text-2xl font-sans text-purple-950 text-center mt-4">
                          Free and premium
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          className="w-24 h-24 object-cover"
                          src="/images/creative.png"
                          alt="Creative Logo"
                        />
                        <p className="text-2xl font-sans text-purple-950 text-center mt-4">
                          Creative and stylish <br /> templates
                        </p>
                      </div>
                      <div className="flex flex-col items-center">
                        <img
                          className="w-24 h-24 object-cover"
                          src="/images/fee.png"
                          alt="Fee Logo"
                        />
                        <p className="text-2xl font-sans text-purple-950 text-center mt-4">
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
