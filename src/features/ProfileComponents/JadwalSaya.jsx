import { PlusCircle } from "lucide-react";
import Button from "../../components/Button";
import Modal from "../../components/AcceptModal";
import { useState, useEffect } from "react";
import axios from "axios";
import { refreshToken } from "../../services/auth";
import { getAppointmentById, updateStatus } from "../../services/consult";

const JadwalSaya = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedJadwal, setSelectedJadwal] = useState(null);
  const [jadwalKonsultasi, setJadwalKonsultasi] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const accessToken = await refreshToken();
    setToken(accessToken);
    await getAppointment(accessToken);
  };

  const getAppointment = async (accessToken) => {
    try {
      const data = await getAppointmentById(accessToken);
      setJadwalKonsultasi(data);
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
      await updateStatus(selectedJadwal.appointment_id, "Dibatalkan", token);
      getAppointment(token);
      setShowModal(false);
    } catch (err) {
      console.error("Gagal membatalkan jadwal:", err);
    }
  };

  return (
    <>
      <div className="p-6 max-w-6xl mx-auto mb-5">
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
            <div className="grid grid-cols md:grid-cols-2 gap-4">
              {jadwalKonsultasi.map((jadwal) => (
                <div
                  key={jadwal.appointment_id}
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
