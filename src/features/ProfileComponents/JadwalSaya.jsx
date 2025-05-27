import { PlusCircle } from "lucide-react";
import Button from "../../components/Button";
import Modal from "../../components/AcceptModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { refreshToken } from "../../services/auth";

const JadwalSaya = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [jadwalKonsultasi, setJadwalKonsultasi] = useState([]);
  const [token, setToken] = useState("");
  //const jadwalKonsultasi = [
  //  { id: 1, tanggal: '2022-01-01', waktu: '10:00 AM', psikolog: 'Dr. John Doe', status: 'Menunggu Konfirmasi' },
  //  { id: 2, tanggal: '2022-01-02', waktu: '11:00 AM', psikolog: 'Dr. Jane Smith', status: 'Terkonfirmasi' },
  //  { id: 3, tanggal: '2022-01-03', waktu: '12:00 PM', psikolog: 'Dr. Bob Johnson', status: 'Ditolak' },
  //];

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const accessToken = await refreshToken();
    if (accessToken) {
      setToken(accessToken);
      await getAppointment(accessToken);
    }
  };

  const getAppointment = async (accessToken) => {
    try {
      const res = await axios.get("http://localhost:5000/appointments/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        withCredentials: true,
      });

      setJadwalKonsultasi(res.data);
    } catch (err) {
      console.error("Gagal mengambil jadwal:", err);
    }
  };

  const handleDelete = (jadwal) => {
    setSelectedJadwal(jadwal);
    setShowModal(true);
  };

  const handleStatus = async () => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/appointments/${selectedJadwal.appointment_id}/status`,
        { status: "Dibatalkan" },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );
      getAppointment(token);
      setShowModal(false);
      alert("Jadwal berhasil dibatalkan!");
    } catch (err) {
      console.error("Gagal membatalkan jadwal:", err);
    }
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto mt-20 mb-5">
        <h2 className="text-2xl font-semibold text-cyan-800 mb-4">
          Jadwal Saya
        </h2>
        {!jadwalKonsultasi || jadwalKonsultasi.length === 0 ? (
          <div className="space-y-2">
            <p className=" text-gray-600 font-semibold">
              Belum ada jadwal konsultasi
            </p>
            <Button
              to="/consult"
              as="link"
              variant={"blue"}
              className="flex rounded-md items-center gap-2 max-w-fit bg-white"
            >
              <PlusCircle size={16} />
              Buat Jadwal
            </Button>
          </div>
        ) : (
          <div className="py-2">
            <div className="grid grid-cols md:grid-cols-2  gap-4">
              {jadwalKonsultasi.map((jadwal) => (
                <div
                  key={jadwal.id}
                  className="border border-cyan-700 rounded-xl p-5 bg-white shadow-lg space-y-4"
                >
                  <div className="space-y-2 text-gray-700">
                    <p>
                      <span className="font-semibold">🕒 Waktu:</span>{" "}
                      {jadwal.waktu}
                    </p>
                    <p>
                      <span className="font-semibold">📅 Hari:</span>{" "}
                      {jadwal.hari}
                    </p>
                    <p>
                      <span className="font-semibold">👩‍⚕️ Psikolog:</span>{" "}
                      {jadwal.doctor_name}
                    </p>
                    <p>
                      <span className="font-semibold">📝 Catatan:</span>{" "}
                      {jadwal.notes}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p> 
                      <span className="font-semibold ">📌 Status:</span>{" "}
                      <span
                        className={`font-medium px-2 py-1 rounded-md
                                    ${
                                      jadwal.status === "Diterima" ||
                                      jadwal.status === "Selesai"
                                        ? "bg-green-100 text-green-700"
                                        : jadwal.status === "Menunggu"
                                        ? "bg-yellow-100 text-yellow-700"
                                        : "bg-red-100 text-red-700"
                                    }
                                  `}
                      >
                        {jadwal.status}
                      </span>
                    </p>

                    {jadwal.status === "Menunggu" && (
                      <Button
                        variant="red"
                        className="rounded-md text-sm"
                        onClick={() => handleDelete(jadwal)}
                      >
                        Batalkan
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {showModal && (
        <Modal
          title="Batalkan Konsultasi"
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleStatus}
          confirmText={"Ya, Batalkan"}
          cancelText={"Tidak"}
          message={`Anda yakin ingin membatalkan konsultasi dengan ${selectedJadwal?.doctor_name}?`}
        />
      )}
    </>
  );
};

export default JadwalSaya;
