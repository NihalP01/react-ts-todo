import React, { useState } from "react";
import InputField from "./components/InputField";
import TaskList from "./components/TaskList";
import { Task } from "./model";
import { Text } from "@chakra-ui/react";

const App = () => {
  const [task, setTask] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  console.log(tasks);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task) {
      setTasks([...tasks, { id: Date.now(), task, isDone: false }]);
      setTask("");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <Text fontSize="4xl" align="center" fontWeight={"bold"}>
        Todo List
      </Text>
      <InputField task={task} setTask={setTask} handleAdd={handleAdd} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </div>
  );
};

export default App;
