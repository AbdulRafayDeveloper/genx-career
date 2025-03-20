"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { RiEyeLine, RiDeleteBin6Line  } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import Pagination from "./pagination";
import Header from "./header";

const JobListing = () => {
  const router = useRouter();
  const [jobs, setJobs] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 5;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const totalPages = Math.ceil(totalJobs / itemsPerPage);
  // loading table
  const [loading,setLoading]=useState(true);
  
  const handleViewDetails = (id) => {
    router.push(`/admin/jobs/details/${id}`);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try{
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs?pageNumber=${currentPage}&pageSize=${itemsPerPage}&search=${search}`
        );
        const data = await response.data;
        console.log(data);
        if (data.status == 200) {
          setJobs(data.data.getAllJobs);
          setTotalJobs(data.data.totalJobsCount);
        }
  
      }catch(error){
        console.log("error",error)
      }finally{
        setLoading(false);
    }
  };
    fetchJobs();
  }, [currentPage, itemsPerPage, searchStatus]);

  const handleDeleteClick = (id) => {
    setSelectedJobId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedJobId) return;

    try {
      const token = Cookies.get('token');
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/job/${selectedJobId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setSearchStatus(!searchStatus);
        Swal.fire({
          title: 'Deleted!',
          text: 'The record has been deleted.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: response.data.message || 'Failed to delete the record.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to delete record. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    } finally {
      setIsDialogOpen(false);
      setSelectedJobId(null);
    }
  };

  const downloadJobsExcel = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jobs/export`, {
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Jobs_Export.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Failed to download jobs Excel file. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="sm:ml-64 rounded-lg">
      <div className="p-2">
        {/* Header Section */}
        <Header />

        {/* User Records Section */}
        <div className="p-4 bg-gray-50 rounded-xl shadow-sm my-7 ml-5">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Job Listing Section */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 lg:justify-between items-center gap-4">
                <div>
                  <h1 className="text-lg lg:text-xl font-bold">Job Listing</h1>
                </div>
                <div></div>
              </div>
            </div>

            {/* Search Form */}
            <div className="flex flex-wrap justify-between items-center  w-full lg:w-auto space-y-3 md:space-y-0">
              <button
                className="flex items-center text-sm w-full sm:w-auto font-medium text-gray-700 bg-gray-200 border rounded-lg p-2 px-4 hover:bg-gray-200 transition duration-300 h-8"
                style={{ border: "1px solid grey" }}
                onClick={downloadJobsExcel}
                aria-label="Export Records"
              >
                <FiUpload className="text-md mr-2 text-gray-900" />
                Export
              </button>

              <div className="w-full sm:w-auto mx-2">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  onChange={(e) => setSearch(e.target.value)}
                  id="simple-search"
                  className="py-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-[175px] pl-3"
                  placeholder="Search by title..."
                  aria-label="Search by title..."
                  required
                />
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="submit"
                  onClick={() => {
                    setSearchStatus(!searchStatus);
                    setCurrentPage(1);
                  }}
                  className="p-2 px-4 text-sm font-medium text-white bg-purple-500 rounded-lg border border-purple-500 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-blue-300 transition duration-300 w-full sm:w-auto"
                  aria-label="Submit search"
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-6">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-sm  text-gray-700">
                <tr>
                  <th className="px-5 py-3">Job Title</th>
                  <th className="px-5 py-3">Date Posted</th>
                  <th className="px-5 py-3">Company Name</th>
                  <th className="px-5 py-3">Location</th>
                  <th className="px-5 py-3">Salary</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>

                {jobs && jobs.map((item, index) => (
                  <tr key={item._id} className="bg-white border-b text-left">
                    <td className="px-6 py-4">{item.title}</td>
                    <td className="px-6 py-4">
                      {new Date(item.jobPostDate).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4">{item.companyName}</td>
                    <td className="px-6 py-4">{item.location}</td>
                    <td className="px-6 py-4">{item.salary}</td>
                    <td className="px-6 py-4 flex gap-1">
                      <div
                        className="p-1 w-5 h-5 bg-yellow-300 rounded-md flex justify-center items-center cursor-pointer"
                        onClick={() => handleViewDetails(item._id)}
                      >
                        <RiEyeLine color="white" />
                      </div>
                      <div>
                        {/* Delete Button */}
                        <div
                          className="p-1 w-5 h-5 bg-red-600 rounded-md flex justify-center items-center cursor-pointer"
                          onClick={() => handleDeleteClick(item._id)} // Pass the specific ID
                        >
                          <RiDeleteBin6Line color="white" />
                        </div>

                        {/* Dialog Box */}
                        {isDialogOpen && (
                          <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
                              <h1 className="text-xl font-bold">
                                Delete Confirmation
                              </h1>
                              <p className="text-md text-gray-600 mt-2">
                                Are you sure you want to delete this record from database?
                              </p>
                              <div className="flex justify-end gap-2 mt-8">
                                <button
                                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                                  onClick={() => setIsDialogOpen(false)}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                  onClick={handleDelete} // Call the function without passing an argument
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {!jobs && (
                  <tr>
                    <td colSpan={6} className="text-center">No data found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
          <div className="flex justify-center items-center p-2">
            <button

              disabled={loading}
              className="text-purple-600
              ring-blue-300 font-medium  text-sm px-5 py-2.5 text-center inline-flex 
              items-center"
              >
              {loading && (
                <>
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
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539..."
                    fill="CurrentColor"
                  />
                </svg>
                <p className="mt-3">Loading...</p>
                </div>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobListing;
