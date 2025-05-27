import axios from "axios";


export const createConsult = async (doctorId, day, time, notes, token) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/appointments`, 
            {
                doctor_id: doctorId,
                hari: day,
                waktu: time,
                notes: notes
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log('Janji berhasil dibuat:', response.data);
    } catch (error) {
        console.error('Gagal membuat janji:', error);
    }
}

export const getAllAppointments = async (token) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/appointments`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Gagal mengambil janji:', error);
        return [];
    }
}
