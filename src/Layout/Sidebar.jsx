import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ title, menuItems }) => {
  const location = useLocation();

  return (
    <>
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-white border-r border-gray-200 h-full hidden md:fixed md:left-0 md:top-20 py-3 px-6">
        <h2 className="text-xl font-bold mb-6">{title}</h2>
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`block px-3 py-2 rounded ${
                  location.pathname === item.path
                    ? "bg-cyan-600 text-white"
                    : "text-cyan-700 hover:bg-cyan-100"
                }`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </aside>

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
