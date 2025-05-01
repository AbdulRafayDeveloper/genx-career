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


const CVTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [searchStatus, setSearchStatus] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedUserId, setselectedUserId] = useState(null);

  useEffect(() => {
    const fetchusers = async () => {
      const token = Cookies.get('token');
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cvTemplates`,
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
      const token = Cookies.get('token');
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/cvTemplate/${selectedUserId}`,
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
            <Header />

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
                    className="flex items-center text-sm w-full sm:w-auto font-medium text-gray-700 bg-gray-200 border rounded-lg p-2 px-4 hover:bg-gray-200 transition duration-300 h-8"
                    style={{ border: "1px solid grey" }}
                    aria-label="Export Records"
                  >
                    Add New Template +
                  </Link>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto mt-6">
                <table className="min-w-full text-sm text-left text-gray-500">
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
                      <tr key={item._id} className="bg-white border-b text-left">
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
                        </td>
                      </tr>
                    ))}
                    {!templates && (
                      <tr>
                        <td colSpan={6} className="text-center">No data found</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CVTemplates;
