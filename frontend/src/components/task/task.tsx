import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { Priority } from "../createTaskForm/enums/Priority";
import { Status } from "../createTaskForm/enums/Status";
import { TaskDescription } from "./_taskDescription";
import { TaskFooter } from "./_taskFooter";
import { TaskHeader } from "./_taskHeader";
import { renderPriorityBorderColor } from "./helpers/renderPriorityBorderColor";
import { ITask } from "./interfaces/ITask";

export const Task: React.FC<ITask> = (props): React.ReactElement => {
  const {
    id,
    title = "Test Title",
    date = new Date(),
    description = "Lorem ipsum dolor sit amet",
    priority = Priority.normal,
    status = Status.completed,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      width="100%"
      mb={2}
      p={2}
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        borderRadius: "8px",
        border: "1px solid",
        borderColor: renderPriorityBorderColor(priority),
      }}
    >
      <TaskHeader title={title} date={date} />
      <TaskDescription description={description} />
      <TaskFooter
        id={id}
        status={status}
        onClick={onClick}
        onStatusChange={onStatusChange}
      />
    </Box>
  );
};

Task.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
  description: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
  priority: PropTypes.string,
  status: PropTypes.string,
};
