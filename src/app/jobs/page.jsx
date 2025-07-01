"use client";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faL, faSliders } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/footer/Footer";
import defaultJobPic from "../../../public/images/ats_friendly.png";

const Page = () => {
  const router = useRouter();
  // const token = Cookies.get("access_token");
  const userId = Cookies.get("userId");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);
  // mobile view
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMobile, setIsMobile] = useState(false);
  const [showJobDetail, setShowJobDetail] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalenderModalOpen, setCalenderIsModalOpen] = useState(false);
  const [jobsPost, setJobs] = useState([]);
  const [totalJobsCount, setTotalJobsCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [isModalMatchOpen, setModalMatchOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchJob, setMatchJob] = useState();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    search: "",
    location: "",
    remote: false,
    datePosted: null,
    minSalary: null,
    maxSalary: null,
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?search=${formData.search}&pageNumber=${pageNumber}&location=${formData.location}&remote=${formData.remote}&datePosted=${formData.datePosted}&minSalary=${formData.minSalary}&maxSalary=${formData.maxSalary}`
        );

        console.log("response: ", response);
        setTotalJobsCount(response.data.data.totalJobsCount);

        setJobs((prevJobs) => {
          if (pageNumber === 1) {
            // Agar filters change huay hain, toh purani list replace karni hai
            return response.data.data.getAllJobs;
          } else {
            // Load More pe naye jobs purani list ke saath append hon
            const newJobs = response.data.data.getAllJobs;
            const uniqueJobs = [...prevJobs, ...newJobs].reduce((acc, job) => {
              if (!acc.some((existingJob) => existingJob._id === job._id)) {
                acc.push(job);
              }
              return acc;
            }, []);
            return uniqueJobs;
          }
        });
      } catch (error) {
        // toast.error('Error fetching jobs:', error);
        console.log("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [pageNumber, formData]);

  useEffect(() => {
    // Only auto-select the first job on desktop/tablet—not on mobile
    if (!isMobile && jobsPost.length > 0 && !selectedJob) {
      setSelectedJob(jobsPost[0]);
    }
  }, [jobsPost, selectedJob, isMobile]);

  const shouldShowLoadMore = jobsPost.length < totalJobsCount;
  const [isMatching, setIsMatching] = useState(false);
  const [selectFile, setSelectFile] = useState(false);
  const resetAllFilters = () => {
    setFormData({
      search: "",
      location: "",
      remote: false,
      datePosted: null,
      minSalary: null,
      maxSalary: null,
    });
    setPageNumber(1);
  };


  const matchCv = async () => {
    console.log("entered 1");

    console.log("entered 3");

    if (!selectedFile) {
      setSelectFile(true);
    }

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jobId", matchJob);
    formData.append("userId", userId);

    try {
      setIsMatching(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-matching`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("response for matching: ", response);

      if (response.data.status === 200) {
        const { data } = response;

        localStorage.setItem(
          "cvResults",
          JSON.stringify(data.message.CvMatchingResult)
        );

        setTimeout(() => {
          router.push(`/cv-matching/${matchJob}`);
        }, 50);
        // setIsMatching(false);
      } else {
        // setIsMatching(false);
        toast.error(
          response.data.message ||
          "There is some error in uploading this file. Please try with a correct CV!"
        );
      }
    } catch (error) {
      // setIsMatching(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(
          error.response.data.message ||
          "There is some error in uploading this file. Please try with a correct CV!"
        );
      } else {
        // setIsMatching(false);
        toast.error(
          "There is some error in uploading this file. Please try with a correct CV!"
        );
      }
    }
  };

  const toggleMatch = () => {
    console.log("token: ", token);
    console.log("userId: ", userId);

    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to login first to match CV.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth/login");
        }
      });

      return;
    }

    const role = Cookies.get("role")?.trim().toLowerCase();
    if (role !== "user") {
      console.log("entered 2");
      toast.error("You are not a user. Please login as a user to match CV.");
      return;
    }

    setModalMatchOpen(!isModalMatchOpen);
  };

  const deletefile = () => {
    setSelectedFile(null);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file.");
        // alert("Please upload a PDF file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB.");
        // alert("File size must be less than 5MB.");
        return;
      }

      setSelectedFile(file);
    }
  };

  const handleApplySalary = () => {
    setFormData((prevFilters) => ({
      ...prevFilters,
      minSalary: formData.minSalary,
      maxSalary: formData.maxSalary,
    }));
    setPageNumber(1);
    toggleModal();
  };

  const handleApplyDatePosted = () => {
    setFormData((prevFilters) => ({
      ...prevFilters,
      datePosted: formData.datePosted,
    }));
    setPageNumber(1);
    toggleModalCalender();
  };

  const toggleModalCalender = () => {
    setCalenderIsModalOpen(!isCalenderModalOpen);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));

    setPageNumber(1);
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      datePosted: date,
    }));
    setPageNumber(1);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleSalaryChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: parseInt(value),
    }));
    setPageNumber(1);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setPageNumber(1);
  };

  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = Cookies.get("access_token");
    if (storedToken) {
      setToken(storedToken);
    }
    setIsCheckingAuth(false);
  }, []);

  //
  // useEffect(() => {
  //   const handleResize = () => {
  //     setIsMobile(window.innerWidth <= 768);
  //   };
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleProtectedAction = (callback) => {
    if (!token) {
      Swal.fire({
        title: "Login Required",
        text: "You need to login first.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/auth/login");
        }
      });
      return;
    }

    const role = Cookies.get("role")?.trim().toLowerCase();
    if (role !== "user") {
      console.log("entered 2");
      toast.error("You are not a user. Please login as a user to match CV.");
      return;
    }
    // Agar login ho to callback call karo
    callback();
  };

  const handleResetSalary = () => {
    setFormData((prevState) => ({
      ...prevState,
      minSalary: null,
      maxSalary: null,
    }));
    setPageNumber(1);
    toggleModal(); // close modal after reset
  };

  const handleResetDatePosted = () => {
    setFormData((prevState) => ({
      ...prevState,
      datePosted: null,
    }));
    setPageNumber(1);
    toggleModalCalender(); // close modal after reset
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="relative ">
        {/* Background Image */}
        <div
          className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg/bg.jpg')",
          }}
        ></div>

        {/* Main Content */}
        <div className="relative z-10 scrollbar-hidden ">
          <Header
            token={token}
            isCheckingAuth={isCheckingAuth}
            setIsCheckingAuth={setIsCheckingAuth}
          />

          <div className="flex flex-col justify-center items-center">
            <div className="w-screen flex justify-center mt-24">
              <form
                action="/search"
                className="flex max-w-[480px] w-full px-4"
                method="GET"
              >
                {/* Search Bar */}
                <div className="relative flex-grow">
                  <label
                    htmlFor="search"
                    className="sr-only xl:text-lg lg:text-lg md:text-md text-[12px]"
                  >
                    Search
                  </label>
                  <input
                    id="search"
                    type="text"
                    name="search"
                    value={formData.search} // Bind state to input
                    onChange={handleChange} // Handle change in input
                    className="w-full h-11 shadow p-4 border border-r-0 border-purple-400 outline outline-none rounded-l-full rounded-r-md text-gray-800 bg-white bg-opacity-80"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="absolute top-3.5 right-3"
                  >
                    <svg
                      className="h-5 w-5 fill-current text-purple-900"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 56.966 56.966"
                    >
                      <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"></path>
                    </svg>
                  </button>
                </div>

                {/* Location Bar */}
                <div className="relative w-[160px] ">
                  <label
                    htmlFor="location"
                    className="sr-only xl:text-lg lg:text-lg md:text-md text-[12px]"
                  >
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location} // Bind state to input
                    onChange={handleChange} // Handle change in input
                    className="w-full  h-11 shadow p-4 border border-l-0 border-purple-400 outline outline-none rounded-l-md rounded-r-full text-gray-800 bg-white bg-opacity-80"
                    placeholder="Location"
                    aria-label="Location"
                  />
                  <button type="button" className="absolute top-3.5 right-3">
                    <svg
                      className="h-5 w-10 fill-current text-purple-900"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2C8.134 2 5 5.134 5 9c0 4.417 6.5 13 6.5 13s6.5-8.583 6.5-13c0-3.866-3.134-7-7-7zm0 9.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5z"></path>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center relative z-20 bg-opacity-75 p-4 rounded ">
            <div className="flex items-center gap-2">
              <svg
                className="w-6 h-6 text-purple-200"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M13 2l-8 13h6v7l8-13h-6z" />
              </svg>

              <p className="text-purple-200 font-semibold text-base">
                Upload your resume - Find the best fitting job
              </p>
            </div>
          </div>

          {/* Job Listing Section */}
          <div className="flex flex-col lg:flex-row xl:h-screen lg:h-screen min-h-screen w-screen mt-6">
            {/* Left Column: Filters + Job List */}
            <div className="flex-grow lg:w-1/3 max-h-[800px] overflow-y-auto scrollbar-hidden px-4">
              {/* Filters */}
              <div className="flex flex-wrap justify-start gap-2 pb-6">
                <button className="px-3 py-2 border rounded-full text-black bg-purple-300 shadow hover:bg-purple-100 flex items-center gap-2">
                  <FontAwesomeIcon icon={faSliders} />
                </button>
                {/* {["Remote only", "Salary Range", "Date Posted"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={
                        filter === "Remote only"
                          ? () =>
                            setFormData((prev) => ({
                              ...prev,
                              remote: !prev.remote,
                            }))
                          : filter === "Salary Range"
                            ? toggleModal
                            : toggleModalCalender
                      }
                      className={`md:px-3 md:py-2 p-2 border text-[10px] md:text-md rounded-full shadow ${filter === "Remote only" && formData.remote
                        ? "bg-purple-500 text-white"
                        : "bg-white text-black bg-opacity-80 hover:bg-purple-100"
                        }`}
                    >
                      {filter}
                    </button>
                  )
                )} */}
                {["Remote only", "Salary Range", "Date Posted"].map((filter) => (
                  <button
                    key={filter}
                    onClick={
                      filter === "Remote only"
                        ? () => {
                          setFormData((prev) => ({
                            ...prev,
                            remote: !prev.remote,
                          }));
                          setPageNumber(1);
                        }
                        : filter === "Salary Range"
                          ? toggleModal
                          : toggleModalCalender
                    }
                    className={`md:px-3 md:py-2 p-2 border text-[12px] md:text-md rounded-full shadow ${filter === "Remote only" && formData.remote
                      ? "bg-purple-500 text-white"
                      : "bg-white text-black bg-opacity-80 hover:bg-purple-100"
                      }`}
                  >
                    {filter}
                  </button>
                ))}

                {/* Reset All Filters Button */}
                <button
                  onClick={resetAllFilters}
                  className="md:px-3 md:py-2 p-2 border text-[12px] md:text-md rounded-full shadow bg-white text-black bg-opacity-80 hover:bg-purple-100"
                >
                  Reset All
                </button>
              </div>

              {/* Loader */}
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
                    <p className="mt-4 text-lg text-purple-600">Loading</p>
                  </div>
                </div>
              )}

              <p className="pb-2 text-gray-200">
                {jobsPost.length} jobs fetched
              </p>

              {/* Job Cards (with mobile accordion) */}
              {jobsPost.map((job) => (
                <React.Fragment key={job._id}>
                  <div
                    onClick={() =>
                      setSelectedJob(selectedJob === job ? null : job)
                    }
                    className="p-4 mb-2 bg-white bg-opacity-80 rounded-lg cursor-pointer hover:shadow-lg transition"
                  >
                    <p className="text-gray-600">{job.companyName}</p>
                    <h3 className="font-semibold text-lg">{job.title}</h3>
                    <p className="text-gray-600">
                      {job.hybrid
                        ? "Hybrid"
                        : job.remote
                          ? "Remote"
                          : "On-site"}
                    </p>
                    <p className="text-gray-600">{job.salary}</p>
                  </div>

                  {/* Mobile-only inline detail */}
                  {isMobile && selectedJob === job && (
                    <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-inner">
                      <h4 className="font-bold text-xl mb-2">{job.title}</h4>
                      <p className="text-gray-700 mb-2 text-[8px]">
                        {job.description}
                      </p>
                      <div className="flex gap-1">
                        <button
                          className="mt-2 px-4 py-2 bg-white text-black rounded-full"
                          onClick={() => {
                            setMatchJob(selectedJob._id);
                            toggleMatch();
                          }}
                        >
                          Match CV
                        </button>
                        <button
                          className="mt-2 px-4 py-2 bg-purple-400 text-white rounded-full"
                          onClick={() => {
                            handleProtectedAction(() => {
                              window.open(selectedJob.applyUrl, "_blank");
                            });
                          }}
                        >
                          Easy Apply
                        </button>
                      </div>
                    </div>
                  )}
                </React.Fragment>
              ))}

              {jobsPost.length === 0 && (
                <p className="text-gray-800">No jobs found</p>
              )}

              {shouldShowLoadMore && (
                <button
                  onClick={() => setPageNumber((p) => p + 1)}
                  className="flex items-center justify-center w-full h-10 mt-4 text-sm border rounded-full text-black bg-white bg-opacity-80 shadow hover:bg-purple-100"
                >
                  Load More Jobs
                </button>
              )}
            </div>

            {/* Right Column: Job Detail (only on tablet+ screens) */}
            {selectedJob && (!isMobile || showJobDetail) && (
              <div className="flex-grow lg:w-2/3 overflow-y-auto border rounded-lg p-4 shadow bg-white bg-opacity-80 pr-12 pb-12 scrollbar-hidden">
                {/* Back button for mobile */}
                {isMobile && (
                  <button
                    onClick={() => {
                      setShowJobDetail(false);
                      setSelectedJob(null);
                    }}
                    className="mb-4 text-purple-500 underline"
                  >
                    ← Back to Jobs
                  </button>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 items-start">
                  <h2 className="font-bold xl:text-xl text-md">
                    {selectedJob.title}
                  </h2>
                  <div className="flex justify-end gap-4 self-start">
                    <button
                      className="px-4 py-2 border rounded-full text-black bg-white bg-opacity-80 shadow hover:bg-purple-100"
                      onClick={() => {
                        setMatchJob(selectedJob._id);
                        toggleMatch();
                      }}
                    >
                      Match CV
                    </button>
                    <button
                      className="px-4 py-2 rounded-full text-white bg-purple-400 bg-opacity-80 shadow hover:bg-purple-900"
                      onClick={() => {
                        handleProtectedAction(() => {
                          window.open(selectedJob.applyUrl, "_blank");
                        });
                      }}
                    >
                      Easy Apply
                    </button>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  {/* <img
                    src={selectedJob.companyLogoLink}
                    alt={selectedJob.companyName}
                    className="w-12 h-12 rounded-full mr-4"
                  /> */}
                  <img
                    src={selectedJob.companyLogoLink || defaultJobPic.src}
                    alt={selectedJob.companyName}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                    onError={(e) => {
                      e.target.onerror = null; // prevent infinite loop
                      e.target.src = defaultJobPic.src;
                    }}
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {selectedJob.companyName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {selectedJob.location}, {selectedJob.country}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  Salary: {selectedJob.salary}
                  {selectedJob.salary !== "Not disclosed" &&
                    selectedJob.salaryCurrency
                    ? ` ${selectedJob.salaryCurrency}`
                    : ""}
                </p>

                <p className="text-gray-800">{selectedJob.description}</p>
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h3 className="text-lg font-bold">Filter Options</h3>
              <p className="text-gray-700">
                Here you can adjust the filter options for jobs.
              </p>

              {/* Salary Range Sliders */}
              <div className="mt-4">
                <label
                  htmlFor="minSalary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Min Salary: ${formData.minSalary}
                </label>
                <input
                  type="range"
                  id="minSalary"
                  name="minSalary"
                  min="0000"
                  max="200000"
                  step="2000"
                  value={formData.minSalary}
                  onChange={handleSalaryChange}
                  className="w-full"
                />
              </div>
              <div className="mt-4">
                <label
                  htmlFor="maxSalary"
                  className="block text-sm font-medium text-gray-700"
                >
                  Max Salary: ${formData.maxSalary}
                </label>
                <input
                  type="range"
                  id="maxSalary"
                  name="maxSalary"
                  min="0"
                  max="200000"
                  step="2000"
                  value={formData.maxSalary}
                  onChange={handleSalaryChange}
                  className="w-full"
                />
              </div>

              {/* Apply and Close Buttons */}
              {/* <div className="mt-4 flex justify-between">
                <button
                  onClick={handleApplySalary} // Apply salary on button click
                  className="px-4 py-2 bg-green-500 text-white rounded-full"
                >
                  Apply
                </button>
                <button
                  onClick={toggleModal} // Close the modal
                  className="px-4 py-2 bg-purple-500 text-white rounded-full"
                >
                  Close
                </button>
              </div> */}
              <div className="mt-4 flex justify-between">
                <div>
                  <button
                    onClick={handleApplySalary}
                    className="px-4 py-2 bg-green-500 text-white rounded-full"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleResetSalary}
                    className="px-4 py-2 mx-2 bg-red-500 text-white rounded-full"
                  >
                    Reset Salary
                  </button>
                </div>
                <button
                  onClick={toggleModal}
                  className="px-4 py-2 bg-purple-500 text-white rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isCalenderModalOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              {/* Calendar for Date Selection */}
              <div className="mt-4">
                <label
                  htmlFor="jobDate"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Date:
                </label>
                <Calendar
                  onChange={handleDateChange} // Handle date change
                  value={formData.datePosted} // Set calendar value to selected date
                  className="my-4"
                />
              </div>

              {/* Apply and Close Buttons */}
              <div className="mt-4 flex justify-between">
                <div>
                  <button
                    onClick={() => handleApplyDatePosted("datePosted")} // Set date on Apply
                    className="px-4 py-2 bg-green-500 text-white rounded-full"
                  >
                    Apply
                  </button>
                  <button
                    onClick={handleResetDatePosted}
                    className="px-4 py-2 mx-2 bg-red-500 text-white rounded-full"
                  >
                    Reset Date
                  </button>
                </div>
                <button
                  onClick={toggleModalCalender} // Close the modal when clicked
                  className="px-4 py-2 bg-purple-500 text-white rounded-full"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {isModalMatchOpen && (
          <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50 px-4 sm:px-6">
            <div className="bg-white p-6 rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl flex justify-center items-center">
              {selectedFile ? (
                isMatching ? (
                  <div className="flex flex-col items-center p-10 sm:p-20">
                    <svg
                      className="animate-spin h-10 w-10 text-purple-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 0 0 8-8v8H4z"
                      ></path>
                    </svg>
                    <p className="mt-4 text-purple-900 font-semibold text-lg">
                      Matching in progress...
                    </p>
                  </div>
                ) : (
                  <div className="bg-white p-4 sm:p-6 rounded-lg w-full">
                    <p className="text-lg font-bold text-gray-700">
                      File selected:
                    </p>
                    <div className="mt-4 border-t pt-4">
                      <p className="text-sm text-gray-600">Selected file:</p>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:space-x-2">
                        <svg
                          className="w-5 h-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 20"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v2m4 4V6M8 10V6M4 4v8M12 14v2m4 4v-8m-8 0v8"
                          />
                        </svg>
                        <div className="text-sm text-gray-700 w-full">
                          <div className="flex justify-between">
                            <p className="truncate">{selectedFile.name}</p>
                            <button onClick={deletefile} className="text-end">
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="text-red-600"
                              />
                            </button>
                          </div>
                          <p className="text-xs text-gray-500">
                            {Math.round(selectedFile.size / 1024)} KB
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row justify-end gap-4">
                      <button
                        onClick={matchCv}
                        className="px-4 py-2 border border-gray-400 hover:bg-purple-600 text-black rounded-full hover:text-white hover:border-white shadow-lg"
                      >
                        Match
                      </button>
                      <button
                        onClick={toggleMatch}
                        className="px-4 py-2 bg-purple-400 hover:bg-purple-600 text-white rounded-full"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="bg-white p-4 sm:p-6 rounded-lg w-full">
                  <p className="text-lg sm:text-xl font-semibold text-gray-700 mb-4">
                    Please select a file to proceed
                  </p>

                  <div className="flex items-center justify-center w-full mb-4">
                    <label
                      htmlFor="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-48 sm:h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Only PDF files (MAX. 5MB)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        type="file"
                        className="hidden"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={toggleMatch}
                      className="px-4 py-2 bg-purple-400 hover:bg-purple-600 text-white rounded-full"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="mt-4">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Page;
