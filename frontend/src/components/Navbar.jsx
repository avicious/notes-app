import { useState } from "react";
import ProfileInfo from "./ProfileInfo";
import SearchBar from "./SearchBar";
import { performLogout } from "../utils/axiosInstance";
import { Link } from "react-router-dom";

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    performLogout();
  };

  const handleSearch = () => {
    if (searchQuery) {
      onSearchNote(searchQuery);
    }
  };

  const onClearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  return (
    <nav className="bg-ghost flex items-center justify-between px-6 py-2 drop-shadow">
      <Link
        to="/"
        className="text-3xl font-extrabold text-accent tracking-tighter py-2 cursor-pointer select-none font-sans no-underline hover:opacity-80 transition-opacity"
      >
        Vertex
      </Link>

      {userInfo && (
        <>
          <div className="hidden sm:block">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={onClearSearch}
            />
          </div>

          
        </>
      )}
    </nav>
  );
};

export default Navbar;
