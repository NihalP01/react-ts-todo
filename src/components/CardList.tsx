import React, { useState } from "react";
import { Box, Button, Input, Text } from "@chakra-ui/react";
import { Task } from "../model";
import { Draggable } from "react-beautiful-dnd";

interface Props {
  index: number;
  task: Task;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CardList: React.FC<Props> = ({ index, task, tasks, setTasks }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTask, setEditTask] = useState<string>(task.task);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, task: editTask } : task))
    );
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleDone = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isDone: !task.isDone } : task
      )
    );
  };

  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <form
          style={{ marginTop: "0.6rem", backgroundColor: "#9DECF9" }}
          onSubmit={(e) => handleEdit(e, task.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Box
            maxW="sm"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            width="30rem"
            mt={"0.7rem"}
            bg="#7fffd4"
          >
            {edit ? (
              <Input
                value={editTask}
                placeholder="Enter task"
                width="auto"
                htmlSize={38}
                margin={"1rem"}
                onChange={(e) => setEditTask(e.target.value)}
              />
            ) : task.isDone ? (
              <Box
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                <Text padding="0.5rem" as={"del"}>
                  {task.task}
                </Text>
              </Box>
            ) : (
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                <Text padding="0.5rem">{task.task}</Text>
              </Box>
            )}

            <Box
              justifyContent={"center"}
              display="flex"
              mt="2"
              alignItems="center"
              padding={"0.5rem"}
            >
              <Button
                colorScheme={"blue"}
                size={"sm"}
                onClick={() => {
                  if (!edit && !task.isDone) {
                    setEdit(!edit);
                  }
                }}
              >
                Edit
              </Button>
              <Button
                left={"0.5rem"}
                size={"sm"}
                colorScheme={"red"}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
              <Button
                left={"1rem"}
                size={"sm"}
                colorScheme={"green"}
                onClick={() => handleDone(task.id)}
              >
                Done
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </Draggable>
  );
};

export default CardList;
