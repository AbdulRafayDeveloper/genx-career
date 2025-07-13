"use client";
import Header from "../header/Header";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleRight } from "@fortawesome/free-solid-svg-icons";
import Footer from "../footer/Footer";
import Cookies from "js-cookie";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const labels = document.querySelectorAll(".label");
    const section = document.querySelector(".benefits-section");

    if (section) {
      const sectionWidth = section.offsetWidth;
      const sectionHeight = section.offsetHeight;

      // Adjusted positions to be much closer to the center
      const positions = [
        { top: (sectionHeight - 90) / 4, left: (sectionWidth - 150) / 2 }, // Closer to top center
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

  const testimonialSlides = [
    {
      quote:
        '"Flowbite is just awesome. It contains tons of predesigned components and pages starting from login screen to complex dashboard. Perfect choice for your next SaaS application."',
      name: "Micheal Gough",
      position: "CEO at Google",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png",
    },
    {
      quote:
        '"A fantastic platform that helps businesses and job seekers connect quickly. It’s like having a personal assistant for recruitment."',
      name: "Sarah Lee",
      position: "HR Manager at Facebook",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png",
    },
    {
      quote:
        '"An amazing tool that saves us so much time in hiring. We can easily find the right talent and get started with the process faster."',
      name: "John Doe",
      position: "CTO at Apple",
      image:
        "https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/michael-gough.png",
    },
  ];

  // Automatically change slides every 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % testimonialSlides.length);
    }, 5000); // Change every 5 seconds

    return () => clearInterval(slideInterval); // Clean up the interval on component unmount
  }, [testimonialSlides.length]);

  const slides = [
    {
      title: "Job Finding",
      description: [
        "Navigate the job market with confidence. Discover the best-suited roles for your skills, apply with ease, and track your applications seamlessly.",
        "Enter keywords or apply filters to find relevant job postings.",
        "Browse through jobs fetched from multiple platforms.",
        "Fine-tune results by location, experience, or salary.",
        "View personalized job suggestions based on your profile.",
        "Submit applications to suitable job postings seamlessly.",
      ],
      image: "/bg/job_finding.PNG",
    },
    {
      title: "CV Matching",
      description: [
        "Effortlessly align your skills and experience with the perfect job opportunities using advanced CV matching technology.",
        "Upload your CV in PDF or Word format.",
        "Select a job posting from the list of fetched jobs.",
        "Click 'Match CV' to analyze how well your CV aligns with the selected job.",
        "Review feedback and suggestions to improve your CV.",
        "Update your CV and recheck the match to maximize compatibility.",
      ],
      image: "/bg/cv_matching.PNG",
    },
    {
      title: "CV Generation",
      description: [
        "Create a professional CV in minutes with customizable templates that highlight your strengths and achievements.",
        "Choose a professional CV template from our collection.",
        "Fill in your personal details, work experience, education, and skills.",
        "Add optional sections like certifications, achievements, or hobbies.",
        "Preview your CV and make final adjustments.",
        "Download your polished CV in PDF format.",
      ],
      image: "/bg/cv_creation.PNG",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds
    return () => clearInterval(interval);
  }, [slides.length]);

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = Cookies.get("genx_access_token");
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
          // backgroundImage: "url('/images/design.png')",
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
          <h1 className="text-8xl font-extrabold bg-clip-text text-center text-white">
            {/* Desktop view (md and up) */}
            <span className="hidden md:block">
              Revolutionize
              <br /> Job Hunt with GenX <br />
              Career
            </span>

            {/* Mobile view (below md) */}
            <span className="block md:hidden text-8xl">GenX Career</span>
          </h1>

          <p className="mt-4 text-lg text-center font-normal text-white pl-2 pr-2">
            {/* Desktop version */}
            <span className="">
              Effortlessly Fetch, Match, and Create: Discover the Power of Job
              Tools
            </span>
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

        <div className="marquee-container mt-20 mb-20 rounded-lg overflow-hidden ">
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

        <div className=" items-center justify-center flex flex-col mt-8 mb-4 bg-[#7c53a380] bg-opacity-50 pb-6">
          <h1 className="text-5xl  font-extralight text-white mb-2 text-center mt-4">
            Our Features
          </h1>

          <p className="text-center text-white text-sm md:text-base lg:text-base pl-2 pr-2">
            Match skills to jobs, create a standout CV, navigate the job market
          </p>

          <div className="flex flex-wrap justify-center mt-4">
            {/* Feature Card 1 */}
            <div className="p-4 max-w-sm">
              <div className="relative feature-card h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    Job Finding
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]"></p>
                  <p className=" text-[#595959] text-sm md:text-base pl-2 pr-2">
                    {/* Short version for small screens */}
                    <span className="block md:hidden">
                      Discover roles that match your skills. Apply quickly and
                      track your progress with ease.
                    </span>

                    {/* Full version for medium and up */}
                    <span className="hidden md:block">
                      Navigate the job market with confidence. Discover the
                      best-suited roles for your skills, apply with ease, and
                      track your applications seamlessly. Empower your job
                      search journey with tools designed to land your dream
                      role.
                    </span>
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/jobs"
                    className="text-black hover:text-[#9866C7] inline-flex items-center"
                  >
                    Get Started
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 max-w-sm">
              <div className="relative feature-card h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    CV Matching
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]"></p>
                  <p className=" text-[#595959] text-sm md:text-base pl-2 pr-2">
                    {/* Short version for small screens */}
                    <span className="block md:hidden">
                      Get job recommendations that align perfectly with your CV
                      and goals.
                    </span>

                    {/* Full version for medium and up */}
                    <span className="hidden md:block">
                      Effortlessly align your skills and experience with the
                      perfect job opportunities. Our advanced CV matching
                      technology analyzes your profile and recommends positions
                      tailored to your expertise and aspirations. Stand out from
                      the crowd and save time in your job search.
                    </span>
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/jobs"
                    className="text-black hover:text-[#9866C7] inline-flex items-center"
                  >
                    Get Started
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature Card 2 */}
            <div className="p-4 max-w-sm">
              <div className="relative feature-card h-[400px] flex flex-col justify-between bg-white shadow-lg rounded-lg hover:bg-gray-100">
                <div className="flex items-center mb-5">
                  <h2 className="text-[#595959] text-xl font-medium">
                    CV Generation
                  </h2>
                </div>
                <div className="flex-grow">
                  <p className="leading-relaxed text-base text-[#595959]"></p>
                  <p className=" text-[#595959] text-sm md:text-base pl-2 pr-2">
                    {/* Short version for small screens */}
                    <span className="block md:hidden">
                      Build a standout CV using customizable templates that
                      highlight your strengths.
                    </span>

                    {/* Full version for medium and up */}
                    <span className="hidden md:block">
                      Create a professional, visually appealing CV in minutes.
                      Customize templates designed to showcase your strengths
                      and achievements. Let our smart tool help you craft a CV
                      that gets noticed by employers and highlights your career
                      potential.
                    </span>
                  </p>
                </div>
                <div className="mt-5">
                  <Link
                    href="/cv-creation"
                    className="text-black hover:text-[#9866C7] inline-flex items-center "
                  >
                    Get Started
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" pt-12">
          <h1 className="text-5xl font-extralight text-white mb-10 text-center ">
            How It Works
          </h1>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Large Image Section */}
            <div className="lg:w-1/2 w-full h-full md:block hidden">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="rounded-lg shadow-lg controls object-cover object-right h-[500px] w-full"
              />
            </div>

            {/* Slider Section */}
            <div className="lg:w-1/2 w-full relative flex ">
              <div className="h-[600px] bg-transparent overflow-hidden flex">
                {slides.map((slide, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 p-8 transition-opacity duration-500 ${
                      currentSlide === index ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <h2 className="text-3xl font-semibold text-white mb-4">
                      {slide.title}
                    </h2>
                    <div className="text-lg text-white mb-6">
                      {/* Display each description item on a new line with arrow */}
                      {slide.description.map((point, i) => (
                        <div key={i} className="flex items-start mb-4">
                          <span className="text-[#9866C7] mr-3">
                            <FontAwesomeIcon icon={faArrowAltCircleRight} />
                          </span>
                          <p>{point}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Dots at the Bottom */}
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
                How we stand out in world
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
                  title: "Platform Integration",
                  description:
                    "Seamlessly connect with various job platforms for maximum reach.",
                },
                {
                  title: "Periodic Updates",
                  description:
                    "Keep your data fresh with scheduled and automated updates.",
                },
                {
                  title: "Data Storage",
                  description:
                    "Securely store job listings and user information with scalable storage.",
                },
                {
                  title: "Advanced Filters",
                  description:
                    "Quickly refine job search with powerful filtering options.",
                },

                {
                  title: "CV Matching",
                  description:
                    "Accurately match CVs with job listings using AI-powered algorithms.",
                },
                {
                  title: "Job Fit",
                  description:
                    "Evaluate job suitability based on candidate CV and job criteria.",
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

        {/*<section className="flex items-center justify-center bg-opacity-25  ">
          <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-6">
            <figure className="max-w-screen-md mx-auto p-8 bg-white bg-opacity-40 rounded-xl shadow-lg transform transition duration-500 hover:scale-105">
              <svg
                className="h-12 mx-auto mb-3 text-white"
                viewBox="0 0 24 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.017 18L14.017 10.609C14.017 4.905 17.748 1.039 23 0L23.995 2.151C21.563 3.068 20 5.789 20 8H24V18H14.017ZM0 18V10.609C0 4.905 3.748 1.038 9 0L9.996 2.151C7.563 3.068 6 5.789 6 8H9.983L9.983 18L0 18Z"
                  fill="currentColor"
                />
              </svg>
             
              <blockquote>
                <p className="text-2xl font-medium text-white animate__animated animate__fadeIn animate__delay-1s">
                  {testimonialSlides[currentSlide].quote}
                </p>
              </blockquote>
              <figcaption className="flex items-center justify-center mt-6 space-x-3">
                <img
                  className="w-16 h-16 rounded-full border-4 border-white shadow-md transform transition duration-500 hover:scale-110"
                  src={testimonialSlides[currentSlide].image}
                  alt="profile picture"
                />
                <div className="flex items-center divide-x-2 divide-gray-500">
                  <div className="pr-3 font-medium text-white">
                    {testimonialSlides[currentSlide].name}
                  </div>
                  <div className="pl-3 text-sm font-light text-white">
                    {testimonialSlides[currentSlide].position}
                  </div>
                </div>
              </figcaption>
            </figure>
            <div className="flex justify-center mt-8">
              {testimonialSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)} // Function to set the current slide
                  className={`w-3 h-3 mx-2 rounded-full ${
                    currentSlide === index ? "bg-purple-900" : "bg-gray-400"
                  } transition-all duration-300`}
                />
              ))}
            </div>
          </div>
        </section>*/}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
