import { List } from "@/components/List";
import { ListItemType } from "@/components/types";
import { useEffect, useState } from "react";

export default function Home() {
  const [listItems, setListItems] = useState<ListItemType[]>([]);

  const fetchData = async () => {
    const res = await fetch("http://localhost:3000/api/tasks");
    const data = await res.json();
    return data;
  };

  console.log(listItems);

  const handleCreateTask = async (newTask: Omit<ListItemType, "id">) => {
    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    const createdTask = await response.json();
    setListItems([...listItems, createdTask]);
  };

  const handleUpdateTaskStatus = async (id: string, complete: boolean) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, complete }),
    });

    setListItems((prevListItems) =>
      prevListItems.map((prevListItem) =>
        prevListItem.id === id
          ? { ...prevListItem, complete: !prevListItem.complete }
          : prevListItem
      )
    );
  };

  const handleDeleteTask = async (id: string) => {
    await fetch("http://localhost:3000/api/tasks", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });

    setListItems((prevListItems) =>
      prevListItems.filter((item) => item.id !== id)
    );
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
