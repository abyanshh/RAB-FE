import { MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DoctorConsult({ doctors, openBookingDialog, token, user, setStatusModalOpen }) {
  const navigate = useNavigate();
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {doctors.map((doctor, index) => (
        <div
          key={index}
          className="bg-white rounded-lg border border-gray-200 shadow-md overflow-hidden hover:scale-105 duration-500"
        >
          <div className="flex flex-col h-full">
            <div className="p-4 flex gap-4 h-full">
              <img
                src={doctor.avatar_url || "/image/image.png"}
                alt={doctor.full_name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex flex-col h-full">
                <h3 className="font-bold text-lg">{doctor.full_name}</h3>
                <p className="text-gray-600">{doctor.specialization}</p>
                <p className="text-gray-600 text-xs">
                  {doctor.bio ? `"${doctor.bio}"` : ""}
                </p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">
                    {doctor.average_rating}
                  </span>
                  <span className="ml-1 text-sm text-gray-500">
                    ({doctor.total_reviews || 0} ulasan)
                  </span>
                </div>
              </div>
            </div>
            <div className="px-4 pb-4 flex-grow">
              <div className="flex items-center text-sm text-gray-600 mb-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{doctor.location}</span>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Hari Tersedia:</h4>
                <div className="flex flex-wrap gap-1 mb-2">
                  {doctor.hari.map((avail, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                    >
                      {avail}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <button
                className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                onClick={() => {
                  if (token && user.phone_number) {
                    openBookingDialog(doctor);
                  } else if (!token) {
                    navigate("/login");
                  } else if (!user.phone_number) {
                    setStatusModalOpen(true);
                  } 
                }}
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

