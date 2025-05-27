import axios from "axios";

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`);
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data user:", error);
        return [];
    }
};