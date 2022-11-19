import { Box, Button, Group } from "@mantine/core";
import { isEmpty } from "ramda";
import { FC, memo, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useRecoilState } from "recoil";
import { currentTask, tasksList } from "../../state";
import { Task } from "../../types/tasks.types";

interface TaskItemProps {
  task: Task;
}

export const TaskItem: FC<TaskItemProps> = memo(({ task }) => {
  const [tasks, setTasks] = useRecoilState(tasksList);
  const [currentWork, setCurrentWork] = useRecoilState(currentTask);
  const [value, setValue] = useState(task.title);
  const [times, setTimes] = useState(task.times);
  const [isCurrent, setIsCurrent] = useState(currentWork.id === task.id);

  useEffect(() => {
    setIsCurrent(currentWork.id === task.id);
  }, [currentWork]);

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

  const handleCurrentTask = () => {
    setCurrentWork(() =>
      isEmpty(tasks) ? { id: "", title: "", cateogory: "", times: 1 } : task
    );
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "0.5rem",
        borderRadius: 10,
        pointerEvent: "cursor",
      }}
      my={5}
      onClick={handleCurrentTask}
      bg={isCurrent ? "#141516" : "#1A1B1E"}
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
