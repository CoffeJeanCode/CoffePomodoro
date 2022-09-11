import { Box, Button, Group } from "@mantine/core";
import { FC, memo, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { tasksList } from "../../state";
import { Task } from "../../types/tasks.types";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: FC<TaskItemProps> = memo(({ task }) => {
  const [tasks, setTasks] = useRecoilState(tasksList);
  const [value, setValue] = useState(task.title);
  const [times, setTimes] = useState(task.times);

  const handleRemoveTask = () => {
    const newTasks = tasks.filter((t) => t.id !== task.id);
    setTasks(newTasks);
  };

  const handleUpdateTask = (evt: any) => {
    setValue(evt.target.value);
  };

  const handlePlusTimes = () => {
    setTimes(times + 1);

    const newTasks = tasks.map((t) => (t.id === task.id ? { ...t, times } : t));
    setTasks(newTasks);
  };

  return (
    <Box
      sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}
      my={5}
    >
      {value}
      <Group>
        <Button
          leftIcon={<FaTrash />}
          sx={{ justifySelf: "end" }}
          size="xs"
          onClick={handleRemoveTask}
        >
          Delete
        </Button>
      </Group>
    </Box>
  );
});
