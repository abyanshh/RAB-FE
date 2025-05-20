import { Clock, MapPin, Star } from "lucide-react";

export default function DoctorConsult({ doctors, openBookingDialog }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex gap-4">
              <img
                src={doctor.image || "/placeholder.svg"}
                alt={doctor.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <h3 className="font-bold text-lg">{doctor.name}</h3>
                <p className="text-gray-600 min-h-12">{doctor.specialty}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">
                    {doctor.rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({doctor.reviews} ulasan)
                  </span>
                </div>
              </div>
            </div>

            <div className="px-4 pb-4 flex-grow">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <Clock className="h-4 w-4 mr-2" />
                <span>{doctor.experience} pengalaman</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center text-sm font-medium mt-3">
                <span>Biaya Konsultasi: {doctor.price}</span>
              </div>

              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Jadwal Tersedia:</h4>
                <div className="flex flex-wrap gap-1">
                  {doctor.availability.map((avail) => (
                    <span
                      key={avail.day}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {avail.day}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                onClick={() => openBookingDialog(doctor)}
              >
                Buat Janji
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
