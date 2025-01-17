import { TextField } from "@mui/material";
import React from "react";
import { ITextField } from "./interfaces/ITextField";
import PropTypes from "prop-types";

export const TaskDescriptionField: React.FC<ITextField> = (
  props,
): React.ReactElement => {
  const { onChange = (e) => console.log(e), disabled = false } = props;
  return (
    <TextField
      id="description"
      name="description"
      label="Description"
      placeholder="Description"
      variant="outlined"
      size="small"
      multiline
      rows={4}
      fullWidth
      onChange={onChange}
      disabled={disabled}
    />
  );
};

TaskDescriptionField.propTypes = {
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};
