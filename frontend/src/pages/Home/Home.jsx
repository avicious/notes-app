import { Plus } from "lucide-react";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import AddNotes from "./AddNotes";
import { useState } from "react";
import Modal from "react-modal";

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  return (
    <>
      <Navbar />

      <div className="app-container">
        <div className="grid grid-cols-4 gap-4 mt-8">
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
        onClick={() => {
          setOpenModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <Plus size={32} color="white" />
      </button>

      <Modal
        isOpen={openModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] bg-ghost rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddNotes
          type={openModal.type}
          noteData={openModal.data}
          onClose={() => {
            setOpenModal({ isShown: false, type: "add", data: null });
          }}
        />
      </Modal>
    </>
  );
};

export default Home;
