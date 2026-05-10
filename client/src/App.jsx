import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubmitProposal from "./pages/SubmitProposal";
import MyProposals from "./pages/MyProposals";

export default function App() {

  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("loggedIn") === "true"
  );

  // Auth Guard
  const guard = (element) =>
    loggedIn ? element : <Navigate to="/login" />;

  // Login Handler
  const handleLogin = () => {
    localStorage.setItem("loggedIn", "true");
    setLoggedIn(true);
  };

  // Logout Handler
  const handleLogout = () => {
    localStorage.removeItem("loggedIn");
    setLoggedIn(false);
  };

  return (
    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/dashboard" />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={guard(
            <Dashboard onLogout={handleLogout} />
          )}
        />

        {/* Submit Proposal */}
        <Route
          path="/submit"
          element={guard(
            <SubmitProposal onLogout={handleLogout} />
          )}
        />

        {/* My Proposals */}
        <Route
          path="/myproposals"
          element={guard(
            <MyProposals onLogout={handleLogout} />
          )}
        />

        {/* Default Redirect */}
        <Route
          path="*"
          element={
            <Navigate
              to={loggedIn ? "/dashboard" : "/login"}
            />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}