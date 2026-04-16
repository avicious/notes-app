import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/AuthContext";
import { Home, Login, SignUp, GetStarted } from "./pages";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/auth/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  return !isAuthenticated ? children : <Navigate to="/dashboard" replace />;
};

const AppContent = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PublicRoute>
            <GetStarted />
          </PublicRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/sign-up"
        element={
          <PublicRoute>
            <SignUp />
          </PublicRoute>
        }
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App = () => {
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>;
};

export default App;
