"use client";
import UsersInfo from "@/app/admin/dataset/data";
import { cvCreatorsData as initialData } from "./data";
import Header from "./header";
import { useState } from "react";
import { RiEyeLine } from "react-icons/ri";
import { GoPencil } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import Pagination from "./pagination";

const CvCreators = () => {
  const [data, setData] = useState(initialData);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setIsDialogOpen(true);
  };

  const handleCancel = () => {
    setIsDialogOpen(false);
    setSelectedId(null);
  };

  const handleConfirmDelete = () => {
    setData((prevData) => prevData.filter((item) => item.id !== selectedId));
    setIsDialogOpen(false);
    setSelectedId(null);
  };

  const [showData, setShowData] = useState(false);
  const [delData, setDeldata] = useState(UsersInfo);

  const handleDelete = (id) => {
    const updatedData = delData.filter((item) => item.id !== id);
    setDeldata(updatedData);
  };
  const toggleMessage = (id) => {
    setExpandedMessages((prevExpandedMessages) => ({
      ...prevExpandedMessages,
      [id]: !prevExpandedMessages[id],
    }));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const currentItems = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  return (
    <div className="sm:ml-64 rounded-lg">
      <div className="p-2">
        {/* Header Section */}
        <Header />

        {/* User Records Section */}
        <div className="p-4 bg-gray-50 rounded-xl shadow-sm my-7 ml-5">
          <div className="flex flex-wrap justify-between items-center gap-4">
            {/* Main Section */}
            <div className="w-full lg:w-auto">
              <div className="grid grid-cols-2 lg:justify-between items-center gap-4">
                <div>
                  <h1 className="text-lg lg:text-xl font-bold">Cv Creators</h1>
                </div>
                <div></div>
              </div>
            </div>

            {/* Search Form */}
            <div className="flex flex-wrap justify-between items-center  w-full lg:w-auto space-y-3 md:space-y-0">
              <button
                className="flex items-center text-sm w-full sm:w-auto font-medium text-gray-700 bg-gray-200  border rounded-lg p-2 px-4 hover:bg-gray-200 transition duration-300 h-8"
                style={{ border: "1px solid grey" }}
                aria-label="Export Records"
              >
                <i className="fa-solid fa-cloud-arrow-up text-md mr-2"></i>
                Export
              </button>

              <div className="w-full sm:w-auto mx-2 sm:my-5">
                <label htmlFor="simple-search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full sm:w-[300px] pl-10"
                  placeholder="Search branch name..."
                  aria-label="Search branch name"
                  required
                />
              </div>

              <div className="w-full sm:w-auto">
                <button
                  type="submit"
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
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-50 text-sm  text-gray-700">
                <tr>
                  <th className="px-5 py-3">Sr#</th>
                  <th className="px-5 py-3">Template Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item, index) => (
                  <tr key={item.id} className="bg-white border-b text-left">
                    <td className="px-6 py-4">{item.id}</td>
                    <td className="px-6 py-4">{item.templateName}</td>
                    <td className="px-6 py-4">{item.userEmail}</td>
                    <td className="px-6 py-4 flex gap-1">
                      <div className="p-1 w-5 h-5 bg-yellow-300 rounded-md flex justify-center items-center">
                        <RiEyeLine color="white" />
                      </div>
                      <div>
                        {/* Delete Button */}
                        <div
                          className="p-1 w-5 h-5 bg-red-600 rounded-md flex justify-center items-center cursor-pointer"
                          onClick={() => handleDeleteClick(item.id)}
                        >
                          <RiDeleteBin6Line color="white" />
                        </div>

                        {/* Dialog Box */}
                        {isDialogOpen && (
                          <div className="fixed inset-0 bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white rounded-lg p-6 shadow-lg w-[300px]">
                              <h3 className="text-lg font-semibold">
                                Delete Confirmation
                              </h3>
                              <p className="text-sm text-gray-600 mt-2">
                                Are you sure you want to delete this item?
                              </p>
                              <div className="flex justify-end gap-2 mt-4">
                                <button
                                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
                                  onClick={handleCancel}
                                >
                                  Cancel
                                </button>
                                <button
                                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                                  onClick={handleConfirmDelete}
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

export default CvCreators;
