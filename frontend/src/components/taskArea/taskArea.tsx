import { Grid2, Box, Alert, LinearProgress } from "@mui/material";
import React, { useContext, useEffect } from "react";
import { TaskCounter } from "../taskCounter/taskCounter";
import { format } from "date-fns";
import { Status } from "../createTaskForm/enums/Status";
import { Task } from "../task/task";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { ITaskApi } from "./interfaces/ITaskApi";
import { IUpdateTask } from "../createTaskForm/interfaces/IUpdateTask";
import { countTasks } from "./helpers/countTasks";
import { TaskStatusChangedContext } from "../../context";

export const TaskArea: React.FC = (): React.ReactElement => {
  const taskUpdatedContext = useContext(TaskStatusChangedContext);

  const { error, isLoading, data, refetch } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      return await sendApiRequest<ITaskApi[]>(
        "http://172.25.43.47:3200/tasks",
        "GET",
      );
    },
  });

  // update task mutation
  const { mutate, isSuccess } = useMutation({
    mutationFn: (data: IUpdateTask) =>
      sendApiRequest("http://172.25.43.47:3200/tasks", "PUT", data),
  });

  function onStatusChangeHandler(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
  ) {
    mutate({
      id,
      status: e.target.checked ? Status.inProgress : Status.todo,
    });
  }

  function markCompleteHandler(
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.MouseEvent<HTMLAnchorElement>,
    id: string,
  ) {
    mutate({
      id,
      status: Status.completed,
    });
  }

  useEffect(() => {
    refetch();
  }, [taskUpdatedContext.updated, refetch]);

  useEffect(() => {
    if (isSuccess) {
      taskUpdatedContext.toggle();
    }
  }, [isSuccess, taskUpdatedContext]);

  return (
    <Grid2 size={{ md: 8 }} px={4}>
      <Box mb={8} px={4}>
        <h2>Status Of Your Tasks As On {format(new Date(), "PPPP")}</h2>
      </Box>
      <Grid2 container display="flex" justifyContent="center">
        <Grid2
          display="flex"
          flexDirection="row"
          justifyContent="space-around"
          alignItems="center"
          size={{ md: 10, xs: 12 }}
          mb={8}
        >
          <TaskCounter
            count={data ? countTasks(data, Status.todo) : undefined}
            status={Status.todo}
          />
          <TaskCounter
            count={data ? countTasks(data, Status.inProgress) : undefined}
            status={Status.inProgress}
          />
          <TaskCounter
            count={data ? countTasks(data, Status.completed) : undefined}
            status={Status.completed}
          />
        </Grid2>

        <Grid2 display="flex" flexDirection="column" size={{ xs: 10, md: 8 }}>
          {error && (
            <Alert severity="error">
              There was an error fetching your tasks
            </Alert>
          )}

          {!error && Array.isArray(data) && data.length === 0 && (
            <Alert severity="warning">
              You do not have any tasks created yet. Start by creating some
              tasks.
            </Alert>
          )}

          {isLoading ? (
            <LinearProgress />
          ) : (
            Array.isArray(data) &&
            data.length > 0 &&
            data.map((task, index) => {
              return task.status === Status.todo ||
                task.status === Status.inProgress ? (
                <Task
                  key={index + task.priority}
                  id={task.id}
                  title={task.title}
                  date={new Date(task.date)}
                  description={task.description}
                  priority={task.priority}
                  status={task.status}
                  onStatusChange={onStatusChangeHandler}
                  onClick={markCompleteHandler}
                />
              ) : (
                false
              );
            })
          )}
        </Grid2>
      </Grid2>
    </Grid2>
  );
};
