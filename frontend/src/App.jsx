import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, GetStarted } from "./pages";

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign-up" element={<SignUp />} />
    </Routes>
  </Router>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
