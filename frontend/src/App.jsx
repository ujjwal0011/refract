import React, { use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { useLenis } from "./hooks/useLenis";
import { CodeReviewProvider } from "./context/CodeReviewContext";
import Navbar from "./components/Navbar";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ReviewHistory from "./pages/ReviewHistory";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    useLenis(),
    (
      <AuthProvider>
        <CodeReviewProvider>
          <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/history"
                  element={
                    <ProtectedRoute>
                      <ReviewHistory />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </div>
          </Router>
        </CodeReviewProvider>
      </AuthProvider>
    )
  );
}

export default App;
