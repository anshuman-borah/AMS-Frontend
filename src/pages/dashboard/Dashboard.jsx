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
  // filtering and view
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [viewMode, setViewMode] = useState("list");


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



  const filtered = proposals.filter((p) => {
    const term = search.toLowerCase();

    const matchesSearch =
      p.title?.toLowerCase().includes(term) ||
      p.uniqueCode?.toString().toLowerCase().includes(term) ||
      p.status?.toLowerCase().includes(term) ||
      p.discipline?.toLowerCase().includes(term);

    const matchesFilter =
      statusFilter === "ALL" ||
      p.status === statusFilter;

    return matchesSearch && matchesFilter;
  });
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
                  placeholder="Search proposals..."
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              <button
                onClick={() => {
                  if (statusFilter === "ALL") setStatusFilter("APPROVED");
                  else if (statusFilter === "APPROVED") setStatusFilter("REJECTED");
                  else if (statusFilter === "REJECTED") setStatusFilter("UNDER_REVIEW");
                  else if (statusFilter === "UNDER_REVIEW") setStatusFilter("REVISION_REQUIRED");
                  else if (statusFilter === "REVISION_REQUIRED") setStatusFilter("SUBMITTED");
                  else if (statusFilter === "SUBMITTED") setStatusFilter("DRAFT");
                  else setStatusFilter("ALL");
                }}
                className="flex items-center gap-1 border rounded-lg px-3 py-1.5 text-sm text-gray-500 hover:bg-gray-50"
              >
                <Filter size={14} />
                {statusFilter}
              </button>

              <div className="flex items-center border rounded-lg overflow-hidden">
                {[
                  { icon: List, mode: "list" },
                  { icon: LayoutGrid, mode: "grid" },
                  { icon: Calendar, mode: "calendar" },
                ].map(({ icon: Icon, mode }) => (
                  <button
                    key={mode}
                    onClick={() => setViewMode(mode)}
                    className={`p-1.5 hover:bg-gray-100 ${viewMode === mode ? "bg-gray-200" : ""
                      }`}
                  >
                    <Icon size={16} className="text-gray-500" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
            <StatCard
              label="Total Proposals"
              value={stats?.total || 0}
              icon={FileStack}
              color="text-blue-500"
              bg="bg-blue-50"
            />

            <StatCard
              label="Submitted"
              value={stats?.submitted || 0}
              icon={Clock}
              color="text-blue-500"
              bg="bg-blue-50"
            />


            <StatCard
              label="Under Review"
              value={stats?.underReview || 0}
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

            <StatCard
              label="Revision Required"
              value={stats?.revisionRequired || 0}
              icon={Clock}
              color="text-orange-500"
              bg="bg-orange-50"
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
                {filtered.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-3 pr-4 text-gray-600 font-medium">{p.uniqueCode || "N/A"}</td>
                    <td className="py-3 pr-4 text-gray-700">{p.title}</td>
                    <td className="py-3 pr-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${p.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : p.status === "REJECTED"
                              ? "bg-red-100 text-red-800"
                              : p.status === "REVISION_REQUIRED"
                                ? "bg-orange-100 text-orange-800"
                                : p.status === "UNDER_REVIEW"
                                  ? "bg-blue-100 text-blue-800"
                                  : p.status === "SUBMITTED"
                                    ? "bg-indigo-100 text-indigo-800"
                                    : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {p.status?.replaceAll("_", " ")}
                      </span>
                    </td>
                    <td className="py-3 pr-4"><SimilarityBadge value={p.similarityScore || 0} /></td>
                    <td className="py-3 pr-4 text-gray-500">{p.submittedDate ? new Date(p.submittedDate).toLocaleDateString("en-IN") : "0"}</td>
                    <td className="py-3 text-gray-500"> {p.discipline?.replaceAll("_", " ") || "Not specified"} </td>
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