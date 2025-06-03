/**
 * Filter daftar dokter berdasarkan nama dan spesialisasi
 * @param {Array} doctors - Daftar semua dokter
 * @param {string} searchTerm - Kata kunci pencarian nama
 * @param {string} selectedSpecialty - Spesialisasi yang dipilih
 * @returns {Array} Dokter yang cocok
 */
export const filterDoctors = (doctors, searchTerm = "", selectedSpecialty = "Semua Spesialis") => {
  return doctors.filter((doctor) => {
    const matchesSearch = doctor.full_name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesSpecialty =
      selectedSpecialty === "Semua Spesialis" ||
      doctor.specialization === selectedSpecialty;

    return matchesSearch && matchesSpecialty;
  });
};

/**
 * Urutkan dokter berdasarkan kriteria tertentu
 * @param {Array} doctors - Daftar dokter
 * @param {"rating"|"experience"|"price"} sortBy - Kriteria pengurutan
 * @returns {Array} Dokter yang sudah diurutkan
 */
export const sortDoctors = (doctors, sortBy = "") => {
  return [...doctors].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "experience":
        return parseInt(b.experience) - parseInt(a.experience);
      case "price":
        return (
          parseInt(a.price.replace(/\D/g, "")) -
          parseInt(b.price.replace(/\D/g, ""))
        );
      default:
        return 0;
    }
  });
};
