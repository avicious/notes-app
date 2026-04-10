import { useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { X } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const AddNotes = ({
  noteData,
  type,
  getAllNotes,
  onClose,
  handleShowMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);

  const [error, setError] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/notes", {
        title,
        content,
        tags,
      });

      if (response.data?.note) {
        handleShowMessage("Note Added Successfully", "add");
        await getAllNotes();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      setError(errorMessage);
    }
  };

  const editNote = async () => {
    try {
      const response = await axiosInstance.patch(`/notes/${noteData?._id}`, {
        title,
        content,
        tags,
      });

      if (response.data?.note) {
        handleShowMessage("Note Updated Successfully", "add");
        await getAllNotes();
        onClose();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      setError(errorMessage);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }

    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };

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

      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}

      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        {type === "edit" ? "Update" : "Add"}
      </button>
    </div>
  );
};

export default AddNotes;
