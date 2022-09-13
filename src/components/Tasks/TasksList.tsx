import { Title, List, ScrollArea } from "@mantine/core";
import { isEmpty } from "ramda";
import { FC, memo } from "react";
import { Task } from "../../types/tasks.types";
import { TaskItem } from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
}

export const TasksList: FC<TasksListProps> = memo(({ tasks }) => (
  <ScrollArea sx={{ height: 250 }}>
    <List my={5}>
      {isEmpty(tasks) ? (
        <Title order={3} size={15}>
          No Tasks
        </Title>
      ) : (
        tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
      )}
    </List>
  </ScrollArea>
));
