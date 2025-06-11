import Button from '../../components/Button';
import SearchFilter from '../../components/SearchFilter';
import Modal from '../../components/OptionModal';
import StatusModal from '../../components/StatusModal';
import { useState, useEffect } from 'react';
import Pagination from '../../components/Pagination';
import { getAllUsers, updateRole } from '../../services/user';
import { refreshToken } from '../../services/auth';
import { jwtDecode } from 'jwt-decode';
import { filteredUsers } from '../../utils/adminUtils';
import CategoryFilter from '../../components/CategoryFilter';

export default function UserList() {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [token, setToken] = useState('');
  const [userId, setUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const dataPerPage = 10;

  const init = async () => {
    try {
      const accessToken = await refreshToken();
      setToken(accessToken);
      const decoded = jwtDecode(accessToken);
      setUserId(decoded.id);
      const data = await getAllUsers(accessToken);
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (statusModalOpen) {
      const timer = setTimeout(() => setStatusModalOpen(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [statusModalOpen]);

  const handleOpenModal = (user) => {
    setSelectedUser(user);
    setShowModal(!showModal);
  };

  const handleUpdateRole = async (newRole) => {
    await updateRole(selectedUser.user_id, newRole.toLowerCase(), token);
    setSelectedUser(null)
    setShowModal(false);
    setStatusModalOpen(true);
    init();
  };

  const filteredUsersList = filteredUsers(users, searchTerm, selectedRole);

  const totalPages = Math.ceil(filteredUsersList.length / dataPerPage);
  const indexOfLast = currentPage * dataPerPage;
  const indexOfFirst = indexOfLast - dataPerPage;
  const currentUsers = filteredUsersList.slice(indexOfFirst, indexOfLast);

  return (
    <div className="grid max-w-6xl mx-auto py-8 p-4">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-cyan-800">
        Akun Semua User
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white rounded-lg border border-gray-300 shadow-md p-4 mb-8">
        <SearchFilter 
          placeholder="Cari User" 
          value={searchTerm} 
          onChange={(value) => {
            setSearchTerm(value);
            setCurrentPage(1);
          }}
        />
        <CategoryFilter
          value={selectedRole}
          onChange={setSelectedRole}
          options={[...new Set(users.map((user) => user.role))]}
        />
      </div>

      <div className="border border-gray-300 bg-white rounded-lg shadow-md overflow-x-auto">
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
            {filteredUsersList.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-500">
                  Tidak ada jadwal
                </td>
              </tr>
            ) : (
              filteredUsersList.map((user, index) => (
                <tr key={index} className="border-t border-gray-300 hover:bg-cyan-50 text-sm">
                  <td className="px-6 py-4">{user.username}</td>

                  <td className="px-6 py-4">{user.full_name}</td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4 text-center">{user?.tanggal_lahir?.slice(0, 10) || ""}</td>
                  <td className="px-6 py-4 text-center">{user.phone_number}</td>
                  <td className="px-6 py-4 text-center">
                    <Button
                      variant={user.role === "admin" ? "red" : "blue"}
                      className="w-full rounded-md"
                      disabled={user.user_id === userId}
                      onClick={() => handleOpenModal(user)}
                    >
                      {user.role === "admin" ? "Admin" : "User"}
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
          onClick={handleUpdateRole}
          options={[
            { label: 'Admin', variant: 'blue' },
            { label: 'User', variant: 'blue' },
          ]}
        />
        
        <StatusModal
          type="success"
          message="Berhasil mengubah role" 
          isOpen={statusModalOpen} 
          onClose={() => setStatusModalOpen(false)}>
          Berhasil mengubah role user
        </StatusModal>
      </div>

      {/* Pagination */}
      {filteredUsersList.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}

