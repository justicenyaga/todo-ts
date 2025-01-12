import React from "react";
import { Grid2 } from "@mui/material";
import { TaskArea } from "../../components/taskArea/taskArea";
import { Sidebar } from "../../components/sidebar/sidebar";

export const Dashboard: React.FC = (): React.ReactElement => {
  return (
    <Grid2 container minHeight="100vh" p={0} m={0}>
      <TaskArea />
      <Sidebar />
    </Grid2>
  );
};
