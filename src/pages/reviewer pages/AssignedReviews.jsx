import { useEffect, useState, useCallback } from "react";
import ReviewerSidebar from "./ReviewerSidebar";
import LoadingScreen from "../../components/common/Loadingscreen";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// ── Similarity badge (colour-coded) ───────────────────────────────────────
function SimilarityBadge({ value }) {
  const pct = Math.round(value ?? 0);
  let bg = "bg-green-100 text-green-700";
  if (pct >= 50) bg = "bg-red-100 text-red-700";
  else if (pct >= 20) bg = "bg-yellow-100 text-yellow-700";
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${bg}`}>
      {pct}%
    </span>
  );
}

// ── Status badge ───────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = {
    PENDING: "bg-yellow-100 text-yellow-700",
    APPROVED: "bg-green-100 text-green-700",
    REJECTED: "bg-red-100 text-red-700",
  };
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${map[status] ?? "bg-gray-100 text-gray-600"}`}>
      {status ?? "—"}
    </span>
  );
}

// ── Status filter tabs ─────────────────────────────────────────────────────
const STATUS_TABS = [
  { label: "All", value: "" },
  { label: "Pending", value: "PENDING" },
  { label: "Approved", value: "APPROVED" },
  { label: "Rejected", value: "REJECTED" },
];

const TABLE_HEADERS = ["Project Code", "Title", "Scientist", "Status", "Similarity", "Submitted", "Action"];

export default function AssignedReviews({ onLogout }) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("");   // "" = All statuses
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  // ── Fetch projects from API ───────────────────────────────────────────────
  const fetchProjects = useCallback(async (pageNum = 1, statusFilter = "") => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Build params — omit status when "All" is selected so the API
      // returns every assigned project regardless of status
      const params = { page: pageNum, limit: 10 };
      if (statusFilter) params.status = statusFilter;

      const res = await axios.get(
        "https://ams-backend-ktz1.onrender.com/api/reviews/assigned-projects",
        { params, headers: { Authorization: `Bearer ${token}` } }
      );

      const d = res.data;
      console.log("AssignedReviews API response:", d); // debug


      let list = [];
      if (Array.isArray(d)) list = d;
      else if (Array.isArray(d.projects)) list = d.projects;
      else if (Array.isArray(d.data)) list = d.data;

      setProjects(list);
      setTotalPages(d.pagination?.totalPages ?? d.totalPages ?? 1);
    } catch (err) {
      console.error("AssignedReviews fetch error:", err);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Refetch whenever tab or page changes
  useEffect(() => {
    fetchProjects(page, activeTab);
  }, [page, activeTab, fetchProjects]);

  // Reset to page 1 when switching tabs
  const handleTabChange = (tabValue) => {
    setActiveTab(tabValue);
    setPage(1);
  };

  // Client-side search filter on top of whatever the API returns
  const filtered = projects.filter((p) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      (p.title ?? "").toLowerCase().includes(q) ||
      (p.projectCode ?? "").toLowerCase().includes(q) ||
      (p.principalScientist?.name ?? "").toLowerCase().includes(q)
    );
  });

  if (loading && projects.length === 0) {
    return (
      <div className="flex min-h-screen font-sans bg-gray-100">
        <ReviewerSidebar onLogout={onLogout} />
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
      <ReviewerSidebar onLogout={onLogout} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-4">

          {/* ── Page Header ─────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm px-8 py-5">
            <h1 className="text-xl font-bold text-gray-800 mb-4">Assigned Reviews</h1>

            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
              {/* Search */}
              <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 gap-2 bg-gray-50 text-sm text-gray-500 w-full sm:max-w-sm">
                <Search size={15} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, code or scientist…"
                  className="bg-transparent outline-none text-sm w-full"
                />
              </div>

              {/* Status filter tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {STATUS_TABS.map((tab) => (
                  <button
                    key={tab.value}
                    onClick={() => handleTabChange(tab.value)}
                    className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${activeTab === tab.value
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Table Card ──────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-700">Review Proposals</h2>
              {loading && (
                <span className="text-xs text-gray-400 animate-pulse">Refreshing…</span>
              )}
            </div>

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
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-gray-400">
                        <div className="flex flex-col items-center gap-2">
                          <span className="text-3xl">📋</span>
                          <span>No proposals found{activeTab ? ` with status "${activeTab}"` : ""}.</span>
                          {activeTab && (
                            <button
                              onClick={() => handleTabChange("")}
                              className="text-blue-500 text-xs hover:underline mt-1"
                            >
                              Show all proposals
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((p, i) => (
                      <tr key={p._id ?? i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                        <td className="py-3 pr-4 text-gray-600 font-medium text-xs">
                          {p.projectCode ?? p._id?.slice(-6).toUpperCase() ?? "—"}
                        </td>
                        <td className="py-3 pr-4 text-gray-700 max-w-[200px] truncate">
                          {p.title ?? "—"}
                        </td>
                        <td className="py-3 pr-4 text-gray-600">
                          {p.ownerId?.name ?? p.principalScientist?.name ?? p.scientist?.name ?? "—"}
                        </td>
                        <td className="py-3 pr-4">
                          <StatusBadge status={p.status} />
                        </td>
                        <td className="py-3 pr-4">
                          <SimilarityBadge value={p.similarityScore ?? 0} />
                        </td>
                        <td className="py-3 pr-4 text-gray-500 text-xs">
                          {(p.submittedDate || p.createdAt)
                            ? new Date(p.submittedDate ?? p.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })
                            : "—"}
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => navigate(`/reviewer/project/${p._id}`)}
                            className="bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            
            {/* ── Pagination ─────────────────────────────────────────── */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-6">

                {/* Previous */}
                <button
                  onClick={() =>
                    setPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={page === 1 || loading}
                  className="px-4 py-2 border rounded-lg disabled:opacity-50"
                >
                  Previous
                </button>

                {/* Page Info */}
                <span className="font-medium text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>

                {/* Next */}
                <button
                  onClick={() => setPage((prev) => prev + 1)}
                  disabled={page >= totalPages || loading}
                  className="px-4 py-2 border rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>

              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
