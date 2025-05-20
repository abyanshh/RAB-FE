import { useState } from "react"
import { doctors, specialties, categories } from "./doctors"
import DoctorModal from "./DoctorModal"
import SearchFilter from "../../components/SearchFilter"
import SortDropdown from "../../components/SortDropdown"
import DoctorConsult  from "./DoctorConsult"
import Button from "../../components/Button"
import CategoryFilter from "../../components/CategoryFilter"

export default function ConsultPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("Semua Spesialis")
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [selectedDay, setSelectedDay] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [bookingSuccess, setBookingSuccess] = useState(false)
  const [sortBy, setSortBy] = useState("rating")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [user, setUser] = useState(false);

  // Filter doctors based on search term and specialty
  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty = selectedSpecialty === "Semua Spesialis" || doctor.specialty === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  // Sort doctors based on selected criteria
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating
    } else if (sortBy === "experience") {
      return Number.parseInt(b.experience) - Number.parseInt(a.experience)
    } else if (sortBy === "price") {
      return Number.parseInt(a.price.replace(/\D/g, "")) - Number.parseInt(b.price.replace(/\D/g, ""))
    }
    return 0
  })

  const handleBookAppointment = () => {
    console.log("Booking appointment with:", selectedDoctor)
    console.log("Day:", selectedDay)
    console.log("Time:", selectedTime)
    setBookingSuccess(true)
    setTimeout(() => {
      setIsModalOpen(false)
      setBookingSuccess(false)
    }, 3000)
  }

  const openBookingDialog = (doctor) => {
    setSelectedDoctor(doctor)
    setSelectedDay(doctor.availability[0].day)
    setSelectedTime("")
    setIsModalOpen(true)
    setBookingSuccess(false)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setBookingSuccess(false)
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex mb-6 text-cyan-800 justify-between items-center">
        <div>
            <h1 className="text-3xl font-bold mb-2">Konsultasi Dokter</h1>
            <p className="text-md font-semibold">Konsultasi Dengan Dokter Terbaik Kami Disini</p>
        </div>
        <Button as = "link" to={user ? "/schedulelist" : "/login"} variant="blue" className="rounded-md">
            My Schedule
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white rounded-lg shadow-md p-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <SearchFilter 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <CategoryFilter
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            options={specialties}
          />
          <SortDropdown 
            sortBy={sortBy} 
            setSortBy={setSortBy} 
            categories={categories}
          />
        </div>
      </div>

      {/* Doctor Listing */}
      {sortedDoctors.length > 0 ? (
        <DoctorConsult 
          doctors={sortedDoctors} 
          openBookingDialog={openBookingDialog} 
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
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        bookingSuccess={bookingSuccess}
        handleBookAppointment={handleBookAppointment}
      />
    </div>
  )
}
