import { Search } from "lucide-react"

export default function SearchFilter({ value, onChange }) {
  return (
    <div className="relative">
    <Search
      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      size={18}
    />
    <input
      type="text"
      placeholder="Cari dokter..."
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
      value={value}
      onChange={onChange}
    />
  </div>
  )
}

