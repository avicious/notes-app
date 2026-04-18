import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, GetStarted } from "./pages";

const App = () => {
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
