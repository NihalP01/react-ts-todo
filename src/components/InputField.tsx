import React from "react";
import { Button, Input } from "@chakra-ui/react";

interface Props {
  task: string;
  setTask: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ task, setTask, handleAdd }) => {
  return (
    <form
      style={{ display: "flex", justifyContent: "center" }}
      onSubmit={handleAdd}
    >
      <div style={{ display: "flex", width: "30rem", marginTop: "1rem" }}>
        <Input
          placeholder="Add a task"
          size="md"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <Button colorScheme="teal" left="0.7rem" variant="solid" type="submit">
          Add
        </Button>
      </div>
    </form>
  );
};

export default InputField;
