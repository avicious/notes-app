import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-6 font-sans">
      <div className="max-w-2xl text-center">
        <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-wider text-slate-500 uppercase bg-slate-200 rounded-full">
          Simple & Focused
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6">
          Write it down.
        </h1>

        <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-10 max-w-lg mx-auto">
          A workspace designed to help you capture thoughts, organize ideas, and
          maintain focus on your priorities.
        </p>

        <button
          onClick={() => navigate("/login")}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-200 bg-slate-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 hover:bg-slate-800 active:scale-95 shadow-lg cursor-pointer"
        >
          Get Started
          <svg
            className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 7l5 5m0 0l-5 5m5-5H6"
            />
          </svg>
        </button>
      </div>

      <footer className="absolute bottom-8 text-slate-400 text-sm">
        &copy; {new Date().getFullYear()} Vertex. Clean. Simple. Free.
      </footer>
    </div>
  );
};

export default GetStarted;
