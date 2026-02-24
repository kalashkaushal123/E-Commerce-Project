import { useContext } from "react";
import { LoginContext } from "../Context/LoginContext";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom' 

function ProfilePage() {
    const { user, logout } = useContext(LoginContext);
    const navigate = useNavigate();

    // Dummy orders (replace with backend later)
    const orders = [
        {
        id: 1,
        date: "2026-02-01",
        total: 1200,
        status: "Delivered",
        },
        {
        id: 2,
        date: "2026-01-15",
        total: 850,
        status: "Shipped",
        },
    ];

    const handleLogout = () => {
        logout();
        navigate("/");
    };
  return (
    <div className="min-h-[60vh] bg-pink-50 dark:bg-gray-900 p-6">
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              My Profile
            </h2>
            <p className="text-gray-500 dark:text-gray-400">
              Manage your account information
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
          >
            Logout
          </button>
        </div>

        {/* User Info */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Full Name</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {user?.first_name || "User Name"}
              </p>
            </div>

            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p className="text-lg font-medium text-gray-800 dark:text-white">
                {user?.email || "user@example.com"}
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfilePage
