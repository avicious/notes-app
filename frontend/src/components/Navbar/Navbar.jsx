import { useNavigate } from "react-router-dom";

import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  const navigate = useNavigate();

  const onLogout = () => {
    navigate("/login");
  };

  return (
    <nav className="bg-ghost flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-carbon py-2">Notes</h2>

      <SearchBar />

      <ProfileInfo onLogout={onLogout} />
    </nav>
  );
};

export default Navbar;
