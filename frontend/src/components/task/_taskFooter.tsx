import React from "react";
import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { ITaskFooter } from "./interfaces/ITaskFooter";
import PropTypes from "prop-types";
import { Status } from "../createTaskForm/enums/Status";

export const TaskFooter: React.FC<ITaskFooter> = (
  props,
): React.ReactElement => {
  const {
    id,
    status,
    onStatusChange = (e) => console.log(e),
    onClick = (e) => console.log(e),
  } = props;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      mt={2}
    >
      <FormControlLabel
        label="In Progress"
        control={
          <Switch
            color="warning"
            defaultChecked={status === Status.inProgress}
            onChange={(e) => onStatusChange(e, id)}
          />
        }
      />

      <Button
        variant="contained"
        color="success"
        size="small"
        sx={{
          color: "#ffffff",
        }}
        onClick={(e) => onClick(e, id)}
      >
        Mark Complete
      </Button>
    </Box>
  );
};

TaskFooter.propTypes = {
  id: PropTypes.string.isRequired,
  status: PropTypes.string,
  onStatusChange: PropTypes.func,
  onClick: PropTypes.func,
};
