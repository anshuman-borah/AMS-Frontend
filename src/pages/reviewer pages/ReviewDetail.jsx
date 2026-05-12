import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ReviewerSidebar from "./ReviewerSidebar";
import LoadingScreen from "../../components/common/Loadingscreen";
import toast from "react-hot-toast";
import { CheckCircle, XCircle, ArrowLeft, AlertTriangle } from "lucide-react";
import axios from "axios";

// ── Similarity score ring ──────────────────────────────────────────────────
function SimilarityRing({ score }) {
  const pct     = Math.min(100, Math.round(score));
  const radius  = 36;
  const circ    = 2 * Math.PI * radius;
  const dashLen = (pct / 100) * circ;
  const color   = pct >= 50 ? "#ef4444" : pct >= 20 ? "#f97316" : "#22c55e";

  return (
    <div className="flex flex-col items-center">
      <svg width={90} height={90}>
        <circle cx={45} cy={45} r={radius} fill="none" stroke="#e5e7eb" strokeWidth={8} />
        <circle
          cx={45} cy={45} r={radius}
          fill="none"
          stroke={color}
          strokeWidth={8}
          strokeDasharray={`${dashLen} ${circ}`}
          strokeLinecap="round"
          transform="rotate(-90 45 45)"
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          fontSize="14" fontWeight="bold" fill={color}>
          {pct}%
        </text>
      </svg>
    </div>
  );
}

export default function ReviewDetail({ onLogout }) {
  const { projectId } = useParams();
  const navigate      = useNavigate();

  const [project,        setProject]        = useState(null);
  const [alreadyReviewed,setAlreadyReviewed] = useState(false);
  const [loading,        setLoading]        = useState(true);
  const [comment,        setComment]        = useState("");
  const [submitting,     setSubmitting]     = useState(false);

  // ── Fetch project details ────────────────────────────────────────────────
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res   = await axios.get(
          `https://ams-backend-ktz1.onrender.com/api/reviews/project/${projectId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        /*
          Actual API shape:
          {
            project: {
              _id, title, discipline, year,
              ownerId: { _id, name, email },
              introduction, actionPlan, expectedOutcome,
              objectives: [string],
              budget: { nonRecurring, recurring, travel, operational, manpower, total },
              status, similarityScore, createdAt
            },
            review: { decision, comment, createdAt },   // if already reviewed
            alreadyReviewed: boolean
          }
        */
        const d = res.data;
        setProject(d.project ?? d);
        setAlreadyReviewed(d.alreadyReviewed ?? false);
        // Pre-fill comment if already reviewed
        if (d.review?.comment) setComment(d.review.comment);
      } catch (err) {
        console.error("ReviewDetail fetch error:", err);
        toast.error("Failed to load project details");
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  // ── Submit review ────────────────────────────────────────────────────────
  // POST body: { decision: "APPROVED"|"REJECTED", comment: string }
  // Known backend errors:
  //   "Cannot review project with status: REJECTED/APPROVED" → already reviewed
  //   "Invalid option: expected one of "APPROVED"|"REJECTED"" → bad decision value
  const handleReview = async (decision) => {
    if (!comment.trim()) {
      toast.error("Please add review comments before submitting");
      return;
    }
    try {
      setSubmitting(true);
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `https://ams-backend-ktz1.onrender.com/api/reviews/project/${projectId}/review`,
        { decision, comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("Review submitted:", res.data);
      toast.success(`Proposal ${decision === "APPROVED" ? "✅ approved" : "❌ rejected"} successfully`);
      setTimeout(() => navigate("/reviewer/assigned"), 1200);
    } catch (err) {
      console.error("Review submit error:", err);
      const msg = err.response?.data?.message ?? "Failed to submit review";
      // Map backend error messages to friendly text
      if (msg.startsWith("Cannot review project with status:")) {
        toast.error("This proposal has already been reviewed and cannot be changed.");
      } else if (msg.includes("Invalid option")) {
        toast.error("Invalid decision. Please choose Approve or Reject.");
      } else {
        toast.error(msg);
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
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

  if (!project) {
    return (
      <div className="flex min-h-screen font-sans bg-gray-100">
        <ReviewerSidebar onLogout={onLogout} />
        <main className="flex-1 p-6 flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p className="text-lg font-semibold mb-2">Project not found</p>
            <button
              onClick={() => navigate("/reviewer/assigned")}
              className="text-blue-600 hover:underline text-sm"
            >
              ← Back to list
            </button>
          </div>
        </main>
      </div>
    );
  }

  const similarity   = project.similarityScore ?? 0;
  const similarProjs = project.similarProjects  ?? [];

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      <ReviewerSidebar onLogout={onLogout} />

      <main className="flex-1 p-6 overflow-auto">
        <div className="max-w-5xl mx-auto space-y-4">

          {/* Header */}
          <div className="bg-white rounded-2xl shadow-sm px-8 py-5">
            <h1 className="text-xl font-bold text-gray-800 mb-1">Assigned Reviews</h1>
            <button
              onClick={() => navigate("/reviewer/assigned")}
              className="flex items-center gap-1 text-blue-500 text-sm hover:underline"
            >
              <ArrowLeft size={14} /> Back to list
            </button>
          </div>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Left — Proposal Details */}
            <div className="lg:col-span-2 space-y-4">

              {/* Proposal card */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-base font-bold text-gray-700 mb-4 pb-2 border-b border-blue-100">
                  Proposal Details
                </h2>

                <div className="space-y-5 text-sm text-gray-700">
                  <Field label="Principal Scientist" value={project.ownerId?.name ?? project.principalScientist?.name ?? "—"} />
                  <Field label="Project Title"       value={project.title} />
                  <Field label="Discipline"          value={project.discipline ?? "—"} />

                  {project.introduction && (
                    <div>
                      <p className="font-semibold mb-1">Introduction &amp; Rationale</p>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                        {project.introduction}
                      </p>
                    </div>
                  )}

                  {project.objectives?.length > 0 && (
                    <div>
                      <p className="font-semibold mb-1">Objectives</p>
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {project.objectives.map((o, i) => (
                          <li key={i}>{typeof o === "string" ? o : o.text ?? JSON.stringify(o)}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {project.budget?.total != null && (
                    <Field
                      label="Budget"
                      value={`₹ ${Number(project.budget.total).toLocaleString("en-IN")} Lakhs`}
                    />
                  )}
                </div>
              </div>

              {/* Review Comments */}
              <div className="bg-white rounded-2xl shadow-sm p-8">
                <h2 className="text-base font-bold text-gray-700 mb-4">Review Comments</h2>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={6}
                  placeholder="Enter your review comments, suggestions, or concerns"
                  className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
                />

                {/* Action Buttons */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleReview("APPROVED")}
                    disabled={submitting || alreadyReviewed || project.status !== "PENDING"}
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold px-5 py-2 rounded-lg transition"
                  >
                    <CheckCircle size={16} /> Approve
                  </button>
                  <button
                    onClick={() => handleReview("REJECTED")}
                    disabled={submitting || alreadyReviewed || project.status !== "PENDING"}
                    className="flex items-center gap-2 border border-red-400 hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed text-red-600 text-sm font-semibold px-5 py-2 rounded-lg transition"
                  >
                    <XCircle size={16} /> Reject
                  </button>
                </div>

                {(alreadyReviewed || project.status !== "PENDING") && (
                  <p className={`mt-3 text-xs font-medium ${
                    project.status === "APPROVED" ? "text-green-600" : "text-red-500"
                  }`}>
                    ✓ This proposal has already been <strong>{project.status}</strong>.
                    {alreadyReviewed && " Your review has been recorded."}
                  </p>
                )}
              </div>
            </div>

            {/* Right — Similarity Panel */}
            <div className="space-y-4">

              {/* Score card */}
              <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
                <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">
                  Similarity Analysis
                </h3>
                <p className="text-xs text-gray-400 mb-2">Similarity Score</p>
                <SimilarityRing score={similarity} />

                {similarity >= 20 && (
                  <div className="mt-3 flex items-center justify-center gap-1 bg-yellow-50 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
                    <AlertTriangle size={12} /> Similar Projects detected
                  </div>
                )}
              </div>

              {/* Similar projects list */}
              {similarProjs.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-sm font-bold text-gray-600 mb-4 uppercase tracking-wide">
                    Similar Projects
                  </h3>
                  <div className="space-y-3">
                    {similarProjs.map((sp, i) => (
                      <div key={i} className="border border-gray-100 rounded-xl p-3">
                        <p className="text-sm font-semibold text-gray-700 truncate">{sp.title}</p>
                        <p className="text-xs text-gray-400">
                          {sp.principalScientist?.name ?? sp.scientist ?? ""}{" "}
                          {sp.year ? `(${sp.year})` : ""}
                        </p>
                        <span className="text-xs font-bold text-orange-500">
                          {Math.round(sp.similarityScore ?? sp.similarity ?? 0)}% match
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

// ── Helper ─────────────────────────────────────────────────────────────────
function Field({ label, value }) {
  return (
    <div>
      <p className="font-semibold mb-0.5">{label}</p>
      <p className="text-gray-600">{value}</p>
    </div>
  );
}
