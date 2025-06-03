import Button from "../../components/Button";
import SearchFilter from "../../components/SearchFilter";
import Modal from "../../components/OptionModal";
import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import { getAllAppointments, updateStatus } from "../../services/consult";
import { refreshToken } from "../../services/auth";
import StatusModal from "../../components/StatusModal";
import CategoryFilter from "../../components/CategoryFilter";
import { filteredAppointments } from "../../utils/adminUtils";
export default function ScheduleList() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Semua Status");
  const [token, setToken] = useState("");
  const [statusModalOpen, setStatusModalOpen] = useState(false);

  const dataPerPage = 10;

  const fetchToken = async () => {
    const accessToken = await refreshToken();
    setToken(accessToken);
    const data = await getAllAppointments(accessToken);
    setAppointments(data);
  };

  useEffect(() => {
    fetchToken();
  }, []);

  useEffect(() => {
    if (statusModalOpen) {
      const timer = setTimeout(() => setStatusModalOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [statusModalOpen]);


  const handleStatusChange = async (newStatus) => {
    if (!selectedAppointment) return;
    try {
      await updateStatus(selectedAppointment.appointment_id, newStatus, token);
      fetchToken();
      setShowModal(false);
      setSelectedAppointment(null);
      setStatusModalOpen(true);
    } catch (err) {
      console.error("Gagal mengubah status:", err);
    }
  };

  const handleOpenModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
  };

  // Filter berdasarkan nama user
  const filteredAppointmentsList = filteredAppointments(appointments, searchTerm, selectedStatus);

  // Pagination berdasarkan hasil filter
  const totalPages = Math.ceil(filteredAppointmentsList.length / dataPerPage);
  const indexOfLast = currentPage * dataPerPage;
  const indexOfFirst = indexOfLast - dataPerPage;
  const currentAppointments = filteredAppointmentsList.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-6xl mx-auto py-8 p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-800">
        Jadwal <span className="text-cyan-800">Konsultasi User</span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg border border-gray-300 shadow-md p-4 mb-8">
        <SearchFilter
          placeholder="Cari Jadwal Konsultasi User"
          value={searchTerm}
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
        <CategoryFilter
          value={selectedStatus}
          onChange={setSelectedStatus}
          options={["Semua Status", ...new Set(appointments.map((appointment) => appointment.status))]}
        />
      </div>

      <div className="border border-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-cyan-600/85 text-white font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">User</th>
              <th className="px-6 py-4 text-left">Dokter</th>
              <th className="px-6 py-4 text-center">Hari</th>
              <th className="px-6 py-4 text-center">Waktu</th>
              <th className="px-6 py-4 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentAppointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  Tidak ada jadwal
                </td>
              </tr>
            ) : (
              currentAppointments.map((appointment) => (
                <tr
                  key={appointment.appointment_id}
                  className="border-t border-gray-300 hover:bg-cyan-50"
                >
                  <td className="px-6 py-4">{appointment.user_name}</td>
                  <td className="px-6 py-4">{appointment.doctor_name}</td>
                  <td className="px-6 py-4 text-center">{appointment.waktu}</td>
                  <td className="px-6 py-4 text-center">{appointment.hari}</td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      onClick={() => handleOpenModal(appointment)}
                      className={`rounded-md px-4 py-2 text-sm bg-white w-28 ${
                        appointment.status === "Menunggu"
                          ? "border border-yellow-500 text-yellow-500 hover:text-yellow-600 hover:bg-yellow-200"
                          : appointment.status === "Selesai" ||
                            appointment.status === "Diterima"
                          ? "border border-green-500 text-green-500 hover:text-green-600 hover:bg-green-200"
                          : "border border-red-500 text-red-500 hover:text-red-600 hover:bg-red-200"
                      }`}
                    >
                      {appointment.status}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Modal
          title="Ubah Status"
          isOpen={showModal}
          onClose={handleOpenModal}
          options={[
            { label: "Menunggu", variant: "yellow" },
            { label: "Diterima", variant: "green" },
            { label: "Dibatalkan", variant: "red" },
          ]}
          onClick={handleStatusChange}
        />
      </div>

      {/* Pagination */}
      {filteredAppointmentsList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}

      <StatusModal
        type="success"
        message="Berhasil mengubah status"
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </div>
  );
}
