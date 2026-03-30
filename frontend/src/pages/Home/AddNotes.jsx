import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { X } from "lucide-react";

const AddNotes = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:text-slate-500"
        onClick={onClose}
      >
        <X size={32} className="text-slate-400 cursor-pointer" />
      </button>

      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="input-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="text-md text-carbon bg-slate-100 p-2 outline-none rounded"
          placeholder="Go to gym at 6"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label htmlFor="content" className="input-label">
          Content
        </label>
        <textarea
          id="content"
          className="text-sm text-carbon outline-none bg-slate-100 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>

      <div className="mt-4">
        <label className="input-label">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>
        Add
      </button>
    </div>
  );
};

export default AddNotes;
