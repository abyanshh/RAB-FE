import axios from 'axios';

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
            email,
            password,
        }, { withCredentials: true });

        return res.data;
    } catch (error) {
        const message = error.response?.data?.error || 'Terjadi kesalahan saat login';
        throw new Error(message);
    }
};

export const register = async (username, full_name, email, password) => {

    try {
        const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
            username,
            full_name,
            email,
            password,

        });
        return res.data;
    } catch (error) {
        const message = error.response?.data?.error || 'Terjadi kesalahan saat register';
        throw new Error(message);
    }
};

export const logout = async () => {
    try {
        await axios.delete(`${import.meta.env.VITE_BASE_URL}/auth/logout`, { 
            withCredentials: true 
        });
    } catch (error) {
        const message = error.response?.data?.error || 'Terjadi kesalahan saat logout';
        throw new Error(message);
    }
};

export const refreshToken = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });
    return res.data.accessToken;
  } catch (error) {
    console.error("Refresh token gagal:", error.response?.data || error.message);
    return null;
  }
};

