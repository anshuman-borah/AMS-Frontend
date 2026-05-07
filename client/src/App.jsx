import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Login          from "./pages/Login";
import Dashboard      from "./pages/Dashboard";
import SubmitProposal from "./pages/SubmitProposal";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Simple auth guard wrapper
  const guard = (element) => loggedIn ? element : <Navigate to="/login" />;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login"     element={loggedIn ? <Navigate to="/dashboard" /> : <Login onLogin={() => setLoggedIn(true)} />} />
        <Route path="/dashboard" element={guard(<Dashboard      onLogout={() => setLoggedIn(false)} />)} />
        <Route path="/submit"    element={guard(<SubmitProposal onLogout={() => setLoggedIn(false)} />)} />
        <Route path="*"          element={<Navigate to={loggedIn ? "/dashboard" : "/login"} />} />
      </Routes>
    </BrowserRouter>
  );
}