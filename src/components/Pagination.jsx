export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const renderPageNumbers = () => {
    return Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
      <button
        key={number}
        onClick={() => onPageChange(number)}
        className={`px-3 py-1 rounded ${
          currentPage === number
            ? 'bg-cyan-600 text-white'
            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'
        }`}
      >
        {number}
      </button>
    ));
  };

  return (
    <div className="flex justify-between items-center py-4 flex-wrap gap-2">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:opacity-50"
      >
        Sebelumnya
      </button>

      <div className="flex gap-2">{renderPageNumbers()}</div>

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:opacity-50"
      >
        Selanjutnya
      </button>
    </div>
  );
}
