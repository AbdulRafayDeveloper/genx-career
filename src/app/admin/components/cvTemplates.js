"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { RiEdit2Line, RiDeleteBin6Line } from "react-icons/ri";
import Header from "./header";
import Link from "next/link";
import Image from "next/image";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Pagination from "./pagination";
import LeftSideBar from "./sidebar";


const CVTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setselectedUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalusers, setTotalusers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(totalusers / itemsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchusers = async () => {
      setLoading(true);
      try {
        const token = Cookies.get('genx_access_token');
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-templates`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          }
        );
        const data = await response.data;
        console.log(data.data.records);
        if (data.status == 200) {
          setTemplates(data.data.records);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(data.message);
      } finally {
        setLoading(false);
      }

    };
    fetchusers();
  }, []);

  const handleDeleteClick = (id) => {
    setselectedUserId(id);
    setIsDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedUserId) return;

    try {
      const token = Cookies.get('genx_access_token');
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cv-templates/${selectedUserId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === 200) {
        setSearchStatus(!searchStatus);
        toast.success(response.data.message || 'Record deleted successfully!');
        setTemplates((prevTemplates) =>
          prevTemplates.filter((template) => template._id !== selectedUserId)
        );
      } else {
        toast.error(response.data.message || 'Failed to delete record!');
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message || 'Failed to delete record!');
      } else {
        toast.error('An error occurred. Please try again.');
      }
    } finally {
      setIsDialogOpen(false);
      setselectedUserId(null);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="flex flex-col min-h-screen">
        <div className="sm:ml-64 rounded-lg">
          <div className="p-2">
            {/* Header Section */}
            {/* <Header /> */}
            <div className="p-2 w-full">
              <div className="flex items-center justify-between">
                {/* Mobile: Show sidebar toggle */}
                <LeftSideBar />

                {/* Title */}
                <p className="text-[12px] md:text-2xl md:font-semibold ml-3 ">
                  Welcome Back
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
                      <h1 className="text-lg lg:text-xl font-bold">Cv Templates</h1>
                    </div>
                    <div></div>
                  </div>
                </div>

                {/* Search Form */}
                <div className="flex flex-wrap justify-between items-center  w-full lg:w-auto space-y-3 md:space-y-0">
                  <Link
                    href="/admin/cv-templates/add"
                    className="flex items-center text-sm w-full sm:w-auto font-medium text-white bg-gray-600 border rounded-lg p-2 px-4 hover:text-black hover:bg-gray-200 transition duration-300 h-8"
                    style={{ border: "1px solid grey" }}
                    aria-label="Export Records"
                  >
                    Add New Template +
                  </Link>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-center text-gray-500">
                  <thead className="bg-gray-50 text-sm  text-gray-700">
                    <tr>
                      <th className="px-5 py-3">Sr #</th>
                      <th className="px-5 py-3">Name</th>
                      <th className="px-5 py-3">Template</th>
                      <th className="px-5 py-3">Created Date</th>
                      <th className="px-5 py-3">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {templates && templates.map((item, index) => (
                      <tr key={item._id} className="bg-white border-b text-center">
                        <td className="px-6 py-4 items-center">{index + 1}</td>
                        <td className="px-6 py-4 items-center">{item.name}</td>
                        <td className="px-6 py-4 items-center">
                          <Image
                            src={item.imageUrl}
                            alt="Template preview"
                            width={120}
                            height={120}
                            className="w-[120px] h-[120px] object-cover rounded-md"
                          />
                        </td>
                        <td className="px-6 py-4 items-center">
                          {new Date(item.createdAt).toLocaleDateString("en-GB")}
                        </td>
                        <td className="px-6 py-4 align-middle">
                          <div className="flex items-center justify-center h-full gap-2">
                            <Link
                              href={`/admin/cv-templates/update/${item._id}`}
                              className="p-1 w-5 h-5 bg-blue-600 rounded-md flex justify-center items-center cursor-pointer"
                            >
                              <RiEdit2Line color="white" />
                            </Link>

                            <div
                              className="p-1 w-5 h-5 bg-red-600 rounded-md flex justify-center items-center cursor-pointer"
                              onClick={() => handleDeleteClick(item._id)}
                            >
                              <RiDeleteBin6Line color="white" />
                            </div>
                          </div>
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
                                    className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                    onClick={handleDelete} // Call the function without passing an argument
                                  >
                                    Delete
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                    {templates.length === 0 && (
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
      </div>
    </>
  );
};

export default CVTemplates;
