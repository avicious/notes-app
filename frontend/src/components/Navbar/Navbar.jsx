import { useState } from "react";

import ProfileInfo from "../Cards/ProfileInfo";
import SearchBar from "../SearchBar/SearchBar";
import { performLogout } from "../../utils/axiosInstance";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const onLogout = () => {
    performLogout();
  };

  const handleSearch = () => {};

  const onClearSearch = () => {
    setSearchQuery("");
  };

  return (
    <nav className="bg-ghost flex items-center justify-between px-6 py-2 drop-shadow">
      <h2 className="text-xl font-medium text-carbon py-2">Notes</h2>

      <SearchBar
        value={searchQuery}
        onChange={({ target }) => setSearchQuery(target.value)}
        handleSearch={handleSearch}
        onClearSearch={onClearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </nav>
  );
};

export default Navbar;
