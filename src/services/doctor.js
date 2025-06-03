import axios from "axios";
export const getAllDoctor = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/doctors`
      );
      return response.data;
    } catch (error) {
      console.error("Gagal mengambil data dokter:", error);
      throw error;
    }
  };
