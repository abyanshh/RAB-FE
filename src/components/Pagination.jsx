import Button from "./Button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 5);
  };

  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
      <Button
        key={number}
        onClick={() => handlePageChange(number)}
        className={`px-3 py-1 rounded w-10 ${
          currentPage === number
            ? 'bg-cyan-600 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        {number}
      </Button>
    ));
  };

  return (
    <div className="flex justify-between items-center py-4 flex-wrap gap-2">
      <button
        onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:opacity-50 flex items-center"
      >
        <ChevronLeft className="mr-2" />
        <p className="hidden md:block">Sebelumnya</p>
      </button>

      <div className="flex gap-2">{renderPageNumbers()}</div>

      <button
        onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:opacity-50 flex items-center"
      >
        <p className="hidden md:block">Selanjutnya</p>
        <ChevronRight className="ml-2" />
      </button>
    </div>
  );
}
