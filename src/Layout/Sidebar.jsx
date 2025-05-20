import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ title, menuItems }) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 h-full fixed left-0 top-20 py-3 px-6">
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
  );
};

export default Sidebar;
