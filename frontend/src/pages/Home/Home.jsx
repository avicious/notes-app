import { Plus } from "lucide-react";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="app-container">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 7th April"
            date="3rd April 2026"
            content="Meeting on 7th April"
            tags="#Meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-accent hover:bg-accent/80 absolute right-10 bottom-10 cursor-pointer"
        onClick={() => {}}
      >
        <Plus size={32} color="white" />
      </button>
    </>
  );
};

export default Home;
