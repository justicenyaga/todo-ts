import { Box, Typography } from "@mui/material";
import React from "react";
import { ITaskDescription } from "./interfaces/ITaskDescription";
import PropTypes from "prop-types";

export const TaskDescription: React.FC<ITaskDescription> = (
  props,
): React.ReactElement => {
  const { description = "Lorem ipsum dolor sit amet" } = props;

  return (
    <Box>
      <Typography>{description}</Typography>
    </Box>
  );
};

TaskDescription.propTypes = {
  description: PropTypes.string,
};
