import { Search, X } from "lucide-react";

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="w-80 flex items-center px-4 bg-slate-100 rounded-sm">
      <input
        type="text"
        placeholder="Search Notes"
        className="w-full text-sm bg-transparent py-2.5 outline-none"
        value={value}
        onChange={onChange}
      />

      <X
        className="text-slate-400 cursor-pointer hover:text-slate-950 mr-3"
        onClick={onClearSearch}
      />

      <Search
        className="text-slate-400 cursor-pointer hover:text-slate-950"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
