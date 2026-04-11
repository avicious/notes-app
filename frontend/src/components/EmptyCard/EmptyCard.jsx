import addNote from "../../assets/add-note.png";

const EmptyCard = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={addNote} alt="No Notes" className="w-60" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        Capture your thoughts, ideas, and reminders effortlessly. <br /> Click
        the Add button to create your first note.
      </p>
    </div>
  );
};

export default EmptyCard;
