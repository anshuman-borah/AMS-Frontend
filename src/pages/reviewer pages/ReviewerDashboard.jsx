import { useEffect, useState } from "react";
import ReviewerSidebar from "./ReviewerSidebar";
import LoadingScreen from "../../components/common/Loadingscreen";
import { Clock, CheckCircle, XCircle, BarChart2, AlertCircle } from "lucide-react";
import axios from "axios";

const BASE   = "https://ams-backend-ktz1.onrender.com/api";
const COLORS = ["#6366f1", "#f43f5e", "#22d3ee", "#f97316", "#a855f7", "#10b981", "#eab308"];

// ── Donut chart (pure SVG) ─────────────────────────────────────────────────
function DonutChart({ data }) {
  const total  = data.reduce((s, d) => s + d.count, 0) || 1;
  const size   = 200;
  const R      = 70;
  const cx     = size / 2;
  const cy     = size / 2;
  const stroke = 36;

  let offset = -Math.PI / 2;
  const slices = data.map((d, i) => {
    const angle = (d.count / total) * 2 * Math.PI;
    const x1    = cx + R * Math.cos(offset);
    const y1    = cy + R * Math.sin(offset);
    const x2    = cx + R * Math.cos(offset + angle);
    const y2    = cy + R * Math.sin(offset + angle);
    const large = angle > Math.PI ? 1 : 0;
    const path  = `M ${x1} ${y1} A ${R} ${R} 0 ${large} 1 ${x2} ${y2}`;
    offset += angle;
    return {
      path, color: COLORS[i % COLORS.length],
      label: d.discipline, count: d.count,
      pct: Math.round((d.count / total) * 100),
    };
  });

  return (
    <div className="flex flex-col sm:flex-row items-center gap-10">
      <svg width={size} height={size} className="shrink-0">
        {slices.map((s, i) => (
          <path key={i} d={s.path} fill="none"
            stroke={s.color} strokeWidth={stroke} strokeLinecap="butt" />
        ))}
        <circle cx={cx} cy={cy} r={R - stroke / 2} fill="white" />
      </svg>
      <ul className="space-y-2 text-sm text-gray-600">
        {slices.map((s, i) => (
          <li key={i} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full shrink-0" style={{ background: s.color }} />
            <span className="flex-1">{s.label}</span>
            <span className="text-gray-400 text-xs font-medium">{s.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, iconColor, iconBg }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-4xl font-bold text-gray-800">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconBg}`}>
        <Icon size={24} className={iconColor} />
      </div>
    </div>
  );
}

// ── Build discipline distribution from project list ────────────────────────
function buildDistribution(projects) {
  const map = {};
  projects.forEach((p) => {
    const disc = p.discipline ?? "Other";
    map[disc] = (map[disc] ?? 0) + 1;
  });
  return Object.entries(map)
    .map(([discipline, count]) => ({ discipline, count }))
    .sort((a, b) => b.count - a.count);
}

// ── Main ───────────────────────────────────────────────────────────────────
export default function ReviewerDashboard({ onLogout }) {
  const [stats,        setStats]        = useState(null);
  const [disciplines,  setDisciplines]  = useState([]);
  const [recentReviews,setRecentReviews]= useState([]);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setError("Session expired. Please log in again."); setLoading(false); return; }

    const headers = { Authorization: `Bearer ${token}` };

    (async () => {
      try {
        // ── 1. Dashboard stats ─────────────────────────────────────────────
        const dashRes = await axios.get(`${BASE}/reviews/dashboard`, { headers });
        const d = dashRes.data;
        /*
          Actual shape from API:
          {
            statistics: {
              assignedProjects, reviewsGiven, pendingReviews,
              approvedCount, rejectedCount, approvalRate
            },
            pendingProjects: [],
            recentReviews: [{ _id, projectId: { title }, decision, comment, createdAt }]
          }
        */
        setStats(d.statistics ?? {});
        setRecentReviews(d.recentReviews ?? []);

        // ── 2. Discipline distribution from assigned projects ──────────────
        const projRes = await axios.get(`${BASE}/reviews/assigned-projects`, {
          params: { page: 1, limit: 100 },
          headers,
        });
        /*
          Actual shape:
          { projects: [...], pagination: { currentPage, totalPages, totalItems } }
          Each project has: discipline, ownerId.name, status, similarityScore, createdAt
        */
        const list = projRes.data?.projects ?? [];
        setDisciplines(buildDistribution(list));

      } catch (err) {
        const msg = err.response?.data?.message ?? err.message;
        setError(`Failed to load dashboard: ${msg}`);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen font-sans bg-gray-100">
        <ReviewerSidebar onLogout={onLogout} />
        <main className="flex-1 p-6"><div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-8"><LoadingScreen /></div></main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <ReviewerSidebar onLogout={onLogout} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-7xl mx-auto space-y-6">

          {/* Error banner */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-6 py-4 flex items-center gap-3 text-red-700 text-sm font-medium">
              <AlertCircle size={16} /> {error}
            </div>
          )}

          {/* ── Stats ─────────────────────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard
                label="Assigned Projects"
                value={stats?.assignedProjects ?? 0}
                icon={BarChart2}
                iconColor="text-blue-500"
                iconBg="bg-blue-50"
              />
              <StatCard
                label="Pending Reviews"
                value={stats?.pendingReviews ?? 0}
                icon={Clock}
                iconColor="text-yellow-500"
                iconBg="bg-yellow-50"
              />
              <StatCard
                label="Approved"
                value={stats?.approvedCount ?? 0}
                icon={CheckCircle}
                iconColor="text-green-500"
                iconBg="bg-green-50"
              />
              <StatCard
                label="Rejected"
                value={stats?.rejectedCount ?? 0}
                icon={XCircle}
                iconColor="text-red-500"
                iconBg="bg-red-50"
              />
            </div>
          </div>

          {/* ── Discipline Distribution ────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-6">
              Discipline Distribution
            </h2>
            {disciplines.length > 0 ? (
              <DonutChart data={disciplines} />
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-gray-400 gap-3">
                <BarChart2 size={40} strokeWidth={1.2} />
                <p className="text-sm font-medium">No proposals assigned yet</p>
                <p className="text-xs text-gray-300 text-center max-w-xs">
                  Discipline distribution will appear once scientists submit proposals assigned to you.
                </p>
              </div>
            )}
          </div>

          {/* ── Recent Reviews ─────────────────────────────────────────────── */}
          {recentReviews.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="text-sm font-bold text-gray-700 mb-4">Recent Reviews</h2>
              <div className="space-y-3">
                {recentReviews.map((r) => (
                  <div key={r._id} className="flex items-start justify-between border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {r.projectId?.title ?? "Untitled Project"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5 line-clamp-1">{r.comment}</p>
                      <p className="text-xs text-gray-300 mt-1">
                        {new Date(r.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric", month: "short", year: "numeric"
                        })}
                      </p>
                    </div>
                    <span className={`ml-3 shrink-0 text-xs font-bold px-2.5 py-1 rounded-full ${
                      r.decision === "APPROVED"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}>
                      {r.decision}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
