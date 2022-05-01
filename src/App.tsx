import React, { useState } from "react";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";
import { Box, Text } from "@chakra-ui/react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTask, setCompletedTask] = useState<Array<Task>>([]);

  //drag implementation
  const onDragEnd = (res: DropResult) => {
    const { destination, source } = res;

    //do nothing when it is not destination
    if (!destination) {
      return;
    }

    //do nothing when it is not destination
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = tasks;
    let complete = completedTask;

    //source task tracking
    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination task tracking
    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTask(complete);
    setTasks(active);
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <Text
          fontSize="4xl"
          align="center"
          fontWeight={"bold"}
          decoration="underline"
        >
          Todo List
        </Text>
        <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
        <Box>
          {tasks.length === 0 ? (
            <Text as={"h4"} fontWeight="bold" marginTop="3rem">
              No task added
            </Text>
          ) : (
            <div>
              <Text
                textAlign={"center"}
                fontWeight="bold"
                marginTop={"1rem"}
                marginBottom="1rem"
              >
                All tasks
              </Text>
              <TaskList
                tasks={tasks}
                setTasks={setTasks}
                completedTask={completedTask}
                setCompletedTask={setCompletedTask}
              />
            </div>
          )}
        </Box>
      </div>
    </DragDropContext>
  );
};

export default App;
