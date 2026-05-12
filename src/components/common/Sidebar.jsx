import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, FilePlus, FileText, LogOut } from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard",       icon: LayoutDashboard, path: "/dashboard" },
  { label: "Submit Proposal", icon: FilePlus,        path: "/submit"    },
  { label: "My Proposals",    icon: FileText,        path: "/myproposals" },
];

export default function Sidebar({ onLogout }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <aside className="w-60 bg-[#0B1E35] flex flex-col text-white shrink-0 h-screen sticky top-0">
      <div className="px-4 py-4 border-b border-white/10">
        <p className="text-xl font-bold tracking-wide text-gray-100">Research Portal</p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <button
            key={label}
            onClick={() => navigate(path)}
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border-l-4 ${
              pathname === path
                ? "bg-blue-600 text-white font-semibold border-blue-300"
                : "text-gray-300 hover:bg-white/10 border-transparent"
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      <div className="px-3 py-4 border-t border-white/10">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold">
            SC
          </div>
          <div>
            <p className="text-sm font-semibold">Dr. Sarah Chen</p>
            <p className="text-xs text-gray-400">Scientist</p>
          </div>
        </div>
        <button
          onClick={onLogout}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-400 transition-colors"
        >
          <LogOut size={16} /> Log out
        </button>
      </div>
    </aside>
  );
}