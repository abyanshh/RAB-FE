import { X } from "lucide-react";

export default function DoctorModal({
  isModalOpen,
  closeModal,
  selectedDoctor,
  selectedDay,
  setSelectedDay,
  selectedTime,
  setSelectedTime,
  bookingSuccess,
  handleBookAppointment,
}) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div
            className="absolute inset-0 bg-gray-500 opacity-75"
            onClick={closeModal}
          ></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onClick={closeModal}
            >
              <span className="sr-only">Close</span>
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white px-4 py-5">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 w-full">
                {bookingSuccess ? (
                  <div className="py-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Janji Berhasil Dibuat!
                    </h3>
                    <p className="text-gray-600">
                      Anda telah berhasil membuat janji dengan{" "}
                      {selectedDoctor?.name} pada {selectedDay}, pukul{" "}
                      {selectedTime}.
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Buat Janji dengan {selectedDoctor?.name}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Pilih hari dan waktu yang tersedia untuk konsultasi
                        Anda.
                      </p>
                    </div>
                    <div className="mt-4 space-y-4">
                      <div>
                        <label
                          htmlFor="day"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Pilih Hari
                        </label>
                        <select
                          id="day"
                          className="mt-1 block w-full px-3 py-2 text-base border-gray-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md border"
                          value={selectedDay}
                          onChange={(e) => setSelectedDay(e.target.value)}
                        >
                          <option value="" disabled>
                            Pilih hari
                          </option>
                          {selectedDoctor?.availability.map((avail) => (
                            <option key={avail.day} value={avail.day}>
                              {avail.day}
                            </option>
                          ))}
                        </select>
                      </div>

                      {selectedDay && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Pilih Waktu
                          </label>
                          <div className="grid grid-cols-3 gap-2">
                            {selectedDoctor?.availability
                              .find((avail) => avail.day === selectedDay)
                              ?.slots.map((time) => (
                                <div key={time} className="flex items-center">
                                  <input
                                    type="radio"
                                    id={`time-${time}`}
                                    name="time"
                                    value={time}
                                    checked={selectedTime === time}
                                    onChange={() => setSelectedTime(time)}
                                    className="focus:ring-cyan-500 h-4 w-4 text-cyan-600 border-gray-300"
                                  />
                                  <label
                                    htmlFor={`time-${time}`}
                                    className="ml-2 block text-sm text-gray-700"
                                  >
                                    {time}
                                  </label>
                                </div>
                              ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {!bookingSuccess && (
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="button"
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-cyan-600 text-base font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:ml-3 sm:w-auto sm:text-sm ${
                  !selectedDay || !selectedTime
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                onClick={handleBookAppointment}
                disabled={!selectedDay || !selectedTime}
              >
                Konfirmasi Janji
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={closeModal}
              >
                Batal
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
