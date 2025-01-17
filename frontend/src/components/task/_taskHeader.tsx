import { Box, Chip, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { ITaskHeader } from "./interfaces/ITaskHeader";
import PropTypes from "prop-types";

export const TaskHeader: React.FC<ITaskHeader> = (
  props,
): React.ReactElement => {
  const { title = "Default Title", date = new Date() } = props;

  return (
    <Box display="flex" width="100%" justifyContent="space-between" mb={2}>
      <Box>
        <Typography variant="h6">{title}</Typography>
      </Box>
      <Box>
        <Chip variant="outlined" label={format(date, "PPP")} />
      </Box>
    </Box>
  );
};

TaskHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.instanceOf(Date),
};
