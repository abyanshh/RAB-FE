import { useState, useEffect, useRef } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/auth";
import { getUserById } from "../../services/user";
import Button from "../../components/Button";
import { Camera } from "lucide-react";

const ProfilSaya = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState("");
  const fileInputRef = useRef();

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    const token = await refreshToken();
    const decoded = jwtDecode(token);
    await getUser(decoded.id, token);
  };

  const getUser = async (id, token) => {
    try {
      const data = await getUserById(id, token);
      setUser(data);
      setPreview(data.avatar_url);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const handleClickPhoto = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    const token = await refreshToken();
    const decoded = jwtDecode(token);
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/users/update/${decoded.id}/avatar`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message);
      }

      setPreview(result.avatar_url);
    } catch (error) {
      console.error("Gagal upload foto:", error.message);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-cyan-800 mb-6 text-center">
        Profil Saya
      </h2>

      <div className="bg-white border border-cyan-700 shadow-lg rounded-2xl p-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Foto Profil */}
          <div className="flex-shrink-0 relative group w-32 h-32">
            {/* Gambar Profil */}
            <img
              src={preview || "image/image.png"}
              alt="Foto Profil"
              className="w-full h-full rounded-full object-cover border-4 border-cyan-500 shadow-md cursor-pointer transition-transform group-hover:scale-105"
              onClick={handleClickPhoto}
            />

            {/* Input file tersembunyi */}
            <input
              type="file"
              accept=".jpg, .jpeg, .png"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />

            {/* Overlay saat hover */}
            <div
              onClick={handleClickPhoto}
              className="absolute inset-0 bg-gray-500/75 rounded-full flex items-center justify-center text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition duration-300 cursor-pointer"
            >
              <Camera className="w-10 h-10" />
            </div>
          </div>

          {/* Informasi User */}
          <div className="flex-1 space-y-3 text-gray-700">
            <p>
              <span className="font-semibold">👤 Username:</span>{" "}
              {user?.username}
            </p>
            <p>
              <span className="font-semibold">📧 Email:</span> {user?.email}
            </p>
            <p>
              <span className="font-semibold">🪪 Nama Lengkap:</span>{" "}
              {user?.full_name}
            </p>
            <p>
              <span className="font-semibold">📱 No. HP:</span>{" "}
              {user?.phone_number}
            </p>
            <p>
              <span className="font-semibold">🏠 Alamat:</span> {user?.alamat}
            </p>
            <p>
              <span className="font-semibold">🎂 Tanggal Lahir:</span>{" "}
              {user?.tanggal_lahir?.slice(0, 10)}
            </p>
          </div>
        </div>

        {/* Tombol Update */}
        <div className="pt-6 flex justify-end">
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
