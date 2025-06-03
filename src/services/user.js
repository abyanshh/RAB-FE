import axios from "axios";

export const getAllUsers = async (token) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data user:", error);
        return [];
    }
};

export const getUserById = async (userId, token) => {
    try {
        const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/users/${userId}`, 
            {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
                withCredentials: true
            }
        );
        return response.data;
    } catch (error) {
        console.error("Gagal mengambil data user:", error);
        return null;
    }
};

export const updateUserById = async (id, data, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/update/${id}`,
      data,
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateRole = async (id, role, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/users/update/${id}/role`,
      { role: role },
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
