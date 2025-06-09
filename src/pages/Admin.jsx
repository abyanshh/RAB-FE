import Navbar from "../layout/Navbar";
import Sidebar from "../layout/Sidebar";
import { NotebookTabs, User } from "lucide-react";
import AdminLayout from "../features/AdminComponents/AdminLayout";

const Admin = () => {
  const menuItems = [
    { name: "Data User", path: "/admin", icon: <User /> },
    { name: "Data Jadwal", path: "/admin/schedule", icon: <NotebookTabs /> },
  ];

  return (
    <>
      <Navbar />
      <Sidebar title="Profil" menuItems={menuItems} />
      <AdminLayout />
    </>
  );
};

export default Admin;
