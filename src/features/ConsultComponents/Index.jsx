import { useEffect, useState } from "react"
import { specialties, categories } from "./doctors"
import DoctorModal from "./DoctorModal"
import SearchFilter from "../../components/SearchFilter"
import SortDropdown from "../../components/SortDropdown"
import DoctorConsult  from "./DoctorConsult2"
import Button from "../../components/Button"
import CategoryFilter from "../../components/CategoryFilter"
import axios from "axios"
import { refreshToken } from "../../services/auth"
import { jwtDecode } from "jwt-decode"

export default function ConsultPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("Semua Spesialis")
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [sortBy, setSortBy] = useState("rating")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const getDoctor = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/doctors`)
    const data = response.data
    setDoctors(data)
  } catch (error) {
    console.error("Gagal mengambil data dokter:", error)
    setDoctors([])
  }
}

  const init = async () => {
    await getDoctor();
    const accessToken = await refreshToken();
    const decoded = jwtDecode(accessToken);
    setRole(decoded.role);
    setId(decoded.id);
    if (accessToken) setToken(accessToken);
  };

  useEffect(() => {
    init()
  }, [])

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.full_name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "Semua Spesialis" || doctor.specialization === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  // Sort doctors based on selected criteria
  //const sortedDoctors = [...filteredDoctors].sort((a, b) => {
  //  if (sortBy === "rating") {
  //    return b.rating - a.rating
  //  } else if (sortBy === "experience") {
  //    return Number.parseInt(b.experience) - Number.parseInt(a.experience)
  //  } else if (sortBy === "price") {
  //    return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
  //  }
  //  return 0
  //})
  
  const openBookingDialog = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex mb-6 text-cyan-800 justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold mb-2">Konsultasi Dokter</h1>
            <p className="text-md font-semibold">Konsultasi Dengan Dokter Terbaik Kami Disini</p>
        </div>
         {role === "user" && (
            <Button as = "link" to="/profile/schedule" variant="blue" className="rounded-md">
               My Schedule
            </Button>
         )}
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SearchFilter 
            placeholder="Cari dokter..."
            value={searchTerm} 
            onChange={setSearchTerm} 
          />
          <CategoryFilter
            value={selectedSpecialty}
            onChange={setSelectedSpecialty}
            options={specialties}
          />
        </div>
      </div>

      {/* Doctor Listing */}
      {filteredDoctors.length > 0 ? (
        <DoctorConsult 
          doctors={filteredDoctors} 
          openBookingDialog={openBookingDialog} 
          token={token}
        />
      ) : (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">Tidak ada dokter yang ditemukan</h3>
          <p className="text-gray-600 mt-2">Coba ubah filter atau kata kunci pencarian Anda</p>
        </div>
      )}

      {/* Modal */}
      <DoctorModal
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        selectedDoctor={selectedDoctor}
        token={token}
        Id={id}
      />

    </div>
  )
}

