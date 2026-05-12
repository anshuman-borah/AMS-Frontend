import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/auth/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import SubmitProposal from "./pages/proposals/SubmitProposal";
import MyProposals from "./pages/proposals/MyProposals";
import AdminDashboard from "./pages/admin/AdminDashboard";
import ReviewerDashboard from "./pages/reviewer/Reviewerdashboard";
import UserManagement from "./pages/admin/UserManagement";
import ProposalManagement from "./pages/admin/ProposalManagement";
import ReviewerAssignment from "./pages/admin/ReviewerAssignment";

export default function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );
  const [userRole, setUserRole] = useState(
    localStorage.getItem("userRole") || "scientist"
  );

  const handleLogin = (data, role) => {
    const normalizedRole = role?.toLowerCase() || "scientist";
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userRole", normalizedRole);
    setLoggedIn(true);
    setUserRole(normalizedRole);
  };

  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userRole");
    setLoggedIn(false);
    setUserRole("scientist");
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* Login → redirect by role */}
        <Route
          path="/login"
          element={
            loggedIn
              ? <Navigate to={
                userRole === "admin" ? "/admin" :
                  userRole === "reviewer" ? "/reviewer" :
                    "/dashboard"
              } />
              : <Login onLogin={handleLogin} />
          }
        />

        {/* Scientist only */}
        <Route path="/dashboard" element={
          !loggedIn ? <Navigate to="/login" /> :
            userRole === "admin" ? <Navigate to="/admin" /> :
              userRole === "reviewer" ? <Navigate to="/reviewer" /> :
                <Dashboard onLogout={handleLogout} />
        } />

        <Route path="/submit" element={
          !loggedIn ? <Navigate to="/login" /> :
            userRole === "admin" ? <Navigate to="/admin" /> :
              userRole === "reviewer" ? <Navigate to="/reviewer" /> :
                <SubmitProposal onLogout={handleLogout} />
        } />

        <Route path="/myproposals" element={
          !loggedIn ? <Navigate to="/login" /> :
            userRole === "admin" ? <Navigate to="/admin" /> :
              userRole === "reviewer" ? <Navigate to="/reviewer" /> :
                <MyProposals onLogout={handleLogout} />
        } />

        {/* Admin only */}
        <Route path="/admin" element={
          !loggedIn ? <Navigate to="/login" /> :
            userRole === "admin" ? <AdminDashboard onLogout={handleLogout} /> :
              userRole === "reviewer" ? <Navigate to="/reviewer" /> :
                <Navigate to="/dashboard" />
        } />

        <Route
          path="/admin/users"
          element={
            !loggedIn ? (
              <Navigate to="/login" />
            ) : userRole === "admin" ? (
              <UserManagement onLogout={handleLogout} />
            ) : userRole === "reviewer" ? (
              <Navigate to="/reviewer" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/admin/proposals"
          element={
            !loggedIn ? (
              <Navigate to="/login" />
            ) : userRole === "admin" ? (
              <ProposalManagement
                onLogout={handleLogout}
              />
            ) : userRole === "reviewer" ? (
              <Navigate to="/reviewer" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />

        <Route
          path="/admin/assignments"
          element={
            !loggedIn ? (
              <Navigate to="/login" />
            ) : userRole === "admin" ? (
              <ReviewerAssignment
                onLogout={handleLogout}
              />
            ) : userRole === "reviewer" ? (
              <Navigate to="/reviewer" />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />


        {/* Reviewer only */}
        <Route path="/reviewer" element={
          !loggedIn ? <Navigate to="/login" /> :
            userRole === "reviewer" ? <ReviewerDashboard onLogout={handleLogout} /> :
              userRole === "admin" ? <Navigate to="/admin" /> :
                <Navigate to="/dashboard" />
        } />

        {/* Catch-all */}
        <Route path="*" element={
          <Navigate to={
            !loggedIn ? "/login" :
              userRole === "admin" ? "/admin" :
                userRole === "reviewer" ? "/reviewer" :
                  "/dashboard"
          } />
        } />

      </Routes>
    </BrowserRouter>
  );
}