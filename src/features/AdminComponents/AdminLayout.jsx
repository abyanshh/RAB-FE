import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="p-6 max-w-6xl mx-auto mt-20">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
