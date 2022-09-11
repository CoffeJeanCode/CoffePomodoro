import { isEmpty } from "ramda";
import { Title, Button, Input, Group, Container, Divider } from "@mantine/core";
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
    <Container my={20}>
      <Title order={2} size={30} color="white">
        Tasks
      </Title>
      <Divider my={16} />
      <form onSubmit={handleAddTask}>
        <Group my={5}>
          <Input
            placeholder="Write your tasks..."
            onChange={(evt: any) => setValue(evt.target.value)}
            value={value}
          />
          <Button leftIcon={<FaPlus />} type="submit">
            Add
          </Button>
        </Group>
      </form>
      <TasksList tasks={tasks} />
    </Container>
  );
};

export default Tasks;
