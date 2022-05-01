import { Box, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Task } from "../model";
import CardList from "./CardList";

interface Props {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  completedTask: Task[];
  setCompletedTask: React.Dispatch<React.SetStateAction<Task[]>>;
}

const TaskList: React.FC<Props> = ({
  tasks,
  setTasks,
  completedTask,
  setCompletedTask,
}) => {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={6}>
      <GridItem>
        <Box
          maxW="-moz-fit-content"
          borderWidth="1px"
          borderRadius="lg"
          overflow="visible"
          padding="1rem"
          boxShadow='lg'
          bg={"#F4E2FF"}
        >
          <Droppable droppableId="TaskList">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <Text decoration={"underline"} marginBottom="0.5rem">
                  Incomplete task
                </Text>
                {tasks?.map((task, index) => (
                  <CardList
                    index={index}
                    tasks={tasks}
                    task={task}
                    key={task.id}
                    setTasks={setTasks}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </GridItem>

      <GridItem>
        <Box
          maxW="-moz-fit-content"
          borderWidth="1px"
          borderRadius="lg"
          overflow="visible"
          padding="1rem"
          boxShadow='lg'
          bg={"#d4ffdb"}
        >
          <Droppable droppableId="TaskRemove">
            {(provided) => (
              <Box ref={provided.innerRef} {...provided.droppableProps}>
                <Text decoration={"underline"} marginBottom="0.5rem">
                  Completed task
                </Text>
                {completedTask?.map((task, index) => (
                  <CardList
                    index={index}
                    tasks={completedTask}
                    task={task}
                    key={task.id}
                    setTasks={setCompletedTask}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Box>
      </GridItem>
    </Grid>
  );
};

export default TaskList;
