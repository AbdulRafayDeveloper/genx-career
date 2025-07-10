"use client";
import Header from "../components/header/Header";
import { useState, useEffect } from "react";
import Footer from "../components/footer/Footer";
import Link from "next/link";
// import Cookies from "js-cookie";

const Page = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  const questions = [
    {
      question: "How do I start using GenX Career?",
      answer:
        "Getting started with GenX Career is simple. Just sign up for a free account to instantly access job search, CV matching, and professional CV creation tools. No credit card required.",
    },
    {
      question: "What makes GenX Career different from other job platforms?",
      answer:
        "GenX Career combines advanced job fetching from top sources, intelligent CV-to-job matching, and professional CV generation — all in one place. This unique combination increases your chances of landing the right job efficiently.",
    },
    {
      question: "Is the CV matching feature free?",
      answer:
        "Yes! Our CV matching tool is completely free. You can upload your CV to see how well it aligns with specific job postings, identify gaps, and receive personalized suggestions to improve your chances.",
    },
    {
      question: "Can I generate a CV on GenX Career?",
      answer:
        "Absolutely. GenX Career offers a built-in CV generator with modern, professional templates designed to help you stand out in the job market.",
    },
    {
      question: "How often are job listings updated?",
      answer:
        "We continuously fetch and update jobs from top platforms like Glassdoor and Indeed to ensure you're seeing the latest opportunities. Outdated postings are regularly removed to keep listings fresh and relevant.",
    },
    {
      question: "What support options are available if I face issues?",
      answer:
        "Our support team is here to help! You can reach us anytime through our contact page or email. Additionally, we provide detailed guidelines and an up-to-date FAQ section to assist you throughout your journey.",
    },
    {
      question: "Can recruiters benefit from GenX Career?",
      answer:
        "Yes. Our CV matching and filtering tools allow recruiters to connect directly with the most relevant candidates, saving time and effort by avoiding manual screening of irrelevant applications.",
    },
    {
      question: "Is my data safe on GenX Career?",
      answer:
        "We take data privacy seriously. Your personal information and documents are securely stored and never shared without your consent, in compliance with the latest data protection standards.",
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
    const storedToken = localStorage.getItem("genx_access_token");
    // const storedToken = Cookies.get("genx_access_token");
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
          backgroundImage: "url('/bg/bg.jpg')",
        }}
      ></div>

      <div className="relative z-10">
        <Header
          token={token}
          isCheckingAuth={isCheckingAuth}
          setIsCheckingAuth={setIsCheckingAuth}
        />
        <div className="flex flex-col justify-center items-center mb-16 mt-28">
          <h1 className="text-8xl font-extrabold text-transparent bg-clip-text   text-center text-white">
            About
            <br /> GenX Career
          </h1>
          <p className="mt-4 text-lg text-center font-normal text-white">
            Effortlessly Fetch, Match, and Create: Discover the Power of Job
            Tools
          </p>
          <div className="mt-12">
            <div className="bg-black bg-opacity-40 rounded-lg">
              <button
                onClick={() => (window.location.href = "/jobs")}
                className="px-8 py-1 bg-black rounded-lg text-white hover:bg-white hover:text-black bg-opacity-50"
              >
                <Link href="/jobs" className="whitespace-nowrap">
                  Explore Jobs
                </Link>
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
              <h1 className="text-2xl md:text-5xl lg:text-5xl font-extralight text-white mb-2 text-center mt-4 ">
                Our Vision : Empowering Careers,<br></br> Simplifying Job Search
              </h1>
              <p className="text-center text-white md:mt-4 font-medium">
                Empowering job seekers with a seamless platform that bridges the{" "}
                <br />
                gap between opportunities and talents. By leveraging
                cutting-edge <br />
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
          <h1 className="text-5xl font-extralight text-purple-200 mb-2 text-center mt-4 ">
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
                    Narrow your job search using intuitive filters such as
                    country, posting date, and remote availability to find your
                    perfect fit.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-4 max-w-sm">
              <div className="relative feature-card2 h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    CV Matching
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]">
                    Instantly match your resume with jobs that align with your
                    skills, experience, and interests using intelligent matching
                    algorithms.
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
                    Enjoy a smooth, intuitive interface designed to make job
                    searching, CV creation, and CV matching .
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
                    All features including job search, CV builder, and guidance
                    are completely free — no hidden fees or subscriptions.
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
                    Get support and career tips to craft compelling applications
                    after matching CV and boost your chances of landing your
                    dream job.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="py-16 sm:py-24 px-4 sm:px-8 lg:px-16 relative overflow-hidden">
          {/* Background Image Layer */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/bg/benefits.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              opacity: 0.5,
            }}
          ></div>

          {/* Foreground Content Layer */}
          <div className="relative z-10 flex flex-col lg:flex-row gap-10 items-center justify-between">
            {/* Left side content */}
            <div className="p-10 rounded-2xl w-full lg:w-1/2">
              <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 leading-snug">
                Who can use our services?
              </h2>
              <p className="text-white mb-8">
                Offering unique features and benefits that are tailored to your
                needs.
              </p>
            </div>

            {/* Right side features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full lg:w-1/2">
              {[
                {
                  title: "Frontend Developers",
                  description:
                    "Seamlessly connect with various job platforms for maximum reach.",
                },
                {
                  title: "Backend Developers",
                  description:
                    "Keep your data fresh with scheduled and automated updates.",
                },
                {
                  title: "Full-Stack Developer",
                  description:
                    "Securely store job listings and user information with scalable storage.",
                },
                {
                  title: "Data Scientist",
                  description:
                    "Quickly refine job search with powerful filtering options.",
                },
                {
                  title: "Artifical Intelligence Engineer",
                  description:
                    "Personalized suggestions on matching jobs and CV to help improve.",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 rounded-lg">
                    <svg
                      className="w-6 h-6 text-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-300 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <section className="py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="text-5xl font-extralight text-purple-200 mb-2 text-center mt-4 ">
                Explore Common Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto mt-8 space-y-4 md:mt-16">
              {questions.map((item, index) => (
                <div
                  key={index}
                  className="transition-all duration-200 bg-gray-100 bg-opacity-25 border border-gray-200 shadow-lg cursor-pointer hover:bg-gray-800 rounded-2xl hover:bg-opacity-50"
                >
                  <button
                    type="button"
                    onClick={() => toggleQuestion(index)}
                    className="flex items-center justify-between w-full px-4 py-5 sm:p-6 "
                  >
                    <span className="flex text-lg font-semibold text-white">
                      {item.question}
                    </span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className={`w-6 h-6 text-white transform ${
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
                    <div className="px-4 pb-5 sm:px-6 sm:pb-6 text-white">
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-300 text-base mt-9">
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
