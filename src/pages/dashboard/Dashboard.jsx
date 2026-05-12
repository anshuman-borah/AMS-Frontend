import { useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import StatCard from "../../components/common/StatCard";
import SimilarityBadge from "../../components/proposal/SimilarityBadge";
import { Search, Filter, List, LayoutGrid, Calendar, FileStack, Clock, CheckCircle, XCircle } from "lucide-react";
import LoadingScreen from "../../components/common/Loadingscreen";
import axios from "axios";


const TABLE_HEADERS = ["Project ID", "Title", "Status", "Similarity", "Submitted", "Discipline"];

export default function Dashboard({ onLogout }) {
  const [search, setSearch] = useState("");

  // BACKEND 
  const [stats, setStats] = useState(null);
  const [proposals, setProposals] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/dashboard/scientist`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        setStats(data.statistics);
        setProposals(data.recentProposals);
        console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();

  }, []);



  const filtered = proposals.filter(
    (p) => !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.id.toLowerCase().includes(search.toLowerCase())
  );
  if (loading) {
    return (
      <div className="flex min-h-screen font-sans bg-gray-100">
        <Sidebar onLogout={onLogout} />
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-8">
            <LoadingScreen />
          </div>
        </main>
      </div>
    );
  }
  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <Sidebar onLogout={onLogout} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-lg px-3 py-1.5 gap-2 bg-gray-50 text-sm text-gray-500 w-52">
                <Search size={14} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search tickets..."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>
              <button className="flex items-center gap-1 border rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50">
                <Filter size={14} /> Filter
              </button>
              <div className="flex items-center border rounded-lg overflow-hidden">
                {[List, LayoutGrid, Calendar].map((Icon, i) => (
                  <button key={i} className="p-1.5 hover:bg-gray-100"><Icon size={16} className="text-gray-500" /></button>
                ))}
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard
              label="Total Proposals"
              value={stats?.total || 0}
              icon={FileStack}
              color="text-blue-500"
              bg="bg-blue-50"
            />

            <StatCard
              label="Pending Reviews"
              value={stats?.pending || 0}
              icon={Clock}
              color="text-yellow-500"
              bg="bg-yellow-50"
            />

            <StatCard
              label="Approved"
              value={stats?.approved || 0}
              icon={CheckCircle}
              color="text-green-500"
              bg="bg-green-50"
            />

            <StatCard
              label="Rejected"
              value={stats?.rejected || 0}
              icon={XCircle}
              color="text-red-500"
              bg="bg-red-50"
            />
          </div>

          {/* Table */}
          <h2 className="text-base font-semibold text-gray-700 mb-4">Recent Proposals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b">
                  {TABLE_HEADERS.map((h) => (
                    <th key={h} className="text-left py-2 pr-4 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 text-gray-600 font-medium">{p.id?.slice(-6).toUpperCase() || "0"}</td>
                    <td className="py-3 pr-4 text-gray-700">{p.title}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${p.status === "APPROVED"
                          ? "bg-green-100 text-green-700"
                          : p.status === "REJECTED"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {p.status}
                      </span>                    </td>
                    <td className="py-3 pr-4"><SimilarityBadge value={p.similarityScore || 0} /></td>
                    <td className="py-3 pr-4 text-gray-500">{p.submittedDate ? new Date(p.submittedDate).toLocaleDateString() : "0"}</td>
                    <td className="py-3 text-gray-500"> {p.discipline || "Not specified"} </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}