/**
 * Filter daftar user berdasarkan nama dan role
 * @param {Array} items - Daftar semua dokter
 * @param {string} searchTerm - Kata kunci pencarian nama
 * @param {string} selectedRole - Role yang dipilih
 * @returns {Array} Dokter yang cocok
 */
export const filteredUsers = (items, searchTerm = "", selectedRole = "user") => {
  return items.filter((item) => {
    const matchesSearch = item.username
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesRole =
      item.role === selectedRole;

    return matchesSearch && matchesRole;
  });
};

export const filteredAppointments = (items, searchTerm = "", selectedStatus = "Semua Status") => {
  return items.filter((item) => {
    const matchesSearch = item.user_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "Semua Status" ||
      item.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });
};

