import axios from "axios";


export const createConsult = async (doctorId, data, token) => {
    try {
        const response = await axios.post(
            `${import.meta.env.VITE_BASE_URL}/appointments`, 
            {
                doctor_id: doctorId,
                ...data
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

export const getAppointmentById = async (token) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/appointments/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error('Gagal mengambil janji:', error);
        return null;
    }
}

export const updateStatus = async (appointmentId, status, token) => {
    try {
        const response = await axios.patch(
            `${import.meta.env.VITE_BASE_URL}/appointments/${appointmentId}/status`,
            { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                withCredentials: true
            }
        );
        console.log('Status janji berhasil diubah:', response.data);
    } catch (error) {
        console.error('Gagal mengubah status janji:', error);
    }
}