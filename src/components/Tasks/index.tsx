import { Button } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { Container, Divider, Heading } from "@chakra-ui/layout";
import { isEmpty } from "ramda";
import { SyntheticEvent, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { tasksList } from "../../state";
import { createId } from "../../utils/extra.utils";
import { TasksList } from "./TasksList";

const Tasks = () => {
  const [tasks, setTasks] = useRecoilState(tasksList);
  const [value, setValue] = useState("");

  const handleAddTask = (evt: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    evt.preventDefault();
    if (isEmpty(value)) return;

    setTasks([
      { title: String(value), id: createId(), cateogory: "", times: 1 },
      ...tasks,
    ]);
    setValue("");
  };

  return (
    <Container>
      <Heading as="h2">Tasks</Heading>
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
