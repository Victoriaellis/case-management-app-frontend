import { render, screen } from "@testing-library/react";
import { ListItem } from "./ListItem";
import userEvent from "@testing-library/user-event";

const mockListItemData = {
  id: "1",
  title: "Task 1",
  description: "This is a description for task 1",
  due_date: "01/11/2026",
  complete: false,
};

const mockOnToggle = jest.fn();
const mockOnDelete = jest.fn();

describe("List item", () => {
  it("should render item with title, description and due date", () => {
    render(
      <ListItem
        item={mockListItemData}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    expect(screen.getByText("Task 1")).toBeDefined();
    expect(screen.getByText("This is a description for task 1")).toBeDefined();
  });

  it("should call onToggle when checkbox clicked", async () => {
    render(
      <ListItem
        item={mockListItemData}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);
    expect(mockOnToggle).toHaveBeenCalled();
  });

  it("should call onDelete when X button clicked", async () => {
    render(
      <ListItem
        item={mockListItemData}
        onToggle={mockOnToggle}
        onDelete={mockOnDelete}
      />
    );
    const xButton = screen.getByRole("button", {
      name: "X",
    });
    await userEvent.click(xButton);
    expect(mockOnDelete).toHaveBeenCalled();
  });
});
