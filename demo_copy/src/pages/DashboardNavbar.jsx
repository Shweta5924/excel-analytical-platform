import { useNavigate, useLocation } from "react-router-dom";
import Logo from "./Logo";

export default function DashboardNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/superadmin" },
    { label: "Users", path: "/superadmin/users" },
    { label: "Admins", path: "/superadmin/admins" },
    { label: "Files", path: "/superadmin/files" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("superadminToken");
    navigate("/superadmin-login");
  };

  return (
    <header className="bg-white shadow-md px-6 py-2 flex items-center justify-between fixed top-0 left-0 right-0 z-50">
      {/* <h1 className="text-xl font-bold text-indigo-700">Superadmin Panel</h1> */}
       <Logo />
      <nav className="flex space-x-6">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`text-sm font-medium transition ${
              location.pathname === item.path
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-indigo-500"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm"
      >
        Logout
      </button>
    </header>
  );
}
