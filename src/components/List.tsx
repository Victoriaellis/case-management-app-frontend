"use client";
import { useState } from "react";
import { EditListItem } from "./EditListItem";
import { ListItemType } from "./types";
import { ListItem } from "./ListItem";

interface listItemProps {
  listItems: ListItemType[];
  handleCreateTask: (newTask: Omit<ListItemType, "id">) => void;
  handleUpdateTaskStatus: (id: string, complete: boolean) => void;
  handleDeleteTask: (id: string) => void;
}

export const List = ({
  listItems,
  handleCreateTask,
  handleUpdateTaskStatus,
  handleDeleteTask,
}: listItemProps) => {
  const [showNewItemForm, setShowNewItemForm] = useState<boolean>(false);

  const handleAddListItem = (newListItem: Omit<ListItemType, "id">) => {
    handleCreateTask(newListItem);
    setShowNewItemForm(false);
  };

  return (
    <div className="w-2/3">
      <button
        onClick={() => setShowNewItemForm(!showNewItemForm)}
        className="mb-2 p-2 border rounded-md"
      >
        {showNewItemForm ? "Cancel" : "Add to do"}
      </button>
      {showNewItemForm && (
        <EditListItem handleAddListItem={handleAddListItem} />
      )}
      {listItems.length &&
        listItems.map((item) => (
          <ListItem
            key={item.title}
            item={item}
            onToggle={() => handleUpdateTaskStatus(item.id, !item.complete)}
            onDelete={() => handleDeleteTask(item.id)}
          />
        ))}
    </div>
  );
};
