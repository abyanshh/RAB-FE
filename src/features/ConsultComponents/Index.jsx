import { useEffect, useState } from "react";
import { getUserById } from "../../services/user";
import DoctorModal from "./DoctorModal";
import SearchFilter from "../../components/SearchFilter";
import SortDropdown from "../../components/SortDropdown";
import DoctorConsult from "./DoctorConsult";
import Button from "../../components/Button";
import CategoryFilter from "../../components/CategoryFilter";
import { refreshToken } from "../../services/auth";
import { jwtDecode } from "jwt-decode";
import { filterDoctors, sortDoctors } from "../../utils/doctorUtils";
import { getAllDoctor } from "../../services/doctor";
import StatusModal from "../../components/StatusModal";
import { BookMarked } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ConsultPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("Semua Spesialis");
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  //const [sortBy, setSortBy] = useState("rating");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");
  const [id, setId] = useState("");
  const [user, setUser] = useState({});
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const filteredDoctors = filterDoctors(doctors, searchTerm, selectedSpecialty);
  //const sortedDoctors = sortDoctors(filteredDoctors, sortBy);

  const getDoctor = async () => {
    try {
      const data = await getAllDoctor();
      setDoctors(data);
    } catch (error) {
      console.error("Gagal mengambil data dokter:", error);
      setDoctors([]);
    }
  };

  const getUser = async (Id, token) => {
    try {
      const data = await getUserById(Id, token);
      setUser(data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const init = async () => {
    await getDoctor();
    const accessToken = await refreshToken();
    const decoded = jwtDecode(accessToken);
    setToken(accessToken);
    setRole(decoded.role);
    await getUser(decoded.id, accessToken);
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (statusModalOpen) {
      const timer = setTimeout(() => setStatusModalOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [statusModalOpen]);

  const openBookingDialog = (doctor) => {
    setSelectedDoctor(doctor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const fadeUp = {
    hidden: { opacity: 0 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 1 },
    }),
  };

  return (
    <>
      <motion.div
        className="max-w-6xl mx-auto py-8 px-4"
        initial="hidden"
        animate="visible"
        variants={fadeUp}
      >
        <div className="flex mb-6 text-cyan-800 justify-between items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">Konsultasi Dokter</h1>
            <p className="text-md font-semibold">
              Konsultasi Dengan Dokter Terbaik Kami Disini
            </p>
          </div>
          {role === "user" && (
            <Button
              as="link"
              to="/profile/schedule"
              variant="blue"
              className="rounded-md"
            >
              <span className="hidden md:block">Jadwal Saya</span>
              <BookMarked className="block md:hidden" />
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
              options={[
                "Semua Spesialis",
                ...new Set(doctors.map((doctor) => doctor.specialization)),
              ]}
            />
          </div>
        </div>

        {/* Doctor Listing */}
        {filteredDoctors.length > 0 ? (
          <DoctorConsult
            doctors={filteredDoctors}
            openBookingDialog={openBookingDialog}
            token={token}
            user={user}
            setStatusModalOpen={setStatusModalOpen}
          />
        ) : (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">
              Tidak ada dokter yang ditemukan
            </h3>
            <p className="text-gray-600 mt-2">
              Coba ubah filter atau kata kunci pencarian Anda
            </p>
          </div>
        )}

        {/* Modal */}
      </motion.div>
      <StatusModal
        type="error"
        message="Tambahkan nomor hp di profil terlebih dahulu"
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            key="doctor-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
          >
            <DoctorModal
              isModalOpen={true}
              closeModal={closeModal}
              selectedDoctor={selectedDoctor}
              token={token}
              Id={id}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
