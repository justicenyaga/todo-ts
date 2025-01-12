import {
  Box,
  Stack,
  Typography,
  LinearProgress,
  Button,
  Alert,
  AlertTitle,
} from "@mui/material";
import React from "react";
import { TaskDateField } from "./_taskDateField";
import { TaskDescriptionField } from "./_taskDescriptionField";
import { TaskTitleField } from "./_taskTitleField";
import { TaskSelectField } from "./_taskSelectField";
import { Status } from "./enums/Status";
import { Priority } from "./enums/Priority";
import { useMutation } from "@tanstack/react-query";
import { sendApiRequest } from "../../helpers/sendApiRequest";
import { TaskStatusChangedContext } from "../../context";
import { ICreateTask } from "../taskArea/interfaces/ICreateTask";

export const CreateTaskForm: React.FC = (): React.ReactElement => {
  // declare component states
  const [title, setTitle] = React.useState<string | undefined>(undefined);
  const [description, setDescription] = React.useState<string | undefined>(
    undefined,
  );
  const [date, setDate] = React.useState<Date | null>(new Date());
  const [status, setStatus] = React.useState<string>(Status.todo);
  const [priority, setPriority] = React.useState<string>(Priority.normal);
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false);

  const taskUpdatedContext = React.useContext(TaskStatusChangedContext);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: (data: ICreateTask) =>
      sendApiRequest("http://172.25.43.47:3200/tasks", "POST", data),
  });

  function createTaskHandler() {
    if (!title || !date || !description) return;

    const task = {
      title,
      description,
      date: date.toString(),
      status,
      priority,
    };

    mutate(task);
  }

  React.useEffect(() => {
    if (isSuccess) {
      setShowSuccess(true);
      taskUpdatedContext.toggle();
    }

    const successTimout = setTimeout(() => {
      setShowSuccess(false);
    }, 7000);

    return () => {
      clearTimeout(successTimout);
    };
  }, [isSuccess]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
      width="100%"
      px={4}
      my={6}
    >
      {showSuccess && (
        <Alert severity="success" sx={{ width: "100%", mb: "16px" }}>
          <AlertTitle>Success</AlertTitle>
          The Task has been created successfully
        </Alert>
      )}

      <Typography mb={2} component="h2" variant="h6">
        Create a Task
      </Typography>

      <Stack spacing={2} width="100%">
        <TaskTitleField
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
        />
        <TaskDescriptionField
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
        />
        <TaskDateField
          value={date}
          onChange={(date) => setDate(date)}
          disabled={isPending}
        />
        <Stack direction="row" spacing={2} width="100%">
          <TaskSelectField
            label="Status"
            name="status"
            value={status}
            disabled={isPending}
            onChange={(e) => setStatus(e.target.value as string)}
            items={[
              { value: Status.todo, label: Status.todo.toUpperCase() },
              {
                value: Status.inProgress,
                label: Status.inProgress.toUpperCase(),
              },
            ]}
          />
          <TaskSelectField
            label="Priority"
            name="priority"
            value={priority}
            disabled={isPending}
            onChange={(e) => setPriority(e.target.value as string)}
            items={[
              { value: Priority.low, label: Priority.low.toUpperCase() },
              { value: Priority.normal, label: Priority.normal.toUpperCase() },
              { value: Priority.high, label: Priority.high.toUpperCase() },
            ]}
          />
        </Stack>

        {isPending && <LinearProgress />}

        <Button
          variant="contained"
          size="large"
          fullWidth
          onClick={createTaskHandler}
          disabled={!title || !description || !date || !status || !priority}
        >
          Create a Task
        </Button>
      </Stack>
    </Box>
  );
};
