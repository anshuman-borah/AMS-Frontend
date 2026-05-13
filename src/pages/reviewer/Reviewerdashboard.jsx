import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, ClipboardList, LogOut, CheckCircle, Clock, XCircle, FileStack } from "lucide-react";
import axios from "axios";
const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/reviewer" },
  { label: "Assigned Proposals", icon: ClipboardList, path: "/reviewer/proposals" },
];

function ReviewerSidebar({ onLogout, user }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <aside className="w-64 bg-[#071B34] text-white flex flex-col min-h-screen">
      <div className="px-5 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">Research Portal</h1>
      </div>
      <nav className="flex-1 px-3 py-6 space-y-2">
        {NAV_ITEMS.map(({ label, icon: Icon, path }) => (
          <button key={label} onClick={() => navigate(path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition ${pathname === path ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"}`}>
            <Icon size={18} />{label}
          </button>
        ))}
      </nav>
      <div className="border-t border-white/10 p-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center font-bold">
            {user?.name?.charAt(0)?.toUpperCase() || "R"}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.name}</p>
            <p className="text-xs text-gray-400">{user?.role}</p>
          </div>
        </div>
        <button onClick={onLogout} className="flex items-center gap-2 text-sm text-gray-300 hover:text-red-400">
          <LogOut size={16} />Log out
        </button>
      </div>
    </aside>
  );
}

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-5 flex items-center gap-4 border border-gray-100">
      <div className={`${bg} p-3 rounded-xl`}><Icon size={22} className={color} /></div>
      <div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{label}</p>
      </div>
    </div>
  );
}

export default function ReviewerDashboard({ onLogout }) {
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/reviewer`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setProposals(res.data.proposals || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const pending = proposals.filter((p) => p.status === "PENDING").length;
  const approved = proposals.filter((p) => p.status === "APPROVED").length;
  const rejected = proposals.filter((p) => p.status === "REJECTED").length;

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <ReviewerSidebar onLogout={onLogout} user={user} />
      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-800 mb-6">Reviewer Dashboard</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Total Assigned" value={proposals.length} icon={FileStack} color="text-blue-500" bg="bg-blue-50" />
            <StatCard label="Pending Review" value={pending} icon={Clock} color="text-yellow-500" bg="bg-yellow-50" />
            <StatCard label="Approved" value={approved} icon={CheckCircle} color="text-green-500" bg="bg-green-50" />
            <StatCard label="Rejected" value={rejected} icon={XCircle} color="text-red-500" bg="bg-red-50" />
          </div>
          <h2 className="text-base font-semibold text-gray-700 mb-4">Assigned Proposals</h2>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : proposals.length === 0 ? (
            <p className="text-gray-400 text-sm">No proposals assigned yet.</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b">
                  {["Project ID", "Title", "Status", "Submitted", "Discipline"].map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {proposals.map((p, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-gray-50">
                    <td className="py-3 pr-4 text-gray-600 font-medium">{p.id?.slice(-6).toUpperCase()}</td>
                    <td className="py-3 pr-4 text-gray-700">{p.title}</td>
                    <td className="py-3 pr-4">
                      <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === "APPROVED" ? "bg-green-100 text-green-700" : p.status === "REJECTED" ? "bg-red-100 text-red-700" : "bg-yellow-100 text-yellow-700"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 pr-4 text-gray-500">{p.submittedDate ? new Date(p.submittedDate).toLocaleDateString() : "-"}</td>
                    <td className="py-3 text-gray-500">{p.discipline || "Not specified"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>
    </div>
  );
}