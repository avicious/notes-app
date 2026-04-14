import { useState } from "react";

import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { performLogout } from "../../utils/axiosInstance";

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
      <h2 className="text-3xl text-accent font-extrabold tracking-tight py-2 cursor-default">Vertex</h2>

      {userInfo && (
        <>
          <SearchBar
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            handleSearch={handleSearch}
            onClearSearch={onClearSearch}
          />

          <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
        </>
      )}
    </nav>
  );
};

export default Navbar;
