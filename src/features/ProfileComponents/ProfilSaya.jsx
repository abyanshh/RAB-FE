import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/auth";
import axios from "axios";
import Button from "../../components/Button";
const ProfilSaya = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const accessToken = await refreshToken();
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      await getUser(decoded.id);
    }
  };
  const getUser = async (Id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users/${Id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20">
      <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Profil Saya</h2>
      <div className="bg-white border border-cyan-700 shadow-lg rounded-xl p-6 text-base space-y-4 divide-y divide-gray-200">
        <div className="space-y-2 text-gray-700">
          <p>
            <span className="font-semibold">👤 Username:</span> {user?.username}
          </p>
          <p>
            <span className="font-semibold">🪪 Nama Lengkap:</span>{" "}
            {user?.full_name}
          </p>
          <p>
            <span className="font-semibold">📧 Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-semibold">📱 No. HP:</span>{" "}
            {user?.phone_number}
          </p>
          <p className="col-span-2">
            <span className="font-semibold">🏠 Alamat:</span> {user?.alamat}
          </p>
          <p className="col-span-2">
            <span className="font-semibold">🎂 Tanggal Lahir:</span>{" "}
            {user?.tanggal_lahir?.slice(0, 10) || "-"}
          </p>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            as="link"
            variant="yellow"
            className="rounded-md"
            to="/profile/update"
          >
            ✏️ Update
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilSaya;
