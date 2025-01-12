import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import { Status } from "../createTaskForm/enums/Status";
import { ITaskCounter } from "./interfaces/ITaskCounter";
import { emitCorrectBorderColor } from "./helpers/emitCorrectBorderColor";
import { emitCorrectLabel } from "./helpers/emitCorrectLabel";
import PropTypes from "prop-types";

export const TaskCounter: React.FC<ITaskCounter> = (
  props,
): React.ReactElement => {
  const { status = Status.completed, count = 0 } = props;

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Avatar
          sx={{
            backgroundColor: "transparent",
            border: "5px solid",
            width: "96px",
            height: "96px",
            marginBottom: "16px",
            borderColor: emitCorrectBorderColor(status),
          }}
        >
          <Typography variant="h4" color="#ffffff">
            {count}
          </Typography>
        </Avatar>
        <Typography
          variant="h5"
          color="#ffffff"
          fontWeight="bold"
          fontSize="20px"
        >
          {emitCorrectLabel(status)}
        </Typography>
      </Box>
    </>
  );
};

TaskCounter.propTypes = {
  count: PropTypes.number,
  status: PropTypes.oneOf([Status.todo, Status.inProgress, Status.completed]),
};
