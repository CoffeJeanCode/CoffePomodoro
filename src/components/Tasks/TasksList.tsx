import { Heading, List, VStack } from "@chakra-ui/react";
import { isEmpty } from "ramda";
import { FC, memo } from "react";
import { Task } from "../../types/tasks.types";
import { TaskItem } from "./TaskItem";

interface TasksListProps {
  tasks: Task[];
}

export const TasksList: FC<TasksListProps> = memo(({ tasks }) => (
  <List spacing="2" overflowY="auto" height="xs" width="full">
    {isEmpty(tasks) ? (
      <Heading as="h3" size="md">
        No Tasks
      </Heading>
    ) : (
      tasks.map((task: Task) => <TaskItem key={task.id} task={task} />)
    )}
  </List>
));
