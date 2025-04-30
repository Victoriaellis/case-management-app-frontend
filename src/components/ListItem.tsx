import { ListItemType } from "./types";

interface ListProps {
  item: ListItemType;
  onToggle: () => void;
  onDelete: () => void;
}

export const ListItem = ({ item, onToggle, onDelete }: ListProps) => {
  const dueDate = new Date(item.due_date).toLocaleDateString();
  return (
    <div className="flex justify-between items-start p-4 border rounded-2xl shadow-sm bg-white hover:shadow-md transition-all gap-3 mb-2">
      <input
        type="checkbox"
        checked={item.complete}
        onChange={onToggle}
        className="mt-1 h-5 w-5 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
      />
      <div>
        <h3
          className={`text-lg font-semibold ${
            item.complete ? "line-through text-gray-400" : ""
          }`}
        >
          {item.title}
        </h3>
        <p
          className={`text-sm ${
            item.complete ? "line-through text-gray-300" : "text-gray-600"
          }`}
        >
          {item.description}
        </p>
        <p
          className={`text-sm ${
            item.complete ? "line-through text-gray-300" : "text-gray-600"
          }`}
        >
          Due: {dueDate}
        </p>
      </div>
      <button onClick={onDelete} className="cursor-pointer">
        X
      </button>
    </div>
  );
};
