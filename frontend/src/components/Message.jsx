import { Check, X } from "lucide-react";
import { useEffect } from "react";

const Message = ({ isShown, message, type, onClose }) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onClose();
    }, 3000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onClose]);

  return (
    <div
      className={`absolute top-20 right-5 transition-all duration-100 ${isShown ? "opacity-100" : "opacity-0"}`}
    >
      <div
        className={`min-w-52 bg-white border border-gray-200 shadow-2xl rounded-md after:w-1.25 after:h-full ${type === "delete" ? "after:bg-red-500" : "after:bg-green-500"} after:absolute after:left-0 after:top-0 after:rounded-l-lg`}
      >
        <div className="flex items-center gap-3 py-2 px-4">
          <div
            className={`w-10 h-10 flex items-center justify-center rounded-full ${type === "delete" ? "bg-red-50" : "bg-green-50"}`}
          >
            {type === "delete" ? (
              <X className="text-red-500" />
            ) : (
              <Check className="text-green-500" />
            )}
          </div>

          <p className="text-sm text-slate-800">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
