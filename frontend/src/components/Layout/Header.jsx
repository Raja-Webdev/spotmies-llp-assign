import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          ChatGPT Docs
        </Link>
        <div className="flex items-center space-x-4">
          {user && (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="text-gray-600 hover:text-gray-900">
                  Admin
                </Link>
              )}
              <span className="text-gray-600">Hello, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
