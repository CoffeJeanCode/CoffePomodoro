import { Button, ButtonGroup } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Box,
  Container,
  Divider,
  Heading,
  Highlight,
  List,
  VStack,
} from "@chakra-ui/layout";
import { isEmpty, not } from "ramda";
import { FC, SyntheticEvent, useState, memo } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { tasksList } from "../../state";
import { Task } from "../../types/tasks.types";
import { createId } from "../../utils/extra.utils";
import { TasksList } from "./TasksList";

const Tasks = () => {
  const [tasks, setTasks] = useRecoilState(tasksList);
  const [value, setValue] = useState("");

  const handleAddTask = (evt: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    evt.preventDefault();
    if (not(value)) return;

    setTasks([
      { title: String(value), id: createId(), cateogory: "", times: 1 },
      ...tasks,
    ]);
    setValue("");
  };

  return (
    <Container>
      <Heading as="h2">Tasks</Heading>
      {/* <Heading as="h4" size="sm">
        Waste time: 1h 15m
      </Heading> */}
      <Divider marginY="3.5" />
      <form onSubmit={handleAddTask}>
        <InputGroup marginY="5">
          <Input
            placeholder="Write your tasks..."
            onChange={(evt) => setValue(evt.target.value)}
            value={value}
          />
          <InputRightElement width="18">
            <Button leftIcon={<Icon as={FaPlus} />} type="submit">
              Add
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
      <TasksList tasks={tasks} />
    </Container>
  );
};

export default Tasks;
