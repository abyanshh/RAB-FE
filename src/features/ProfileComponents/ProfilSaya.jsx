import { useState, useEffect, useRef, useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/auth";
import { getUserById } from "../../services/user";
import Button from "../../components/Button";
import { Camera, UserCog } from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../../utils/cropImage";
import Modal from "../../components/Modal";

const ProfilSaya = () => {
  const [user, setUser] = useState({});
  const [preview, setPreview] = useState("");
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCropModal, setShowCropModal] = useState(false);
  const [isUploading, setIsUpLoading] = useState(false);
  const fileInputRef = useRef();

  useEffect(() => {
    const init = async () => {
      const token = await refreshToken();
      const decoded = jwtDecode(token);
      const data = await getUserById(decoded.id, token);
      setUser(data);
      setPreview(data.avatar_url);
    };
    init();
  }, []);

  const handleClickPhoto = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropModal(true);
      e.target.value = null; // Reset input agar file yang sama bisa dipilih ulang
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleCropSave = async () => {
    setIsUpLoading(true);
    try {
      const croppedImageBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      const token = await refreshToken();
      const decoded = jwtDecode(token);

      const formData = new FormData();
      formData.append("avatar", croppedImageBlob, "cropped.jpg");

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/users/update/${decoded.id}/avatar`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      setPreview(result.avatar_url);
      setShowCropModal(false);
    } catch (err) {
      console.error("Gagal meng-upload:", err);
    } finally {
      setIsUpLoading(false);
    }
  };

  const handleCancelCrop = () => {
    setShowCropModal(false);
    setImageSrc(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-cyan-700 mb-8">Profil Saya</h2>

      <div className="bg-white border-1 border-cyan-700 px-5 py-4 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group w-36 h-36 shrink-0">
            <img
              src={preview || "image/image.png"}
              alt="Foto Profil"
              className="w-full h-full rounded-full object-cover shadow-lg cursor-pointer group-hover:scale-105 transition-transform duration-300"
              onClick={handleClickPhoto}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
            />
            <div
              onClick={handleClickPhoto}
              className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer scale-105"
            >
              <Camera className="w-8 h-8" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2 text-gray-800 w-full">
            <div className="rounded-md bg-white hover:bg-cyan-500 hover:scale-105 px-3 py-2 duration-300">
              <span className="font-semibold inline-block w-32 mr-2">Username</span>:  {user.username}
            </div>
            <div className="rounded-md bg-white hover:bg-cyan-500 hover:scale-105 px-3 py-2 duration-300">
              <span className="font-semibold inline-block w-32 mr-2">Email</span>: {user.email}
            </div>
            <div className="rounded-md bg-white hover:bg-cyan-500 hover:scale-105 px-3 py-2 duration-300">
              <span className="font-semibold inline-block w-32 mr-2">Nama Lengkap</span>: {user.full_name}
            </div>
            <div className="rounded-md bg-white hover:bg-cyan-500 hover:scale-105 px-3 py-2 duration-300">
              <span className="font-semibold inline-block w-32 mr-2">No. HP</span>: {user.phone_number}
            </div>
            <div className="rounded-md bg-white hover:bg-cyan-500 hover:scale-105 px-3 py-2 duration-300">
              <span className="font-semibold inline-block w-32 mr-2">Alamat</span>: {user.alamat}
            </div>
            <div className="rounded-md bg-white hover:bg-cyan-500 hover:scale-105 px-3 py-2 duration-300">
              <span className="font-semibold inline-block w-32 mr-2">Tanggal Lahir</span>: {user?.tanggal_lahir?.slice(0, 10)}
            </div>
          </div>
        </div>

      </div>
        <div className="flex justify-end mt-6 mb-">
          <Button as="link" to="/profile/update" variant="blue" className="flex gap-2 rounded-md hover:scale-105 transition-transform">
             <UserCog/>Update Profil
          </Button>
        </div>

      <Modal isOpen={showCropModal} onClose={handleCancelCrop} title="Crop Foto">
        <div className="relative w-full h-[300px] bg-gray-100 rounded-lg overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-end mt-4 gap-2">
          {!isUploading && (
            <Button variant="gray" onClick={handleCancelCrop}>
              Batal
            </Button>
          )}
          <Button className="flex items-center gap-2" variant="blue" onClick={handleCropSave} disabled={isUploading}>
            {isUploading && (
              <svg className="w-4 h-4 mr-2 animate-spin text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
            )}
            {isUploading ? "Menyimpan..." : "Simpan"}
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProfilSaya;
