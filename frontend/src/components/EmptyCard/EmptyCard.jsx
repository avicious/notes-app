import addNote from "../../assets/add-note.png";
import noNote from "../../assets/no-note.png";

const EmptyCard = ({ isSearch }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img src={isSearch ? noNote : addNote} alt="No Notes" className="w-60" />

      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {isSearch
          ? "No notes found matching your search."
          : `Capture your thoughts, ideas, and reminders effortlessly. <br /> Click
        the Add button to create your first note.`}
      </p>
    </div>
  );
};

export default EmptyCard;
