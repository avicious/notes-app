import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, SignUp, GetStarted } from "./pages";
import ProtectedRoute from "./utils/ProtectedRoute";
import { AuthProvider } from "./utils/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <GetStarted />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />;
    </AuthProvider>
  );
};

export default App;
