import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/admin",
  },
  {
    label: "User Management",
    icon: Users,
    path: "/admin/users",
  },
  {
    label: "Reviewer Assignment",
    icon: ClipboardList,
    path: "/admin/assignments",
  },
];

export default function AdminSidebar({ onLogout, user }) {

  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="w-64 bg-[#071B34] text-white flex flex-col min-h-screen">

      {/* Header */}
      <div className="px-5 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          Research Portal
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2">

        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (

          <button
            key={label}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${
              pathname === path
                ? "bg-blue-600 text-white"
                : "text-gray-300 hover:bg-white/10"
            }`}
          >
            <Icon size={18} />
            {label}
          </button>

        ))}

      </nav>

      {/* User */}
      <div className="border-t border-white/10 p-4">

        <div className="flex items-center gap-3 mb-4">

          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div>
            <p className="font-semibold text-sm">
              {user?.name}
            </p>

            <p className="text-xs text-gray-400">
              {user?.role}
            </p>
          </div>

        </div>

        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-300 hover:text-red-400"
        >
          <LogOut size={16} />
          Log out
        </button>

      </div>

    </aside>
  );
}