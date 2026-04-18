import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home, Login, SignUp, GetStarted } from "./pages";

const routes = (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<GetStarted />} />
      <Route path="/dashboard" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);

const App = () => {
  return <div>{routes}</div>;
};

export default App;
