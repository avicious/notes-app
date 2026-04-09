import { Plus } from "lucide-react";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import AddNotes from "./AddNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);
  const navigate = useNavigate();

  let getAllNotes;

  useEffect(() => {
    const controller = new AbortController();

    const getUserInfo = async () => {
      try {
        const response = await axiosInstance.get("/get-user", {
          signal: controller.signal,
        });

        if (response.data?.user) {
          setUserInfo(response.data.user);
        }
      } catch (error) {
        if (error.name === "CanceledError") return;

        if (error.response?.status === 401) {
          navigate("/login");
        }
      }
    };

    getUserInfo();

    return () => {
      controller.abort();
    };
  }, [navigate]);

  useEffect(() => {
    const controller = new AbortController();

    getAllNotes = async () => {
      try {
        const response = await axiosInstance.get("/notes", {
          signal: controller.signal,
        });

        if (response.data?.notes) {
          setAllNotes(response.data.notes);
        }
      } catch (error) {
        if (error.name === "CanceledError") return;
        console.error("Fetch error:", error);
      }
    };

    getAllNotes();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <Navbar userInfo={userInfo} />

      <div className="app-container">
        <div className="grid grid-cols-4 gap-4 mt-8">
          {allNotes.map((item) => (
            <NoteCard
              key={item._id}
              title={item.title}
              date={item.createdAt}
              content={item.content}
              tags={item.tags}
              isPinned={item.isPinned}
              onEdit={() => {}}
              onDelete={() => {}}
              onPinNote={() => {}}
            />
          ))}
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
          getAllNotes={getAllNotes}
        />
      </Modal>
    </>
  );
};

export default Home;
