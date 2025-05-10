import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
      <nav className="mt-6">
        <div className="space-y-1">
          <Link
            to="/"
            className="block px-4 py-2 text-sm font-medium rounded-md bg-gray-900 text-white"
          >
            Chat
          </Link>
          {user?.role === "admin" && (
            <Link
              to="/admin"
              className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-gray-700"
            >
              Admin Panel
            </Link>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
