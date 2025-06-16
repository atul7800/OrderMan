import React from "react";

export default function Pagination({totalPages, currentPage, onPageChange}) {
  return (
    <div className="flex justify-center mt-6 gap-2">
      {Array.from({length: totalPages}, (_, i) => (
        <button
          key={i + 1}
          onClick={() => onPageChange(i + 1)}
          className={`w-9 h-9 rounded-md text-sm cursor-pointer border border-gray-300 ${
            currentPage === i + 1
              ? "bg-black text-white"
              : "bg-white text-gray-600 hover:bg-gray-300"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
