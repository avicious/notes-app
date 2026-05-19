import { Plus, X } from "lucide-react";
import { useState } from "react";

const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const addNewTag = () => {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addNewTag();
      setInputValue("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-2 text-sm text-carbon bg-slate-100 px-3 py-1 rounded"
            >
              #{tag}
              <button
                className="cursor-pointer"
                onClick={() => {
                  handleRemoveTag(tag);
                }}
              >
                <X />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border border-gray-200 px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />

        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-accent cursor-pointer hover:bg-accent/20"
          onClick={() => {
            addNewTag();
          }}
        >
          <Plus className="text-accent" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
