import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp } from "./pages";
import Navbar from "./components/Navbar/Navbar.jsx";

const routes = (
  <Router>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/sign-up" exact element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>
      <Navbar />
      {routes}
    </div>
  );
};

export default App;
