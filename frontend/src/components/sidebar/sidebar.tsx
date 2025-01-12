import { Grid2 } from "@mui/material";
import React from "react";
import { Profile } from "../profile/profile";
import { CreateTaskForm } from "../createTaskForm/createTaskForm";

export const Sidebar: React.FC = (): React.ReactElement => {
  return (
    <Grid2
      size={{ md: 4 }}
      sx={{
        height: "100vh",
        position: "fixed",
        right: 0,
        top: 0,
        width: "100%",
        backgroundColor: "background.paper",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Profile name="Gabriel" />
      <CreateTaskForm />
    </Grid2>
  );
};
