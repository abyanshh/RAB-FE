const ProfilSaya = () => {
    const user = {
      nama: "Andi Prasetyo",
      email: "andi@email.com",
      noHp: "0812-3456-7890",
      alamat: "Jakarta Selatan, Indonesia",
      tanggalLahir: "12 Januari 1995",
    };
  
    return (
      <div className="p-6 max-w-3xl mx-auto mt-20">
        <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Profil Saya</h2>
        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <p><span className="font-semibold">Nama:</span> {user.nama}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">No. HP:</span> {user.noHp}</p>
          <p><span className="font-semibold">Alamat:</span> {user.alamat}</p>
          <p><span className="font-semibold">Tanggal Lahir:</span> {user.tanggalLahir}</p>
        </div>
      </div>
    );
  };
  
  export default ProfilSaya;
  