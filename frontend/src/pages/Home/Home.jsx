import { Plus } from "lucide-react";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import AddNotes from "./AddNotes";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import Message from "../../components/Message/Message";
import EmptyCard from "../../components/EmptyCard/EmptyCard";

const Home = () => {
  const [openModal, setOpenModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  const [showMessage, setShowMessage] = useState({
    isShown: false,
    message: "",
    type: "add",
  });

  const [userInfo, setUserInfo] = useState(null);
  const [allNotes, setAllNotes] = useState([]);

  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();

  const handleEdit = (noteDetails) => {
    setOpenModal({ isShown: true, type: "edit", data: noteDetails });
  };

  const handleShowMessage = (message, type) => {
    setShowMessage({
      isShown: true,
      message,
      type,
    });
  };

  const handleCloseMessage = () => {
    setShowMessage({
      isShown: false,
      message: "",
    });
  };

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

  const getAllNotes = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/notes");

      if (response.data?.notes) {
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      if (error.name === "CanceledError") return;
      console.error("Fetch error:", error);
    }
  }, []);

  useEffect(() => {
    getAllNotes();
  }, []);

  const deleteNote = async (id) => {
    try {
      const response = await axiosInstance.delete(`/notes/${id}`);

      if (!response.data.error) {
        handleShowMessage("Note Deleted Successfully", "delete");
        await getAllNotes();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      console.error(errorMessage);
    }
  };

  const onSearchNote = async (query) => {
    try {
      const response = await axiosInstance.get("/notes/search", {
        params: { query },
      });

      if (response.data?.notes) {
        setIsSearch(true);
        setAllNotes(response.data.notes);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      console.error(errorMessage);
    }
  };

  const updateIsPinned = async (noteData) => {
    try {
      const response = await axiosInstance.patch(`/notes/${noteData._id}`, {
        isPinned: !noteData.isPinned,
      });

      if (response.data?.note) {
        handleShowMessage("Note Pinned Successfully");
        await getAllNotes();
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An unexpected error occurred. Please try again.";

      setError(errorMessage);
    }
  };

  const handleClearSearch = () => {
    setIsSearch(false);
    getAllNotes();
  };

  return (
    <>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        handleClearSearch={handleClearSearch}
      />

      <div className="app-container">
        {allNotes.length > 0 ? (
          <div className="grid grid-cols-4 gap-4 mt-8">
            {allNotes.map((item) => (
              <NoteCard
                key={item._id}
                title={item.title}
                date={item.createdAt}
                content={item.content}
                tags={item.tags}
                isPinned={item.isPinned}
                onEdit={() => handleEdit(item)}
                onDelete={() => deleteNote(item._id)}
                onPinNote={() => updateIsPinned(item)}
              />
            ))}
          </div>
        ) : (
          <EmptyCard isSearch={isSearch} />
        )}
      </div>

      <button
        className="w-16 h-16 flex items-center justify-center rounded-2xl bg-accent hover:bg-slate-800 absolute right-10 bottom-10 cursor-pointer"
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
          onClose={() =>
            setOpenModal({ isShown: false, type: "add", data: null })
          }
          getAllNotes={getAllNotes}
          handleShowMessage={handleShowMessage}
        />
      </Modal>

      <Message
        isShown={showMessage.isShown}
        message={showMessage.message}
        type={showMessage.type}
        onClose={handleCloseMessage}
      />
    </>
  );
};

export default Home;
