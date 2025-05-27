import Button from "../../components/Button";
import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../../services/auth";
import { useNavigate } from "react-router-dom";
const UpdateProfil = () => {
  const [user, setUser] = useState({});
  const [Id, setId] = useState("");
  const [token, setToken] = useState("");
  const Navigate = useNavigate();

  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const accessToken = await refreshToken();
    if (accessToken) {
      const decoded = jwtDecode(accessToken);
      setToken(accessToken);
      setId(decoded.id);
      await getUser(decoded.id);
    }
  };

  const getUser = async (Id) => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${Id}`);
      setUser(response.data);
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };
  const UpdateUser = async (Id) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/update/${Id}`,
        {
          phone_number: user?.phone_number,
          alamat: user?.alamat,
          tanggal_lahir: user?.tanggal_lahir,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      Navigate("/profile");
    } catch (error) {
      console.error("Gagal mengambil data user:", error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    UpdateUser(Id);
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
            className="w-full p-2 border border-cyan-700 rounded text-gray-500"
            placeholder="Nama"
            disabled
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
            className="w-full p-2 border border-cyan-700 rounded text-gray-500"
            placeholder="Nama"
            disabled
          />
        </div>
        <div>
          <label className="block font-semibold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={user?.email || ""}
            onChange={(e) => setUser({ ...user, email: e.target.value })}
            className="w-full p-2 border border-cyan-700 rounded text-gray-500"
            placeholder="Email"
            disabled
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
            onChange={(e) => setUser({ ...user, tanggal_lahir: e.target.value })}
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
