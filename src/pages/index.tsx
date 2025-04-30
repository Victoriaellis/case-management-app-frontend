import { List } from "@/components/List";
import { ListItemType } from "@/components/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [listItems, setListItems] = useState<ListItemType[]>([]);

  const url = "http://localhost:3000/api/tasks";

  const fetchData = async () => {
    const res = await fetch(url);
    const data = await res.json();
    return data;
  };

  const handleCreateTask = async (newTask: Omit<ListItemType, "id">) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error(`Failed to create task: ${response.statusText}`);
      }

      const createdTask = await response.json();
      setListItems([...listItems, createdTask]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const handleUpdateTaskStatus = async (id: string, complete: boolean) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ complete }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update task status: ${response.statusText}`);
      }

      setListItems((prevListItems) =>
        prevListItems.map((prevListItem) =>
          prevListItem.id === id
            ? { ...prevListItem, complete: !prevListItem.complete }
            : prevListItem
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete task`);
      }

      setListItems((prevListItems) =>
        prevListItems.filter((item) => item.id !== id)
      );
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchData();
      console.log(data);
      setListItems(data);
    };

    loadData();
  }, []);

  return (
    <main className="p-8">
      <h1 className="mb-2 font-bold text-lg">To do list</h1>
      <List
        listItems={listItems}
        handleCreateTask={handleCreateTask}
        handleUpdateTaskStatus={handleUpdateTaskStatus}
        handleDeleteTask={handleDeleteTask}
      />
    </main>
  );
}
