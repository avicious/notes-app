import { Pin, SquarePen, Trash } from "lucide-react";
import { format } from "date-fns";

const NoteCard = ({
  title,
  date,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  const formatedDate = format(new Date(date), "do MMMM yyyy");
  return (
    <div className="border border-gray-200 rounded p-4 bg-ghost shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1.5 hover:shadow-xl hover:scale-[1.02]">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium">{title}</h3>
          <span className="text-xs text-slate-500">{formatedDate}</span>
        </div>

        <Pin
          className={`cursor-pointer ${isPinned ? "text-accent" : "text-slate-300"}`}
          onClick={onPinNote}
        />
      </div>

      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>

      <div className="flex items-center justify-between mt-2">
        <div className="text-xs text-slate-500">
          {tags.map((item) => `#${item} `)}
        </div>

        <div className="flex items-center gap-2">
          <SquarePen
            className="text-slate-300 hover:text-green-600 cursor-pointer"
            onClick={onEdit}
          ></SquarePen>
          <Trash
            className="text-slate-300 hover:text-red-500 cursor-pointer"
            onClick={onDelete}
          ></Trash>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
