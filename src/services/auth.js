import axios from 'axios';

export const login = async (email, password) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
            email,
            password,
        }, { withCredentials: true });

        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || 'Terjadi kesalahan saat login';
        throw new Error(message);
    }
};

export const register = async (username, full_name, email, password) => {

    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register`, {
            username,
            full_name,
            email,
            password,

        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.error || 'Terjadi kesalahan saat register';
        throw new Error(message);
    }
};

export const googleRegister = async (id_token) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/register/google`, {
            id_token,
        });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Terjadi kesalahan saat register dengan Google';
        throw new Error(message);
    }
};

export const googleLogin = async (id_token) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login/google`, {
            id_token,
        },{ withCredentials: true });
        return response.data;
    } catch (error) {
        const message = error.response?.data?.message || 'Terjadi kesalahan saat login dengan Google';
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
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });
    return response.data.accessToken;
  } catch (error) {
    console.error("Refresh token gagal:", error.response?.data || error.message);
    return null;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/forgot-password`, {
      email,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Terjadi kesalahan saat mengirim link reset password';
    throw new Error(message);
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/reset-password`, {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    const message = error.response?.data?.error || 'Terjadi kesalahan saat mereset password';
    throw new Error(message);
  }
};

