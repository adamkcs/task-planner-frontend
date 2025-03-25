import { useState } from "react";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Task = {
  id: string;
  content: string;
};

type TasksState = Record<string, Task[]>;

const initialTasks: TasksState = {
  todo: [
    { id: "1", content: "Create API endpoints" },
    { id: "2", content: "Setup authentication" },
  ],
  inProgress: [{ id: "3", content: "Design UI components" }],
  done: [{ id: "4", content: "Initialize project" }],
};

export default function Board() {
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceCol = [...tasks[source.droppableId]];
    const destCol = [...tasks[destination.droppableId]];
    const [movedTask] = sourceCol.splice(source.index, 1);
    destCol.splice(destination.index, 0, movedTask);

    setTasks({
      ...tasks,
      [source.droppableId]: sourceCol,
      [destination.droppableId]: destCol,
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-3 gap-4 p-4">
        {Object.entries(tasks).map(([colId, colTasks]) => (
          <Droppable key={colId} droppableId={colId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="bg-gray-100 p-4 rounded-xl min-h-[300px] shadow-md"
              >
                <h2 className="font-semibold mb-3 capitalize">{colId}</h2>
                {colTasks.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided) => (
                      <Card
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-3 mb-2 bg-white shadow-sm rounded-lg"
                      >
                        {task.content}
                      </Card>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <Button className="mt-2 w-full">+ Add Task</Button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}