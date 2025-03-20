"use client";
import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight, FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <nav className="flex justify-end items-center mt-5">
      <div className="flex jusitify-center items-center shadow-md p-2 ">
      <ul className="inline-flex space-x-px">
        {/* Previous Button */}
        <li>
          <button
            className={`p-1 bg-purple-400  border-2 border-purple-200 mr-3 ${
              currentPage === 1
                ? "cursor-not-allowed  bg-purple-200 text-gray-500"
                : "hover:text-purple-900"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            {/* <FaAngleLeft /> */}Prev
          </button>
        </li>

        {/* Page Numbers */}
        {getPages().map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 border-2 border-purple-200  ${
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
            className={`p-1 bg-purple-400  border-2 border-purple-200 ml-3 ${
              currentPage === totalPages
                ? "cursor-not-allowed text-gray-500 bg-purple-200"
                : "hover:text-purple-900"
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            {/* <FaAngleRight /> */}Next
          </button>
        </li>
      </ul>
      </div>
    </nav>
  );
};

export default Pagination;
