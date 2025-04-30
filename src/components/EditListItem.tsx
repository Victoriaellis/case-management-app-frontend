import { useState } from "react";
import { ListItemType } from "./types";

interface EditListItemProps {
  handleAddListItem: (newListItem: Omit<ListItemType, "id">) => void;
}

export const EditListItem = ({ handleAddListItem }: EditListItemProps) => {
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newDueDate, setNewDueDate] = useState("");

  const addListItem = () => {
    handleAddListItem({
      title: newTitle,
      description: newDescription,
      complete: false,
      due_date: newDueDate,
    });
  };
  return (
    <div className="border p-4 rounded-2xl shadow-sm space-y-2 bg-gray-50 mb-2">
      <input
        type="text"
        placeholder="Title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Description"
        value={newDescription}
        onChange={(e) => setNewDescription(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        placeholder="Due date"
        value={newDueDate}
        onChange={(e) => setNewDueDate(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        onClick={addListItem}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Save
      </button>
    </div>
  );
};
