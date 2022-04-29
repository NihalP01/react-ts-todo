import React from "react";
import { Task } from "../model";
import CardList from "./CardList";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({ tasks, setTasks }) => {
  return <div style={{margin: "2rem"}}>
    {tasks?.map((task)=> (
      <CardList tasks={tasks} task={task} key={task.id} setTasks={setTasks} />
    ))}
  </div>;
};

export default TaskList;
