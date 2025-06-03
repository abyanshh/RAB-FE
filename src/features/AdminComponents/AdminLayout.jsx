import { Outlet, useLocation } from "react-router-dom";
import UserList from "./UserList";
import ScheduleList from "./ScheduleList";

const AdminLayout = () => {
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case "/admin":
        return <UserList />;
      case "/admin/schedule":
        return <ScheduleList />;
      default:
        return <Outlet />;
    }
  };

  return (
    <div className="flex min-h-screen ">
      <main className="flex-1 p-6 bg-gray-50">
        <div className="p-6 max-w-6xl mx-auto mt-20">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
