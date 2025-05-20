const ThreadSaya = () => {
    const threads = [
      {
        id: 1,
        judul: "Menghadapi Kecemasan Saat Wawancara Kerja",
        tanggal: "2025-04-20",
        isi: "Saya sering merasa cemas berlebihan saat wawancara. Apakah ini normal?",
      },
      {
        id: 2,
        judul: "Cara Mengelola Stres Saat Skripsi",
        tanggal: "2025-04-10",
        isi: "Lagi buntu nulis skripsi dan makin stres. Ada saran?",
      },
    ];
  
    return (
      <div className="p-6 max-w-3xl mt-20 mx-auto">
        <h2 className="text-2xl font-semibold text-cyan-800 mb-4">Thread Saya</h2>
        <div className="space-y-6">
          {threads.map((thread) => (
            <div key={thread.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-bold text-cyan-700">{thread.judul}</h3>
              <p className="text-sm text-gray-500 mb-2">{thread.tanggal}</p>
              <p>{thread.isi}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default ThreadSaya;
  