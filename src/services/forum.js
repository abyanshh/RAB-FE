import axios from "axios"

export const getAllThreads = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Forums`)
    return response.data.forums
  } catch (error) {
    console.error("Gagal mengambil data forum:", error)
    return []
  }
}

export const getThreadsbyId = async (forumId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Forums/${forumId}`)
    return response.data.forum
  } catch (error) {
    console.error("Gagal mengambil data forum:", error)
    return {}
  }
}
export const getThreadsbyUserId = async (userId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/Forums/user/${userId}`)
    return response.data.forum
  } catch (error) {
    console.error("Gagal mengambil data forum:", error)
    return {}
  }
}

export const createThread = async (thread, token) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/Forums`,
      {
        title : thread.title,
        content : thread.content,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true
      }
    )
    return response.data
  } catch (error) {
    console.error("Gagal membuat thread:", error)
    throw error
  }
}

export const deleteThreadById = async (forumId, token) => {
  try {
    const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/Forums/${forumId}`, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true
    })
    return response.data
  } catch (error) {
    console.error("Gagal menghapus thread:", error)
    throw error
  }
}
export const getAllComments = async (forumId) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/forums/${forumId}/comments`)
    return response.data.comments
  } catch (error) {
    console.error("Gagal mengambil data komentar:", error)
    return []
  }
}

export const createComment = async ({ forumId, content, parentId = null, token }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/forums/${forumId}/comments`,
      {
        parent_id: parentId,
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.comment;
  } catch (error) {
    console.error("Gagal membuat komentar:", error);
    throw error;
  }
};