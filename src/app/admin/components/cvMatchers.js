"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiUpload } from "react-icons/fi";
import Pagination from "./pagination";
import Header from "./header";
import { toast } from "react-toastify";
import LeftSideBar from "./sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HiArrowLeft } from "react-icons/hi";

const CvMatchers = () => {
  const router = useRouter();
  const [users, setusers] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [totalusers, setTotalusers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 8;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setselectedUserId] = useState(null);
  const totalPages = Math.ceil(totalusers / itemsPerPage);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchusers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('genx_access_token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-matchers?pageNumber=${currentPage}&pageSize=${itemsPerPage}&search=${search}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        const data = await response.data;
        console.log(data.data.matchers);
        console.log(data.data.totalMatchersCount);
        if (data.status == 200) {
          setusers(data.data.matchers);
          setTotalusers(data.data.totalMatchersCount);
        } else {
          setusers([]);
          setTotalusers(0);
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(data.message)
      } finally {
        setLoading(false);
      }

    };
    fetchusers();
  }, [currentPage, itemsPerPage, searchStatus]);

  const handleDeleteClick = (id) => {
    setselectedUserId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;

    setIsDeleting(true);

    try {
      const token = Cookies.get('genx_access_token');
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-matching/${selectedUserId}`,
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
      setIsDeleting(false);
      setIsDialogOpen(false);
      setselectedUserId(null);
    }
  };

  const downloadusersExcel = async () => {
    try {
      const token = Cookies.get('genx_access_token');
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-matching-list/export`, {
        responseType: "blob",
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const blob = new Blob([response.data], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "CvMatchers_List.xlsx";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      toast.error(error.response.data.message || 'Failed to download Cv Matchers Excel file. Please try again later.');
    }
  };

  return (
    <div className="sm:ml-64 rounded-lg">
      <div className="p-2">
        {/* Header Section */}
        {/* <Header /> */}
        <div className="p-2 w-full">
          <div className="flex items-center justify-between">
            {/* Mobile: Show sidebar toggle */}
            <LeftSideBar />

            {/* Title */}
            <p className="flex items-center text-[12px] md:text-2xl md:font-semibold ml-3">
              <HiArrowLeft
                className="cursor-pointer mr-2 mt-1"
                onClick={() => router.back()}
              />
              Back
            </p>

            {/* Header component */}
            <div className="ml-auto">
              <Header appear={true} />
            </div>
          </div>
        </div>
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
            <div className="flex flex-col items-center justify-center text-lg">
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
        {/* User Records Section */}
        <div className="p-4 bg-gray-50 rounded-xl shadow-sm my-7 ml-5">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Job Listing Section */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 lg:justify-between items-center gap-4">
                <div>
                  <h1 className="text-lg lg:text-xl font-bold">Cv Matchers</h1>
                </div>
                <div></div>
              </div>
            </div>

            {/* Search Form */}
            <div className="flex flex-col md:flex-row flex-wrap justify-between items-center w-full lg:w-auto gap-3">
              <div className="w-full sm:w-auto flex justify-start gap-3">
                <button
                  onClick={downloadusersExcel}
                  aria-label="Export Records"
                  className="flex items-center justify-center gap-2 w-full bg-white  p-1 rounded-lg border border-gray-300 transition duration-300"
                >
                  <p className="text-md ">Export </p> <Image src="/upload-icon.png" height={24} width={24} alt="Export" />
                </button>
                <div className="w-full  flex justify-start">
                  <input
                    type="text"
                    onChange={e => setSearch(e.target.value)}
                    id="simple-search"
                    placeholder="Search by email..."
                    className="w-full sm:w-full py-2 px-3 text-sm rounded-lg border border-gray-300 focus:ring-purple-500 focus:border-purple-500 transition duration-300"
                    aria-label="Search by email"
                    required
                  />
                </div>
              </div>


              <div className="w-full sm:w-auto sm:w-auto flex justify-start">
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
            <table className="min-w-full text-sm text-center text-gray-500">
              <thead className="bg-gray-50 text-sm  text-gray-700">
                <tr>
                  <th className="px-5 py-3">Sr #</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Jobs Matched with CV</th>
                  <th className="px-5 py-3">Created Date</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users && users.map((item, index) => (
                  <tr key={item._id} className="bg-white border-b text-center">
                    <td className="px-6 py-4">{index + 1}</td>
                    <td className="px-6 py-4">{item.userEmail}</td>
                    <td className="px-6 py-4">{item.result.length}</td>
                    <td className="px-6 py-4">
                      {new Date(item.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td className="px-6 py-4 flex gap-1 justify-center items-center">
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
                          <div className="fixed inset-0 bg-black bg-opacity-20 z-50 flex items-center justify-center">
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
                                  className={`px-4 py-2 text-sm font-medium text-white rounded-md transition duration-200 ${isDeleting ? "bg-red-300 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
                                    }`}
                                  onClick={handleDelete}
                                  disabled={isDeleting}
                                >
                                  {isDeleting ? (
                                    <div className="flex items-center space-x-2">
                                      <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                      <span>Deleting...</span>
                                    </div>
                                  ) : (
                                    "Delete"
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12">
                      <div className="flex flex-col items-center justify-center space-y-3">
                        {/* Icon: folder or document */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-10 h-10 text-gray-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H12l-2-2H5a2 2 0 00-2 2z"
                          />
                        </svg>

                        {/* Main message */}
                        <h3 className="text-xl font-medium text-gray-700">No records found</h3>

                        {/* Help text */}
                        <p className="text-sm text-gray-500">
                          There’s nothing to display here yet.
                        </p>

                        {/* Optional action */}
                        {/* <button
                        onClick={handleAddNew}
                        className="mt-2 inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                      >
                        Add New Entry
                      </button> */}
                      </div>
                    </td>
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
        </div>
      </div>
    </div>
  );
};

export default CvMatchers;
