"use client";
import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) {
      start = 1;
      end = Math.min(totalPages, maxVisible);
    }

    if (currentPage >= totalPages - 2) {
      start = Math.max(1, totalPages - 4);
      end = totalPages;
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();

  return (
    <nav className="flex justify-center sm:justify-end items-center mt-5">
      <ul className="flex flex-wrap gap-1">
        {/* Prev */}
        <li>
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === 1
                ? "bg-purple-200 text-gray-400 cursor-not-allowed"
                : "bg-purple-400 text-white hover:bg-purple-500"
            }`}
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
        </li>

        {/* First page + ellipsis */}
        {visiblePages[0] > 1 && (
          <>
            <li>
              <button
                className="px-3 py-1 border rounded hover:bg-purple-100"
                onClick={() => onPageChange(1)}
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && <li className="px-2 py-1">...</li>}
          </>
        )}

        {/* Main Page Numbers */}
        {visiblePages.map((page) => (
          <li key={page}>
            <button
              className={`px-3 py-1 border rounded ${
                page === currentPage
                  ? "bg-purple-500 text-white"
                  : "hover:bg-purple-100"
              }`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Last page + ellipsis */}
        {visiblePages[visiblePages.length - 1] < totalPages && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="px-2 py-1">...</li>
            )}
            <li>
              <button
                className="px-3 py-1 border rounded hover:bg-purple-100"
                onClick={() => onPageChange(totalPages)}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Next */}
        <li>
          <button
            className={`px-3 py-1 border rounded ${
              currentPage === totalPages
                ? "bg-purple-200 text-gray-400 cursor-not-allowed"
                : "bg-purple-400 text-white hover:bg-purple-500"
            }`}
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
