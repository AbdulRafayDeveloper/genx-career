"use client";
import Header from "../components/header/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSliders } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Page = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCalenderModalOpen, setCalenderIsModalOpen] = useState(false);
  const [jobsPost, setJobs] = useState([]);
  const [isModalMatchOpen, setModalMatchOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [matchJob, setMatchJob] = useState();

  const [formData, setFormData] = useState({
    search: "",
    location: "",
    remote: false,
    datePosted: null,
    minSalary: null,
    maxSalary: null,
  });

  const toggleMatch = () => {
    setModalMatchOpen(!isModalMatchOpen);
  };

  const deletefile = () => {
    setSelectedFile(null);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type !== "application/pdf") {
        alert("Please upload a PDF file.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("File size must be less than 5MB.");
        return;
      }

      setSelectedFile(file);
    }
  };

  useEffect(() => {
    if (jobsPost.length > 0 && !selectedJob) {
      setSelectedJob(jobsPost[0]);
    }
  }, [jobsPost, selectedJob]);

  const handleApplySalary = () => {
    setFormData((prevFilters) => ({
      ...prevFilters,
      minSalary: formData.minSalary,
      maxSalary: formData.maxSalary,
    }));

    console.log("Applied Min Salary:", formData.minSalary);
    console.log("Applied Max Salary:", formData.maxSalary);
    toggleModal(); // Close the modal
  };

  console.log(formData.remote);
  const handleApplyDatePosted = () => {
    setFormData((prevFilters) => ({
      ...prevFilters,
      datePosted: formData.datePosted,
    }));

    console.log("Applied Date Posted:", formData.datePosted);
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
    console.log(formData.search);
    console.log(formData.location);
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      datePosted: date,
    }));
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
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch(
          `https://fyp-job-automation-backend.vercel.app/api/jobs`
        );

        const data = await response.json();
        console.log(data.data.getAllJobs);
        setJobs(data.data.getAllJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    console.log("Entered 1");
    // Filter out null or empty values from formData
    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(
        ([key, value]) => value !== "" && value !== null
      )
    );

    const queryParams = new URLSearchParams(filteredData).toString();
    console.log(queryParams);
    console.log("process.env.NEXT_PUBLIC_BASE_URL: ", process.env.NEXT_PUBLIC_BASE_URL);
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?${queryParams}`
      );
      console.log(response);
      setJobs(response.data.data.getAllJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  const router = useRouter();

  const matchCv = async () => {
    console.log("1");
    if (!selectedFile) {
      alert("Please select a file before submitting!");
      return;
    }
    console.log(matchJob);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("jobId", matchJob);
    formData.append("userId", "674db325f24f9b17a4cd6876");
    console.log("2");
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-matching`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      if (response.data.status === 200) {
        console.log("3");
        const { data } = response;
        console.log("data: ", data);
        localStorage.setItem(
          "cvResults",
          JSON.stringify(data.message.CvMatchingResult)
        );
        router.push(`/cvMatching/${matchJob}`);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("There is some error in uploading this file. Please Match with some other Correct Cv!");
    }
  };

  return (
    <div className="relative ">
      {/* Background Image */}
      <div
        className="fixed top-0 left-0 w-full h-full bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/design.png')",
        }}
      ></div>

      {/* Main Content */}
      <div className="relative z-10 scrollbar-hidden ">
        <Header />
        <div className="flex flex-col justify-center items-center">
          <div className="w-screen flex justify-center mt-24">
            <form
              action="/search"
              className="flex max-w-[480px] w-full px-4"
              method="GET"
            >
              {/* Search Bar */}
              <div className="relative flex-grow">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  id="search"
                  type="text"
                  name="search"
                  value={formData.search} // Bind state to input
                  onChange={handleChange} // Handle change in input
                  className="w-full border h-11 shadow p-4 rounded-l-full rounded-r-md text-gray-800 bg-white bg-opacity-80"
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
              <div className="relative w-[160px]">
                <label htmlFor="location" className="sr-only">
                  Location
                </label>
                <input
                  id="location"
                  type="text"
                  name="location"
                  value={formData.location} // Bind state to input
                  onChange={handleChange} // Handle change in input
                  className="w-full border h-11 shadow p-4 rounded-l-md rounded-r-full text-gray-800 bg-white bg-opacity-80"
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
              className="w-6 h-6 text-purple-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path fill="currentColor" d="M13 2l-8 13h6v7l8-13h-6z" />
            </svg>

            <p className="text-purple-900 font-semibold text-base">
              Upload your resume - Find the best fitting job
            </p>
          </div>
        </div>

        {/* Job Listing Section */}
        <div className="flex h-screen w-screen mt-6">
          <div className="flex flex-col lg:flex-row gap-2 px-4 w-full bg-opacity-50 justify-center">
            {/* Left Column (Job Cards) */}
            <div className="flex-grow lg:w-1/3 max-h-[800px] overflow-y-auto scrollbar-hidden ">
              <div className="flex justify-start gap-1 pb-6">
                {/* Button with faScroll Icon */}
                <button className="px-3 py-2 border rounded-full text-black bg-purple-300 shadow hover:bg-purple-100 flex items-center gap-2">
                  <FontAwesomeIcon icon={faSliders} />{" "}
                </button>
                {["Remote only", "Salary Range", "Date Posted"].map(
                  (filter) => (
                    <button
                      key={filter}
                      onClick={
                        filter === "Remote only"
                          ? () => {
                            setFormData((prev) => ({
                              ...prev,
                              remote: !prev.remote, // Toggle the remote value
                            }));
                          }
                          : filter === "Salary Range"
                            ? toggleModal
                            : filter === "Date Posted"
                              ? toggleModalCalender
                              : undefined
                      }
                      className={`px-3 py-2 border rounded-full shadow ${filter === "Remote only" && formData.remote
                        ? "bg-purple-500 text-white" // Active state styles
                        : "bg-white text-black bg-opacity-80 hover:bg-purple-100" // Default styles
                        }`}
                    >
                      {filter}
                    </button>
                  )
                )}
              </div>
              <p
                className="pb-2 text-gray-800
              "
              >
                {jobsPost.length} jobs fetched
              </p>
              {jobsPost.map((job) => (
                <div
                  key={job.id}
                  className="p-4 mb-4 bg-white bg-opacity-80 rounded-lg cursor-pointer hover:shadow-lg"
                  onClick={() => setSelectedJob(job)}
                >
                  <p className="text-gray-600">{job.companyName}</p>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-gray-600">{job.remote}</p>
                  <p className="text-gray-600">
                    {job.hybrid ? "Hybrid" : job.remote ? "Remote" : "Hybrid"}
                  </p>
                  <p className="text-gray-600">{job.salary}</p>
                </div>
              ))}
              {jobsPost.length === 0 && (
                <p className="text-gray-800">No jobs found</p>
              )}
              {jobsPost.length > 2 && (
                <button
                  className="flex items-center justify-center w-full h-10 text-sm border rounded-full text-black bg-white bg-opacity-80 shadow hover:bg-purple-100"
                >Load More Jobs</button>)}
            </div>

            {/* Right Column (Job Details) */}
            <div className="flex-grow lg:w-2/3 max-h-screen overflow-y-auto border rounded-lg p-4 shadow bg-white bg-opacity-80 pr-12 pb-12 scrollbar-hidden">
              {selectedJob ? (
                <div className="p-4 pb-4">
                  <div className="grid grid-cols-2 gap-4">
                    <h2 className="font-bold text-2xl pb-2">
                      {selectedJob.title}
                    </h2>
                    <div className="flex justify-end space-x-2">
                      <button
                        className="flex items-center justify-center w-32 h-10 text-sm border rounded-full text-black bg-white bg-opacity-80 shadow hover:bg-purple-100"
                        onClick={() => {
                          setMatchJob(selectedJob._id);
                          toggleMatch();
                        }}
                      >
                        Match CV
                      </button>
                      <Link
                        href={selectedJob.applyUrl}
                        className="flex items-center justify-center w-32 h-10 text-sm border rounded-full text-white bg-purple-400 bg-opacity-80 shadow hover:bg-purple-900"
                      >
                        <div className="flex items-center space-x-1">
                          <svg
                            className="w-6 h-6 text-purple-white"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M13 2l-8 13h6v7l8-13h-6z"
                            />
                          </svg>
                          <span>Easy Apply</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="flex items-center mb-4 p-4">
                    <img
                      src={selectedJob.companyLogoLink}
                      alt={selectedJob.companyName}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedJob.companyName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {selectedJob.location}, {selectedJob.country}
                      </p>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4">
                    Salary: {selectedJob.salary}
                  </p>

                  <p className="text-gray-800 text-base">
                    {selectedJob.description}
                  </p>
                </div>
              ) : (
                <p className="text-gray-500">Select a job to view details</p>
              )}
            </div>
          </div>
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
                min="20000"
                max="200000"
                step="5000"
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
                min="20000"
                max="200000"
                step="5000"
                value={formData.maxSalary}
                onChange={handleSalaryChange}
                className="w-full"
              />
            </div>

            {/* Apply and Close Buttons */}
            <div className="mt-4 flex justify-between">
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
              <button
                onClick={() => handleApplyDatePosted("datePosted")} // Set date on Apply
                className="px-4 py-2 bg-green-500 text-white rounded-full"
              >
                Apply
              </button>
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
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-1/2">
            {/* Dropzone Component */}
            <h3 className="text-lg font-bold mb-2 text-purple-950">
              Upload Resume
            </h3>

            <div className="flex items-center justify-center w-full mb-4">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
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
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
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

            {/* File Preview */}
            {selectedFile && (
              <div className="mt-4 border-t pt-4">
                <p className="text-sm text-gray-600">Selected file:</p>
                <div className="flex items-center space-x-2">
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
                  <div className="text-sm text-gray-700">
                    <div className="grid grid-cols-2">
                      <p>{selectedFile.name}</p>
                      <button onClick={deletefile} className="text-end">
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="text-red-600"
                        ></FontAwesomeIcon>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500">
                      {Math.round(selectedFile.size / 1024)} KB
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Close Button */}
            <div className="mt-4 flex justify-end gap-4">
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
        </div>
      )}
    </div>
  );
};

export default Page;
