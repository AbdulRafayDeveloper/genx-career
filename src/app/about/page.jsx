"use client";
import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import Link from "next/link";
import Cookies from "js-cookie";

const Page = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "How can I get started?",
      answer:
        "Getting started is easy! Sign up for an account, and you'll have access to our platform's features. No credit card required for the initial signup.",
    },
    {
      question: "What is the pricing structure?",
      answer:
        "Our pricing structure is flexible. We offer both free and paid plans. You can choose the one that suits your needs and budget.",
    },
    {
      question: "What kind of support do you provide?",
      answer:
        "We offer comprehensive customer support. You can reach out to our support team through various channels, including email, chat, and a knowledge base.",
    },
    {
      question: "Can I cancel my subscription anytime?",
      answer:
        "Yes, you can cancel your subscription at any time without any hidden fees. We believe in providing a hassle-free experience for our users.",
    },
  ];

  useEffect(() => {
    const labels = document.querySelectorAll(".label");
    const section = document.querySelector(".benefits-section");

    if (section) {
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;

      // Adjusted positions to be much closer to the center
      const positions = [
        // Closer to top center
        { top: sectionHeight - 150, left: (sectionWidth - 150) / 2 }, // Closer to bottom center
        { top: (sectionHeight - 90) / 2, left: 50 }, // Closer to left center
        { top: (sectionHeight - 90) / 2, left: sectionWidth - 180 }, // Closer to right center
        { top: (sectionHeight - 90) / 4, left: 80 }, // Closer to top-left
        { top: sectionHeight - 180, left: 80 }, // Closer to bottom-left
        { top: (sectionHeight - 90) / 4, left: sectionWidth - 180 }, // Closer to top-right
        { top: sectionHeight - 180, left: sectionWidth - 180 }, // Closer to bottom-right
      ];

      labels.forEach((label, index) => {
        if (positions[index]) {
          label.style.top = `${positions[index].top}px`;
          label.style.left = `${positions[index].left}px`;
        }
      });
    }
  }, []);

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
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/design.png')",
        }}
      ></div>

      <div className="relative z-10">
        <Header
          token={token}
          isCheckingAuth={isCheckingAuth}
          setIsCheckingAuth={setIsCheckingAuth}
        />
        <div className="flex flex-col justify-center items-center mb-12 mt-20">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-400 to-pink-500 text-stroke-black text-center">
            About
            <br /> GenX Career
          </h1>
          <p className="mt-4 text-lg text-center font-normal">
            Effortlessly Fetch, Match, and Create: Discover the Power of Job
            Tools
          </p>
          <div className="mt-12">
            <div className="scoped-container bg-white bg-opacity-40 rounded-2xl">
              <button
                onClick={() => router.push("/jobs")}
                className="px-8 py-1 border bg-white bg-opacity-70 text-[#7c53a3] hover:bg-[#a67ccd] hover:text-white"
              >
                Explore Jobs
              </button>
            </div>
          </div>
        </div>

        <div className="marquee-container mb-20 rounded-lg overflow-hidden ">
          <div className="marquee flex items-center">
            {/* Individual marquee items */}
            <div className="marquee-item mx-2">
              <img
                src="/images/image-1.svg"
                alt="GenX Career feature icon"
                className="h-28 w-28 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-2.svg"
                alt="GenX Career feature icon"
                className="h-20 w-20 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-3.svg"
                alt="GenX Career feature icon"
                className="h-36 w-36 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-4.svg"
                alt="GenX Career feature icon"
                className="h-48 w-48 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-1">
              <img
                src="/images/image-5.png"
                alt="GenX Career feature icon"
                className="h-40 w-40 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-6.svg"
                alt="GenX Career feature icon"
                className="h-48 w-48 object-contain m-12"
              />
            </div>
            {/* Duplicated marquee items */}
            <div className="marquee-item mx-2">
              <img
                src="/images/image-1.svg"
                alt="GenX Career feature icon"
                className="h-28 w-28 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-2.svg"
                alt="GenX Career feature icon"
                className="h-20 w-20 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-3.svg"
                alt="GenX Career feature icon"
                className="h-36 w-36 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-4.svg"
                alt="GenX Career feature icon"
                className="h-48 w-48 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-5.png"
                alt="GenX Career feature icon"
                className="h-40 w-40 object-contain m-12"
              />
            </div>
            <div className="marquee-item mx-2">
              <img
                src="/images/image-6.svg"
                alt="GenX Career feature icon"
                className="h-48 w-48 object-contain m-12"
              />
            </div>
          </div>
        </div>

        <div className="relative md:h-[500px] h-[600px] flex items-center justify-center mt-8 mb-4">
          {/* Background Video */}
          <video
            className="absolute top-0 left-0 w-full h-full object-cover z-[-1] opacity-50"
            autoPlay
            loop
            muted
          >
            <source
              src="/videos/4938709-hd_1920_1080_24fps.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Content */}
          <div className="flex flex-col items-center w-full h-full bg-[#7c53a380] bg-opacity-50 flex-wrap justify-center">
            <div className="p-4">
            <h1 className="text-2xl md:text-5xl lg:text-5xl font-extralight text-white mb-2 text-center mt-4 font-serif">
              Our Vision : Empowering Careers,<br></br> Simplifying Job Search
            </h1>
            <p className="text-center text-white md:mt-4 font-medium">
              Empowering job seekers with a seamless platform that bridges the{" "}
              <br />
              gap between opportunities and talents. By leveraging cutting-edge{" "}
              <br />
              technologies, we fetch job listings from multiple platforms via{" "}
              <br />
              the TheirStack API, curate them periodically, and offer advanced{" "}
              <br />
              search filters for precision job hunting.
            </p>
            </div>
          </div>
        </div>

        <div className="items-center justify-center flex flex-col mt-20 mb-20  ">
          <h1 className="text-5xl font-extralight text-purple-900 mb-2 text-center mt-4 font-serif">
            Why Choose Us
          </h1>
          <p className="text-center text-purple-400">
            Effortlessly match your skills to jobs, create a standout CV, and
            navigate the job market <br /> with confidence.
          </p>
          <div className="flex flex-wrap justify-center mt-4">
            {/* Feature Card 1 */}

            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    Comprehensive Job Listings
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Access jobs from multiple platforms, fetched and updated
                    regularly to ensure you never miss an opportunity.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    Smart Filters
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Effortlessly align your skills and experience with the
                    perfect job opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    Resume Matching
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Effortlessly align your skills and experience with the
                    perfect job opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    User-Friendly Experience
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Effortlessly align your skills and experience with the
                    perfect job opportunities.
                  </p>
                </div>
              </div>
            </div>
            {/* Feature Card 2 */}
            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    Free of Cost
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Effortlessly align your skills and experience with the
                    perfect job opportunities.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    Guidance & Support
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Effortlessly align your skills and experience with the
                    perfect job opportunities.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="benefits-section">
          <h1 className="section-heading flex items-center justify-center">
            Who can Use <br />
            GenX Career
          </h1>

          <div className="floating-labels opacity-50">
            <div className="label">
              <span>Frontend Developer</span>
            </div>
            <div className="label">
              <span>Backend Developer</span>
            </div>
            <div className="label">
              <span>Full-Stack Developer</span>
            </div>
            <div className="label">
              <span>Data Scientist</span>
            </div>
            <div className="label">
              <span>Artifical Intelligence Engineer</span>
            </div>
            <div className="label">
              <span>Network Engineer</span>
            </div>
          </div>
        </section>
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-5xl font-extralight text-purple-900 mb-2 text-center mt-4 font-serif">
                Explore Common Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="transition-all duration-200 bg-gray-100 bg-opacity-25 border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-300 rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6 "
                  >
                    <span className="flex text-lg font-semibold text-purple-700">
                      {item.question}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`w-6 h-6 text-purple-700 transform ${
                        openQuestion === index ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                  {openQuestion === index && (
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 text-base mt-9">
              Still have questions?{" "}
              <Link
                href={"/contact"}
                className="cursor-pointer font-medium text-tertiary transition-all duration-200 hover:text-tertiary focus:text-tertiary hover-underline"
              >
                Contact our support
              </Link>
            </p>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Page;
