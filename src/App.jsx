import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

// Shared login
import Login from "./pages/auth/Login";

// Scientist pages
import Dashboard      from "./pages/dashboard/Dashboard";
import SubmitProposal from "./pages/proposals/SubmitProposal";
import MyProposals    from "./pages/proposals/MyProposals";

// Reviewer pages
import ReviewerDashboard from "./pages/reviewer pages/ReviewerDashboard";
import AssignedReviews   from "./pages/reviewer pages/AssignedReviews";
import ReviewDetail      from "./pages/reviewer pages/ReviewDetail";

// ── Helpers ──────────────────────────────────────────────────────────────────
function getSavedRole() {
  try {
    // A token MUST exist for the session to be considered valid.
    // Without this check, stale localStorage flags from a previous session
    // would bypass the login page on every fresh visit.
    const token = localStorage.getItem("token");
    if (!token) return null;

    const user = JSON.parse(localStorage.getItem("user"));
    return user?.role ?? null;          // "SCIENTIST" | "REVIEWER" | null
  } catch {
    return null;
  }
}

export default function App() {
  // Single piece of state: which role is currently logged in (null = guest)
  const [role, setRole] = useState(() => {
    const saved = getSavedRole();
    const loggedIn =
      localStorage.getItem("loggedIn") === "true" ||
      localStorage.getItem("reviewerLoggedIn") === "true";
    return loggedIn ? saved : null;
  });

  // Called by Login.jsx with the full API response
  const handleLogin = (data) => {
    const userRole = data.user?.role;         // "SCIENTIST" or "REVIEWER"

    // Mark the right flag so refresh works
    if (userRole === "REVIEWER") {
      localStorage.setItem("reviewerLoggedIn", "true");
      localStorage.removeItem("loggedIn");
    } else {
      localStorage.setItem("loggedIn", "true");
      localStorage.removeItem("reviewerLoggedIn");
    }

    setRole(userRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("reviewerLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setRole(null);
  };

  // ── Guards ────────────────────────────────────────────────────────────────
  const scientistGuard = (element) =>
    role === "SCIENTIST" ? element : <Navigate to="/login" replace />;

  const reviewerGuard = (element) =>
    role === "REVIEWER" ? element : <Navigate to="/login" replace />;

  // ── Where to send a logged-in user who hits /login ────────────────────────
  const loginRedirect = () => {
    if (role === "REVIEWER")  return <Navigate to="/reviewer/dashboard" replace />;
    if (role === "SCIENTIST") return <Navigate to="/dashboard" replace />;
    return <Login onLogin={handleLogin} />;
  };

  // ── Default (catch-all) redirect ──────────────────────────────────────────
  const defaultRedirect = () => {
    if (role === "REVIEWER")  return <Navigate to="/reviewer/dashboard" replace />;
    if (role === "SCIENTIST") return <Navigate to="/dashboard" replace />;
    return <Navigate to="/login" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* ── Single shared login ─────────────────────────────────────────── */}
        <Route path="/login"          element={loginRedirect()} />
        {/* Keep /reviewer/login as an alias so old links still work */}
        <Route path="/reviewer/login" element={loginRedirect()} />

        {/* ── Scientist pages ─────────────────────────────────────────────── */}
        <Route path="/dashboard"   element={scientistGuard(<Dashboard      onLogout={handleLogout} />)} />
        <Route path="/submit"      element={scientistGuard(<SubmitProposal onLogout={handleLogout} />)} />
        <Route path="/myproposals" element={scientistGuard(<MyProposals    onLogout={handleLogout} />)} />

        {/* ── Reviewer pages ──────────────────────────────────────────────── */}
        <Route path="/reviewer/dashboard"          element={reviewerGuard(<ReviewerDashboard onLogout={handleLogout} />)} />
        <Route path="/reviewer/assigned"           element={reviewerGuard(<AssignedReviews   onLogout={handleLogout} />)} />
        <Route path="/reviewer/project/:projectId" element={reviewerGuard(<ReviewDetail      onLogout={handleLogout} />)} />

        {/* ── Catch-all ───────────────────────────────────────────────────── */}
        <Route path="*" element={defaultRedirect()} />

      </Routes>
    </BrowserRouter>
  );
}