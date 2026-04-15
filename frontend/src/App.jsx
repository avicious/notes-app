import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { Home, Login, SignUp, GetStarted } from "./pages";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ isAuthenticated, children }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};

const App = () => {
  const isAuthenticated = false;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <GetStarted />
            </PublicRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/sign-up"
          element={
            <PublicRoute isAuthenticated={isAuthenticated}>
              <SignUp />
            </PublicRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
