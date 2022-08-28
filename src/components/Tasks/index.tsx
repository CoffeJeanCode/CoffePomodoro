import { Button, ButtonGroup } from "@chakra-ui/button";
import { Editable, EditableInput, EditablePreview } from "@chakra-ui/editable";
import Icon from "@chakra-ui/icon";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import {
  Badge,
  Box,
  Container,
  Divider,
  Heading,
  List,
  VStack,
} from "@chakra-ui/layout";
import { isEmpty, not } from "ramda";
import {
  FC,
  FormEvent,
  FormEventHandler,
  SyntheticEvent,
  useState,
} from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { tasksList } from "../../state";
import { Task } from "../../types/tasks.types";
import { createId } from "../../utils/extra.utils";

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
      <VStack>
        <List overflowY="scroll" height="xs" width="full">
          {isEmpty(tasks) ? (
            <Heading as="h3" size="md">
              No Tasks
            </Heading>
          ) : (
            tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
          )}
        </List>
      </VStack>
    </Container>
  );
};

interface TaskItemProps {
  task: Task;
}

const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const [tasks, setTasks] = useRecoilState(tasksList);
  const [value, setValue] = useState(task.title);

  const handleRemoveTask = (id: string) => () => {
    const newTasks = tasks.filter((task) => task.id != id);
    setTasks(newTasks);
  };
  const handleUpdateTask = (evt: any) => {
    setValue(evt.target.value);
  };

  const handlePlusTimes = () => {
    const newTasks = tasks.map((t) =>
      t.id === task.id ? { ...t, times: t.times + 1 } : t
    );
    setTasks(newTasks);
  };

  return (
    <Box
      key={task.id}
      width="full"
      display="flex"
      justifyContent="space-between"
    >
      <Editable value={value} width="xl" placeholder="No description">
        <EditablePreview />
        <EditableInput value={value} onChange={handleUpdateTask} />
      </Editable>
      <ButtonGroup>
        <Button size="sm" onClick={handlePlusTimes}>
          {task.times}
        </Button>
        <Button
          leftIcon={<Icon as={FaTrash} />}
          justifySelf="end"
          size="sm"
          onClick={handleRemoveTask(task.id)}
        >
          Delete
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default Tasks;
