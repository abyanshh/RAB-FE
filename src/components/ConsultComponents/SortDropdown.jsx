import { useState, useRef, useEffect } from "react";
import { Filter } from "lucide-react";

export default function SortDropdown({ sortBy, setSortBy }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-full flex items-center justify-between px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="flex items-center gap-2">
          <Filter size={18} />
          Urutkan:{" "}
          {sortBy === "rating"
            ? "Rating"
            : sortBy === "experience"
            ? "Pengalaman"
            : "Harga"}
        </span>
        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
          <svg
            className="w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="py-1 border-b border-gray-200 px-3 text-sm font-medium text-gray-700">
            Urutkan Berdasarkan
          </div>
          <div className="py-1">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSortBy("rating");
                setIsDropdownOpen(false);
              }}
            >
              Rating Tertinggi
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSortBy("experience");
                setIsDropdownOpen(false);
              }}
            >
              Pengalaman Terbanyak
            </button>
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                setSortBy("price");
                setIsDropdownOpen(false);
              }}
            >
              Harga Terendah
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
