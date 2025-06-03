import Button from "../../components/Button";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUserById } from "../../services/user";
const UpdateProfil = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const accessToken = await refreshToken();
    const decoded = jwtDecode(accessToken);
    setToken(accessToken);
    await getUser(decoded.id, accessToken);
  };

  const getUser = async (Id, token) => {
    try {
      const data = await getUserById(Id, token);
      setUser(data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const data = {
        username: user?.username,
        full_name: user?.full_name,
        phone_number: user?.phone_number,
        alamat: user?.alamat,
        tanggal_lahir: user?.tanggal_lahir,
      };
      const updatedUser = await updateUserById(user.user_id, data, token);
      setUser(updatedUser);
      Navigate("/profile");
    } catch (error) {
      console.error("Gagal mengupdate data user:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    handleUpdate();
  };

  return (
    <div className="p-6 max-w-3xl mx-auto mt-20 mb-5">
      <h2 className="text-2xl font-semibold text-cyan-800 mb-4">
        Update Profil
      </h2>
      <form
        className="bg-white border border-cyan-700 shadow-md rounded-lg p-6 space-y-4"
        onSubmit={handleChange}
      >
        <div>
          <label className="block font-semibold mb-2" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={user?.username || ""}
            onChange={(e) => setUser({ ...user, username: e.target.value })}
            className="w-full p-2 border border-cyan-700 rounded"
            placeholder="Nama"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2" htmlFor="fullname">
            Full name
          </label>
          <input
            type="text"
            id="fullname"
            value={user?.full_name || ""}
            onChange={(e) => setUser({ ...user, full_name: e.target.value })}
            className="w-full p-2 border border-cyan-700 rounded"
            placeholder="Nama"
          />
        </div>
        
        <div>
          <label className="block font-semibold mb-2" htmlFor="phone_number">
            No. HP
          </label>
          <input
            type="text"
            id="phone_number"
            value={user?.phone_number || ""}
            onChange={(e) => setUser({ ...user, phone_number: e.target.value })}
            className="w-full p-2 border border-cyan-700 rounded"
            placeholder="No. HP"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2" htmlFor="alamat">
            Alamat
          </label>
          <input
            type="text"
            id="alamat"
            value={user?.alamat || ""}
            onChange={(e) => setUser({ ...user, alamat: e.target.value })}
            className="w-full p-2 border border-cyan-700 rounded"
            placeholder="Alamat"
          />
        </div>
        <div>
          <label className="block font-semibold mb-2" htmlFor="tanggal_lahir">
            Tanggal Lahir
          </label>
          <input
            type="date"
            id="tanggal_lahir"
            value={user?.tanggal_lahir?.slice(0, 10) || ""}
            onChange={(e) =>
              setUser({ ...user, tanggal_lahir: e.target.value })
            }
            className="w-full p-2 border border-cyan-700 rounded"
          />
        </div>
        <Button variant="yellow" className="rounded-md">
          ✏️ Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateProfil;

