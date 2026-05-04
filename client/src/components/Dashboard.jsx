import { useState } from "react";
import SubmitProposal from "./SubmitProposal";
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  LogOut,
  Search,
  Filter,
  List,
  LayoutGrid,
  Calendar,
  FileStack,
  Clock,
  CheckCircle,
  XCircle,
} from "lucide-react";

const proposals = [
  { id: "FIG-123", title: "Optimizing Crop Yields and Soil Health", status: "Pending", similarity: 100, submitted: "2026-04-25", discipline: "Agriculture" },
  { id: "FIG-124", title: "Optimizing Crop Yields and Soil Health", status: "Pending", similarity: 15, submitted: "2026-04-25", discipline: "Agriculture" },
  { id: "FIG-125", title: "Optimizing Crop Yields and Soil Health", status: "Pending", similarity: 23, submitted: "2026-04-25", discipline: "Agriculture" },
  { id: "FIG-126", title: "Optimizing Crop Yields and Soil Health", status: "Pending", similarity: 15, submitted: "2026-04-25", discipline: "Agriculture" },
];

const stats = [
  { label: "Total Proposals", value: 24, icon: FileStack, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Pending Reviews", value: 8, icon: Clock, color: "text-yellow-500", bg: "bg-yellow-50" },
  { label: "Approved", value: 12, icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
  { label: "Rejected", value: 4, icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
];

function SimilarityBadge({ value }) {
  let bg = "bg-green-100 text-green-700";
  if (value >= 80) bg = "bg-red-100 text-red-700";
  else if (value >= 40) bg = "bg-yellow-100 text-yellow-700";
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold ${bg}`}>
      {value}%
    </span>
  );
}

export default function Dashboard({ onLogout }) {
  const [active, setActive] = useState("Dashboard");
  const [search, setSearch] = useState("");

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard },
    { label: "Submit Proposal", icon: FilePlus },
    { label: "My Proposals", icon: FileText },
  ];

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* SIDEBAR */}
      <aside className="w-60 bg-[#0B1E35] flex flex-col text-white shrink-0 h-screen">
        <div className="mt-auto px-3 py-4 border-t border-white/10">
          <p className="text-xl font-bold tracking-wide text-gray-100">Research Portal</p>
        </div>
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all border-l-4 ${
                active === label
                  ? "bg-blue-600 text-white font-semibold border-blue-300"
                  : "text-gray-300 hover:bg-white/10 border-transparent"
              }`}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        {/* USER */}
        <div className="px-3 py-4 border-t border-white/10">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-400 flex items-center justify-center text-xs font-bold">
              SC
            </div>
            <div>
              <p className="text-lg font-semibold">Dr. Sarah Chen</p>
              <p className="text-[13px] text-gray-400">Scientist</p>
            </div>
          </div>
          <button onClick={onLogout} className="flex items-center gap-4 text-sm text-gray-400 hover:text-red-400 transition-colors">
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="flex-1 p-6 overflow-auto  flex flex-col">
        {active === "Submit Proposal" && <SubmitProposal />}
        {active !== "Submit Proposal" && <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-sm p-8 flex flex-col flex-1">
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
                <Filter size={14} />
                Filter
              </button>
              <div className="flex items-center border rounded-lg overflow-hidden">
                <button className="p-1.5 hover:bg-gray-100"><List size={16} className="text-gray-500" /></button>
                <button className="p-1.5 hover:bg-gray-100"><LayoutGrid size={16} className="text-gray-500" /></button>
                <button className="p-1.5 hover:bg-gray-100"><Calendar size={16} className="text-gray-500" /></button>
              </div>
            </div>
          </div>

          {/* STAT CARDS */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map(({ label, value, icon: Icon, color, bg }) => (
              <div key={label} className="border rounded-xl p-6 flex items-center justify-between min-h-[110px] shadow-sm hover:shadow-md transition">
                <div>
                  <p className="text-sm text-gray-500 mb-1">{label}</p>
                  <p className="text-3xl font-bold text-gray-800">{value}</p>
                </div>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${bg}`}>
                  <Icon size={40} className={color} />
                </div>
              </div>
            ))}
          </div>

          {/* TABLE */}
          <h2 className="text-base font-semibold text-gray-700 mb-4">Recent Proposals</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-gray-400 uppercase border-b">
                  <th className="text-left py-2 pr-4 font-medium">Project ID</th>
                  <th className="text-left py-2 pr-4 font-medium">Title</th>
                  <th className="text-left py-2 pr-4 font-medium">Status</th>
                  <th className="text-left py-2 pr-4 font-medium">Similarity</th>
                  <th className="text-left py-2 pr-4 font-medium">Submitted</th>
                  <th className="text-left py-2 font-medium">Discipline</th>
                </tr>
              </thead>
              <tbody>
                {proposals
                  .filter((p) =>
                    search === "" ||
                    p.title.toLowerCase().includes(search.toLowerCase()) ||
                    p.id.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((p, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-gray-50 transition-colors">
                      <td className="py-3 pr-4 text-gray-600 font-medium">{p.id}</td>
                      <td className="py-3 pr-4 text-gray-700">{p.title}</td>
                      <td className="py-3 pr-4">
                        <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-2 py-0.5 rounded-full">
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3 pr-4">
                        <SimilarityBadge value={p.similarity} />
                      </td>
                      <td className="py-3 pr-4 text-gray-500">{p.submitted}</td>
                      <td className="py-3 text-gray-500">{p.discipline}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>}
      </main>
    </div>
  );
}