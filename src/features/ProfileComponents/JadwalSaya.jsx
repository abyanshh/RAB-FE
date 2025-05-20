import { PlusCircle } from "lucide-react";
import Button from "../../components/Button";
import  Modal  from "../../components/Modal";
import { useState } from "react";

const JadwalSaya = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedJadwal, setSelectedJadwal] = useState(null);
    const jadwalKonsultasi = [
      { id: 1, tanggal: '2022-01-01', waktu: '10:00 AM', psikolog: 'Dr. John Doe', status: 'Menunggu Konfirmasi' },
      { id: 2, tanggal: '2022-01-02', waktu: '11:00 AM', psikolog: 'Dr. Jane Smith', status: 'Terkonfirmasi' },
      { id: 3, tanggal: '2022-01-03', waktu: '12:00 PM', psikolog: 'Dr. Bob Johnson', status: 'Ditolak' },
    ];
  
    const handleDelete = (jadwal) => {
      setSelectedJadwal(jadwal);
      setShowModal(true);
    };
  
    const handleConfirmDelete = () => {
      console.log(`Batalkan konsultasi dengan ${selectedJadwal.psikolog}`);
      setShowModal(false);
    };
  
    return (
      <>
        <div className="p-6 max-w-3xl mx-auto mt-20">
          <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Jadwal Saya</h2>
            {!jadwalKonsultasi || jadwalKonsultasi.length === 0 ? (
              <div className="space-y-2">
                <p className=" text-gray-600 font-semibold">Belum ada jadwal konsultasi</p>
                <Button to="/consult" as ="link" variant={"blue"} className="flex rounded-md items-center gap-2 max-w-fit">
                  <PlusCircle/>
                  Buat Jadwal
                </Button>
              </div>
              
            ) : (
              <div className="py-2">
                <div className="space-y-4">
                {jadwalKonsultasi.map((jadwal) => (
                  <div
                    key={jadwal.id}
                    className="rounded-lg p-4 bg-white shadow-md space-y-1"
                  >
                    <p><span className="font-semibold">Tanggal:</span> {jadwal.tanggal}</p>
                    <p><span className="font-semibold">Waktu:</span> {jadwal.waktu}</p>
                    <p><span className="font-semibold">Psikolog:</span> {jadwal.psikolog}</p>
                    <p>
                      <span className="font-semibold">Status:</span>{" "}
                      <span
                        className={
                          jadwal.status === "Terkonfirmasi"
                            ? "text-green-600"
                            : jadwal.status === "Menunggu Konfirmasi"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {jadwal.status}
                      </span>
                    </p>
                    {jadwal.status == "Menunggu Konfirmasi" && (
                      <div className="flex justify-end">
                        <Button variant="red" className="rounded-md text-sm" onClick={() => handleDelete(jadwal)}>
                          Batalkan
                        </Button>
                      </div>
                    )}
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
            onConfirm={handleConfirmDelete}
            message={`Anda yakin ingin membatalkan konsultasi dengan ${selectedJadwal?.psikolog}?`}
          />
        )}
      </>
    );
  };
  
  export default JadwalSaya;
