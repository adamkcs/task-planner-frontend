import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

// Task type
interface Task {
  id: string;
  content: string;
}

// Columns type
interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Record<string, Column> = {
  todo: { id: "todo", title: "To Do", tasks: [{ id: "1", content: "Task 1" }] },
  inprogress: { id: "inprogress", title: "In Progress", tasks: [] },
  done: { id: "done", title: "Done", tasks: [] },
};

const Board = () => {
  const [columns, setColumns] = useState(initialColumns);

  // Handle drag event
  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;

    // Clone columns
    const newColumns = { ...columns };

    // Remove task from source column
    const sourceColumn = newColumns[source.droppableId];
    const task = sourceColumn.tasks[source.index];
    sourceColumn.tasks.splice(source.index, 1);

    // Add task to destination column
    const destinationColumn = newColumns[destination.droppableId];
    destinationColumn.tasks.splice(destination.index, 0, task);

    setColumns(newColumns);
  };

  return (
    <div className="flex space-x-4 p-4">
      <DragDropContext onDragEnd={onDragEnd}>
        {Object.values(columns).map((column) => (
          <Droppable key={column.id} droppableId={column.id}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 p-4 bg-gray-100 rounded-md"
              >
                <h2 className="text-lg font-bold mb-2">{column.title}</h2>
                {column.tasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 bg-white shadow-md rounded-md mb-2"
                      >
                        {task.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default Board;