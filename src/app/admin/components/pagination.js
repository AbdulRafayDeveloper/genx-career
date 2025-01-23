import React, { useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex justify-end items-center my-4">
      <ul className="inline-flex -space-x-px">
        {/* Previous Button */}
        <li>
          <button
            className={`px-3 py-2 rounded-l-lg mt-1 ${
              currentPage === 1
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
        </li>

        {/* Page Numbers */}
        {getPages().map((page) => (
          <li key={page}>
            <button
              className={`px-2 py-1 mx-1 border ${
                page === currentPage
                  ? "bg-purple-500 text-white"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            className={`px-3 py-2 rounded-r-lg  ${
              currentPage === totalPages
                ? "cursor-not-allowed bg-gray-200 text-gray-400"
                : "hover:bg-gray-100"
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            <FaArrowRight />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
