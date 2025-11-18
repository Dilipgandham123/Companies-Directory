import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}) {
  return (
    <div className="flex justify-center items-center gap-6 mt-8">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg border border-purple-600
                   hover:bg-purple-600 hover:text-white transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={18} /> Previous
      </button>

      <span className="text-white font-semibold text-lg">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-2 bg-white text-purple-600 font-semibold rounded-lg border border-purple-600
                   hover:bg-purple-600 hover:text-white transition-all duration-300 
                   disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next <ChevronRight size={18} />
      </button>
    </div>
  );
}