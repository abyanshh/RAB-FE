import Button from '../../components/Button';
import SearchFilter from '../../components/SearchFilter';
import Modal from '../../components/OptionModal';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { getAllUsers } from '../../services/user';

export default function UserList() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState([]);
  const dataPerPage = 10;

  const getUsers = async () => {
    try {
      const data = await getAllUsers();
      setAllUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const handleOpenModal = () => setShowModal(!showModal);

  // Filter berdasarkan nama user
  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination berdasarkan hasil filter
  const totalPages = Math.ceil(filteredUsers.length / dataPerPage);
  const indexOfLast = currentPage * dataPerPage;
  const indexOfFirst = indexOfLast - dataPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  return (
    <div className="max-w-6xl mx-auto py-8 p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-800">
        Akun Semua User
      </h1>

      <div className="bg-white rounded-lg border border-gray-300 shadow-md p-4 mb-8">
        <SearchFilter 
          placeholder="Cari User" 
          value={searchTerm} 
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="border border-gray-300 bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
          <thead className="bg-cyan-600/85 text-white font-semibold">
            <tr>
              <th className="px-6 py-4 text-left">Username</th>
              <th className="px-6 py-4 text-left">Full name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Tanggal Lahir</th>
              <th className="px-6 py-4 text-center">No. hp</th>
              <th className="px-6 py-4 text-center">Role</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Tidak ada jadwal
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-t border-gray-300 hover:bg-cyan-50 text-sm">
                  <td className="px-6 py-4">{user.username}</td>

                  
                  <td className="px-6 py-4">{user.full_name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 text-center">{user?.tanggal_lahir?.slice(0, 10) || ""}</td>
                  <td className="px-6 py-4 text-center">{user.phone_number}</td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      onClick={handleOpenModal}
                      variant="blue"
                      className="w-full rounded-md"
                    >
                      {user.role}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        <Modal
          title="Ubah Role"
          isOpen={showModal}
          onClose={handleOpenModal}
          options={[
            { label: 'Admin', variant: 'blue' },
            { label: 'User', variant: 'blue' },
          ]}
        />
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

