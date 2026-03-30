const AddNotes = () => {
  return (
    <div>
      <div className="flex flex-col gap-2">
        <label htmlFor="title" className="input-label">
          Title
        </label>
        <input
          id="title"
          type="text"
          className="text-2xl text-carbon outline-none"
          placeholder="Go to gym at 6"
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
        />
      </div>

      <div className="mt-4">
        <label className="input-label">Tags</label>
      </div>

      <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}}>Add</button>
    </div>
  );
};

export default AddNotes;
