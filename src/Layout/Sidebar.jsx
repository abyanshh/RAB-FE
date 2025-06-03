import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <>
      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center py-2 shadow z-50">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-sm ${
              location.pathname === item.path
                ? "text-cyan-600 font-semibold"
                : "text-gray-500"
            }`}
          >
            <div className="w-6 h-6">{item.icon}</div>
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
